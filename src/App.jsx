import { useState } from 'react'
import './App.css';

export default function TaskA() {
  const [input, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const validate = (val) => {
    if (val.trim() === "") return "Task cannot be empty.";
    if (val.trim().length < 3) return "Task must be at least 3 characters.";
    return "";
  };

  const isInvalid = validate(input) !== "";

  const handleChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const handleAdd = () => {
    const err = validate(input);
    if (err) { setError(err); return; }
    setTasks([...tasks, { id: Date.now(), text: input.trim() }]);
    setValue("");
    setError("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isInvalid) handleAdd();
  };

  return (
    <>
      <div className="app">
        <h1>To-Do List</h1>
        <p className="subtitle">Task A — State + Validation</p>

        <div className="input-row">
          <input
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a task..."
            className={error ? "error-input" : ""}
          />
          <button className="add-btn" onClick={handleAdd} disabled={isInvalid}>
            Add
          </button>
        </div>

        <p className="error-msg">{error}</p>

        <p className="count">
          Total tasks: <span>{tasks.length}</span>
        </p>

        <ul>
          {tasks.length === 0 && (
            <p className="empty">No tasks yet. Add one above.</p>
          )}
          {tasks.map((t) => (
            <li key={t.id}>
              <span className="task-text">{t.text}</span>
              <button className="del-btn" onClick={() => handleDelete(t.id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
