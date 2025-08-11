import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [count, setCount] = useState(0);

  const changeColor = () => {
    setBgColor(getRandomColor());
  };

  // Attach listeners for all user interactions
  const handleUserInteraction = () => {
    changeColor();
  };

  // Use effect to add global listeners
  React.useEffect(() => {
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("mousemove", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("mousemove", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        transition: "background 0.3s",
      }}
    >
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click, type, move mouse, or touch anywhere to change the color!
      </p>
    </div>
  );
}

export default App;
