import { useContext, useState, useEffect } from "react";
import { workoutWeekContext } from "../context/WorkoutWeekContext";
import { useNavigate, useParams } from "react-router-dom";

export function WorkoutForm({ muscleGroups }) {
  const [workout, setWorkout] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();
  const { weekday } = useParams();
  const { weeklyWorkout, dispatch } = useContext(workoutWeekContext);

  useEffect(() => {
    setSelectedDay(weekday);
    //returns undefined if there is no workout for that day
    const currentWorkout = weeklyWorkout.find(
      (workout) => workout.Weekday === weekday
    );
    currentWorkout ? setWorkout(currentWorkout) : setWorkout({});
  }, [weekday]);

  const handleExerciseChange = (e, targetMuscle) => {
    const selectedExerciseName = e.target.value;
    const selectedExercise = muscleGroups[targetMuscle].find(
      (exercise) => exercise.name === selectedExerciseName
    );
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      Weekday: selectedDay,
      [targetMuscle]: selectedExercise,
    }));
  };

  const handleDaySelect = (e) => {
    setSelectedDay(e.target.value);
    const weekday = e.target.value;
    navigate(`/schedule/${weekday}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if there is a workout for that day already
    const existingWorkout = weeklyWorkout.find((savedWorkouts) => {
      return savedWorkouts.Weekday === workout.Weekday;
    });
    if (existingWorkout) {
      if (window.confirm("There is already a workout set for that day! Do you want to overwrite it?")) {
      return dispatch({ type: "UPDATE_WORKOUT", payload: workout });
      
    } else {
      dispatch({ type: "ADD_WORKOUT", payload: workout });
      navigate("/");
    }
  }}

  return (
    <div className="schedule-workout">
      <div className="workout-selection-form">
        <form onSubmit={handleSubmit}>
          <div className="daySelection">
            <label>Select a day for training: </label>
            <select
              required
              onChange={handleDaySelect}
              value={weekday ? weekday : ""}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          {
            //object.keys to return array of keys(target muscle) - then map()
            Object.keys(muscleGroups).map((targetMuscle, index) => {
              return (
                <div className="workout-selection" key={index}>
                  <label>{targetMuscle}</label>
                  <select
                    value={
                      workout[targetMuscle]?.name
                        ? workout[targetMuscle].name
                        : ""
                    }
                    onChange={(e) => handleExerciseChange(e, targetMuscle)}
                  >
                    <option key="nullOption" value=""></option>
                    {
                      //for every target muscle array return the exercise options
                      muscleGroups[targetMuscle].map((exercise, index) => {
                        return (
                          <option
                            name={exercise.name}
                            key={index}
                            value={exercise.name}
                          >
                            {exercise.name}
                          </option>
                        );
                      })
                    }
                  </select>
                </div>
              );
            })
          }
          <button className="submitWorkoutBtn" type="submit">
            Save my Workout
          </button>
        </form>
      </div>
    </div>
  );
}
