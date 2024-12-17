<?php

class Movement {

    public $idMovement;
    public $noAccount;
    public $username;
    public $amount;
    public $transactionDate;
    public $image;
    public $type;

    public function __construct($idMovement, $noAccount, $username, $amount, $transactionDate, $image, $type) {
        $this->idMovement = $idMovement;
        $this->noAccount = $noAccount;
        $this->username = $username;
        $this->amount = $amount;
        $this->transactionDate = $transactionDate;
        $this->image = $image;
        $this->type = $type;
    }
}
