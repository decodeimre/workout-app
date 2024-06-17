import { exerciseData } from "../data/exerciseData";
import { WorkoutForm } from "./WorkoutForm";

export function ScheduleWorkout() {
  //reduce to return object of named arrays (sorted by target muscle)
  const muscleGroups = exerciseData.reduce((acc, exercise) => {
    const { target } = exercise;
    if (!acc[target]) {
      acc[target] = [];
    }
    acc[target].push(exercise);
    return acc;
  }, {});
  return (
    <>
      <WorkoutForm muscleGroups={muscleGroups} />
    </>
  );
}
