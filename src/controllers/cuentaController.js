export const getCuenta = async (
    idUser,
    noCuenta,
    balance,
    tipoCuenta
  ) => {
    if (true) {
      let url = "/models/cuenta.php";
      let headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      let Data = {
        idUser:idUser
      };
  
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
          body: JSON.stringify(Data),
        });
        const result = await response.json();
        // console.log(result);
        if () {
          
        } else {
          
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      }
    } else {
      setError("All fields are required!");
    }
  };
  