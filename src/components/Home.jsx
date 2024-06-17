import { useContext } from "react";
import { WorkoutDisplay } from "./WorkoutDisplay";
import { workoutWeekContext } from "../context/WorkoutWeekContext";
import { NavLink } from "react-router-dom";

export function Home() {
  const { weeklyWorkout, dispatch } = useContext(workoutWeekContext);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
              <button value={day} className="weekday">
                {day}
              </button>

              {!dailyWorkout ? (
                <div className="workoutDisplay">
                  <h3>no workout planned</h3>
                  <NavLink to={`/schedule/${day}`}>
                    <button value={day} className="workout-Btn">
                      plan workout
                    </button>
                  </NavLink>
                </div>
              ) : (
                <div className="workoutDisplay">
                  {Object.keys(dailyWorkout)
                    .filter((key) => key !== "Weekday")
                    .map((targetmuscle, i) => {
                      const exercise = dailyWorkout[targetmuscle];
                      return <WorkoutDisplay key={i} exercise={exercise} />;
                    })}

                  <button
                    value={dailyWorkout.Weekday}
                    onClick={(e) =>
                      dispatch({
                        type: "DELETE_WORKOUT",
                        payload: e.target.value,
                      })
                    }
                    className="workout-Btn"
                  >
                    delete Workout
                  </button>
                  <NavLink to={`/schedule/${day}`}>
                    <button
                      value={dailyWorkout.Weekday}
                      onClick={(e) =>
                        dispatch({
                          type: "UPDATE_WORKOUT",
                          payload: e.target.value,
                        })
                      }
                      className="workout-Btn"
                    >
                      Update
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


function Button ({onClick, value, children}) {
  return <button onClick={onClick} value={value} className="workout-Btn">{children}</button>
}