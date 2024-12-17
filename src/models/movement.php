<?php

class Movement {

    public $idMovement;
    public $noAccount;
    public $chargeType;
    public $username;
    public $amount;
    public $transactionDate;
    public $image;
    public $type;

    public function __construct($idMovement, $noAccount, $chargeType, $username, $amount, $transactionDate, $image, $type) {
        $this->idMovement = $idMovement;
        $this->noAccount = $noAccount;
        $this->chargeType = $chargeType;
        $this->username = $username;
        $this->amount = $amount;
        $this->transactionDate = $transactionDate;
        $this->image = $image;
        $this->type = $type;
    }
}
