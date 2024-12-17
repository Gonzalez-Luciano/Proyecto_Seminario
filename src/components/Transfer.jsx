import React, { useState } from "react";
import { DoTransfer } from "../controllers/transferController";

const Transfer = ({ Account }) => {
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(""); // Para la entrada del formulario
  const [recipient, setRecipient] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState(null); // Para almacenar el monto confirmado

  const handleClick = () => {
    DoTransfer(Account.idAccount, Account, amount, recipient, setError);
  };

  const handleInputChange = (e, type) => {
    switch (type) {
      case "amount":
        setAmount(e.target.value);
        break;
      case "recipient":
        setRecipient(e.target.value);
        break;
    }
  };

  const handleClose = () => {
    // Resetear los estados
    setAmount("");
    setConfirmedAmount(null);
  };
  return (
    <div data-bs-theme="dark">
      <button
        className="bg-primary bg-transparent border-dark
        mb-3"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={
          Account?.noAccount ? "#transferModal" : "#ModalFailureNroAccount"
        }
      >
        Transfer
      </button>
      <div
        className="modal fade"
        id="transferModal"
        tabindex="-1"
        aria-labelledby="tituloModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="tituloModal">
                Transfer
              </h5>
            </div>

            <div className="modal-body">
              <div className="d-grid mb-3">
                <label className="mb-3">Nro Account</label>

                <p>{Account.noAccount}</p>
              </div>

              <div className="d-grid mb-3">
                <label className="mb-3">Transfer Amount</label>
                <input
                  type="number"
                  id="depositAmount"
                  className="form-control"
                  placeholder="Enter the amount"
                  value={amount}
                  onChange={(e) => handleInputChange(e, "amount")}
                />
              </div>
              <div className="d-grid mb-3">
                <label className="mb-3">Recipient Alias or CVU</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Alias or CVU"
                  value={recipient}
                  onChange={(e) => handleInputChange(e, "recipient")}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary mx-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success mx-2"
                data-bs-dismiss="modal"
                onClick={() => handleClick()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <div
        className="modal fade"
        id="ModalFailureNroAccount"
        tabIndex="-1"
        aria-labelledby="failureModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="p-3 d-flex justify-content-between align-items-center">
              <img
                style={{ width: "48px", height: "48px" }}
                src="https://img.icons8.com/color/48/cancel--v1.png"
                alt="cancel--v1"
              />
              <h5 className="modal-title text-light">
                Please select an account before transferring
              </h5>
            </div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-danger mb-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
