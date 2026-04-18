import { useState } from 'react'
import './App.css'

function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum <= 18)
      e.age = "Age must be a number greater than 18.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSubmit({ name: name.trim(), age: Number(age) });
    setName("");
    setAge("");
    setErrors({});
  };

  return (
    <div className="card form-card">
      <h2>Add User</h2>
      

      <label>Full Name</label>
      <input
        value={name}
        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
        placeholder="e.g. Sara Ahmed"
        className={errors.name ? "err" : ""}
      />
      <p className="field-err">{errors.name}</p>

      <label>Age</label>
      <input
        value={age}
        onChange={(e) => { setAge(e.target.value); setErrors((p) => ({ ...p, age: "" })); }}
        placeholder="Must be > 18"
        type="number"
        className={errors.age ? "err" : ""}
      />
      <p className="field-err">{errors.age}</p>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit →
      </button>
    </div>
  );
}

// ── Parent Component ─────────────────────────────────
export default function TaskC() {
  const [users, setUsers] = useState([]);

  const handleNewUser = (user) => {
    setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
  };

  return (
    <>
      <div className="layout">
        <UserForm onSubmit={handleNewUser} />

        <div className="card list-card">
          <h2>
            Users
            {users.length > 0 && <span className="badge">{users.length}</span>}
          </h2>
          <p className="sub">Submitted list</p>

          {users.length === 0 ? (
            <p className="empty-state">No users yet.</p>
          ) : (
            users.map((u) => (
              <div className="user-item" key={u.id}>
                <p className="user-name">{u.name}</p>
                <p className="user-age">Age: {u.age}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
