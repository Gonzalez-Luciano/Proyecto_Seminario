import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MovementList from "../components/MovementList";
import { Cuentas } from "../components/Cuentas";
import { NuevaCuenta } from "../components/NuevaCuenta";
import Transfer from "../components/Transfer";
import { DetalleDeCuenta } from "../components/DetalleDeCuenta";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { idUser } = useParams(); // Obtener el userId de la URL
  const [idAccounts,setIdAccounts] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [selectedIdAccount,setSelectedIdAccount] = useState(0);
  const [selectedAccount,setSelectedAccount] = useState([]);
  
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

  useEffect(()=>{
    console.log(selectedAccount);
  },[selectedAccount]);


  return (
    <> 
      <Nav navigate={navigate} idUser={idUser}/>
      <div className="container d-flex flex-row ml-auto align-items-start justify-content-between">
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
                  <div className="d-flex flex-column flex-lg-row justify-content-between">
                    <div className="m-0 w-auto">
                      <Cuentas
                        idUser={idUser}
                        setIdAccounts={setIdAccounts}
                        refresh={refresh}
                        selectedIdAccount={selectedIdAccount}
                        setSelectedIdAccount={setSelectedIdAccount}
                        setCuentas={setCuentas} // Pasar función para actualizar cuentas
                        setSelectedAccount={setSelectedAccount}
                      />
                    </div>
                    {selectedIdAccount !== 0 && (
                      <div className="m-0 w-auto">
                          <DetalleDeCuenta setSelectedIdAccount={setSelectedIdAccount} setSelectedAccount={setSelectedAccount}
                            cuenta={cuentas.find((cuenta) => cuenta.idAccount === selectedIdAccount)}
                          />
                      </div>
                    )}
                  </div>
                  <Transfer Account={selectedAccount} handleRefresh={handleRefresh}/>
                </div>
                <MovementList idUser={idUser} refresh={refresh}/>
              </div>
            </div>) : (
              <p>Loading...</p>
            )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
