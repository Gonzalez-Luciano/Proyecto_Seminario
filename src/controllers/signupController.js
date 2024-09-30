export const signupSubmit = async (
  user,
  pass,
  confirmPass,
  email,
  name,
  surname,
  dni,
  address,
  city,
  province,
  setUser,
  setPass,
  setConfirmPass,
  setEmail,
  setName,
  setSurname,
  setDni,
  setAdress,
  setCity,
  setProvince,
  setMsg,
  setError,
  navigate,
  clean
) => {
  // Validación de campos vacíos
 
  if (
    user === "" ||
    pass === "" ||
    confirmPass === "" ||
    email === "" ||
    name === "" ||
    surname === "" ||
    dni === "" ||
    address === "" ||
    city === "" ||
    province === ""
  ) {
    console.log(user.trim(), pass.trim(), confirmPass.trim(), email.trim(), name.trim(), surname.trim(), dni.trim(), city.trim(), address.trim(), province.trim());
    setError("All fields are required!");
    return;
  }

  // Validación de contraseñas
  if (pass !== confirmPass) {
    setError("Passwords do not match!");
    setPass("");
    setConfirmPass("");
    return;
  }

  let url = "/models/signupModel.php"; // URL del endpoint de registro
  let headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  let Data = {
    user: user,
    pass: pass,
    email: email,
    name: name,
    surname: surname,
    dni: dni,
    adress: address,
    city: city,
    province: province,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    });
    const result = await response.json();
    
    if (result[0].result === "Success") {
      clean()
      setMsg("User registered successfully!");
      // localStorage.setItem("login", true);
      // localStorage.setItem("user", JSON.stringify(result[0].user));
    } else {
      setError(result[0].result); // Muestra el error devuelto desde el servidor
    }
  } catch (err) {
    setError("An error occurred: " + err.message);
  }
};
