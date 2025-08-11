function getContrastYIQ(hexColor: string): string {
  hexColor = hexColor.replace('#', '');
  const r = parseInt(hexColor.substr(0,2),16);
  const g = parseInt(hexColor.substr(2,2),16);
  const b = parseInt(hexColor.substr(4,2),16);
  const yiq = (r*299 + g*587 + b*114) / 1000;
  return yiq >= 128 ? '#222' : '#fff';
}
import React, { useState } from "react";
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
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState<string>(getRandomColor());
  const [textColor, setTextColor] = useState<string>(getContrastYIQ(bgColor));

  const changeColor = () => {
    const color = getRandomColor();
    setBgColor(color);
    setTextColor(getContrastYIQ(color));
    document.body.style.backgroundColor = color;
    document.body.style.transition = 'background 0.3s';
    document.body.style.color = getContrastYIQ(color);
  };

  // Attach listeners for all user interactions
  const handleUserInteraction = () => {
    changeColor();
  };

  React.useEffect(() => {
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("mousemove", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    // Set initial color
    changeColor();
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("mousemove", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div style={{ color: textColor, transition: 'color 0.3s' }}>
      <h1>Colorful Website</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          You have changed the color {count} times
        </button>
        <p>
          Enjoy a burst of bright colors every time you interact with the page!
        </p>
      </div>
      <p className="read-the-docs" style={{ color: textColor, transition: 'color 0.3s' }}>
        Click, type, move mouse, or touch anywhere to experience a new bright color!
      </p>
    </div>
  );
}

export default App;
