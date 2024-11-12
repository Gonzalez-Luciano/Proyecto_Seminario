import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "./views/loginView.jsx";
import Dashboard from "./views/dashboard.jsx";
import Protected from "./components/Protected.jsx";
import SignUpView from "./views/signupView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "dashboard/:idUser", // Ruta que incluye el parámetro idUser
    element: <Protected Component={Dashboard} />,
  },
  {
    path: "signup",
    element: <SignUpView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
