import { useState, type Dispatch, type FormEvent, type SetStateAction, useEffect, type FC } from "react"
import type { Todo } from "../data/types"

interface FormTodoProps {
	todos: Todo[]
	setTodos: Dispatch<SetStateAction<Todo[]>>
}

const FormTodo: FC<FormTodoProps> = ({todos, setTodos}) => {
    const [value, setValue] = useState("")

    function formHandler (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if (value !== '') {
            setTodos(prev => [...prev, {id: Date.now(), checked: false, value: value}])
            setValue('')
        }

    }

    useEffect(() => {
    	localStorage.setItem('TODOS', JSON.stringify(todos))
    }, [todos])

	return (
		<form
			className="flex items-center gap-3 min-w-[100%] flex-wrap"
			onSubmit={formHandler}
		>
			<input
				type="text"
				value={value}
				className="bg-white rounded-lg p-3 outline-none text-xl grow-1"
				onChange={e => setValue(e.target.value)}
			/>
			<button className="bg-cyan-700 rounded-xl text-white font-bold px-3 py-2 text-3xl">Add todo</button>
		</form>
	)
}

export default FormTodo
