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
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `campus` VALUES (1,'ChIJ3UCFx2BuQUYROgQ5yTKAm6E','Fjerdingen','Christian Kroghs Gate 32','school','/img/fjerdingen.jpg','/img/westerdals-marker.png',59.916174,10.76021),(2,'ChIJRa81lmRuQUYR3l1Nit90vao','Vulkan','Vulkan 19','school','/img/vulkan.jpg','/img/westerdals-marker.png',59.923339,10.752497),(3,'ChIJ-wIZN4huQUYR5ZhO0YexXl0','Kvadraturen','Kirkegata 24','school','/img/kvadraturen.jpg','/img/kristiania-marker.png',59.911087,10.745956);
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
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campus_assoc` (`campus_assoc`),
  CONSTRAINT `poi_ibfk_1` FOREIGN KEY (`campus_assoc`) REFERENCES `campus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `poi` VALUES (1,'ChIJQeIbU2BuQUYRr_lOy1UB1bw','Rema 1000','Food Store','poi',1,1,'/img/shop.png',59.914039,10.756723),(2,'ChIJKabHf2VuQUYRb7U7kVuQl-M','BarVulkan','Drinks Bar','poi',2,2,'/img/food.png',59.922904,10.752411),(3,'ChIJafNVh2JuQUYRS87dbb5wUrM','Oslo Domkirke','Monument','poi',0,3,'/img/monument.png',59.912676,10.746453),(4,'ChIJLSeTf2VuQUYRw9V12gQwpqU','Mathallen','Food','poi',1,2,'/img/food.png',59.922217,10.752046),(5,'ChIJf9hZu2VuQUYRiu4EGiwGEoQ','Døgnvill Burger','Burger','poi',1,2,'/img/food.png',59.921711,10.751671),(6,'ChIJYVkeFWZuQUYRVl4NRBw8asQ','Lille Asia Sushi','Sushi Asian','poi',0,2,'/img/food.png',59.921716,10.757149),(7,'ChIJ18i8aWZuQUYR3I6OulZK07o','Vinmonopolet','Alcohol','poi',0,2,'/img/vinmonopolet.png',59.921167,10.757153),(8,'ChIJ69po0mBuQUYRW23gdKIqjSc','Legevakten Oslo','Emergency','poi',0,1,'/img/hospital.png',59.916795,10.758975),(9,'ChIJWcbDcGBuQUYRX3-G130GXNs','Dattera til Hagen','Drinks Bar','poi',0,1,'/img/drink.png',59.913269,10.760133),(10,'ChIJ-XAFPmduQUYRxIZJGLteyWo','Schouskjelleren','Drinks Bar','poi',0,1,'/img/drink.png',59.918427,10.760252),(11,'ChIJK_v8GGduQUYRraQO5m9mUu4','Nedre Løkka','Drinks Bar','poi',0,1,'/img/drink.png',59.91875,10.759228),(12,'ChIJFRLUbmduQUYRzXOGF7yq8ew','Trattoria Populare','Food Drinks Bar','poi',0,1,'/img/food.png',59.918275,10.75996),(13,'ChIJbbryrGZuQUYRtz169fSMEG4','Cafe Sara','Food Drinks Bar','poi',0,1,'/img/food.png',59.917607,10.754149),(14,'ChIJLaEY3WZuQUYRO8sj9kIsakU','Grünerløkka Minigolfpark','Fun Drinks','poi',1,1,'/img/golf.png',59.918477,10.758839),(15,'ChIJ-6UshmVuQUYRMlRXyPvVe2Y','Athletica','Gym','poi',0,2,'/img/gym.png',59.923149,10.752198),(16,'ChIJF-WWnWVuQUYRaDM-eOwE7uw','Rema 1000','Food Store','poi',0,2,'/img/shop.png',59.923299,10.751201),(17,'ChIJcwqGUWBuQUYRtGh9p9xXakk','Grand Pizza & Grill','Streetfood','poi',-13,1,'/img/streetfood.png',59.913812,10.757069),(18,'ChIJEzGM2oluQUYRLYDU6k3Ds7s','Burger King','Streetfood','poi',0,3,'/img/streetfood.png',59.91163,10.747308),(19,'ChIJH2tgVX1uQUYRke8NNL5M0G8','MAX Burger','Streetfood','poi',0,3,'/img/streetfood.png',59.912723,10.741769),(20,'ChIJ-2HnMYhuQUYRbuE1_p2zuBg','Subway','Streetfood','poi',0,3,'/img/food.png',59.911598,10.745296),(21,'ChIJIwSkxmNuQUYRDNH_IwtvBE0','Oslo Bowling','Fun Bar Food','poi',1,1,'/img/bowling.png',59.91588,10.750738),(22,'ChIJe6mHFYhuQUYR0ercncRkgCM','Kvadrat Salat','Food','poi',1,3,'/img/food.png',59.911283,10.743448),(23,'ChIJ374wF4huQUYRC8bBW2kyWTk','Matkroken','Food Store','poi',0,3,'/img/shop.png',59.912044,10.743034),(24,'ChIJb4OV4mduQUYRks5TEOeXZGo','Sofienbergparken','Park','poi',1,2,'/img/park.png',59.923103,10.763544);