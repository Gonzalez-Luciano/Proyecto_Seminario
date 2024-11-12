import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSubmit } from "../controllers/signupController";

function SignUpView() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setMsg(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 2000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [msg]);

  // Manejar cambios en los inputs
  const handleInputChange = (e, type) => {
    setError(""); // Resetea el error al cambiar algo
    const value = e.target.value;

    switch (type) {
      case "user":
        setUser(value);
        console.log("user " + value);
        if (value === "") setError("Username has left blank");
        break;
      case "pass":
        setPass(value);
        console.log("pass " + value);
        if (value === "") setError("Password has left blank");
        break;
      case "confirmPass":
        setConfirmPass(value);
        console.log("conPass " + value);
        if (value !== pass) setError("Passwords do not match");
        break;
      case "email":
        setEmail(value);
        console.log("mail " + value);
        if (!validateEmail(value)) setError("Invalid email format");
        break;
      case "name":
        setName(value);
        console.log("name " + value);
        if (value === "") setError("Name is required");
        break;
      case "surname":
        setSurname(value);
        console.log("surname " + value);
        if (value === "") setError("Surname is required");
        break;
      case "dni":
        setDni(value);
        console.log("dni " + value);
        if (value === "") setError("DNI is required");
        break;
      case "address":
        setAddress(value);
        console.log("adress " + value);
        if (value === "") setError("Adress is required");
        break;
      case "city":
        setCity(value);
        console.log("city " + value);
        if (value === "") setError("City is required");
        break;
      case "province":
        setProvince(value);
        console.log("province " + value);
        if (value === "") setError("Province is required");
        break;
      default:
        break;
    }
  };

  // Función de validación de email simple
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const clean = () => {
    setUser(""); // Limpiar el campo de usuario
    setPass(""); // Limpiar el campo de contraseña
    setConfirmPass(""); // Limpiar el campo de confirmación de contraseña
    setEmail(""); // Limpiar el campo de email
    setName(""); // Limpiar el campo de nombre
    setSurname(""); // Limpiar el campo de apellido
    setDni(""); // Limpiar el campo de DNI
    setAddress(""); // Limpiar el campo de dirección
    setCity(""); // Limpiar el campo de ciudad
    setProvince(""); // Limpiar el campo de provincia
    setError(""); // Limpiar cualquier mensaje de error
    setMsg(""); // Limpiar cualquier mensaje de éxito
  };

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center w-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupSubmit(
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
            setAddress,
            setCity,
            setProvince,
            setMsg,
            setError,
            navigate,
            clean
          );
        }}
        noValidate
      >
        <div className="w-100 p-5 text-light d-flex align-items-center flex-column border-opacity-10 border-login">
          <p>
            {error ? (
              <span className="text-danger">{error}</span>
            ) : (
              <span className="text-success">{msg}</span>
            )}
          </p>
          <div className="d-flex flex-row">
            {/* UserName */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingUsername"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && user === "") ||
                  error === "Username has left blank"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Username"
                value={user}
                onChange={(e) => handleInputChange(e, "user")}
                required
              />
              <label htmlFor="floatingUsername">Username</label>
              <div className="invalid-feedback">Please enter a username.</div>
            </div>

            {/* Email */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingEmail"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && email === "") ||
                  error === "Invalid email format"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
                required
              />
              <label htmlFor="floatingEmail">Email</label>
              <div className="invalid-feedback">Please enter an email.</div>
            </div>
          </div>

          <div className="d-flex flex-row">
            {/* Nombre */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingName"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && name === "") ||
                  error === "Name is required"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Name"
                value={name}
                onChange={(e) => handleInputChange(e, "name")}
                required
              />
              <label htmlFor="floatingName">Name</label>
              <div className="invalid-feedback">Please enter your name.</div>
            </div>

            {/* Apellido */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingSurname"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && surname === "") ||
                  error === "Surname is required"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Surname"
                value={surname}
                onChange={(e) => handleInputChange(e, "surname")}
                required
              />
              <label htmlFor="floatingSurname">Surname</label>
              <div className="invalid-feedback">Please enter your surname.</div>
            </div>
          </div>

          <div className="d-flex flex-row">
            {/* DNI */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingDni"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && dni === "") ||
                  error === "DNI is required"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="DNI"
                value={dni}
                onChange={(e) => handleInputChange(e, "dni")}
                required
              />
              <label htmlFor="floatingDni">DNI</label>
              <div className="invalid-feedback">Please enter your DNI.</div>
            </div>

            {/* Dirección */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingAddress"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && address === "") ||
                  error === "Adress is required"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Address"
                value={address}
                onChange={(e) => handleInputChange(e, "address")}
                required
              />
              <label htmlFor="floatingAddress">Adress</label>
              <div className="invalid-feedback">Please enter your adress.</div>
            </div>
          </div>

          <div className="d-flex flex-row">
            {/* Ciudad */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingCity"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && city === "") ||
                  error === "City is required"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="City"
                value={city}
                onChange={(e) => handleInputChange(e, "city")}
                required
              />
              <label htmlFor="floatingCity">City</label>
              <div className="invalid-feedback">Please enter your city.</div>
            </div>

            {/* Provincia */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingProvince"
                type="text"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && province === "") ||
                  error === "Province is required"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Province"
                value={province}
                onChange={(e) => handleInputChange(e, "province")}
                required
              />
              <label htmlFor="floatingProvince">Province</label>
              <div className="invalid-feedback">
                Please enter your province.
              </div>
            </div>
          </div>

          <div className="d-flex flex-row">
            {/* Contraseña */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingPassword"
                type="password"
                className={`form-control input-signin ${
                  (error === "All fields are required!" && pass === "") ||
                  error === "Password has left blank"
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Password"
                value={pass}
                onChange={(e) => handleInputChange(e, "pass")}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
              <div className="invalid-feedback">
                Please enter your password.
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="form-floating mb-3 mx-2">
              <input
                id="floatingConfirmPassword"
                type="password"
                className={`form-control input-signin ${
                  error === "Passwords do not match" ? "is-invalid" : ""
                }`}
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => handleInputChange(e, "confirmPass")}
                required
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              <div className="invalid-feedback">Passwords must match.</div>
            </div>
          </div>

          <button type="submit" className="btn-signin mt-3">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpView;
