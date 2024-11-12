import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  
  useEffect(() => {
    // Validar si el usuario ha iniciado sesión y si hay información del usuario
    let login = localStorage.getItem("login");
    let user = localStorage.getItem("user");
    console.log(user);
    console.log(login)

    if (!login || !user) {
      localStorage.setItem("loginStatus", "Please login");
      navigate("/", { replace: true });
    }
  }, []);

  return <Component />;
};

export default Protected;
