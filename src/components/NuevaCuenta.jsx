import React, {useState, useEffect} from 'react'; //rafc ->shortcut
import { newCuenta} from '../controllers/nuevaCuentaController.js';
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal} from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import {setCuentas} from './Cuentas.jsx/';


export const NuevaCuenta = ({idUser, handleRefresh}) => {

  const [resultado, setResultado] = useState("");
  

  useEffect(()=>{
    if(resultado==="ok"){
      const successModal = new Modal(document.getElementById("ModalSuccess"));
      successModal.show();
    } else if (resultado !== ""){
      const failureModal = new Modal(document.getElementById("ModalFailure"));
      failureModal.show();
    }
    setResultado("");
  },[resultado]);

  const crearCuenta = () => {
    // Aquí haces la llamada para crear la cuenta
    newCuenta(idUser, setResultado)
      .then(() => {
        // Al crear la cuenta, forzamos la actualización de las cuentas
        handleRefresh();
      })
      .catch((error) => {
        console.error("Error al crear la cuenta", error);
      });
  };

  return (
    <>
        <button
            className="bg-primary bg-transparent border-dark
            mb-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#miModal"  
        >
            <img style={{width:"24px",height:"24px"}} src="https://img.icons8.com/color/24/add--v1.png" alt="add--v1"/>
        </button>
        <div class="modal fade" id="miModal" tabindex="-1" aria-labelledby="tituloModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              
              <div class="modal-header">
                <h5 class="modal-title" id="tituloModal">Nueva Cuenta</h5>
              </div>
            
              <div class="modal-body">
                <div className="d-grid mb-3">
                  <label className='mb-3'>Tipo de Cuenta</label>

                  <select className='form-select bg-dark text-light border-success' name="" id="idType">
                    <option value="1">Caja de Ahorros</option>
                    <option value="2">Cuenta Corriente</option>
                  </select>
                </div>

                <div className="d-grid mb-3">
                  <label className='mb-3'>Tipo de Divisa</label>
                  <select className='form-select bg-dark text-light border-success' name="" id="idChangeType">
                    <option value="1">Pesos</option>
                    <option value="2">Dólares</option>
                  </select>
                  
                </div>
              </div>
            
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                >Cancelar</button>
                <button 
                  type="button" 
                  class="btn btn-success"
                  onClick={crearCuenta}
                  data-bs-dismiss="modal"
                >Crear Cuenta</button>
              </div>

          </div>
        </div>
      </div>
    
      <div class="modal fade" id="ModalFailure" tabindex="-1" aria-labelledby="failureModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="p-3 d-flex justify-content-between align-items-center">
              <img style={{width:"48px",height:"48px"}} src="https://img.icons8.com/color/48/cancel--v1.png" alt="cancel--v1"/>
              <h5 class="modal-title text-light"> Error al crear una nueva cuenta</h5>
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn btn-danger mb-2" data-bs-dismiss="modal"
              > Cerrar </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="ModalSuccess" tabindex="-1" aria-labelledby="successModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="p-3 d-flex justify-content-between align-items-center">
              <img style={{width:"48px",height:"48px"}} src="https://img.icons8.com/fluency/48/checked.png" alt="checked"/>
              <h5 class="modal-title text-light">Cuenta Creada</h5>
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn btn-success mb-2" 
                onClick={()=> handleRefresh()}
                data-bs-dismiss="modal"
              > Cerrar </button>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}
