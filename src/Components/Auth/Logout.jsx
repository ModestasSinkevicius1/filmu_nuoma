import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../../Functions/auth";

export function LogoutPage() {
    useEffect(() => logout(), []);
    return (
      <Navigate to="/login" replace />
    )
  }