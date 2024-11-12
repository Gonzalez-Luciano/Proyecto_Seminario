import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { idUser } = useParams(); // Obtener el userId de la URL

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Si no hay usuario, redirigir al login
    }
  }, [navigate]);

  function logoutSubmit() {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    localStorage.setItem("loginStatus", "Logged out successfully");
    navigate("/");
  }

  return (
    <div className="text-light">
      <h3>Dashboard Page</h3>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          <p>ID: {idUser}</p> {/* Muestra el idUser */}
          <p onClick={logoutSubmit} style={{ cursor: "pointer", color: "blue" }}>Logout</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;

