import React from "react";
import './../css/detalleCuenta.css';

export function DetalleDeCuenta({ cuenta, setSelectedIdAccount, setSelectedAccount}) {
  return (
    <div className="content-detail container-fluid p-3 text-light rounded">
        <header className="d-flex pb-3 align-items-start justify-content-between">
            <h4 className="inline-block">Account details</h4>
            <span className="close-btn d-flex " onClick={() => {setSelectedIdAccount(0); setSelectedAccount([])}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
            </span>
        </header>
        <p className="d-flex justify-content-between" style={{gap: '10px'}}><strong>Account number </strong>#{cuenta.noAccount}</p>
        <p className="d-flex justify-content-between" style={{gap: '10px'}}><strong>Account type </strong>{cuenta.description}</p>
        <p className="d-flex justify-content-between" style={{gap: '10px'}}><strong>Alias </strong>{cuenta.alias}</p>
        <p className="d-flex justify-content-between" style={{gap: '10px'}}><strong>CVU </strong>{cuenta.cvu}</p>
        <p className="d-flex justify-content-between mb-0" style={{gap: '10px'}}><strong>Total balance </strong> 
        {
          cuenta.description === "Savings account in U$D" ||
          cuenta.description === "Checking account in U$D"
          ? "U$D "
          : "$ "
        }
        {cuenta.balance.toFixed(2)}
        </p>
    </div>
  );
};