<?php

class Card{

    protected $account;
    protected $cardNumber;
    protected $available;
    protected $international;
    protected $netBank;

    public function __construct($account, $cardNumber, $available, $international, $netBank)
    {
        $this->account = $account;        
        $this->cardNumber = $cardNumber;
        $this->available = $available;
        $this->international = $international;        
        $this->netBank = $netBank;       
    }

    
}