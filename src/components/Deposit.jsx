import React, { useState } from "react";

const Deposit = ({ onClose }) => {
  const [amount, setAmount] = useState(""); // Para la entrada del formulario
  const [confirmedAmount, setConfirmedAmount] = useState(null); // Para almacenar el monto confirmado
  const [transactionCode, setTransactionCode] = useState(null);
  const [error, setError] = useState("");

  // Funcion para generar el codigo unico
  const generateCode = () => {
    return `TX-${Math.floor(Math.random() * 1000000000)}`;
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle form submission
  const handleDeposit = (e) => {
    e.preventDefault();

    // Validar que el monto sea válido y positivo
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    // Generar el código único y confirmar el monto
    const newCode = generateCode();
    setTransactionCode(newCode);
    setConfirmedAmount(parseFloat(amount).toFixed(2)); // Guardar el monto confirmado
    setError("");
    setAmount(""); // Limpiar el campo de entrada
  };

  const handleClose = () => {
    // Resetear los estados
    setTransactionCode(null);
    setAmount("");
    setConfirmedAmount(null);
    setError("");
    onClose();
  };

  return (
    <div className="modal-content bg-dark text-white" data-bs-theme="dark">
      <div className="modal-header">
        <h5 className="modal-title">Make a Deposit</h5>
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        {/* Mostrar el código de transacción después del depósito */}
        {transactionCode ? (
          <div className="text-center">
            <h5 className="text-success">Deposit Generated!</h5>
            <p>
              Use this code to complete your deposit at any authorized payment
              center:
            </p>
            <h4 className="text-primary">{transactionCode}</h4>
            <p className="mt-3">
              Amount: <strong>${confirmedAmount}</strong>
            </p>
            <button className="btn btn-secondary mt-3" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleDeposit}>
            <div className="mb-3">
              <label htmlFor="depositAmount" className="form-label">
                Deposit Amount
              </label>
              <input
                type="number"
                id="depositAmount"
                className="form-control"
                placeholder="Enter the amount"
                value={amount}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Generate Code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Deposit;
