import React, { useEffect, useState } from "react";
import { VerifyTransfer, ConfirmTransfer } from "../controllers/transferController";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

const Transfer = ({ Account,handleRefresh }) => {
  const [error, setError] = useState("");
  const [recipientDetails, setRecipientDetails] = useState("");
  const [amount, setAmount] = useState(""); // Para la entrada del formulario
  const [recipient, setRecipient] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState(null); // Para almacenar el monto confirmado
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  

  useEffect(() => {
    if (recipientDetails) {
      setShowRecipientModal(true);
    }
  }, [recipientDetails]);


  useEffect(()=>{
    if(error==="account not found" || error==="account type not match"){
      let err = new Modal(document.getElementById("ModalFailureAccount"));
      err.show();
    }
    setError("");
  },[error]);

  const handleClick = () => {
    if(amount==="" || amount.includes('-')){
      let err = new Modal(document.getElementById("ModalFailureAmount"));
      err.show();
      handleClose;
    }else if(recipient==="" || recipient===Account.cvu || recipient===Account.alias){
      let err = new Modal(document.getElementById("ModalFailureAccount"));
      err.show();
      handleClose;
    }else if(amount <= Account.balance){
      VerifyTransfer(
        Account.idAccount,
        Account,
        amount,
        recipient,
        setError,
        setRecipientDetails
      );
      if(recipientDetails!== ""){
        document.getElementById('transferModal').setAttribute("aria-hidden","true");
      }
    }
    else{
      let err = new Modal(document.getElementById("ModalFailureCantAmount"));
      err.show();
      handleClose;
    }
  };

  const handleCloseModal = () => {
    const transferModalElement = document.getElementById("transferModal");
    const transferModal = Modal.getInstance(transferModalElement) || new Modal(transferModalElement);
    const transferSuccess = new Modal(document.getElementById("transferSuccess"));
    transferSuccess.show();
    transferModal.hide();
  }

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

  const handleConfirmPayment = () => {
    // Aquí va la lógica de confirmación de la transferencia
    ConfirmTransfer( Account.idAccount,
        Account,
        amount,
        recipient,
        setError,
        recipientDetails,
        setRecipientDetails)
    handleClose();
    handleRefresh();
  };

  const handleClose = () => {
    // Resetear los estados
    setAmount("");
    setRecipient("");
    setRecipientDetails("");
    setShowRecipientModal(false);
  };
  return (
    <div data-bs-theme="dark">
      <button
        className="bg-success border-dark
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
                <label className="mb-3"><strong>Account</strong></label>

                <p>{Account.description}</p>
  

                <p>#{Account.noAccount}</p>
              </div>

              <div className="d-grid mb-3">
                <label className="mb-3">Transfer Amount</label>
                <input
                  type="number"
                  id="depositAmount"
                  class="form-control no-spinner"
                  placeholder="Enter the amount"
                  value={amount}

                  onChange={(e) => handleInputChange(e, "amount")}
                />
              </div>
              <div className="d-grid mb-3">
                <label className="mb-3">Recipient Alias or CVU</label>
                <input
                  type="text"
                  id="recipient"
                  class="form-control"
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
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                id="btnConfirm"
                className="btn btn-success mx-2"
                onClick={() => handleClick()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de vista previa */}
      {showRecipientModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-labelledby="recipientModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content bg-dark">
              <div className="modal-header border-success">
                <h5 className="modal-title" id="recipientModalLabel">
                  Confirm Transfer Details
                </h5>
              </div>
              <div className="modal-body">
                <h5 className="d-inline mx-0 px-1 border-bottom border-3 border-success"     id="recipientModalLabel">
                  To: 
                </h5>
                <div className="mt-3">
                  <p>
                    <strong>{recipientDetails.username}</strong>
                  </p>
                  <p>
                    <strong>Alias:</strong> {recipientDetails.alias}
                  </p>
                  <p>
                    <strong>CVU:</strong> {recipientDetails.cvu}
                  </p>
                </div>
                <br />
                <h5 className="d-inline mx-0 px-1 border-bottom border-3 border-success"     id="recipientModalLabel">
                  From: 
                </h5>
                <div className="mt-3">
                  <p>
                    <strong>Account: </strong> {Account.description}
                  </p>
                  <p>
                    <strong>Account Number: #</strong> {Account.noAccount}
                  </p>
                </div>
              </div>

              <div className="modal-header border-0">
                <h3 className="modal-title">
                  Amount: {Account.idChangeType==1 ? "U$D ": "$ "}<strong>{amount}</strong>
                </h3>
              </div>

              <div className="modal-footer border-success">
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success mx-2"
                  onClick={()=>{
                    handleConfirmPayment()
                    handleCloseModal()}}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Error por monto incorrecto*/} 
      <div
        className="modal fade"
        id="ModalFailureAmount"
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
                Please enter a valid amount
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

      {/* Error por cuenta*/} 
      <div
        className="modal fade"
        id="ModalFailureAccount"
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
                Please enter a valid CVU or alias
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

      {/* Error por monto menor que el de la cuenta*/}
      <div
        className="modal fade"
        id="ModalFailureCantAmount"
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
                Insufficient funds
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

      {/*Transacción confirmada*/}
      <div class="modal fade" id="transferSuccess" tabindex="-1" aria-labelledby="successModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="p-3 d-flex justify-content-between align-items-center">
              <img style={{width:"48px",height:"48px"}} src="https://img.icons8.com/fluency/48/checked.png" alt="checked"/>
              <h5 class="modal-title text-light">Transfer sucess!</h5>
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn btn-success mb-2" 
                onClick={()=> handleClose}
                data-bs-dismiss="modal"
              > Close </button>
            </div>
          </div>
        </div>
      </div> 

    </div>
  );
};

export default Transfer;
