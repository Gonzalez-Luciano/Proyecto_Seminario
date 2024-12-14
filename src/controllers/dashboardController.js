export const getUser = async (
    user,
    idUser) => {
    // let path = window.location.pathname;
    // let idUser = parseInt(path.split('/').pop());
    // let userObj = JSON.parse(localStorage.getItem("user"));
    // let user = userObj.username;
    if((user!==null && idUser!==null)||(user!=="" && idUser!=="")){    
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
        console.log(result[0]);
        if(result[0].result ==="success"){
            localStorage.setItem("user", JSON.stringify(result[0].user));
        }
        } catch (err) {
        setError("An error occurred: " + err.message);
        }
    }
};
  