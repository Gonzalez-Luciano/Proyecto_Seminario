export const newCuenta = async(
    idUser,
    setResultado,
    // handleRefresh
  )=>{
    if(idUser){
      let url = "/models/cuenta.php";
      let headers = {
        Accept: "application/json",
        "Content-type": "aplication/json"
      };
      let idChangeType = parseInt(document.getElementById('idChangeType').value);
      let idType = parseInt(document.getElementById('idType').value);
      let Data = {
        idUser: idUser,
        idType: idType,
        idChangeType: idChangeType,
      };
      if(Data.idChangeType == 1 || Data.idChangeType == 2 || Data.idType == 1 || Data.idType == 2){
        try{
          const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(Data)
          });
          const result = await response.json();
          setResultado(result.result);
        }catch (err){
          console.log(err);
        }
      }else{
        console.log("Valores del select erroneos");
      }
    }
    else{
      console.log("No se recibió el usuario");
    }
  };