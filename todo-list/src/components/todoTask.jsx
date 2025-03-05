import { useEffect, useState } from "react";
import "./todotask.css";

export default function TodoTask({ task, setTodos, todos }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(task.name);

    useEffect(()=>{
        setNewTask(task.name)
    },[task.name, isEditing])

    function handleDelete(deltask) {
        setTodos(todos.filter((todo) => todo.name !== deltask));
    }

    function handleComplete(task) {
        let newtodos = todos.map((todo) =>
            todo.name === task ? { ...todo, done: !todo.done } : todo
        );
        setTodos(newtodos);
    }

    function handleEdit(e, oldTask) {
        e.preventDefault();
        const editedTodos = todos.map((task) =>
            oldTask === task.name ? { ...task, name: newTask } : task
        );
        setTodos(editedTodos);
        setIsEditing(false);
    }

    const completedStrike = task.done ? "completed" : "";
    return (
        <>
            {isEditing ? (
                <>
                    <form onSubmit={(e) => handleEdit(e, task.name)}>
                        <input
                            onChange={(e) => setNewTask(e.target.value)}
                            type="text"
                            value={newTask}
                        />
                        <button type="submit">Save</button>
                        <button onClick={()=> setIsEditing(false)}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h3
                        className={completedStrike}
                        onClick={() => handleComplete(task.name)}
                    >
                        {task.name}
                    </h3>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => handleDelete(task.name)}>DELETE</button>
                </>
            )}
        </>
    );
}
