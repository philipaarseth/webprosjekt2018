/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus` (
  `campus_id` int(11) NOT NULL AUTO_INCREMENT,
  `campus_placeID` varchar(40) DEFAULT NULL,
  `campus_name` varchar(40) DEFAULT NULL,
  `campus_address` varchar(40) DEFAULT NULL,
  `campus_img_path` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `campus` VALUES (1,'ChIJ3UCFx2BuQUYROgQ5yTKAm6E','Fjerdingen','Christian Kroghs Gate 32','img/fjerdingen.jpg'),(2,'ChIJRa81lmRuQUYR3l1Nit90vao','Vulkan','Vulkan 19','img/vulkan.jpg'),(3,'ChIJ-wIZN4huQUYR5ZhO0YexXl0','Kvadraturen','Kirkegata 24','img/kvadraturen.jpg');
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poi` (
  `poi_id` int(11) NOT NULL AUTO_INCREMENT,
  `poi_placeID` varchar(40) DEFAULT NULL,
  `poi_tags` varchar(40) DEFAULT NULL,
  `poi_type` varchar(40) DEFAULT NULL,
  `poi_vote` int(11) DEFAULT NULL,
  `poi_campus_assoc` int(11) NOT NULL,
  `poi_img_path` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`poi_id`),
  KEY `poi_campus_assoc` (`poi_campus_assoc`),
  CONSTRAINT `poi_ibfk_1` FOREIGN KEY (`poi_campus_assoc`) REFERENCES `campus` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `poi` VALUES (1,'ChIJQeIbU2BuQUYRr_lOy1UB1bw','Rema1000 Fjerdingen','food',89,1,'img/food.png'),(2,'ChIJKabHf2VuQUYRb7U7kVuQl-M','BarVulkan Vulkan','social',9,2,'img/food.png'),(3,'ChIJafNVh2JuQUYRS87dbb5wUrM','OsloDomkirke Kvadraturen','social',5,3,'img/food.png');