export const getCuenta = async (
    idUser,
    setCuentas
  ) => {
    if(idUser){
  
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
          method: "POST",
          headers: headers,
          body: JSON.stringify(Data),
        });
        const result = await response.json();
        setCuentas(result);
      } catch (err) {
        console.log(err);
      }
    }
    else{
      console.log("No se recibió el usuario");
    }   
  };
  