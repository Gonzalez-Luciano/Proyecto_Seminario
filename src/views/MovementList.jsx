import { React, useState, useEffect } from "react";
import { Movement } from "./Movement";
import { getMovementsByUserId } from "../controllers/dashboardController";
import './../css/dashboard.css';

const MovementList = ({ idUser }) => {
  const [movements, setMovements] = useState([]);

  // Manejar la adición de un nuevo usuario
  const loadMovements = async (getAll = false) => {
    const response = await getMovementsByUserId(getAll, idUser);
    setMovements(response); // Actualizar la lista
    if(getAll){
      document.getElementById("btn-view-all").hidden = true;
      document.getElementById("btn-view-minus").hidden = false;
    } else {
      document.getElementById("btn-view-all").hidden = false;
      document.getElementById("btn-view-minus").hidden = true;
    }
  };

  useEffect(() => {
    loadMovements();
  }, []);

  return (
    <>
      <header className="d-flex justify-content-between align-items-end pb-4">
        <h4 className="m-0">All movements</h4>
        <span id="btn-view-all" className="view-all" role="button" onClick={() => loadMovements(true)}>view all</span>
        <span id="btn-view-minus" className="view-all" role="button" onClick={() => loadMovements(false)}>close</span>
      </header>
      <main className="d-flex flex-column gap-2">
        {movements.map((element, index) => (
            <Movement key={index} movement={element}/>
          ))}
      </main>
    </>
  );
};

export default MovementList;
