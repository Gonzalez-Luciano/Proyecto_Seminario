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
    idNetBank INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
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
    idAccount INT NOT NULL,
    detail VARCHAR(150) NOT NULL,
    FOREIGN KEY (idAccount) REFERENCES `account` (idAccount)   
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
    INSERT INTO user_data (idUser, firstName, lastName, dni, address, city, province, active) 
    VALUES (pidUser, pfirstName, plastName, pDni, pAdress, pCity, pProvince, 1);
END ;;
DELIMITER ;





-- CREATE DATABASE  IF NOT EXISTS `proyecto-seminario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
-- USE `proyecto-seminario`;
-- -- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
-- --
-- -- Host: localhost    Database: proyecto-seminario
-- -- ------------------------------------------------------
-- -- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

-- DROP TABLE IF EXISTS `user`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `user` (
--   `idUser` int NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) NOT NULL,
--   `pass` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
--   `email` varchar(100) NOT NULL,
--   PRIMARY KEY (`idUser`),
--   KEY `username` (`username`),
--   KEY `email` (`email`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_data`
--

-- DROP TABLE IF EXISTS `user_data`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `user_data` (
--   `idUserData` int NOT NULL AUTO_INCREMENT,
--   `idUser` int NOT NULL,
--   `firstName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
--   `lastName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
--   `dni` varchar(12) DEFAULT NULL,
--   `address` varchar(100) DEFAULT NULL,
--   `city` varchar(30) DEFAULT NULL,
--   `province` varchar(30) DEFAULT NULL,
--   `active` tinyint(1) DEFAULT '1',
--   PRIMARY KEY (`idUserData`),
--   KEY `idUser` (`idUser`),
--   KEY `dni` (`dni`),
--   KEY `active` (`active`),
--   CONSTRAINT `user_data_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE
-- ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'proyecto-seminario'
--
/*!50003 DROP PROCEDURE IF EXISTS `crearUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
-- DELIMITER ;;
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `crearUsuario`(puserName VARCHAR(50), pPass VARCHAR(150),
-- pEmail VARCHAR(100),OUT pidUser INT, pfirstName VARCHAR(30), plastName VARCHAR(30),
--  pDni VARCHAR(12), pAdress VARCHAR(100), pCity VARCHAR(30), pProvince VARCHAR(30))
-- BEGIN 

-- 		INSERT INTO user (username, pass, email) VALUES (puserName, pPass, pEmail);
-- 		SET pidUser = LAST_INSERT_ID();
-- 		INSERT INTO user_data (idUser, firstName, lastName, dni, address, city, province, ACTIVE) VALUES (pidUser, pfirstName, plastName, pDni, pAdress, pCity, pProvince, 1);
	
	
-- 	 END ;;
-- DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-29 19:39:22