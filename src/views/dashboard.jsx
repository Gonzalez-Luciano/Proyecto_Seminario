import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convertir el string JSON a un objeto
    } else {
      navigate("/"); // Si no hay usuario, redirigir al login
    }
  }, [navigate]);

  function logoutSubmit() {
    localStorage.removeItem("login"); // Eliminar estado de login
    localStorage.removeItem("user");  // Eliminar información del usuario
    localStorage.setItem("loginStatus", "Logged out successfully");
    navigate("/"); // Redirigir al login
  }

  return (
    <div className="text-light">
      <h3>Dashboard Page</h3>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          <p onClick={logoutSubmit} style={{ cursor: "pointer", color: "blue" }}>Logout</p>
        </div>
      ) : (
        <p>Loading...</p> // Mostrar mientras se cargan los datos
      )}
    </div>
  );
}

export default Dashboard;
