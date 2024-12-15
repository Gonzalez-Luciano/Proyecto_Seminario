<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$idUser = $dData["idUser"];

if($idUser){
    $sql = "SELECT "
}