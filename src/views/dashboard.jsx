import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MovementList from "./MovementList";
import { Cuentas } from "../components/Cuentas";
import { NuevaCuenta } from "../components/NuevaCuenta";
import Transfer from "../components/Transfer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { idUser } = useParams(); // Obtener el userId de la URL
  const [idAccounts,setIdAccounts] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [selectedIdAccount,setSelectedIdAccount] = useState(0);
  const [selectedAccount,setSelectedAccount] = useState([]);
  
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
    console.log(selectedIdAccount);
  },[selectedIdAccount]);

  useEffect(()=>{
    console.log(selectedAccount);
  },[selectedAccount]);


  return (
    <> 
      <Nav navigate={navigate} idUser={idUser}/>
      <div className="container mt-5 text-light fixed">
        {user ? (
          <div className="mx-5">
            <div className="mb-3">
              <div className="d-flex mb-2 align-items-center">
                <h3 className="mb-3">Accounts</h3> 
                {idAccounts.length < 5 && <NuevaCuenta idUser={idUser} handleRefresh={handleRefresh}/>}
              </div>
              <div className="container-fluid mx-3 text-light">
                <Cuentas idUser={idUser} setIdAccounts={setIdAccounts} refresh={refresh} setSelectedIdAccount={setSelectedIdAccount} setSelectedAccount={setSelectedAccount}/>
                <Transfer Account={selectedAccount} handleRefresh={handleRefresh}/>
                <MovementList idUser={idUser} refresh={refresh}/>
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
