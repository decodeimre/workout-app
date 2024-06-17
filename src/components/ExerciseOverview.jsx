
import { ExerciseCard } from "./ExerciseCard.jsx";
import { useState } from "react";
import { exerciseData } from "../data/exerciseData.js";

export function ExerciseOverview() {
  const [ exercises, setExercises ] = useState(exerciseData);
  const targetMuscleArray = [
    ...new Set(exerciseData.map((exercise) => exercise.target)),
  ];

  const handleSelect = (e) => {
    e.preventDefault();

    if (e.target.value === "all") {
      setExercises(exerciseData);
    } else {
      setExercises(
        exerciseData.filter((item) => item.target === e.target.value)
      );
    }
  };

  return (
    <>
      <h1>Here are the available Exercises</h1>
      <select onChange={handleSelect}>
        <option value="all">-- Select your target muscle --</option>
        {targetMuscleArray.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
      <div className="exercise-overview">
        {exercises.map((item, index) => {
          return <ExerciseCard item={item} key={index} />;
        })}
      </div>
    </>
  );
}
