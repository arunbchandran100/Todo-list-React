import { useState } from "react";
import TodoTask from "./todoTask";
import "./todo.css"; 

export default function Todo() {
    const [todo, setTodo] = useState({ name: "", done: false });
    const [todos, setTodos] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        setTodos([...todos, todo]);
        setTodo({ name: "", done: false });
    }

    const sortedTodos = todos
        .slice()
        .sort((a, b) => Number(a.done) - Number(b.done));

    return (
        <div className="todo-container">
            <header className="todo-header">
                <h1>
                    Todo List
                </h1>
            </header>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    className="todo-input"
                    onChange={(e) => setTodo({ name: e.target.value, done: false })}
                    type="text"
                    value={todo.name}
                    placeholder="Add your task"
                />
                <button className="todo-add-btn" type="submit">
                    +
                </button>
            </form>
            <div className="todo-list">
                {sortedTodos.map((todo, index) => (
                    <TodoTask key={index} task={todo} setTodos={setTodos} todos={todos} />
                ))}
            </div>
        </div>
    );
}
