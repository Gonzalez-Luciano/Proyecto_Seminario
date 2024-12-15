import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MovementList from "./MovementList";

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

  return (
    <>
      <Nav navigate={navigate} />
      <div className="text-light">
        <h3>Dashboard Page</h3>
        {user ? (
          <div>
            <p>Welcome, {user.username}!</p>
            <p>Email: {user.email}</p>
            <p>ID: {idUser}</p> {/* Muestra el idUser */}
            <MovementList idUser={idUser} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
