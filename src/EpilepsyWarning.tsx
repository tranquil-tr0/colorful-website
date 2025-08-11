import React from "react";

interface EpilepsyWarningProps {
  onContinue: () => void;
}

const EpilepsyWarning: React.FC<EpilepsyWarningProps> = ({ onContinue }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <h1>Epilepsy Warning</h1>
    <p style={{ maxWidth: 400, textAlign: "center" }}>
      This website contains rapidly changing colors and flashing images that may
      trigger seizures for people with photosensitive epilepsy. Viewer
      discretion is advised.
    </p>
    <button
      style={{
        marginTop: 24,
        padding: "8px 24px",
        fontSize: 18,
        borderRadius: 8,
        border: "none",
        background: "#ff5252",
        color: "#fff",
        cursor: "pointer",
      }}
      onClick={onContinue}
    >
      Continue
    </button>
  </div>
);

export default EpilepsyWarning;
