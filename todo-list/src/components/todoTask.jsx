import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./todoTask.css";

export default function TodoTask({ task, setTodos, todos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.name);

  useEffect(() => {
    setNewTask(task.name);
  }, [task.name, isEditing]);

  function handleDelete(deltask) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter((todo) => todo.name !== deltask));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
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

  return (
    <div className="todo-item">
      {isEditing ? (
        <form
          className="todo-edit-form"
          onSubmit={(e) => handleEdit(e, task.name)}
        >
          <input
            className="todo-edit-input"
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            value={newTask}
          />
          <button className="todo-save-btn" type="submit">
            Save
          </button>
          <button
            className="todo-cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="todo-task-content">
          <h3
            className={`todo-task-text ${task.done ? "completed" : ""}`}
            onClick={() => handleComplete(task.name)}
          >
            {task.name}
          </h3>
          <div className="todo-actions">
            {!task.done && (
              <button
                className="todo-edit-icon"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              className="todo-delete-icon"
              onClick={() => handleDelete(task.name)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
