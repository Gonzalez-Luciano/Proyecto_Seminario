<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';
include 'array.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$idUser = $dData["idUser"];
$method = $_SERVER['REQUEST_METHOD'];

if ($idUser) {
    switch ($method) {
        case "POST": {
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
                break;
            }
        case "PUT": {
                $noAccount = mt_rand(1000000, 9999999) . "";
                $alias = $cosa[mt_rand(0, 100)] . '.' . $animal[mt_rand(0, 100)] . '.' . $color[mt_rand(0, 20)];
                $cvu = '';
                for ($i = 0; $i < 21; $i++) {
                    $cvu .= mt_rand(0, 9);
                }

                $sql = "INSERT INTO `account` (idUser,idAccountType, balance, noAccount,cvu,alias) VALUES (
                ?,
                (SELECT idAccountType FROM `accountType` WHERE idType=? AND idChangeType=?),
                0,
                ?,
                ?,
                ?)"; //crear los randoms
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("iiisss", $dData["idUser"], $dData["idType"], $dData["idChangeType"], $noAccount, $cvu, $alias);
                if ($stmt->execute()) {
                    $resultSql = $stmt->affected_rows;
                    if ($resultSql > 0) {
                        $response = array(
                            "result" => "ok"
                        );
                    } else {
                        $response = array(
                            "result" => "failed"
                        );
                    }
                } else {
                    $response = array($stmt->error);
                }
                echo json_encode($response);
                break;
            }
    }
}
