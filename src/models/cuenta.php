<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$idUser = $dData["idUser"];

if ($idUser) {
    $sql = "SELECT a.idAccount, a.balance, a.noAccount, at.description FROM account as a JOIN accountType AS at ON a.idAccountType=at.idAccountType WHERE a.idUser = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $idUser);
        $stmt->execute();
        $resultSql = $stmt->get_result();
        $arrayResult = [];
        if ($resultSql->num_rows > 0) {
            while ($row = $resultSql->fetch_assoc()) {
                array_push($arrayResult, $row);
            }
        }
        echo json_encode($arrayResult);
    }
}
