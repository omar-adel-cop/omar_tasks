import { useState, useEffect } from 'react';
import './App.css';

const MAX = 30;

function getStatus(count) {
  if (count < 10) return { label: "Too short", cls: "status-short" };
  if (count <= 20) return { label: "Good", cls: "status-good" };
  return { label: "Too long", cls: "status-long" };
}

function getBarColor(count) {
  if (count < 10) return "#e05c5c";
  if (count <= 20) return "#3db37c";
  return "#e09a1a";
}

export default function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState({ label: "Too short", cls: "status-short" });

  useEffect(() => {
    setStatus(getStatus(text.length));
  }, [text]);

  const handleChange = (e) => {
    if (e.target.value.length <= MAX) {
      setText(e.target.value);
    }
  };

  const pct = Math.min((text.length / MAX) * 100, 100);

  return (
    <div className="app">
      <h1>Character Counter</h1>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing here..."
      />

      <div className="meta">
        <span
          className="counter-pill"
          style={{ color: getBarColor(text.length) }}
        >
          {text.length}
        </span>
        <span className={`status-badge ${status.cls}`}>{status.label}</span>
      </div>

      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${pct}%`, background: getBarColor(text.length) }}
        />
      </div>

      <p className="hint">{text.length} / {MAX} chars max</p>
    </div>
  );
}

