import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Header } from "../Header";

import "./style.scss"

export function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="main-container">
      <Header />

      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}