<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

// Recibir los datos del cuerpo de la solicitud
$username = $dData["user"];
$password = $dData["pass"];
$email = $dData["email"];
$name = $dData["name"];
$surname = $dData["surname"];
$dni = $dData["dni"];
$address = $dData["address"];
$city = $dData["city"];
$province = $dData["province"];

$response = array();

// Validación básica de campos
if ($username != "" && $password != "" && $email != "" && $name != "" && $surname != "" && $dni != "" && $address != "" && $city != "" && $province != "") {
    
    // Hashear la contraseña antes de guardarla
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Preparar la consulta para llamar al procedimiento almacenado
    $sql = "CALL crearUsuario(?, ?, ?, @idUser, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Bind de los parámetros de entrada
        $stmt->bind_param(
            "sssssssss",  // Tipos de los parámetros
            $username, $hashedPassword, $email, $name, $surname, $dni, $address, $city, $province
        );

        // Ejecutar el procedimiento almacenado
        if ($stmt->execute()) {
            // Verificar si se creó el usuario correctamente
            $result = $conn->query("SELECT @idUser AS idUser");
            $row = $result->fetch_assoc();
            $idUser = $row['idUser'];

            if ($idUser) {
                // Usuario creado con éxito
                $response = array(
                    "result" => "Success",
                    "user" => array(
                        "userId" => $idUser,
                        "username" => $username,
                        "email" => $email
                    )
                );
            } else {
                // Si no se pudo crear el usuario
                $response = array(
                    "result" => "Error creating user"
                );
            }
        } else {
            // Error durante la ejecución del procedimiento
            $response = array(
                "result" => "Failed to execute statement: " . $stmt->error
            );
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        // Error en la preparación de la consulta
        $response = array(
            "result" => "Error in preparing statement"
        );
    }
} else {
    // Faltan campos obligatorios
    $response = array(
        "result" => "All fields are required"
    );
}

// Cerrar la conexión a la base de datos
$conn->close();

// Devolver la respuesta en formato JSON
echo json_encode(array($response));

?>