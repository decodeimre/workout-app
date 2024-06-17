import "./App.css";
import { ExerciseOverview } from "./components/ExerciseOverview";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import WorkoutWeekProvider from "./context/WorkoutWeekContext";
import { ScheduleWorkout } from "./components/ScheduleWorkout";

function App() {
  return (
    <>
        <WorkoutWeekProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/schedule" element={<ScheduleWorkout />} >
                <Route path="/schedule/:weekday" element={<ScheduleWorkout/>}/>
              </Route>
              <Route path="/overview" element={<ExerciseOverview />} />
              <Route />
            </Route>
          </Routes>
        </WorkoutWeekProvider>

    </>
  );
}

export default App;
