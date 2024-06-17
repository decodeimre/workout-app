export function WorkoutDisplay({exercise}) {
  return (
    <>
      <h4>{exercise.target}</h4>
      <p>{exercise?.name}</p>
      <p>
        {exercise?.sets} sets / {exercise?.reps} reps
      </p>
    </>
  );
}
