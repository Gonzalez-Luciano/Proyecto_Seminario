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
  const [errorFirstPart, setErrorFirstPart] = useState(false);
  const [errorSecondPart, setErrorSecondPart] = useState(false);
  const [successFirstPart, setSuccessFirstPart] = useState(false);
  const [successSecondPart, setSuccessSecondPart] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    // Si hay error en la primera parte
    if (errorFirstPart) {
      let inputs = document.querySelectorAll(".first-part .is-invalid");
      console.log(inputs);
      if (inputs.length > 0) {
        let firstInvalidInput = inputs[0];
        let carouselIndicatorFirst = document.getElementById(
          "carouselIndicatorFirst"
        );
        carouselIndicatorFirst.click();

        setTimeout(() => {
          firstInvalidInput.focus();
          firstInvalidInput.select();
        }, 200);

        return; // Prioriza la primera parte si hay error
      }
    }

    // Si no hay error en la primera parte, revisa la segunda parte
    if (errorSecondPart) {
      let inputs = document.querySelectorAll(".second-part .is-invalid");
      if (inputs.length > 0) {
        let firstInvalidInput = inputs[0];
        setTimeout(() => {
          firstInvalidInput.focus();
          firstInvalidInput.select();
        }, 200);
      }
    }
  }, [errorFirstPart, errorSecondPart]);

  useEffect(() => {
    verifySuccess();
  }, [
    name,
    surname,
    dni,
    address,
    city,
    province,
    user,
    pass,
    confirmPass,
    email,
  ]);

  const verifySuccess = () => {
    if (
      !(
        name === "" ||
        surname === "" ||
        dni === "" ||
        address === "" ||
        city === "" ||
        province === ""
      )
    ) {
      setSuccessFirstPart(true);
      console.log("hola" + successFirstPart);
    }

    if (!(user === "" || pass === "" || confirmPass === "" || email === ""))
      setSuccessSecondPart(true);
  };
  // Manejar cambios en los inputs
  const handleInputChange = (e, type) => {
    // Resetea el error al cambiar algo
    setError("");
    setErrorFirstPart(false);
    setErrorSecondPart(false);
    const value = e.target.value;

    switch (type) {
      case "user":
        setUser(value);
        console.log("user " + value);
        if (value === "") {
          setError("Username has left blank");
          setErrorSecondPart(true);
        }

        break;
      case "pass":
        setPass(value);
        console.log("pass " + value);
        if (value === "") {
          setError("Password has left blank");
          setErrorSecondPart(true);
        }
        break;
      case "confirmPass":
        setConfirmPass(value);
        console.log("conPass " + value);
        if (value !== pass) {
          setError("Passwords do not match");
          setErrorSecondPart(true);
        }
        break;
      case "email":
        setEmail(value);
        console.log("mail " + value);
        if (!validateEmail(value)) {
          setError("Invalid email format");
          setErrorSecondPart(true);
        }
        break;
      case "name":
        setName(value);
        console.log("name " + value);
        if (value === "") {
          setError("Name is required");
          setErrorFirstPart(true);
        }
        break;
      case "surname":
        setSurname(value);
        console.log("surname " + value);
        if (value === "") {
          setError("Surname is required");
          setErrorFirstPart(true);
        }
        break;
      case "dni":
        setDni(value);
        console.log("dni " + value);
        if (value === "") {
          setError("DNI is required");
          setErrorFirstPart(true);
        }
        break;
      case "address":
        setAddress(value);
        console.log("address " + value);
        if (value === "") {
          setError("Address is required");
          setErrorFirstPart(true);
        }
        break;
      case "city":
        setCity(value);
        console.log("city " + value);
        if (value === "") {
          setError("City is required");
          setErrorFirstPart(true);
        }
        break;
      case "province":
        setProvince(value);
        console.log("province " + value);
        if (value === "") {
          setError("Province is required");
          setErrorFirstPart(true);
        }
        break;
      default:
        break;
    }
  };

  const prev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const next = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 1));
  };

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  // Función de validación de email simple
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const loginRedirect = () => {
    navigate("/");
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
    setErrorFirstPart(false);
    setErrorSecondPart(false);
    setMsg(""); // Limpiar cualquier mensaje de éxito
  };

  return (
    <div
      className="container d-flex justify-content-center flex-column align-items-center w-auto"
      data-bs-theme="dark"
    >
      <div
        id="signupCarousel"
        className="carousel"
        data-bs-interval="false"
        data-bs-touch="true"
      >
        <div className="carousel-indicators" data-bs-theme="light">
          <button
            type="button"
            id="carouselIndicatorFirst"
            className={`carousel-indicator ${
              activeIndex === 0 ? "active" : ""
            } ${errorFirstPart ? "indicator-error" : ""}
            ${successFirstPart ? "indicator-success" : ""}`}
            data-bs-target="#signupCarousel"
            data-bs-slide-to="0"
            aria-current={activeIndex === 0 ? "true" : "false"}
            aria-label="Slide 1"
            onClick={() => handleSlideChange(0)}
          ></button>
          <button
            type="button"
            id="carouselIndicatorSecond"
            className={`carousel-indicator ${
              activeIndex === 1 ? "active" : ""
            } ${errorSecondPart ? "indicator-error" : ""}
            ${successSecondPart ? "indicator-success" : ""}`}
            data-bs-target="#signupCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            onClick={() => handleSlideChange(1)}
          ></button>
        </div>
        <div className="d-flex flex-column carousel-inner slide-container">
          <p className="mx-auto">
            {error ? (
              <span className="text-danger">{error}</span>
            ) : (
              <span className="text-success">{msg}</span>
            )}
          </p>

          {/* Primera Parte del Formulario */}
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
                setErrorFirstPart,
                setErrorSecondPart,
                setSuccessFirstPart,
                setSuccessSecondPart,
                navigate,
                clean
              );
            }}
            noValidate
          >
            <div
              className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}
            >
              {/* Primera Parte del Formulario */}
              <div className="w-100 p-5 text-light d-flex align-items-center flex-column border-opacity-10 border-login first-part">
                <div>
                  <img
                    src="/images/AlianzIcono.png"
                    alt=""
                    style={{
                      width: "90px",
                      height: "auto",
                      marginBottom: "25px",
                      borderRadius: "0px",
                    }}
                  />
                </div>
                {/* Nombre */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingName"
                    type="text"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" && name === "") ||
                      error === "Name is required"
                        ? "is-invalid"
                        : ""
                    }
                    ${name ? "is-valid" : ""}`}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => handleInputChange(e, "name")}
                    required
                  />
                  <label htmlFor="floatingName">Name</label>
                  <div className="invalid-feedback">
                    Please enter your name.
                  </div>
                </div>

                {/* Apellido */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingSurname"
                    type="text"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" &&
                        surname === "") ||
                      error === "Surname is required"
                        ? "is-invalid"
                        : ""
                    }
                    ${surname ? "is-valid" : ""}`}
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => handleInputChange(e, "surname")}
                    required
                  />
                  <label htmlFor="floatingSurname">Surname</label>
                  <div className="invalid-feedback">
                    Please enter your surname.
                  </div>
                </div>

                {/* DNI */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingDni"
                    type="text"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" &&
                        dni.length < 8) ||
                      error === "DNI is required"
                        ? "is-invalid"
                        : ""
                    }
                    ${dni.length >= 8 ? "is-valid" : ""}`}
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
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" &&
                        address === "") ||
                      error === "Address is required"
                        ? "is-invalid"
                        : ""
                    }
                    ${address ? "is-valid" : ""}`}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => handleInputChange(e, "address")}
                    required
                  />
                  <label htmlFor="floatingAddress">Adress</label>
                  <div className="invalid-feedback">
                    Please enter your adress.
                  </div>
                </div>

                {/* Ciudad */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingCity"
                    type="text"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" && city === "") ||
                      error === "City is required"
                        ? "is-invalid"
                        : ""
                    }
                    ${city ? "is-valid" : ""}`}
                    placeholder="City"
                    value={city}
                    onChange={(e) => handleInputChange(e, "city")}
                    required
                  />
                  <label htmlFor="floatingCity">City</label>
                  <div className="invalid-feedback">
                    Please enter your city.
                  </div>
                </div>

                {/* Provincia */}
                <div className="form-floating mb-3 mx-2">
                  <select
                    className={`form-select wpx-300 ${
                      (error === "All fields are required!" &&
                        province === "") ||
                      error === "Province is required"
                        ? "is-invalid"
                        : ""
                    }
                    ${province ? "is-valid" : ""}`}
                    value={province}
                    onChange={(e) => handleInputChange(e, "province")}
                    id="floatingProvince"
                    required
                  >
                    <option value="" selected>
                      Open this select menu
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <label htmlFor="floatingProvince">Select a province</label>
                  <div className="invalid-feedback">
                    Please enter your province.
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda Parte del Formulario */}
            <div
              className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}
            >
              <div className="w-100 p-5 text-light d-flex align-items-center flex-column border-opacity-10 border-login second-part">
                <div>
                  <img
                    src="/images/AlianzIcono.png"
                    alt=""
                    style={{
                      width: "90px",
                      height: "auto",
                      marginBottom: "25px",
                      borderRadius: "0px",
                    }}
                  />
                </div>
                {/* UserName */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingUsername"
                    type="text"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" && user === "") ||
                      error === "Username has left blank"
                        ? "is-invalid"
                        : ""
                    }
                    ${user ? "is-valid" : ""}`}
                    placeholder="Username"
                    value={user}
                    onChange={(e) => handleInputChange(e, "user")}
                    required
                  />
                  <label htmlFor="floatingUsername">Username</label>
                  <div className="invalid-feedback">
                    Please enter a username.
                  </div>
                </div>

                {/* Email */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingEmail"
                    type="text"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" && email === "") ||
                      error === "Invalid email format"
                        ? "is-invalid"
                        : ""
                    }
                    ${validateEmail(email) ? "is-valid" : ""}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                    required
                  />
                  <label htmlFor="floatingEmail">Email</label>
                  <div className="invalid-feedback">
                    Please enter a valid email.
                  </div>
                </div>

                {/* Contraseña */}
                <div className="form-floating mb-3 mx-2">
                  <input
                    id="floatingPassword"
                    type="password"
                    className={`form-control input-signin wpx-300 ${
                      (error === "All fields are required!" && pass === "") ||
                      error === "Password has left blank"
                        ? "is-invalid"
                        : ""
                    }
                    ${pass ? "is-valid" : ""}`}
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
                    className={`form-control input-signin wpx-300${
                      error === "Passwords do not match" ? "is-invalid" : ""
                    }
                    ${confirmPass === pass && confirmPass ? "is-valid" : ""}`}
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => handleInputChange(e, "confirmPass")}
                    required
                  />
                  <label htmlFor="floatingConfirmPassword">
                    Confirm Password
                  </label>
                  <div className="invalid-feedback">Passwords must match.</div>
                </div>

                <button type="submit" className="btn-signin mt-3">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Controles del Carrusel */}
        <button
          className={`carousel-control-prev ${
            activeIndex === 0 ? "disabled d-none" : "show"
          }`}
          type="button"
          data-bs-target="#signupCarousel"
          data-bs-slide="prev"
          onClick={prev}
        >
          <span
            className="carousel-control-prev-icon carousel-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className={`carousel-control-next ${
            activeIndex === 1 ? "disabled d-none" : "show"
          }`}
          type="button"
          data-bs-target="#signupCarousel"
          data-bs-slide="next"
          onClick={next}
        >
          <span
            className="carousel-control-next-icon carousel-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
      <div className="p-5 mt-4 border-opacity-10 border-login text-light align-center">
        Do you already have an account?{" "}
        <a className="link link-success" onClick={loginRedirect}>
          Click here
        </a>
      </div>
    </div>
  );
}

export default SignUpView;
