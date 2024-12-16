export const getUser = async (user,idUser) => {
    // let path = window.location.pathname;
    // let idUser = parseInt(path.split('/').pop());
    // let userObj = JSON.parse(localStorage.getItem("user"));
    // let user = userObj.username;
    if(user && idUser){    
        let url = "/models/dashboard.php";
        let headers = {
        Accept: "application/json",
        "Content-type": "application/json",
        };
        let Data = {
        user: user,
        userId: idUser,
        };

        try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(Data),
        });

        const result = await response.json();



        } catch (err) {
        setError("An error occurred: " + err.message);
        }
    }
};

// Obtener movimientos por usuario (POST para enviarle el userId)
export const getMovementsByUserId = async (getAll, userId) => {
    const response = await fetch("/models/movementModel.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ getAll, userId }),
    });
    console.log(getAll)
    const rawResponse = await response.text(); // Lee la respuesta como texto.
    console.log("Respuesta del servidor:", rawResponse);
    
    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${rawResponse}`);
    }
    
    // Intenta convertir el texto a JSON solo si es válido.
    const data = JSON.parse(rawResponse);
    return data;
};