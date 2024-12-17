import React, { useEffect, useState } from "react";
import "../css/cuentaCss.css";
import { getCuenta } from "../controllers/cuentaController.js";

export const Cuentas = ({
  idUser,
  setIdAccounts,
  refresh,
  selectedIdAccount,
  setSelectedIdAccount,
  setCuentas, // Nueva prop para actualizar el estado global de cuentas
}) => {
  const [localCuentas, setLocalCuentas] = useState([]); // Estado local para cuentas

  useEffect(() => {
    getCuenta(idUser, setLocalCuentas); // Obtener las cuentas desde la API
  }, [refresh, idUser]);

  useEffect(() => {
    setCuentas(localCuentas); // Actualiza las cuentas en el Dashboard
    const ids = localCuentas.map((cuenta) => cuenta.idAccount);
    setIdAccounts(ids);
  }, [localCuentas, setIdAccounts, setCuentas]);

  return (
    <div className="container-fluid p-0">
      {localCuentas.map((cuenta) => {
        const isActive = cuenta.idAccount === selectedIdAccount; // Detectar cuenta activa

        return (
          <div key={cuenta.idAccount}>
            <div
              className={
                "card container-fluid mb-3 border-3 border-success bg-dark " +
                (isActive ? "active" : "")
              }
              onClick={() => setSelectedIdAccount(cuenta.idAccount)}
            >
              <a href="#" className="container-fluid bg-transparent text-light">
                <div className="container-fluid card-body d-lg-flex justify-content-between align-items-center">
                  <div className="m-0">
                    <h6 className="card-title mb-0">{cuenta.description}</h6>
                    <small className="text-light">#{cuenta.noAccount}</small>
                  </div>
                  <div className="d-flex justify-content-start justify-content-lg-end m-lg-0">
                    <h5 className="mb-0">
                      {cuenta.description === "Caja de Ahorro en U$D" ||
                      cuenta.description === "Cuenta corriente en U$D"
                        ? "U$D "
                        : "$ "}
                      {cuenta.balance.toFixed(2)}
                    </h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
