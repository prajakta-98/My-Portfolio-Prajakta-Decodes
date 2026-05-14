import { useState } from "react";

export default function ClickSpark({ children, className = "" }) {
  const [sparks, setSparks] = useState([]);

  const createSpark = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const sparkId = `${Date.now()}-${Math.random()}`;

    setSparks((currentSparks) => [
      ...currentSparks,
      {
        id: sparkId,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);
  };

  return (
    <div className={`click-spark ${className}`} onPointerDown={createSpark}>
      {children}
      {sparks.map((spark) => (
        <span
          className="click-spark-burst"
          key={spark.id}
          style={{ "--spark-x": `${spark.x}px`, "--spark-y": `${spark.y}px` }}
          onAnimationEnd={() =>
            setSparks((currentSparks) =>
              currentSparks.filter((currentSpark) => currentSpark.id !== spark.id),
            )
          }
        >
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      ))}
    </div>
  );
}
