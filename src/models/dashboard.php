<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

include "./dbModel.php";
include "./user.php";

$method = $_SERVER['REQUEST_METHOD'];
$eData = file_get_contents('php://input');
$dData = json_decode($eData, true);

switch ($method) {
    case 'POST':

        $idUser = $dData['idUser'] ?? null;
        $username = $dData['username'] ?? null;

        if ($idUser && $username) {
            $user = new user($idUser, sqlProfile($idUser), sqlAccount($idUser), sqlCards($idUser));

            echo json_encode(array(
                "result" => "success",
                "user" => array(
                    "profile" => $user->get_profile(),
                    "accounts" => $user->get_accounts(),
                    "cars" => $user->get_cards()
                )
            ));
        } else {
            echo json_encode(array(
                "result" => "fail",
                "user" => null
            ));
        }
        break;

    case 'PUT':

        $idUser = $dData['idUser'] ?? null;
        $type = $dData['type'] ?? null;
        $typeChange = $dData['typeChange'] ?? null;
        if ($idUser && $type && $typeChange) {
            $response = sqlNewAccount($idUser, $type, $typeChange);
        }

        echo json_encode(array($response));
        break;
}


function sqlProfile($idUser)
{
    include_once "../config/db.php";

    $sql = "SELECT * FROM user_data WHERE idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUser);
    $stmt->execute();
    $resultSql = $stmt->get_result();
    $profile = null;
    if ($resultSql->num_rows > 0) {
        $row = $resultSql->fetch_assoc();
        $profile = new userProfile(
            $row['firstName'],
            $row['lastName'],
            $row['dni'],
            $row['address'],
            $row['city'],
            $row['province']
        );
    }

    return $profile;
}


function sqlAccount($idUser)
{
    include_once "../config/db.php";

    $sql = "SELECT * FROM account WHERE idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUser);
    $stmt->execute();
    $resultSql = $stmt->get_result();
    $accounts = [];
    if ($resultSql->num_rows > 0) {
        while ($row = $resultSql->fetch_assoc()) {

            $typeAccount = sqlTypeAccount($row['idType']);
            $typeChange = sqlTypeChange($row['idChangeType']);
            $account = new userAccount(
                $row['idUser'],
                $row['idAccount'],
                $row['balance'],
                $typeAccount,
                $typeChange,
                $row['noAccount'],
                $row['active'],
                $row['cvu'],
                $row['alias']
            );
            array_push($accounts, $account);
        }
    }
    return $accounts;
}

function sqlCards($idUser)
{
    include_once "../config/db.php";

    $cards = [];
    $sql = "SELECT c.idAccount, c.cardNumber,c.idNetBank,c.available, c.international, a.noAccount, nb.name
    FROM account AS a 
    INNER JOIN cards AS c ON a.idAccount = c.idAccount
    INNER JOIN NetBank AS nb ON c.idNetBank = nb.idNetBank
    WHERE a.idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUser);
    $stmt->execute();
    $resultSql = $stmt->get_result();
    if ($resultSql->num_rows > 0) {

        while ($row = $resultSql->fetch_assoc()) {
            $card = new Card(
                $row['idAccount'],
                $row['cardNumber'],
                $row['available'],
                $row['international'],
                $row['name']
            );
            array_push($cards, $card);
        };
    }

    return $cards;
}

function sqlTypeAccount($id)
{
    include_once "../config/db.php";

    $sql = "SELECT `description` FROM `type` WHERE idType = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $obj = new stdClass();
        $obj->idType = $id;
        $obj->Type = $row['description'];
    }
    return $obj;
}

function sqlTypeChange($id)
{
    include_once "../config/db.php";

    $sql = "SELECT `description` FROM `changeType` WHERE idChangeType = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $obj = new stdClass();
        $obj->idChangeType = $id;
        $obj->ChangeType = $row['description'];
    }
    return $obj;
}

function sqlNewAccount($idUser, $type, $typeChange)
{
    include_once "../config/db.php";

    $response;
    $typeAccount = $type . " en " . $typeChange;
    $sql = "CALL crearCuenta(?,?,?,?,?,?,@idAccount)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param(
            "iifsss",
            $idUser,
            $objectModel->accountType[$typeAccount],
            0.0,
            "6000000",
            "123123123123123123123",
            "COMA.COPA.BOCA"
        );

        if ($stmt->execute()) {

            $result = $conn->query("SELECT @idAccount as idAccount");
            $row = $result->fetch_assoc();
            $idAccount = $row['idAccount'];
            if ($idAccount) {
                $response = array(
                    "result" => "Success"
                );
            } else {
                $response = array(
                    "result" => "Error creating new account"
                );
            }
        } else {
            $response = array(
                "result" => "Failed to execute statement: " . $stmt->error
            );
        }
    } else {
        $response = array(
            "result" => "Error in preparing statement"
        );
    }

    return $response;
}
