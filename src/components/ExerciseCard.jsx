export function ExerciseCard({ item }) {
  return (
    <div className="exercise-card">
      <h2 style={{color: "var(--main-color)", textShadow: "1px 1px 1px white"}}>{item.name}</h2>
      <h3>Target: {item.target} </h3>
      <p>Sets: {item.sets}</p>
      <p>Reps per Set: {item.reps}</p>
    </div>
  );
}
