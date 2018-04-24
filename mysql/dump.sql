/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poi` (
  `poi_id` int(11) NOT NULL AUTO_INCREMENT,
  `poi_placeID` varchar(40) DEFAULT NULL,
  `poi_tags` varchar(40) DEFAULT NULL,
  `poi_vote` int(11) DEFAULT NULL,
  PRIMARY KEY (`poi_id`),
  UNIQUE KEY `poi_placeID` (`poi_placeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `poi` VALUES (1,'ChIJ3UCFx2BuQUYROgQ5yTKAm6E','Campus Westerdals',94),(2,'ChIJRa81lmRuQUYR3l1Nit90vao','Campus Vulkan Nord',9),(3,'ChIJ-wIZN4huQUYR5ZhO0YexXl0','Campus Kvadraturen',5);
