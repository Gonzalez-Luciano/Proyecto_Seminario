import React, { useState } from "react";
import "../css/navCss.css";
import { getNavDetails } from "../controllers/navController";
import Deposit from "./Deposit";

const Nav = ({ navigate, idUser }) => {
  const [image, setImage] = useState("");
  const [showDeposit, setShowDeposit] = useState(false); // Estado para controlar la visibilidad del modal

  // Obtener detalles del usuario cuando se carga el componente
  React.useEffect(() => {
    getNavDetails(idUser, setImage);
  }, [idUser]);

  // Función para cerrar sesión
  function logoutSubmit() {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    localStorage.setItem("loginStatus", "Logged out successfully");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-dark-subtle">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/images/AlianzLogoFinal.png"
            alt="Alianz Logo"
            className="logo-img"
          />
        </a>

        {/* Toggler para dispositivos móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú Offcanvas */}
        <div
          className="offcanvas offcanvas-end m-0 flex-grow-0 text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header m-0">
            <img
              src="/images/AlianzLogoFinal.png"
              alt="Alianz Logo"
              className="logo-img"
            />
            <button
              type="button"
              className="btn-close btn-close-white me-1"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body ms-5">
            <ul className="navbar-nav justify-content-end align-items-center flex-grow-1 pe-3">
              {/* Perfil de usuario */}
              <li className="nav-item px-3 dropdown-center">
                <button
                  className="btn p-0 d-flex align-items-center"
                  type="button"
                  id="userProfileButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {image === "default" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      className="user-icon"
                      width="32"
                      height="32"
                    >
                      <g>
                        <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
                        <path d="M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z" />
                        <path d="M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.24,13.24,0,0,1,9.23,3.72,1,1,0,0,1-.14,1.4A1,1,0,0,1,25.55,24Z" />
                      </g>
                    </svg>
                  ) : (
                    <img
                      src={image}
                      alt="User Profile"
                      className="rounded-circle"
                      width="32"
                      height="32"
                    />
                  )}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="userProfileButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      My Account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <p
                      className="btn dropdown-item text-danger mb-0"
                      onClick={logoutSubmit}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </li>

              {/* Enlaces de navegación */}
              <li className="nav-item px-3">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="https://github.com/Gonzalez-Luciano/Proyecto_Seminario">
                  About Us
                </a>
              </li>

              {/* Botón para abrir el modal de depósito */}
              <li className="nav-item px-3">
                <button
                  className="btn btn-success d-flex align-items-center justify-content-between ps-0"
                  onClick={() => setShowDeposit(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <p className="m-0">Deposit</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de Bootstrap para depósito */}
      {showDeposit && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {/* Componente Deposit */}
              <Deposit onClose={() => setShowDeposit(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
