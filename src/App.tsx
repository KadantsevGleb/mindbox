import { useState } from "react"
import Filters from "./components/Filters"
import FormTodo from "./components/FormTodo"
import TodoList from "./components/TodoList"
import type { Todo } from "./data/types"

function App() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const localTodos = localStorage.getItem("TODOS")

        return localTodos !== null ? JSON.parse(localTodos) : []
    })
    const [filteredTodos, setFilteredTodos] = useState(todos)

    return (
        <div className="max-w-[900px] mx-auto py-5">
            <FormTodo
                todos={todos}
                setTodos={setTodos}
            />
            <TodoList
                todos={filteredTodos}
                setTodos={setTodos}
            />
            <Filters
                todos={todos}
                setTodos={setTodos}
                setFilteredTodos={setFilteredTodos}
            />
        </div>
    )
}

export default App
