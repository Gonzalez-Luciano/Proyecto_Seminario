import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Cuentas } from "../components/Cuentas";
import { NuevaCuenta } from "../components/NuevaCuenta";

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
      <Nav navigate={navigate}/>
      <div className="container mt-5 text-light fixed">
        <div className="mx-5">
          <div className="mb-3">
            <div className="d-flex mb-2 align-items-center">
              <h3 className="mb-3">Cuentas</h3> 
              <NuevaCuenta/>
            </div>
            <div className="container-fluid mx-5 text-light">
              <Cuentas idUser={idUser}/>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
