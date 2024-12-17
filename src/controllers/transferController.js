export const DoTransfer = async (
  idCuenta,
  Cuenta,
  Amount,
  Recipient,
  setError
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
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });
      const result = await response.json();
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("No se recibió el usuario");
  }
};
