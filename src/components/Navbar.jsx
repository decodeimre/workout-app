import { NavLink, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/schedule/Monday">Plan your Workout</NavLink>
          </li>
          <li>
            <NavLink to="/overview">Exercise Overview</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
