import React, { useEffect, useState } from "react";
import "../css/cuentaCss.css";
import { getCuenta } from "../controllers/cuentaController.js";

export const Cuentas = ({
  idUser,
  setIdAccounts,
  refresh,
  setSelectedIdAccount,
  setSelectedAccount,
}) => {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    getCuenta(idUser, setCuentas);
  }, [refresh]);
  useEffect(() => {
    const ids = cuentas.map((cuenta) => cuenta.idAccount);
    setIdAccounts(ids);
  }, [cuentas, refresh]);

  const setSelectedIdAccountAndAccount = (cuenta) => {
    setSelectedAccount(cuenta);
    setSelectedIdAccount(cuenta.idAccount);
  };
  return (
    <div className="container-fluid p-0">
      {cuentas.map((cuenta) => {
        return (
          <div key={cuenta.idAccount}>
            <div
              className="card container-fluid mb-3 border-3 border-success bg-transparent"
              onClick={() => setSelectedIdAccountAndAccount(cuenta)}
            >
              <a href="#" className="container-fluid bg-transparent text-light">
                <div
                  className="container-fluid card-body d-lg-flex justify-content-between align-items-center"
                  width="100%"
                >
                  <div className="m-0">
                    <h6 className="card-title mb-0 ">{cuenta.description}</h6>
                    <small className="text-light">{cuenta.noAccount}</small>
                  </div>
                  <div className="d-flex justify-content-start justify-content-lg-end m-lg-0">
                    <h5 className="mb-0">
                      {cuenta.id ==
                      ("Savings account in U$D" || "Checking account in U$D")
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
