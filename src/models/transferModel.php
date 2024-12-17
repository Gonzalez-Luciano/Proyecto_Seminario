<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/db.php';

$eData = file_get_contents("php://input");
$dData = json_decode($eData, true);

$idCuenta = $dData["idCuenta"];
$Cuenta = $dData["Cuenta"];
$Amount = $dData["Amount"];
$Recipient = $dData["Recipient"];
$action = $dData["action"];
$method = $_SERVER['REQUEST_METHOD'];

if ($idCuenta) {
    switch ($method) {
        case "POST": {
           
            if ($action == "verify") {
                $sqlRecipient = "SELECT a.*, CONCAT(ud.firstName, ' ', ud.lastName) as 'username'  FROM account as a JOIN user_data as ud ON a.idUser = ud.idUser  WHERE cvu = ? OR alias = ?";
                $stmt = $conn->prepare($sqlRecipient);
                if ($stmt) {
                    $stmt->bind_param("ss", $Recipient, $Recipient);
                    $stmt->execute();
                    $resultSql = $stmt->get_result();
                    if ($resultSql->num_rows > 0) {
                        $row = $resultSql->fetch_assoc();
                        //Verifica que los tipos de cuenta sean iguales
                        if ($row["idAccountType"] != $Cuenta["idAccountType"]) {
                            $RecipientResponse = array(
                                "result" => "account type not match"
                            );
                            echo json_encode($RecipientResponse);
                            return;
                        }
                        if ($row["noAccount"] == $Cuenta["noAccount"]) {
                            $RecipientResponse = array(
                                "result" => "account is the same"
                            );
                            echo json_encode($RecipientResponse);
                            return;
                        }
                        $RecipientResponse = array(
                            "result" => "account found",
                            "recipient" => array(
                                "idUser" => $row["idUser"],
                                "idAccountType" => $row["idAccountType"],
                                "username" => $row["username"],
                                "cvu" => $row["cvu"],
                                "alias" => $row["alias"],
                            ),
                        );
                    } else {
                        $RecipientResponse = array(
                            "result" => "account not found"
                        );
                    }

                }
            }

            echo json_encode($RecipientResponse);
            break;

        }
        case "PUT": {
            if ($action == "transfer") {
                // Inicia la transacción
                $conn->begin_transaction();
        
                try {
                    // Buscar cuenta del destinatario
                    $sqlRecipient = "SELECT * FROM account WHERE cvu = ? OR alias = ?";
                    $stmt = $conn->prepare($sqlRecipient);
                    $stmt->bind_param("ss", $Recipient, $Recipient);
                    $stmt->execute();
                    $resultRecipient = $stmt->get_result();
        
                    if ($resultRecipient->num_rows == 0) {
                        throw new Exception("account not found");
                    }
        
                    $rowRecipient = $resultRecipient->fetch_assoc();
        
                    // Verificar fondos suficientes en la cuenta del emisor
                    if ($Cuenta["balance"] < $Amount) {
                        throw new Exception("insufficient funds");
                    }
        
                    // Actualizar balance del emisor (restar)
                    $sqlUpdateSender = "UPDATE account SET balance = balance - ? WHERE idAccount = ?";
                    $stmt = $conn->prepare($sqlUpdateSender);
                    $stmt->bind_param("di", $Amount, $idCuenta);
                    $stmt->execute();
        
                    // Actualizar balance del receptor (sumar)
                    $sqlUpdateRecipient = "UPDATE account SET balance = balance + ? WHERE idAccount = ?";
                    $stmt = $conn->prepare($sqlUpdateRecipient);
                    $stmt->bind_param("di", $Amount, $rowRecipient["idAccount"]);
                    $stmt->execute();
        
                    // Registrar movimiento
                    $sqlInsertMovement = "INSERT INTO movement (idAccountFrom, idAccountTo, amount, transactionDate, detail)
                                          VALUES (?, ?, ?, NOW(), 'Transfer transaction')";
                    $stmt = $conn->prepare($sqlInsertMovement);
                    $stmt->bind_param("iid", $idCuenta, $rowRecipient["idAccount"], $Amount);
                    $stmt->execute();
        
                    // Confirmar transacción
                    $conn->commit();
        
                    // Respuesta exitosa
                    $response = array("result" => "success");
                    echo json_encode($response);
        
                } catch (Exception $e) {
                    // Si algo falla, revertir la transacción
                    $conn->rollback();
                    $response = array("result" => $e->getMessage());
                    echo json_encode($response);
                }
            }
            break;
        }

        // case "PUT": {
        //     $noAccount = mt_rand(1000000, 9999999) . "";
        //     $alias = $cosa[mt_rand(0, 100)] . '.' . $animal[mt_rand(0, 100)] . '.' . $color[mt_rand(0, 20)];
        //     $cvu = '';
        //     for ($i = 0; $i < 21; $i++) {
        //         $cvu .= mt_rand(0, 9);
        //     }

        //     $sql = "INSERT INTO `account` (idUser,idAccountType, balance, noAccount,cvu,alias,active) VALUES (
        //         ?,
        //         (SELECT idAccountType FROM `accountType` WHERE idType=? AND idChangeType=?),
        //         0,
        //         ?,
        //         ?,
        //         ?,
        //         1
        //         )"; //crear los randoms
        //     $stmt = $conn->prepare($sql);
        //     $stmt->bind_param("iiisss", $dData["idUser"], $dData["idType"], $dData["idChangeType"], $noAccount, $cvu, $alias);
        //     if ($stmt->execute()) {
        //         $resultSql = $stmt->affected_rows;
        //         if ($resultSql > 0) {
        //             $response = array(
        //                 "result" => "ok"
        //             );
        //         } else {
        //             $response = array(
        //                 "result" => "failed"
        //             );
        //         }
        //     } else {
        //         $response = array($stmt->error);
        //     }
        //     echo json_encode($response);
        //     break;
        // }

    }
}