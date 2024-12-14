import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../components/Nav";
import User from "../components/User";


function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
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

  // <h3>Dashboard Page</h3>
  //       {user ? (
  //         <div>
  //           <p>Welcome, {user.username}!</p>
            
  //         </div>
  //       ) : (
  //         <p>Loading...</p>
  //       )}

  return (
    <>
      <Nav navigate={navigate}/>
      <div className="text-light">
        <User/>
      </div>
    </>
  );
}

export default Dashboard;
