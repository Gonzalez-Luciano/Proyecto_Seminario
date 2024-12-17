import React from "react";

export function DetalleDeCuenta({ cuenta }) {
  return (
    <div className="container-fluid p-3 text-light rounded" style={{backgroundColor: '#3b3f4e'}}>
        <header className="d-flex justify-content-between">
            <h4 className="inline-block">{cuenta.description}</h4>
            <h5 className="float-end">#{cuenta.noAccount}</h5>
        </header>
        <p><strong>CVU: </strong>{cuenta.cvu}</p>
        <p><strong>Alias: </strong>{cuenta.alias}</p>
        <p><strong>Balance: </strong> 
        {cuenta.description === "Caja de Ahorro en U$D" ||
        cuenta.description === "Cuenta corriente en U$D"
        ? "U$D "
        : "$ "}
        {cuenta.balance.toFixed(2)}
        </p>
    </div>
  );
};