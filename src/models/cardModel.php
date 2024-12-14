<?php

class Card
{

    protected $idAccount;
    protected $cardNumber;
    protected $available;
    protected $international;
    protected $netBank;

    public function __construct($idAccount, $cardNumber, $available, $international, $netBank)
    {
        $this->idAccount = $idAccount;
        $this->cardNumber = $cardNumber;
        $this->available = $available;
        $this->international = $international;
        $this->netBank = $netBank;
    }
}
