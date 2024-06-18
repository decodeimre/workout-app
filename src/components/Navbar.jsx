import { NavLink, Link, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <NavLink to="/">
            <li>Home </li>
          </NavLink>

          <NavLink to="/schedule/">
            <li>Plan your Workout</li>
          </NavLink>

          <NavLink to="/overview">
            <li>Exercise Overview</li>
          </NavLink>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
