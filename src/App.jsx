import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "./views/loginView.jsx";
import Dashboard from "./views/dashboard.jsx";
import Protected from "./components/Protected.jsx";
import SignUpView from "./views/signupView.jsx";
import { Movement } from "./views/Movement.jsx";

let movements = [
  {
    id: 1,
    provieneDe: 3,
    vaA: 4,
    user: "Leonel Grigoriadis",
    amount: 3500,
    date: "14/12/2024",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmIVOqsYK3t8HxkQ_WjwPoP2cwJiV1xDyWIw&s",
    type: "reception"
  }
  ,{
    id: 2,
    provieneDe: 4,
    vaA: 3,
    user: "Brisa Ledezma",
    amount: 12000,
    date: "11/12/2024",
    image: "",
    type: "transfer"
  },{
    id: 3,
    user: "Axion Energy",
    amount: 5000,
    date: "09/12/2024",
    image: "https://play-lh.googleusercontent.com/3KUiYKrYCppaEq7XLdhH7KOoAgT9fkltD1Ec8_MRrlRGi7k71aUJ_O0BiZoOose36AA",
    type: "reception"
  }
]

function App() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
      {movements.map((element, index) => (
        <Movement key={index} movement={element} />
      ))}
    </div>
  );
}

export default App;