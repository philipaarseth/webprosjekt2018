-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 23, 2018 at 01:48 PM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `webpro_`
--
CREATE DATABASE IF NOT EXISTS `heijon17_webpro_` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `heijon17_webpro_`;

-- --------------------------------------------------------

--
-- Table structure for table `campus`
--

CREATE TABLE `campus` (
  `id` int(11) NOT NULL,
  `placeID` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `img_path` varchar(40) DEFAULT NULL,
  `icon_path` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `campus`
--

INSERT INTO `campus` (`id`, `placeID`, `name`, `address`, `type`, `img_path`, `icon_path`) VALUES
(1, 'ChIJ3UCFx2BuQUYROgQ5yTKAm6E', 'Fjerdingen', 'Christian Kroghs Gate 32', 'school', '/img/fjerdingen.jpg', '/img/westerdals.png'),
(2, 'ChIJRa81lmRuQUYR3l1Nit90vao', 'Vulkan', 'Vulkan 19', 'school', '/img/vulkan.jpg', '/img/westerdals.png'),
(3, 'ChIJ-wIZN4huQUYR5ZhO0YexXl0', 'Kvadraturen', 'Kirkegata 24', 'school', '/img/kvadraturen.jpg', '/img/kristiania.png');

-- --------------------------------------------------------

--
-- Table structure for table `poi`
--

CREATE TABLE `poi` (
  `id` int(11) NOT NULL,
  `placeID` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `tags` varchar(40) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `vote` int(11) DEFAULT NULL,
  `campus_assoc` int(11) NOT NULL,
  `icon_path` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `poi`
--

INSERT INTO `poi` (`id`, `placeID`, `name`, `tags`, `type`, `vote`, `campus_assoc`, `icon_path`) VALUES
(1, 'ChIJQeIbU2BuQUYRr_lOy1UB1bw', 'Rema1000 Fjerdingen', 'Rema1000', 'poi', 89, 1, '/img/food.png'),
(2, 'ChIJKabHf2VuQUYRb7U7kVuQl-M', 'BarVulkan Vulkan', 'Drinks Bar', 'poi', 9, 2, '/img/food.png'),
(3, 'ChIJafNVh2JuQUYRS87dbb5wUrM', 'OsloDomkirke Kvadraturen', 'Kirke', 'poi', 5, 3, '/img/food.png'),
(4, 'ChIJLSeTf2VuQUYRw9V12gQwpqU', 'Mathallen', 'food', 'poi', 10, 2, '/img/food.png'),
(5, 'ChIJf9hZu2VuQUYRiu4EGiwGEoQ', 'Døgnvill Burger', 'Burger', 'poi', 10, 2, '/img/food.png'),
(6, 'ChIJYVkeFWZuQUYRVl4NRBw8asQ', 'Lille Asia Sushi', 'Sushi Asian', 'poi', 10, 2, '/img/food.png'),
(7, 'ChIJ18i8aWZuQUYR3I6OulZK07o', 'Vinmonopolet', 'Alcohol', 'poi', 10, 2, '/img/vinmonopolet.png'),
(8, 'ChIJ69po0mBuQUYRW23gdKIqjSc', 'Legevakten Oslo', 'Hjelp', 'poi', 89, 1, '/img/health.png'),
(9, 'ChIJWcbDcGBuQUYRX3-G130GXNs', 'Dattera til Hagen', 'Drinks Bar', 'poi', 88, 1, '/img/drink.png'),
(10, 'ChIJ-XAFPmduQUYRxIZJGLteyWo', 'Schouskjelleren Mikrobryggeri', 'Drinks Bar', 'poi', 89, 1, '/img/drink.png'),
(11, 'ChIJK_v8GGduQUYRraQO5m9mUu4', 'Nedre Løkka', 'Drinks Bar', 'poi', 89, 1, '/img/drink.png'),
(12, 'ChIJFRLUbmduQUYRzXOGF7yq8ew', 'Trattoria Populare', 'Food Drinks Bar', 'poi', 89, 1, '/img/food.png'),
(13, 'ChIJbbryrGZuQUYRtz169fSMEG4', 'Cafe Sara', 'Food Drinks Bar', 'poi', 89, 1, '/img/food.png'),
(14, 'ChIJLaEY3WZuQUYRO8sj9kIsakU', 'Grünerløkka Minigolfpark', 'Fun Drinks', 'poi', 89, 1, '/img/fun.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campus`
--
ALTER TABLE `campus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poi`
--
ALTER TABLE `poi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campus_assoc` (`campus_assoc`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campus`
--
ALTER TABLE `campus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `poi`
--
ALTER TABLE `poi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `poi`
--
ALTER TABLE `poi`
  ADD CONSTRAINT `poi_ibfk_1` FOREIGN KEY (`campus_assoc`) REFERENCES `campus` (`id`);
