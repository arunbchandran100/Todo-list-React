import { useState } from "react"
import TodoTask from './todoTask'

export default function Todo() {
    const [todo, setTodo] = useState({ name: '', done: false })
    const [todos, setTodos] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        setTodos([...todos, todo]);
        setTodo({ name: "", done: false });
    }

    const sortedTodos = todos
        .slice()
        .sort((a, b) => Number(a.done) - Number(b.done))
        
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setTodo({ name: e.target.value, done: false })}
                    type="text"
                    value={todo.name}
                />
                <button type="submit">Add</button>
            </form>
            {sortedTodos.map((todo, index) => {
                return (
                    <TodoTask
                        key={index}
                        task={todo}
                        setTodos={setTodos}
                        todos={todos}
                    />
                );
            })}
        </div>
    );
}

