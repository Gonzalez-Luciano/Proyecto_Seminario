export const VerifyTransfer = async (
  idCuenta,
  Cuenta,
  Amount,
  Recipient,
  setError,
  setRecipientDetails
) => {
  if (idCuenta) {
    let url = "/models/transferModel.php";
    let headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };
    
    let Data = {
      idCuenta: idCuenta,
      Cuenta: Cuenta,
      Amount: Amount,
      Recipient: Recipient,
      action: "verify",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });
      const result = await response.json();
      console.log(result.result);
      if (
        result.result == "account is the same" ||
        result.result == "account type not match" ||
        result.result == "account not found"
      ) {
        setError(result.result);
      } else {
        setRecipientDetails(result.recipient);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("No se recibió el usuario");
  }
};

export const ConfirmTransfer = async (
  idCuenta,
  Cuenta,
  Amount,
  Recipient,
  setError,
  setRecipientDetails
) => {
  if (idCuenta) {
    const url = "/models/transferModel.php";
    const headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };

    const Data = {
      idCuenta: idCuenta, // ID de la cuenta del emisor
      Cuenta: Cuenta, // Datos de la cuenta del emisor
      Amount: Amount, // Monto de la transferencia
      Recipient: Recipient, // Alias o CVU del destinatario
      action: "transfer", // Acción: realizar la transferencia
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      });

      const result = await response.json();
      if (result.result === "success") {
        console.log("Transferencia exitosa");
      } else {
        console.error("Error en la transferencia:", result.result);
        setError(result.result);
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Server error");
    }
  } else {
    console.log("No se recibió el usuario");
  }
};
