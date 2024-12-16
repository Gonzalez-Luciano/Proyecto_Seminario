import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MovementList from "./MovementList";
import { Cuentas } from "../components/Cuentas";
import { NuevaCuenta } from "../components/NuevaCuenta";
import { use } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { idUser } = useParams(); // Obtener el userId de la URL
  const [idAccounts,setIdAccounts] = useState([]);
  const [refresh,setRefresh] = useState(false);
  let handleRefresh = ()=>{
    setRefresh(!refresh);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Si no hay usuario, redirigir al login
    }
  }, [navigate]);

  useEffect(()=>{
    console.log(idAccounts);
  },[idAccounts]);

  return (
    <> 
      <Nav navigate={navigate}/>
      <div className="container mt-5 text-light fixed">
        {user ? (
          <div className="mx-5">
            <div className="mb-3">
              <div className="d-flex mb-2 align-items-center">
                <h3 className="mb-3">Cuentas</h3> 
                {idAccounts.length < 5 && <NuevaCuenta idUser={idUser} handleRefresh={handleRefresh}/>}
              </div>
              <div className="container-fluid mx-3 text-light">
                <Cuentas idUser={idUser} setIdAccounts={setIdAccounts} refresh={refresh}/>
                <MovementList idUser={idUser} />
              </div>
            </div>
          </div>) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
