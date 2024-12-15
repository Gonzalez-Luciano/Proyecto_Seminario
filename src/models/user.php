<?php


class user{

    protected $id;
    protected userProfile $profile;
    protected userAccount $accounts;
    protected $cards;

    public function __construct($id, $profile, $accounts, $cards){
        $this->id = $id;
        $this->profile = $profile;
        $this->accounts = $accounts;
        $this->cards = $cards;
    }

    
   

}
