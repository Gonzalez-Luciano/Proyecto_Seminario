<?php
$host = 'localhost';  // O la IP del servidor MySQL
$db   = 'test';
$user = 'newuser';
$pass = '1234';
$charset = 'utf8mb4';

$conn = new mysqli($host, $user, $pass, $db);
// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}