/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placeID` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `img_path` varchar(40) DEFAULT NULL,
  `icon_path` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `campus` VALUES (1,'ChIJ3UCFx2BuQUYROgQ5yTKAm6E','Fjerdingen','Christian Kroghs Gate 32','school','/img/fjerdingen.jpg','/img/westerdals.png'),(2,'ChIJRa81lmRuQUYR3l1Nit90vao','Vulkan','Vulkan 19','school','/img/vulkan.jpg','/img/westerdals.png'),(3,'ChIJ-wIZN4huQUYR5ZhO0YexXl0','Kvadraturen','Kirkegata 24','school','/img/kvadraturen.jpg','/img/kristiania.png');
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placeID` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `tags` varchar(40) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `vote` int(11) DEFAULT NULL,
  `campus_assoc` int(11) NOT NULL,
  `icon_path` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campus_assoc` (`campus_assoc`),
  CONSTRAINT `poi_ibfk_1` FOREIGN KEY (`campus_assoc`) REFERENCES `campus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `poi` VALUES (1,'ChIJQeIbU2BuQUYRr_lOy1UB1bw','Rema1000 Fjerdingen','Rema1000','poi',89,1,'/img/food.png'),(2,'ChIJKabHf2VuQUYRb7U7kVuQl-M','BarVulkan Vulkan','Drinks Bar','poi',9,2,'/img/food.png'),(3,'ChIJafNVh2JuQUYRS87dbb5wUrM','OsloDomkirke Kvadraturen','Kirke','poi',5,3,'/img/food.png'),(4,'ChIJLSeTf2VuQUYRw9V12gQwpqU','Mathallen','food','poi',10,2,'/img/food.png'),(5,'ChIJf9hZu2VuQUYRiu4EGiwGEoQ','Døgnvill Burger','Burger','poi',11,2,'/img/food.png'),(6,'ChIJYVkeFWZuQUYRVl4NRBw8asQ','Lille Asia Sushi','Sushi Asian','poi',11,2,'/img/food.png'),(7,'ChIJ18i8aWZuQUYR3I6OulZK07o','Vinmonopolet','Alcohol','poi',9,2,'/img/vinmonopolet.png'),(8,'ChIJ69po0mBuQUYRW23gdKIqjSc','Legevakten Oslo','Hjelp','poi',89,1,'/img/health.png'),(9,'ChIJWcbDcGBuQUYRX3-G130GXNs','Dattera til Hagen','Drinks Bar','poi',88,1,'/img/drink.png'),(10,'ChIJ-XAFPmduQUYRxIZJGLteyWo','Schouskjelleren Mikrobryggeri','Drinks Bar','poi',89,1,'/img/drink.png'),(11,'ChIJK_v8GGduQUYRraQO5m9mUu4','Nedre Løkka','Drinks Bar','poi',89,1,'/img/drink.png'),(12,'ChIJFRLUbmduQUYRzXOGF7yq8ew','Trattoria Populare','Food Drinks Bar','poi',89,1,'/img/food.png'),(13,'ChIJbbryrGZuQUYRtz169fSMEG4','Cafe Sara','Food Drinks Bar','poi',89,1,'/img/food.png'),(14,'ChIJLaEY3WZuQUYRO8sj9kIsakU','Grünerløkka Minigolfpark','Fun Drinks','poi',89,1,'/img/fun.png');