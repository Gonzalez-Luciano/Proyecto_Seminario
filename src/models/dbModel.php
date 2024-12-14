<?php

include_once "../config/db.php";

$objectModel = new stdClass();
$objectModel->type = [];

$sql = "SELECT * FROM `type` ";
$stmt = $conn->prepare($sql);
$stmt->execute();
$resultSql = $stmt->get_result();
if ($resultSql->num_rows > 0) {
    while ($row = $resultSql->fetch_assoc()) {
        $array = [
            $row['description'] => $row['idType']
        ];
        array_push($objectModel->type, $array);
    }
}

$objectModel->changeType = [];

$sql = "SELECT * FROM `changeType` ";
$stmt = $conn->prepare($sql);
$stmt->execute();
$resultSql = $stmt->get_result();
if ($resultSql->num_rows > 0) {
    while ($row = $resultSql->fetch_assoc()) {
        $array = [
            $row['description'] => $row['idChangeType']
        ];
        array_push($objectModel->changeType, $array);
    }
}

$objectModel->NetBank = [];

$sql = "SELECT * FROM `NetBank` ";
$stmt = $conn->prepare($sql);
$stmt->execute();
$resultSql = $stmt->get_result();
if ($resultSql->num_rows > 0) {
    while ($row = $resultSql->fetch_assoc()) {
        $array = [
            $row['name'] => $row['idNetBank']
        ];
        array_push($objectModel->NetBank, $array);
    }
} 

$objectModel->accountType = [];

$sql = "SELECT idAccountType,description FROM `accountType` ";
$stmt = $conn->prepare($sql);
$stmt->execute();
$resultSql = $stmt->get_result();
if ($resultSql->num_rows > 0) {
    while ($row = $resultSql->fetch_assoc()) {
        $array = [
            $row['description'] => $row['idAccountType']
        ];
        array_push($objectModel->accountType, $array);
    }
}
