<?php

class userAccount
{

    private $userID;
    private $accountID;
    protected $balance;
    protected $typeAccount;
    protected $typeChange;
    protected $accountNumber;
    protected $active;
    protected $movements;
    protected $cvu;
    protected $alias;

    public function __construct($userID, $accountID, $balance, $typeAccount, $typeChange, $accountNumber, $active, $cvu, $alias)
    {
        $this->userID = $userID;
        $this->accountID = $accountID;
        $this->balance = $balance;
        $this->typeAccount = $typeAccount;
        $this->typeChange = $typeChange;
        $this->accountNumber = $accountNumber;
        $this->active = $active;
        $this->movements = [];
        $this->cvu = $cvu;
        $this->alias = $alias;
    }



    public function transferir($cantidad, $destino)
    {

        $this->balance = $this->refrescarBalance();
        if ($this->destinoValido($destino)) {
            if (!($cantidad > $this->balance) && ($cantidad > 0)) {
                $detalle = "Se transfirió $this->balance al destino $destino.";
                array_push($this->movements[], new movement($detalle));
                $this->crearMovimiento($detalle);
                $this->transferirDB($destino, $cantidad);
            } else {
                echo json_encode(["success" => false, "error" => "Cantidad insuficiente"]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Destino invalido"]);
        }
    }

    function refrescarBalance()
    {
        require_once '../config/db.php';
        $sql = "SELECT a.balance FROM user INNER JOIN account AS a ON a.idUser = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $this->userID);
        $stmt->execute();

        return $stmt->get_result();
    }

    function destinoValido($destino)
    {
        require_once '../config/db.php';

        $result;
        $sql = "CALL SP_destinoValido(?,?);"; //set=1 si existe, set=0 si !existe
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $destino, $result);
        if (!$stmt->execute()) {
            echo json_encode(["success " => false, "error" => $stmt->error]);
        };

        return $result > 0;
    }

    function transferirDB($destino, $cantidad)
    {
        require_once '../config/db.php';

        $sql = "CALL SP_transferir(?,?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sd", $destino, $cantidad);
        if (!($stmt->execute())) {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }
    }

    function crearMovimiento($detalle)
    {
        require_once '../config/db.php';

        $sql = "INSERT INTO movement (idAccount, detail) VALUES (?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("is", $this->accountID, $detalle);
        if (!($stmt->execute())) {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }
    }

}
