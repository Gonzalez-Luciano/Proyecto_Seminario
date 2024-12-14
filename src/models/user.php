<?php
include "./cardModel.php";
include "./userAccount.php";
include "./userProfile.php";

class user{

    protected $id;
    protected userProfile $profile;
    protected userAccount $accounts;
    protected $cards;

    public function __construct($id, $profile, array $accounts, array $cards){
        $this->id = $id;
        $this->profile = $profile;
        $this->accounts = $accounts;
        $this->cards = $cards;
    }


    function get_profile(){
        return $this->profile;
    }
    function get_accounts(){
        return $this->accounts;
    }
    function get_cards(){
        return $this->cards;
    }
}
