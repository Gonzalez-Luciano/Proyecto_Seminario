export const getNavDetails = async (idUser, setImage) => {
  if (idUser) {
    let url = "/models/navModel.php";
    let headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };
    let Data = {
      idUser: idUser,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });
      const result = await response.json();
      setImage(result[0].image);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("No se recibió el usuario");
  }
};
