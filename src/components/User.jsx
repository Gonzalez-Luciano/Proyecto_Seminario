import React from "react";
import { useEffect, useState } from "react";


const User = () =>{
    
    const [user, setUser] = useState(null);

    useEffect(()=> {
        const storedUsuario = localStorage.getItem("usuario");
        if(storedUsuario){
            setUser(JSON.parse(storedUsuario));
        }else{
            console.log("error set usuario");
        }
    });

    return(
        <>
        <div>
            <p>Hola Mundo!</p>
            
        </div>
    </>
    );
}

export default User;