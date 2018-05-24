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
  `lat` varchar(40) NOT NULL,
  `lng` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campus_assoc` (`campus_assoc`),
  CONSTRAINT `poi_ibfk_1` FOREIGN KEY (`campus_assoc`) REFERENCES `campus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `poi` VALUES (1,'ChIJQeIbU2BuQUYRr_lOy1UB1bw','Rema 1000','Food Store','poi',0,1,'/img/shop.svg','59.914039','10.756723'),(2,'ChIJKabHf2VuQUYRb7U7kVuQl-M','BarVulkan','Drinks Bar','poi',0,2,'/img/food.svg','59.922904','10.752411'),(3,'ChIJafNVh2JuQUYRS87dbb5wUrM','Oslo Domkirke','Monument','poi',0,3,'/img/monument.svg','59.912676','10.746453'),(4,'ChIJLSeTf2VuQUYRw9V12gQwpqU','Mathallen','Food','poi',0,2,'/img/food.svg','59.922217','10.752046'),(5,'ChIJf9hZu2VuQUYRiu4EGiwGEoQ','Døgnvill Burger','Burger','poi',0,2,'/img/food.svg','59.921711','10.751671'),(6,'ChIJYVkeFWZuQUYRVl4NRBw8asQ','Lille Asia Sushi','Sushi Asian','poi',0,2,'/img/food.svg','59.921716','10.757149'),(7,'ChIJ18i8aWZuQUYR3I6OulZK07o','Vinmonopolet','Alcohol','poi',0,2,'/img/vinmonopolet.png','59.921167','10.757153'),(8,'ChIJ69po0mBuQUYRW23gdKIqjSc','Legevakten Oslo','Emergency','poi',0,1,'/img/hospital.svg','59.916795','10.758975'),(9,'ChIJWcbDcGBuQUYRX3-G130GXNs','Dattera til Hagen','Drinks Bar','poi',0,1,'/img/drink.svg','59.913269','10.760133'),(10,'ChIJ-XAFPmduQUYRxIZJGLteyWo','Schouskjelleren Mikrobryggeri','Drinks Bar','poi',0,1,'/img/drink.svg','59.918427','10.760252'),(11,'ChIJK_v8GGduQUYRraQO5m9mUu4','Nedre Løkka','Drinks Bar','poi',0,1,'/img/drink.svg','59.918750','10.759228'),(12,'ChIJFRLUbmduQUYRzXOGF7yq8ew','Trattoria Populare','Food Drinks Bar','poi',0,1,'/img/food.svg','59.918275','10.759960'),(13,'ChIJbbryrGZuQUYRtz169fSMEG4','Cafe Sara','Food Drinks Bar','poi',0,1,'/img/food.svg','59.917607','10.754149'),(14,'ChIJLaEY3WZuQUYRO8sj9kIsakU','Grünerløkka Minigolfpark','Fun Drinks','poi',0,1,'/img/fun.svg','59.918477','10.758839'),(15,'ChIJ-6UshmVuQUYRMlRXyPvVe2Y','Athletica','Gym','poi',0,2,'/img/gym.svg','59.923149','10.752198'),(16,'ChIJF-WWnWVuQUYRaDM-eOwE7uw','Rema 1000','Food Store','poi',0,2,'/img/food.svg','59.923299','10.751201'),(17,'ChIJcwqGUWBuQUYRtGh9p9xXakk','Grand Pizza & Grill','Streetfood','poi',-13,1,'/img/streetfood.svg','59.913812','10.757069'),(18,'ChIJaTw3F4huQUYRI8KXPzlMp9s','Steen & Strøm Shopping','Shopping Food','poi',0,3,'/img/shop.svg','59.912046','10.743036'),(19,'ChIJEzGM2oluQUYRLYDU6k3Ds7s','Burger King','Streetfood','poi',0,3,'/img/streetfood.svg','59.911630','10.747308'),(20,'ChIJH2tgVX1uQUYRke8NNL5M0G8','MAX Burger','Streetfood','poi',0,3,'/img/streetfood.svg','59.912723','10.741769'),(21,'ChIJ-2HnMYhuQUYRbuE1_p2zuBg','Subway','Streetfood','poi',0,3,'/img/streetfood.svg','59.911598','10.745296'),(22,'ChIJIwSkxmNuQUYRDNH_IwtvBE0','Oslo Bowling','Fun Bar Food','poi',0,1,'/img/fun.svg','59.915880','10.750738');