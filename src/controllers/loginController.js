export const loginSubmit = async (
  user,
  pass,
  setUser,
  setPass,
  setMsg,
  setError,
  navigate
) => {
  if (user !== "" && pass !== "") {
    let url = "/models/loginModel.php";
    let headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };
    let Data = {
      user: user,
      pass: pass,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      });
      const result = await response.json();
      console.log(result);
      if (
        result[0].result !== "This user doesn't exist" &&
        result[0].result !== "Invalid Password"
      ) {
        setMsg(result[0].result);
        localStorage.setItem("login", true);
        localStorage.setItem("user", JSON.stringify(result[0].user));
        const idUser =JSON.stringify(result[0].idUser);
        console.log(idUser);
        setTimeout(function () {
          navigate(`/dashboard/${idUser}`);
        }, 1000);
      } else {
        if (result[0].result === "Invalid Password") {
          setPass("");
        }
        setError(result[0].result);
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    }
  } else {
    setError("All fields are required!");
  }
};
