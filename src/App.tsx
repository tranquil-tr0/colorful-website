function getContrastYIQ(hexColor: string): string {
  hexColor = hexColor.replace("#", "");
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#222" : "#fff";
}
import React, { useState, useCallback, useEffect } from "react";
import EpilepsyWarning from "./EpilepsyWarning";
import "./App.css";

function getRandomColor() {
  // Neon color palette (hex codes)
  const neonColors = [
    "#39FF14", // Neon Green
    "#FF073A", // Neon Red
    "#F7FF00", // Neon Yellow
    "#00FFFF", // Neon Cyan
    "#FF00FF", // Neon Magenta
    "#FF5F1F", // Neon Orange
    "#FE019A", // Neon Pink
    "#0FF0FC", // Neon Aqua
    "#BFFF00", // Neon Lime
    "#FFD700", // Neon Gold
  ];
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

function App() {
  const [count, setCount] = useState(0);
  const [flyingCounts, setFlyingCounts] = useState<
    Array<{ id: number; value: number }>
  >([]);
  const [bgColor, setBgColor] = useState<string>(getRandomColor());
  const [textColor, setTextColor] = useState<string>(getContrastYIQ(bgColor));
  const [showWarning, setShowWarning] = useState(true);

  const changeColor = useCallback(() => {
    const color = getRandomColor();
    setBgColor(color);
    setTextColor(getContrastYIQ(color));
    document.body.style.backgroundColor = color;
    document.body.style.color = getContrastYIQ(color);
    setCount((count) => count + 1);
  }, []);

  // Add a flying count element whenever count changes
  useEffect(() => {
    if (count === 0) return;
    const id = Date.now() + Math.random();
    setFlyingCounts((prev) => [...prev, { id, value: count }]);
    // Remove after animation (2s)
    const timeout = setTimeout(() => {
      setFlyingCounts((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [count]);

  React.useEffect(() => {
    if (showWarning) return;
    // Use a stable handler to avoid stale closure
    const handler = () => {
      changeColor();
    };
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    window.addEventListener("mousemove", handler);
    window.addEventListener("touchstart", handler);
    // Set initial color
    changeColor();
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [changeColor, showWarning]);

  return (
    <div style={{ color: textColor, position: "relative", overflow: "hidden" }}>
      {/* Flying count elements */}
      {flyingCounts.map(({ id, value }) => (
        <div
          key={id}
          style={{
            position: "fixed",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            animation: "fly-rotate 2s linear forwards",
            fontSize: "2em",
            fontWeight: "bold",
            color: textColor,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {value}
        </div>
      ))}
      {/* Main content */}
      {showWarning && (
        <EpilepsyWarning onContinue={() => setShowWarning(false)} />
      )}
      {!showWarning && (
        <>
          <h1>all the colors :3</h1>
          <div className="card">
            <button
              style={{
                background: "none",
                border: "1px solid",
                fontWeight: "bold",
                color: textColor,
                padding: "0.5em 1em",
                cursor: "pointer",
              }}
              disabled
            >
              changed the color {count} times
            </button>
            <p>amazing amazing color color</p>
          </div>
          <p className="read-the-docs" style={{ color: textColor }}>
            bing bong color !!!
          </p>
        </>
      )}
    </div>
  );
}

export default App;
