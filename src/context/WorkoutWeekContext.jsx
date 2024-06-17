import { createContext, useReducer } from "react";

export const workoutWeekContext = createContext();

function workOutReducer(weeklyWorkout, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_WORKOUT": {
          const newWeeklyWorkout = [...weeklyWorkout, payload];
          setLocalStoreData(newWeeklyWorkout);
          return newWeeklyWorkout;
    }
    case "DELETE_WORKOUT": {
          const newWeeklyWorkout = weeklyWorkout.filter(workout => workout.Weekday !== payload);
          setLocalStoreData(newWeeklyWorkout);
          console.log(newWeeklyWorkout)
          return newWeeklyWorkout;
    }
    case "UPDATE_WORKOUT": {
          const updatedWorkouts = weeklyWorkout.map(workout => workout.Weekday === payload.Weekday ? payload : workout );
          setLocalStoreData(updatedWorkouts);
          return updatedWorkouts;
    }
    default: return weeklyWorkout
  }
}

function setLocalStoreData (data) {
  return localStorage.setItem('UmpaLumpa', JSON.stringify(data))
}

function getLocallyStoredData () {
    const savedWorkouts = localStorage.getItem('UmpaLumpa');
    return savedWorkouts ? JSON.parse(savedWorkouts) : []
}

export default function WorkoutWeekProvider({ children }) {
  //local storage function as third parameter 
  const [weeklyWorkout, dispatch] = useReducer(workOutReducer, [], getLocallyStoredData);
  return (
    <workoutWeekContext.Provider value={{weeklyWorkout, dispatch}}>
      {children}
    </workoutWeekContext.Provider>
  );
}

