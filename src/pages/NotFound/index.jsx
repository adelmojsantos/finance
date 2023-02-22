import { NavLink } from "react-router-dom";
import { BsHouseFill } from "react-icons/bs"

import "./style.scss"

export function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <NavLink to="/home">
        <BsHouseFill size={20} />
        Home
      </NavLink>
    </div>
  )
}