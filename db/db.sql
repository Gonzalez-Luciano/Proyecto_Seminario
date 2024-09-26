CREATE DATABASE IF NOT EXISTS wallet_db;

USE wallet_db;

CREATE TABLE IF NOT EXISTS user(
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS user_data(
    idUserData INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(40) NOT NULL,
    dni VARCHAR(12) NOT NULL,
    adress VARCHAR(100) NOT NULL,
    city VARCHAR(30) NOT NULL,
    province VARCHAR(30) NOT NULL,
    active boolean,
    FOREIGN KEY (idUser) REFERENCES user (idUser) 
);
--no utilizo constraint ya que podemos llegar a modificar llegado el caso

CREATE TABLE IF NOT EXISTS cards(
    idCard INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idAcount INT NOT NULL,
    idNetBank INT NOT NULL,
    cardNumber VARCHAR(16) NOT NULL,
    available boolean,
    international boolean,
    FOREIGN KEY (idUser) REFERENCES user (idUser),
    FOREIGN KEY (idAcount) REFERENCES acount (idAcount),
    FOREIGN KEY (idNetBank) REFERENCES NetBank (idNetBank)
);

CREATE TABLE IF NOT EXISTS NetBank(
    idNetBank INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS acount(
    idAcount INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idAcountType INT NOT NULL, 
    balance FLOAT NOT NULL, 
    noAcount VARCHAR(15) NOT NULL,
    cvu VARCHAR(21) NOT NULL,
    alias VARCHAR(50) NOT NULL,
    active boolean,
    FOREIGN KEY (idUser) REFERENCES user(idUser),
    FOREIGN KEY (idAcountType) REFERENCES acountType (idAcountType)
)

CREATE TABLE IF NOT EXISTS acountType(
    idAcountType INT AUTO_INCREMENT PRIMARY KEY,
    idChangeType INT NOT NULL,
    idType INT NOT NULL,
    description VARCHAR(30), --será vacío inicialmente para poder asignar la descripción según type y changetype
    FOREIGN KEY (idType) REFERENCES type (idType),
    FOREIGN KEY (idChangeType) REFERENCES changeType (idChangeType)
);

CREATE TABLE IF NOT EXISTS movement(
    idMovement INT AUTO_INCREMENT PRIMARY KEY,
    idAcount INT NOT NULL,
    detail VARCHAR(150) NOT NULL,
    FOREIGN KEY (idAcount) REFERENCES acount (idAcount)   
);

CREATE TABLE IF NOT EXISTS type(
    idType INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS changeType(
    idChangeType INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(25) NOT NULL
);

