<?php
header('Content-Type: application/json');
require_once '../config/db.php';

// Detectar el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Obtener todos los usuarios
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);

    
} elseif ($method === 'POST') {
    // Insertar un nuevo usuario
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];
    $email = $data['email'];

    $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $password, $email);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }


} elseif ($method === 'PUT') {
    // Actualizar un usuario
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $username = $data['username'];
    $email = $data['email'];

    $sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $username, $email, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
}

$conn->close();
?>
