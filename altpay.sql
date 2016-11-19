-- MySQL dump 10.13  Distrib 5.7.15, for Linux (x86_64)
--
-- Host: localhost    Database: altpay
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `altpay`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `altpay` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `altpay`;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `deviceid` int(11) NOT NULL AUTO_INCREMENT,
  `devicetype` varchar(255) DEFAULT NULL,
  `devicename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`deviceid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'smartphone','Note 5');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `accounttype` varchar(255) DEFAULT NULL,
  `magnetid` varchar(255) DEFAULT NULL,
  `currency` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES ('486ff340-ae28-11e6-bda6-9dc1ec6cec91','josh@finhacks.com',NULL,'Josh','Williams','http://www.whatever.com/somethingelse.jpg','0','486ff341-ae28-11e6-bda6-9dc1ec6cec91',5000.00),('ce3869e0-ae27-11e6-a906-832f1c9abfc5','greg@finhacks.com',NULL,'Greg','Wood','http://www.whatever.com/something.jpg','0','ce3890f0-ae27-11e6-a906-832f1c9abfc5',5000.00);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_devices`
--

DROP TABLE IF EXISTS `profile_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_devices` (
  `profileid` varchar(255) NOT NULL,
  `deviceid` int(11) NOT NULL,
  PRIMARY KEY (`profileid`,`deviceid`),
  KEY `profileid` (`profileid`),
  KEY `deviceid` (`deviceid`),
  CONSTRAINT `profile_devices_ibfk_1` FOREIGN KEY (`profileid`) REFERENCES `profile` (`id`),
  CONSTRAINT `profile_devices_ibfk_2` FOREIGN KEY (`deviceid`) REFERENCES `devices` (`deviceid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_devices`
--

LOCK TABLES `profile_devices` WRITE;
/*!40000 ALTER TABLE `profile_devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_devices` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-19  7:00:17
