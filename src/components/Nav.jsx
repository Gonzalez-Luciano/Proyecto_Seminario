import React from "react";
import "../css/navCss.css";

const Nav = ({ navigate }) => {
  function logoutSubmit() {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    localStorage.setItem("loginStatus", "Logged out successfully");
    navigate("/");
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-dark-subtle">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/images/AlianzLogoFinal.png"
            alt="Alianz Logo"
            class="logo-img"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="offcanvas offcanvas-end m-0 flex-grow-0 text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div class="offcanvas-header m-0">
            <img
              src="/images/AlianzLogoFinal.png"
              alt="Alianz Logo"
              class="logo-img"
            />
            <button
              type="button"
              class="btn-close btn-close-white me-1"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body ms-5">
            <ul class="navbar-nav justify-content-end align-items-center flex-grow-1 pe-3">
              <li className="nav-item px-3 dropdown-center">
                <button
                  className="btn p-0 d-flex align-items-center"
                  type="button"
                  id="userProfileButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
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
              <li class="nav-item px-3">
                <a class="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item px-3">
                <a class="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li class="nav-item px-3">
                <button class="btn btn-success d-flex align-items-center justify-content-between ps-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
    </nav>
  );
};

export default Nav;
