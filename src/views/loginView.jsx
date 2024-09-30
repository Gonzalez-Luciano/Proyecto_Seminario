import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSubmit } from "../controllers/loginController"; // Importar el controlador

function LoginView() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
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

  const signupRedirect = () => {
    navigate("/signup");
  };

  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value === "" && pass === "") {
          setError("All fields are required!");
        } else if (e.target.value === "") {
          setError("Username has left blank");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "" && user === "") {
          setError("All fields are required!");
        } else if (e.target.value === "") {
          setError("Password has left blank");
        }
        break;
      default:
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center w-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginSubmit(user, pass, setUser, setPass, setMsg, setError, navigate);
        }}
        noValidate
      >
        <div className="w-100 p-5 text-light d-flex align-items-center flex-column border-opacity-10 border-login ">
          <p>
            {error ? (
              <span className="text-danger">{error}</span>
            ) : (
              <span className="text-success">{msg}</span>
            )}
          </p>
          <div className="form-floating mb-3">
            <input
              id="floatingInput"
              type="text"
              className={`form-control input-signin ${
                error === "All fields are required!" ||
                error === "Username has left blank"
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Username"
              value={user}
              onChange={(e) => handleInputChange(e, "user")}
              required
            />
            <label htmlFor="floatingInput">Username</label>
            <div className="invalid-feedback">Please enter your username.</div>
          </div>
          <div className="form-floating mb-3">
            <input
              id="floatingPassword"
              placeholder="Password"
              type="password"
              className={`form-control input-signin ${
                error === "All fields are required!" ||
                error === "Invalid Password" ||
                error === "Password has left blank"
                  ? "is-invalid"
                  : ""
              }`}
              value={pass}
              onChange={(e) => handleInputChange(e, "pass")}
              required
            />

            <label htmlFor="floatingPassword" className="form-label">
              Password
            </label>
            <div className="invalid-feedback">Please enter your password.</div>
          </div>
          <button type="submit" className="btn-signin mt-3">
            Sign in
          </button>
        </div>
      </form>
      <div className="mt-3">
        <a className="link link-primary" onClick={signupRedirect}>
          Create an account
        </a>
      </div>
    </div>
  );
}

export default LoginView;
