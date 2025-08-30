import { useState, type FC, type Dispatch, type SetStateAction, useEffect } from "react"
import type { Todo } from "../data/types"
import { leftItemsAmount } from "../hepers/getLeftTodosAmount"

interface FiltersProps {
	todos: Todo[];
	setTodos: Dispatch<SetStateAction<Todo[]>>;
	setFilteredTodos: Dispatch<SetStateAction<Todo[]>>;
}

const Filters: FC<FiltersProps> = ({ todos, setTodos, setFilteredTodos }) => {
	const filtersArr = [
		{ id: 1, name: "All", active: true },
		{ id: 2, name: "Active", active: false },
		{ id: 3, name: "Completed", active: false },
	]

	const [filters, setFilters] = useState(filtersArr)
	const [currentFilter, setCurrentFilter] = useState(1)

	function applyFilter(id: number) {
		setFilters(prev =>
			prev.map(item => {
				return item.id === id ? { ...item, active: true } : { ...item, active: false }
			}),
		)

		setCurrentFilter(id)

		filterTodos(currentFilter)
	}

	const leftTodoAmount = leftItemsAmount(todos)

	function filterTodos(filterNum: number) {
		if (filtersArr[filterNum - 1].name === "All") {
			setFilteredTodos(todos)
		}

		if (filtersArr[filterNum - 1].name === "Active") {
			setFilteredTodos([
				...todos.filter(todo => {
					return !todo.checked
				}),
			])
		}

		if (filtersArr[filterNum - 1].name === "Completed") {
			setFilteredTodos([
				...todos.filter(todo => {
					return todo.checked
				}),
			])
		}
	}

	useEffect(() => {
		filterTodos(currentFilter)
	}, [todos, currentFilter])

	return (
		<div className="fixed bottom-0 left-0 w-[100vw] bg-white py-5">
			<div className="flex justify-between items-center max-w-[94%] mx-auto text-sm">
				<p>{leftTodoAmount} items left</p>
				<div className="flex gap-6 cursor-pointer">
					{filters.map(filter => (
						<p
							className={`todo-filter ${filter.active ? "active" : ""}`}
							key={filter.id}
							onClick={() => applyFilter(filter.id)}
						>
							{filter.name}
						</p>
					))}
				</div>
				<p
					className="cursor-pointer"
					onClick={() => setTodos(prev => prev.filter(todo => !todo.checked))}
				>
					Clear completed
				</p>
			</div>
		</div>
	)
}

export default Filters
