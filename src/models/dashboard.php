<?php

if($_SERVER['REQUEST_METHOD' === 'POST']){
    $eData = file_get_contents('php://input');
    $dData  = json_decode($eData, true);

    $idUser = $dData['idUser'] ?? null;
    $username = $dData['username'] ?? null;

    if($idUser && $username){
        $user = new user($idUser, sqlProfile($idUser), sqlAccount($idUser),sqlCards($idUser));

        echo json_encode($user);

    }


}

function sqlProfile($idUser){
    include_once "../config/db.php";

    $sql = "SELECT * FROM user_data WHERE idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$idUser);
    $stmt->execute();
    $resultSql = $stmt->get_result();
    $profile = null;
    if($resultSql->num_rows>0){
        $row = $resultSql->fetch_assoc();
        $profile = new userProfile(
            $row['firstName'],
            $row['lastName'],
            $row['dni'],
            $row['address'],
            $row['city'], 
            $row['province']);
    }
    
    return $profile;
}


function sqlAccount($idUser){
    include_once "../config/db.php";
    
    $sql = "SELECT * FROM account WHERE idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$idUser);
    $stmt->execute();
    $resultSql = $stmt->get_result();
    $accounts = [];
    if($resultSql->num_rows>0){
        while($row = $resultSql->fetch_assoc()){
            
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
            array_push($accounts,$account);
        }
    }
    return $accounts;
}

function sqlCards($idUser){
    include_once "../config/db.php";

    $cards = [];
    $sql = "SELECT c.idAccount, c.cardNumber,c.idNetBank,c.available, c.international, a.noAccount, nb.name
    FROM account AS a 
    INNER JOIN cards AS c ON a.idAccount = c.idAccount
    INNER JOIN NetBank AS nb ON c.idNetBank = nb.idNetBank
    WHERE a.idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$idUser);
    $stmt->execute();
    $resultSql = $stmt->get_result();
    if($resultSql->num_rows > 0){
        $row = $resultSql->fetch_assoc();
        $objA = new stdClass();
        $objNB = new stdClass();
        $objA->idAccount = $row['idAccount'];
        $objA->noAccount = $row['noAccount'];
        $objNB->idNetBank = $row['idNetBank'];
        $objNB->name = $row['name'];
        
        $card = new Card(
            $objA,
            $row['cardNumber'],
            $row['available'],
            $row['international'],
            $objNB
        );
        array_push($cards, $card);
    }

    return $cards;
}

function sqlTypeAccount($id){
    include_once "../config/db.php";

    $sql = "SELECT `description` FROM `type` WHERE idType = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$id);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $obj = new stdClass();
        $obj->idType = $id;
        $obj->Type = $row['description'];
    }
        return $obj;
}

function sqlTypeChange($id){
    include_once "../config/db.php";

    $sql = "SELECT `description` FROM `changeType` WHERE idChangeType = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$id);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $obj = new stdClass();
        $obj->idChangeType = $id;
        $obj->ChangeType = $row['description'];
    }
        return $obj;
}