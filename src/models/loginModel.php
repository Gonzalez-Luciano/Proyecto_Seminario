<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$username = $dData["user"];
$password = $dData["pass"];
$resultSql = "";
$response = array();

// Verificar que las variables no estén vacías
if ($username != "" && $password != "") {
    // Consulta para verificar si existe el usuario
    $sql = "SELECT * FROM user WHERE username = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("s", $username); // Solo se necesitan dos parámetros

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener los resultados
        $resultSql = $stmt->get_result();

        // Verificar si se encontró algún usuario
        if ($resultSql->num_rows > 0) {
            $row = $resultSql->fetch_assoc();
            if (password_verify($password, $row["pass"])) {
                // Contraseña correcta
                $response = array(
                    "result" => "Login successful",
                    "user" => array(
                        "email" => $row["email"],
                        "username" => $row["username"]
                    )
                );
            } else {
                // Contraseña incorrecta
                $response = array(
                    "result" => "Invalid Password"
                );
            }

        } else {
            // El usuario no existe
            $response = array(
                "result" => "This user doesn't exist"
            );
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        // Manejar errores en la preparación de la consulta
        $response = array(
            "result" => "Error in query execution"
        );
    }
} else {
    // Manejar el caso donde faltan parámetros
    $response = array(
        "result" => "Username or password cannot be empty"
    );
}

// Cerrar la conexión
$conn->close();
echo json_encode(array($response));
?>