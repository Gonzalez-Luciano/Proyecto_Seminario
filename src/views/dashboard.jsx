import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MovementList from "../components/MovementList";
import { Cuentas } from "../components/Cuentas";
import { NuevaCuenta } from "../components/NuevaCuenta";
import { DetalleDeCuenta } from "../components/DetalleDeCuenta";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { idUser } = useParams(); // Obtener el userId de la URL
  const [idAccounts,setIdAccounts] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [selectedIdAccount,setSelectedIdAccount] = useState(0);
  const [cuentas, setCuentas] = useState([]);
  
  {
    document.getElementById("root").style.minWidth = '100vdw';
    document.querySelector("body").style.minWidth = '100vdw';
  }

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


  return (
    <> 
      <Nav navigate={navigate} idUser={idUser}/>
      <div className="container d-flex flex-row ml-auto align-items-center justify-content-between">
        <div className="d-flex mt-5 text-light fixed">
          {user ? (
            <div className="mx-5">
              <div className="mb-3">
                <br />
                <br />
                <div className="container-fluid mx-3 text-light">
                  <div className="d-flex mb-2 align-items-center">
                    <h3 className="mb-3">Accounts</h3> 
                    {idAccounts.length < 5 && <NuevaCuenta idUser={idUser} handleRefresh={handleRefresh}/>}
                  </div>
                  <Cuentas
                    idUser={idUser}
                    setIdAccounts={setIdAccounts}
                    refresh={refresh}
                    selectedIdAccount={selectedIdAccount}
                    setSelectedIdAccount={setSelectedIdAccount}
                    setCuentas={setCuentas} // Pasar función para actualizar cuentas
                  />
                  <MovementList idUser={idUser} />
                </div>
              </div>
            </div>) : (
            <p>Loading...</p>
          )}
        </div>
        {selectedIdAccount !== 0 && (
          <div className="">
              <DetalleDeCuenta className=""
                cuenta={cuentas.find((cuenta) => cuenta.idAccount === selectedIdAccount)}
              />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
