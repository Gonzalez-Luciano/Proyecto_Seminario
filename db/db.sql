CREATE DATABASE IF NOT EXISTS `proyecto-seminario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto-seminario`;

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `pass` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`idUser`),
  KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user_data` (
  `idUserData` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `firstName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dni` varchar(12) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `province` varchar(30) DEFAULT NULL,
  `image` VARCHAR(1000),
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idUserData`),
  KEY `idUser` (`idUser`),
  KEY `dni` (`dni`),
  KEY `active` (`active`),
  CONSTRAINT `user_data_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `type`(
    idType INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS `changeType`(
    idChangeType INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS `NetBank`(
    `idNetBank` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS `accountType`(
    idAccountType INT AUTO_INCREMENT PRIMARY KEY,
    idChangeType INT NOT NULL,
    idType INT NOT NULL,
    description VARCHAR(30), /*será vacío inicialmente para poder asignar la descripción según type y changetype*/
    FOREIGN KEY (idType) REFERENCES `type` (idType),
    FOREIGN KEY (idChangeType) REFERENCES `changeType` (idChangeType)
);

CREATE TABLE IF NOT EXISTS `account`(
    idAccount INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idAccountType INT NOT NULL, 
    balance FLOAT NOT NULL, 
    noAccount VARCHAR(15) NOT NULL,
    cvu VARCHAR(21) NOT NULL,
    alias VARCHAR(50) NOT NULL,
    active BOOLEAN,
    FOREIGN KEY (idUser) REFERENCES `user`(idUser),
    FOREIGN KEY (idAccountType) REFERENCES `accountType` (idAccountType)
);

CREATE TABLE IF NOT EXISTS `movement`(
    idMovement INT AUTO_INCREMENT PRIMARY KEY,
    idAccountFrom INT NOT NULL,
    idAccountTo INT NOT NULL,
    amount FLOAT NOT NULL,
    transactionDate DATE NOT NULL,
    detail VARCHAR(150) NOT NULL,
    FOREIGN KEY (idAccountFrom) REFERENCES `account` (idAccount),
    FOREIGN KEY (idAccountTo) REFERENCES `account` (idAccount)   
);

CREATE TABLE IF NOT EXISTS `cards`(
    idCard INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    idAccount INT NOT NULL,
    idNetBank INT NOT NULL,
    cardNumber VARCHAR(16) NOT NULL,
    available BOOLEAN,
    international BOOLEAN,
    FOREIGN KEY (idUser) REFERENCES `user` (idUser),
    FOREIGN KEY (idAccount) REFERENCES `account` (idAccount),
    FOREIGN KEY (idNetBank) REFERENCES `NetBank` (idNetBank)
);

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE IF NOT EXISTS `crearUsuario`(
    puserName VARCHAR(50), 
    pPass VARCHAR(150),
    pEmail VARCHAR(100),
    OUT pidUser INT,
    pfirstName VARCHAR(30),
    plastName VARCHAR(30),
    pDni VARCHAR(12),
    pAdress VARCHAR(100),
    pCity VARCHAR(30),
    pProvince VARCHAR(30)
)
BEGIN 
    INSERT INTO user (username, pass, email) VALUES (puserName, pPass, pEmail);
    SET pidUser = LAST_INSERT_ID();
    INSERT INTO user_data (idUser, firstName, lastName, dni, address, city, province,image, active) 
    VALUES (pidUser, pfirstName, plastName, pDni, pAdress, pCity, pProvince,"default", 1);
END ;;
DELIMITER ;

INSERT INTO `type` (DESCRIPTION) VALUES ("Cuenta corriente");

INSERT INTO `changeType` (DESCRIPTION) VALUES("dolares");

INSERT INTO `accountType` (idChangeType, idType, description) VALUES(
	2,
	1,
	"Caja de Ahorro en U$D"
);

INSERT INTO `account` (idUser,idAccountType, balance, noAccount, cvu, alias) VALUES (
	7,
	3,
	340,
	"61716712",
	"987654321123456789023",
	"dado.ovulo"
) 

SELECT a.idAccount, a.balance, a.noAccount, at.description 
FROM account as a 
JOIN accountType AS AT 
ON a.idAccountType=at.idAccountType 
WHERE a.idUser = 7;

INSERT INTO `account` (idUser, idAccountType, balance, noAccount,cvu,alias) VALUES(
	7,
	(SELECT idAccountType FROM `accountType` WHERE idType=1 AND idChangeType=2),
	0,
	"123456789",
	"147258369147258369025",
	"duda.nube"
)
