import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { authConfig } from "../../Functions/auth";

export function RequireAuth({ children, role }) {
    const [view, setView] = useState(<h2>Please wait...</h2>);
    useEffect(() => {
      axios.get('http://localhost:3007/login-check?role=' + role, authConfig())
        .then(res => {
          if ('ok' === res.data.msg) {
            console.log(role);
            setView(children);
          } else {
            setView(<Navigate to="/login" replace />);
          }
        })
  
    }, [children, role]);
  
    return view;
}