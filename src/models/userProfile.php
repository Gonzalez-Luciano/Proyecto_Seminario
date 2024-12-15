<?php

class userProfile{

    protected $name;
    protected $surname;
    protected $dni;
    protected $adress;
    protected $city;
    protected $province;


    public function __construct($name,$surname,$dni,$adress,$city,$province){
        $this->name = $name;
        $this->surname = $surname;
        $this->dni = $dni;
        $this->adress = $adress;
        $this->city = $city;
        $this->province = $province;
    }

    
}