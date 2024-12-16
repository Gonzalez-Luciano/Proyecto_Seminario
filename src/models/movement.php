<?php

class Movement {

    public $idMovement;
    public $username;
    public $amount;
    public $transactionDate;
    public $image;
    public $type;

    public function __construct($idMovement, $username, $amount, $transactionDate, $image, $type) {
        $this->idMovement = $idMovement;
        $this->username = $username;
        $this->amount = $amount;
        $this->transactionDate = $transactionDate;
        $this->image = $image;
        $this->type = $type;
    }
}
