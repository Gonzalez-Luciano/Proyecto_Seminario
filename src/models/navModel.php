<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$idUser = $dData["idUser"];

$response = array();

if ($idUser) {
    $sql = "SELECT image from user_data WHERE idUser = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $idUser);
        $stmt->execute();
        $resultSql = $stmt->get_result();
        if ($resultSql->num_rows > 0) {
            $row = $resultSql->fetch_assoc();
            $response = array(
                "image" => $row["image"]
            );
        }
        echo json_encode(array($response));
    }
}
