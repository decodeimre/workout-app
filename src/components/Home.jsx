import { useContext, useState } from "react";
import { WorkoutDisplay } from "./WorkoutDisplay";
import { workoutWeekContext } from "../context/WorkoutWeekContext";
import { NavLink } from "react-router-dom";

export function Home() {
  const { weeklyWorkout, dispatch } = useContext(workoutWeekContext);
  const [ showWorkout, setShowWorkout ] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDelete = (e) => {
    if (window.confirm("Sure you want to delete this workout?")) {
      dispatch({
        type: "DELETE_WORKOUT",
        payload: e.target.value,
      });
    }
  };

  const handleShowWorkout = (e) => {
    const day = e.target.value;
    setShowWorkout((prevShowWorkout) => ({
      ...prevShowWorkout,
      [day]: !prevShowWorkout[day],
    }));
  }

  return (
    <>
      <h1>Welcome to your weekly Workout Schedule</h1>
      <div className="dayTabs">
        {weekDays.map((day, index) => {
          const dailyWorkout = weeklyWorkout.find(
            (item) => item.Weekday === day
          );
          return (
            <div key={index} className="workoutDay">
              <button onClick={(e) => handleShowWorkout(e)} value={day} className="weekday">
                {day}
              </button>
              {dailyWorkout && showWorkout[day] && (
                <div className="workoutDisplay">
                  {Object.keys(dailyWorkout)
                    .filter((key) => key !== "Weekday")
                    .map((targetmuscle, i) => {
                      const exercise = dailyWorkout[targetmuscle];
                      return <WorkoutDisplay key={i} exercise={exercise} />;
                    })}

                  <button
                    value={dailyWorkout.Weekday}
                    onClick={handleDelete}
                    className="workout-Btn"
                  >
                    delete Workout
                  </button>
                  <NavLink to={`/schedule/${day}`}>
                    <button className="workout-Btn">Update</button>
                  </NavLink>
                </div>
              )}

              {dailyWorkout && !showWorkout[day] && (
                <div className="workoutDisplay">
                  <h3 className="workout-planned">workout planned</h3>
                  <button onClick={(e) => handleShowWorkout(e)} value={day} className="workout-Btn">
                    show workout
                  </button>
                </div>
              )}

              {!dailyWorkout && (
              <div className="workoutDisplay">
                <h3 className="no-workout">no workout planned</h3>
                <NavLink to={`/schedule/${day}`}>
                  <button value={day} className="workout-Btn">
                    plan workout
                  </button>
                </NavLink>
              </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
