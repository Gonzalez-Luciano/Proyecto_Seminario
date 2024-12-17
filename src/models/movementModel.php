<?php
header('Content-Type: application/json');
require_once '../config/db.php';
require_once 'movement.php';

// Detectar el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    if (!is_array($data) || !isset($data['userId'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos o faltantes.']);
        exit;
    }

    $iUserId = $data['userId'];
    $isGetAll = $data['getAll'];
    $vMovements = array();

    // Obtener todos los usuarios
    $sql = "
    SELECT movs.* FROM (
        (SELECT m.idMovement as 'idMovement', myAccount.noAccount as 'noAccount', t.idChangeType AS 'chargeType', CONCAT(ud.firstName, ' ', ud.lastName) as 'username', m.amount as 'amount',
        m.transactionDate as 'transactionDate', ud.image as 'image', 0 AS 'type'
        FROM `movement` m 
        JOIN `account` a ON m.idAccountTo = a.idAccount
        JOIN `account` myAccount ON m.idAccountFrom = myAccount.idAccount
        JOIN `accounttype` t ON myAccount.idAccountType = t.idAccountType
        JOIN `user` u ON a.idUser = u.idUser
        JOIN `user_data` ud ON u.idUser = ud.idUser
        WHERE m.idAccountFrom IN (SELECT a.idAccount FROM `account` a WHERE a.idUser = ?))
        UNION
        (SELECT m.idMovement as 'idMovement', myAccount.noAccount as 'noAccount', t.idChangeType AS 'chargeType', CONCAT(ud.firstName, ' ', ud.lastName) as 'username', m.amount as 'amount',
        m.transactionDate as 'transactionDate', ud.image as 'image', 1 AS 'type'
        FROM `movement` m 
        JOIN `account` a ON m.idAccountFrom = a.idAccount
        JOIN `account` myAccount ON m.idAccountTo = myAccount.idAccount
        JOIN `accounttype` t ON myAccount.idAccountType = t.idAccountType
        JOIN `user` u ON a.idUser = u.idUser
        JOIN `user_data` ud ON u.idUser = ud.idUser
        WHERE m.idAccountTo IN (SELECT a.idAccount FROM `account` a WHERE a.idUser = ?))
    ) as movs
    ORDER BY movs.transactionDate DESC " .
    ($isGetAll ? ";" : " LIMIT 3; ");
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $iUserId, $iUserId);
    $stmt->execute();

    // Definir las variables para bind_result antes de ejecutar el fetch
    $stmt->bind_result($idMovement, $noAccount, $chargeType, $username, $amount, $transactionDate, $image, $type);

    // Ahora puedes recorrer los resultados correctamente
    while ($stmt->fetch()) {
        $oMovement = new Movement(
            $idMovement,
            $noAccount,
            $chargeType,
            $username,
            $amount,
            $transactionDate,
            $image,
            $type
        );
        array_push($vMovements, $oMovement);
    }

    echo json_encode($vMovements);
}

$conn->close();
?>