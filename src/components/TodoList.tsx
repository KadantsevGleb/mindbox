import type { Dispatch, FC, SetStateAction } from "react"
import type { Todo } from "../data/types"

interface TodoListProps {
	todos: Todo[]
	setTodos: Dispatch<SetStateAction<Todo[]>>
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {

	function checkboxHandler(checked: boolean, id: number) {
		setTodos(prev =>
			prev.map(item => {
				if (item.id === id) {
					return { ...item, checked }
				}

				return item
			}),
		)
	}

	return (
		<div className="mb-18">
			{todos.map(todo => (
				<div
					className="mt-4 flex gap-4 items-start"
					key={todo.id}
				>
						<input
							id={`${todo.id}`}
							type="checkbox"
							className="mt-[6px] w-6 h-6 shrink-0 todo-checkbox"
							checked={todo.checked}
							onChange={e => checkboxHandler(e.target.checked, todo.id)}
						/>
						<label
							htmlFor={`${todo.id}`}
							className="text-2xl text-white"
						>
							<p className={`${todo.checked ? "line-through opacity-40" : ""}`}>{todo.value}</p>
						</label>
				</div>
			))}
		</div>
	)
}

export default TodoList