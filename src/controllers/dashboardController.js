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
  