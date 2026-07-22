-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: kitchenhop
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `kitchen_id` bigint unsigned NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `hours` decimal(5,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('pending','approved','rejected','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookings_user_id_foreign` (`user_id`),
  KEY `bookings_kitchen_id_date_index` (`kitchen_id`,`date`),
  CONSTRAINT `bookings_kitchen_id_foreign` FOREIGN KEY (`kitchen_id`) REFERENCES `kitchens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,22,22,'2026-08-01','11:00:00','16:00:00',5.00,569.15,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(2,14,2,'2026-07-15','11:00:00','13:00:00',2.00,141.40,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(3,14,5,'2026-08-01','08:00:00','12:00:00',4.00,306.92,'cancelled','2026-07-22 08:13:16','2026-07-22 08:13:16'),(4,18,6,'2026-07-13','10:00:00','14:00:00',4.00,345.44,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(5,14,4,'2026-07-18','08:00:00','10:00:00',2.00,69.00,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(6,19,18,'2026-08-11','10:00:00','13:00:00',3.00,194.52,'cancelled','2026-07-22 08:13:16','2026-07-22 08:13:16'),(7,20,19,'2026-07-13','11:00:00','16:00:00',5.00,269.35,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(8,13,8,'2026-07-26','07:00:00','11:00:00',4.00,162.60,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(9,22,17,'2026-07-27','10:00:00','12:00:00',2.00,155.60,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(10,22,3,'2026-07-25','16:00:00','18:00:00',2.00,153.24,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(11,19,8,'2026-07-26','16:00:00','18:00:00',2.00,81.30,'rejected','2026-07-22 08:13:16','2026-07-22 08:13:16'),(12,15,1,'2026-07-19','09:00:00','14:00:00',5.00,528.10,'rejected','2026-07-22 08:13:16','2026-07-22 08:13:16'),(13,17,17,'2026-07-14','08:00:00','11:00:00',3.00,233.40,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(14,20,3,'2026-07-22','13:00:00','17:00:00',4.00,306.48,'rejected','2026-07-22 08:13:16','2026-07-22 08:13:16'),(15,14,9,'2026-07-20','12:00:00','17:00:00',5.00,395.50,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(16,16,18,'2026-07-22','11:00:00','16:00:00',5.00,324.20,'cancelled','2026-07-22 08:13:16','2026-07-22 08:13:16'),(17,13,19,'2026-07-26','11:00:00','16:00:00',5.00,269.35,'cancelled','2026-07-22 08:13:16','2026-07-22 08:13:16'),(18,13,12,'2026-07-21','12:00:00','17:00:00',5.00,595.15,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(19,21,11,'2026-07-27','13:00:00','17:00:00',4.00,339.60,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(20,14,11,'2026-08-06','11:00:00','17:00:00',6.00,509.40,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(21,18,1,'2026-07-18','10:00:00','16:00:00',6.00,633.72,'approved','2026-07-22 08:13:16','2026-07-22 08:13:16'),(22,19,1,'2026-08-03','15:00:00','18:00:00',3.00,316.86,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16'),(23,18,18,'2026-07-18','15:00:00','20:00:00',5.00,324.20,'rejected','2026-07-22 08:13:16','2026-07-22 08:13:16'),(24,3,8,'2026-07-21','12:00:00','17:00:00',5.00,203.25,'rejected','2026-07-22 08:13:16','2026-07-22 08:13:16'),(25,14,12,'2026-07-27','13:00:00','16:00:00',3.00,357.09,'pending','2026-07-22 08:13:16','2026-07-22 08:13:16');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kitchen_images`
--

DROP TABLE IF EXISTS `kitchen_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kitchen_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kitchen_id` bigint unsigned NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kitchen_images_kitchen_id_foreign` (`kitchen_id`),
  CONSTRAINT `kitchen_images_kitchen_id_foreign` FOREIGN KEY (`kitchen_id`) REFERENCES `kitchens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchen_images`
--

LOCK TABLES `kitchen_images` WRITE;
/*!40000 ALTER TABLE `kitchen_images` DISABLE KEYS */;
INSERT INTO `kitchen_images` VALUES (1,1,'/images/kitchens/seed-01.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(2,2,'/images/kitchens/seed-02.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(3,3,'/images/kitchens/seed-03.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(4,4,'/images/kitchens/seed-04.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(5,5,'/images/kitchens/seed-05.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(6,6,'/images/kitchens/seed-06.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(7,7,'/images/kitchens/seed-07.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(8,8,'/images/kitchens/seed-08.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(9,9,'/images/kitchens/seed-09.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(10,10,'/images/kitchens/seed-10.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(11,11,'/images/kitchens/seed-11.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(12,12,'/images/kitchens/seed-12.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(13,13,'/images/kitchens/seed-13.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(14,14,'/images/kitchens/seed-14.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(15,15,'/images/kitchens/seed-15.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(16,16,'/images/kitchens/seed-16.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(17,17,'/images/kitchens/seed-17.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(18,18,'/images/kitchens/seed-18.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(19,19,'/images/kitchens/seed-19.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(20,20,'/images/kitchens/seed-20.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(21,21,'/images/kitchens/seed-21.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16'),(22,22,'/images/kitchens/seed-22.jpg','2026-07-22 08:13:16','2026-07-22 08:13:16');
/*!40000 ALTER TABLE `kitchen_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kitchens`
--

DROP TABLE IF EXISTS `kitchens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kitchens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hourly_price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kitchens_user_id_foreign` (`user_id`),
  CONSTRAINT `kitchens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchens`
--

LOCK TABLES `kitchens` WRITE;
/*!40000 ALTER TABLE `kitchens` DISABLE KEYS */;
INSERT INTO `kitchens` VALUES (1,4,'Schmidt Ghost Kitchen','Ratione dolore quaerat quidem. Cumque illum ut praesentium maxime et a dolorem. Veritatis expedita ipsam id perspiciatis et libero nostrum. Illum nihil voluptas id aliquam.\n\nNemo in placeat et est assumenda. In nihil quam eum sit eaque. Ad voluptatem similique nobis et ducimus. Sed ex sequi consequuntur ea doloribus.\n\nDolorem voluptatem iusto voluptas qui. Corrupti et aut quam velit fugiat labore similique. Voluptatem impedit quasi voluptate minus. Itaque saepe vel dicta eos est corporis possimus quidem.','9366 Baumbach Way','Stuttgart',105.62,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(2,5,'Leannon Ghost Kitchen','Iste ipsa neque dolorem ratione ut. Eum omnis sequi recusandae saepe enim. Est facilis enim dolores cum quis. Quia nesciunt illum mollitia hic earum reprehenderit possimus.\n\nVoluptas asperiores enim ipsa unde. Ut est qui omnis aut eius natus porro quam. Alias dolor in quo laboriosam. Enim eaque animi aliquid dolor.\n\nSapiente molestias magni doloribus fugiat nulla. Omnis sed omnis qui quae ex.','56830 Camilla Brook Suite 356','Hamburg',70.70,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(3,6,'Thompson Prep Kitchen','Omnis autem commodi neque recusandae aut. Optio suscipit impedit harum amet ipsam fuga ut. Sed voluptatem nisi consequatur incidunt.\n\nAutem officia quisquam repellat at est. Vel quas possimus occaecati sit eligendi incidunt voluptatem. Voluptate perferendis et provident in. Magni nihil cum sint earum ut.\n\nVoluptatem dolorem consectetur aut sint dignissimos iste sunt. Quaerat qui mollitia atque ut nihil. Ipsum a ut in atque.','390 Marvin Mountains Suite 400','Hamburg',76.62,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(4,7,'Dickens Shared Kitchen','Iusto facere sint ratione consequatur illo possimus. Ratione quo non voluptatem dolores enim error error pariatur. Placeat enim est similique accusantium facilis quia. In quidem odio aut magnam optio.\n\nDicta ut facilis et sed consectetur. Deleniti distinctio voluptate molestias repellat porro magni qui. Assumenda nihil exercitationem quam nam sint optio dolorem corporis. Quia nihil exercitationem blanditiis qui ipsam asperiores unde et. Ipsum repudiandae ipsam saepe asperiores voluptate et.\n\nAut voluptatibus quibusdam laborum in. Possimus fuga consequatur nihil sed aut. Et ea molestias omnis.','735 Bahringer Drives Suite 560','Cologne',34.50,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(5,8,'Mitchell Catering Kitchen','Et non recusandae ipsam quos cumque. Consequatur inventore modi a enim voluptatem. Optio voluptatem sint ea cum facilis consequuntur.\n\nInventore aut officia nisi aliquam dolorem porro amet aut. Ratione quibusdam vero illo sed facilis qui sed. Provident itaque facere voluptatibus dolorum. Aut exercitationem non accusantium aliquid et qui aliquid.\n\nQui ipsa totam repellendus ad et reiciendis inventore. Eum dolorem itaque sed vel doloribus quidem deleniti quis. Sint ex quia ut eum vitae laboriosam.','4591 Irwin Islands Suite 576','Leipzig',76.73,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(6,9,'Kuphal Ghost Kitchen','Et similique sequi harum corporis quia sed sint. Qui vitae perferendis praesentium ex aut. Voluptatem omnis officiis delectus consequuntur quae. Maxime similique veritatis eligendi aut.\n\nNesciunt aut sunt cumque illum molestias voluptate. Ducimus odit fugiat voluptates necessitatibus ipsum sit eligendi. Quam aut nulla non rem est. Dignissimos excepturi cupiditate totam velit quis laudantium ipsam.\n\nFuga cum facilis facilis accusamus. Sed occaecati doloremque quibusdam.','39218 Gerardo Spur Suite 644','Düsseldorf',86.36,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(7,10,'Corwin Ghost Kitchen','Nisi omnis ut dolor assumenda. Sed quae tenetur ut quo est molestiae beatae. Velit autem mollitia molestiae sed est ratione.\n\nNesciunt qui quae non explicabo aperiam. Voluptatem aperiam delectus corporis. Aspernatur molestiae consequuntur eveniet molestiae enim praesentium dolorum.\n\nCorporis facilis laboriosam natus et. Et iure ratione numquam. Corporis qui saepe expedita. Perferendis qui eveniet aliquid laudantium.','93268 Bernier Summit','Leipzig',25.84,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(8,11,'Dickens Pop-up Space','Dignissimos reprehenderit dignissimos minus animi quia. Eligendi laboriosam dolorum illo consequuntur tenetur. Nam amet rerum consequatur et.\n\nSunt sit aperiam reprehenderit. Ullam hic sequi ut odit. Eos corporis maxime praesentium ratione repellat. Illum sint saepe quis fugit dolore.\n\nEst sit quisquam sit repellendus itaque repellat. Labore ipsum veritatis nesciunt repellat iure aut id. Nam distinctio aliquid sint provident optio soluta.','564 Marks Landing','Leipzig',40.65,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(9,12,'Crooks Bakery','Cupiditate pariatur molestias vero blanditiis id voluptates. Consequatur dolor doloremque iste veniam voluptatem qui et saepe. Sit enim odit nemo molestiae hic. Delectus eos nemo recusandae occaecati sed eaque consectetur.\n\nQuis ad et provident fugiat doloribus mollitia. Molestias nostrum qui molestiae incidunt.\n\nCorrupti dolor voluptate quia. Assumenda sed velit modi ducimus corrupti. Error cum earum perspiciatis aliquam quibusdam est. Quidem ipsum enim laboriosam quia dolore ut.','1975 Lavada Plains','Berlin',79.10,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(10,2,'Kemmer Prep Kitchen','Qui alias magni voluptatum ullam. Voluptatem in facilis accusamus totam deserunt. Sint rerum quia dolor ullam enim iusto. Est quam et minima libero dolores et.\n\nUnde voluptatem ducimus eos facere recusandae quia magni. Laudantium asperiores ipsum assumenda et qui dolores quia. Eum repudiandae consequatur quis perferendis iure aut esse quis. Qui et et voluptatum laudantium cupiditate.\n\nUt occaecati itaque unde quis omnis. Repellat aut distinctio dolores et nesciunt atque quo. Odit et non autem velit numquam.','749 O\'Hara Harbor Suite 962','Hamburg',21.57,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(11,4,'Moen Ghost Kitchen','Deserunt deserunt rerum qui aliquid nam rerum. Sit quis quae sed repellendus similique aut iure. Voluptatem unde nemo hic qui aut debitis id. Molestiae odit impedit tempore occaecati.\n\nCorrupti aspernatur optio magnam. Deleniti quia numquam voluptas nisi omnis iure consequatur. Alias architecto repellat id.\n\nTemporibus numquam iusto ut inventore sunt exercitationem. Sed magni itaque possimus nihil et. Accusamus vel sed eum distinctio ipsa omnis sint.','639 Daija Inlet Suite 459','Hamburg',84.90,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(12,5,'Rempel Pop-up Space','Ut deserunt assumenda iure eveniet qui sint ratione. Praesentium voluptas magni in illum commodi ipsa culpa. Odio harum sit corporis sit ipsum sit.\n\nVel nisi fuga qui. Quisquam doloribus doloribus tempora quia sunt odio. Aut voluptatem sit voluptatem. Deserunt sit et expedita neque nulla.\n\nCorporis in labore fugit. Eos consequatur animi eum quidem. Error est qui iste harum placeat ducimus. Eligendi dolores ullam numquam quis excepturi.','95184 Brianne Mountain Suite 011','Stuttgart',119.03,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(13,6,'Kassulke Shared Kitchen','Quaerat sit illo tempora quasi. Aut dolor et iste iusto unde. Adipisci sunt ducimus quasi est voluptas. Quisquam facere molestias facilis qui tempore exercitationem et.\n\nMolestiae suscipit voluptas aliquid qui officiis cum autem. Sint commodi minus eos possimus perspiciatis. Deleniti ut aliquam aut et dolore.\n\nMaiores sit enim perferendis perferendis sit minus ut. Ut consequatur aliquid occaecati velit ullam et. Enim in nam ad adipisci similique autem. Animi voluptatibus at tempore pariatur.','90027 Block Road','Munich',94.39,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(14,7,'Bins Shared Kitchen','Sunt aliquam odit id qui voluptatem. Pariatur ratione esse voluptas assumenda laboriosam. Minus aut veritatis omnis ut.\n\nSit quos velit exercitationem soluta distinctio est adipisci. Quo blanditiis tempore ut ut magni et. Hic non molestiae et earum. Odio perferendis quae rerum et aut facere.\n\nMolestiae ratione numquam sit sed. Doloremque aut vel impedit sed. Cumque iste odit vel iusto minus et. Vitae quia expedita qui nihil nihil sequi eum.','315 Brakus Glen','Hamburg',80.03,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(15,8,'Champlin Shared Kitchen','Qui beatae nostrum molestiae error ad. Recusandae modi ea omnis quam. Nam fugiat veniam unde illo corporis possimus reprehenderit.\n\nEa unde incidunt vel sunt. Perspiciatis quia ullam eius omnis autem. Nulla et dolor perferendis dolorem consequatur. Rerum quos nihil sint excepturi laborum.\n\nQuis aliquam tenetur quod. Sed ex id iure enim.','65027 Warren Greens','Hamburg',73.89,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(16,9,'Rohan Catering Kitchen','Quos voluptatem doloribus quidem qui vel tempora. Amet rem natus quo ratione expedita dolor. Architecto dolorum at ut sunt voluptate assumenda quos laudantium.\n\nLaudantium in non perspiciatis distinctio possimus vel iste. Dolores sit dolorem non explicabo asperiores. Nesciunt cupiditate iusto tempora et.\n\nPerspiciatis eos vero impedit consequatur ratione accusamus est. Consectetur culpa consequatur pariatur est quibusdam quam debitis. Voluptatem aut quisquam vitae accusantium omnis. Iure pariatur ad voluptas.','66336 Jakubowski Spurs','Frankfurt',35.14,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(17,10,'Schneider Catering Kitchen','Nostrum sit amet quod. Inventore odio iure et temporibus velit in modi. Tenetur nesciunt ut ut error. Omnis illum dolor cum repellat repellat sit in.\n\nAb autem quae quasi vel facilis. Cum quia ea totam non. Quia voluptatum nesciunt asperiores similique consequatur sunt voluptatem.\n\nIllum eius repellendus architecto consequuntur saepe qui officiis. Quos odit hic et molestias provident. Rerum et reprehenderit magnam ut odit consequatur. Dolores et voluptate facilis harum consequatur.','4887 Bins Trafficway Suite 758','Munich',77.80,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(18,11,'Eichmann Shared Kitchen','Rerum autem vel quis ullam ullam doloribus ipsum. Molestias suscipit totam quos dolor voluptatum optio.\n\nNisi fugiat non assumenda aut. Quasi doloribus molestiae hic ut quasi itaque. Autem ipsum sed reprehenderit possimus. Rem perspiciatis sit saepe autem.\n\nQuam harum sint sit autem. Soluta nihil et qui id similique. Labore molestiae ipsam rerum.','10222 Kuhlman Pass Suite 118','Stuttgart',64.84,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(19,12,'Ziemann Bakery','Et voluptatum aspernatur vel exercitationem aut possimus. Aut distinctio aut iure ipsa commodi earum. Voluptatem explicabo qui eius corrupti molestiae delectus.\n\nEt dignissimos labore doloribus cumque cumque reprehenderit quia. Et qui sed labore expedita.\n\nEt ipsa error culpa veniam quidem inventore aliquam et. Sit aut et sapiente ipsum eaque qui. Ut in sit temporibus sequi. Accusantium vitae repellendus rerum fugit saepe.','1612 Wintheiser Camp Apt. 474','Hamburg',53.87,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(20,2,'Bruen Ghost Kitchen','Praesentium quia sequi earum quibusdam. Numquam numquam pariatur vitae voluptates est est dolorem. Et nemo sint vitae aliquid nulla. Cum officia voluptate est minima aut ex.\n\nDolorum ad officia repellat non. Iure repellendus sint dolor voluptatem recusandae voluptates tempore. Et recusandae quidem deleniti sint et qui in minus.\n\nEt enim recusandae qui quia libero. Labore maxime voluptas alias qui vero. Dolorem sed quae velit.','578 Jacobi Mountains','Düsseldorf',72.71,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(21,4,'Kuhic Catering Kitchen','Unde tempore rerum in eos aperiam eos illum. Eveniet aperiam est maxime deleniti quod. Dolore repellendus voluptatibus et. Quam ad accusantium sed tenetur officia.\n\nFuga sed neque ut rerum deleniti sint. Sint veritatis et magni. Harum in quibusdam maiores voluptatem repudiandae nobis non dolorem.\n\nAut nemo reiciendis nam ex dolorem qui. Est harum porro perspiciatis officia impedit. Eius et maiores a dicta delectus quasi.','85002 Edmond Flats','Düsseldorf',36.00,'2026-07-22 08:13:16','2026-07-22 08:13:16'),(22,5,'Steuber Bakery','In minima eos maxime magnam laboriosam laboriosam. Voluptas quae ad pariatur aut quo. Consequatur aliquam vel atque necessitatibus voluptas ea. Et architecto natus sint est.\n\nAutem expedita et quibusdam pariatur. Fugit sint alias possimus. Totam itaque voluptatibus quia et. Sed iusto omnis similique in ad ut nihil.\n\nQuo ducimus voluptatibus est soluta praesentium quaerat officiis. Omnis nemo quidem numquam et non. Repellendus iure sint et illo officiis. Ipsam ducimus voluptatem nesciunt dolores ab culpa id.','3277 Bednar Gateway','Düsseldorf',113.83,'2026-07-22 08:13:16','2026-07-22 08:13:16');
/*!40000 ALTER TABLE `kitchens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_07_21_220346_add_role_to_users_table',1),(5,'2026_07_22_100000_create_kitchens_table',1),(6,'2026_07_22_100001_create_kitchen_images_table',1),(7,'2026_07_22_100002_create_bookings_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('typq8VLBKOcQThjxofpL8vvyYyDIiPatpwWLjxKr',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoid3lkZ0s5ZkhJS1ZUZXRHb0wxdnU2WHVQenBPaVU4S3luNkcySmhZcCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvbG9naW4iO3M6NToicm91dGUiO3M6NToibG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1784711634);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'chef',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Demo Admin','admin@kitchenhop.demo','admin','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','NNNAJqRkOK','2026-07-22 08:13:16','2026-07-22 08:13:16'),(2,'Demo Owner','owner@kitchenhop.demo','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','HxDsjicEek','2026-07-22 08:13:16','2026-07-22 08:13:16'),(3,'Demo Chef','chef@kitchenhop.demo','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','kJYF43ySJM','2026-07-22 08:13:16','2026-07-22 08:13:16'),(4,'Prof. Justice Schoen IV','npacocha@example.org','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','sxqjSpLiud','2026-07-22 08:13:16','2026-07-22 08:13:16'),(5,'Roy Ward','mattie.murazik@example.com','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','ZVtlSwsBas','2026-07-22 08:13:16','2026-07-22 08:13:16'),(6,'Dante Zieme Sr.','lgusikowski@example.org','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','sDIMzdBjp0','2026-07-22 08:13:16','2026-07-22 08:13:16'),(7,'Berneice Ullrich PhD','crawford.welch@example.net','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','37bIbDD2SN','2026-07-22 08:13:16','2026-07-22 08:13:16'),(8,'Adrien Beier','casper.cathy@example.com','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','WsXLnqxDkO','2026-07-22 08:13:16','2026-07-22 08:13:16'),(9,'Miss Vivianne Zemlak','okuneva.sim@example.org','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','xlLtOYULl2','2026-07-22 08:13:16','2026-07-22 08:13:16'),(10,'Dr. Miracle Lind','sflatley@example.org','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','O38zd02dE5','2026-07-22 08:13:16','2026-07-22 08:13:16'),(11,'Gretchen Kihn IV','doyle.veum@example.org','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','Lt21ZlR7s2','2026-07-22 08:13:16','2026-07-22 08:13:16'),(12,'Lonie Nitzsche','lennie.zulauf@example.com','owner','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','3ZP8LNSpke','2026-07-22 08:13:16','2026-07-22 08:13:16'),(13,'Jarvis Haag DDS','liam.leannon@example.net','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','Vgky1Msxlc','2026-07-22 08:13:16','2026-07-22 08:13:16'),(14,'Alexanne Schulist Sr.','greenholt.cortez@example.com','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','07a9EqKZsc','2026-07-22 08:13:16','2026-07-22 08:13:16'),(15,'Giovani Hahn III','swaniawski.corine@example.com','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','eeWpOXAAdy','2026-07-22 08:13:16','2026-07-22 08:13:16'),(16,'Krystal Kilback','yadira.predovic@example.org','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','NPAgJW0uuA','2026-07-22 08:13:16','2026-07-22 08:13:16'),(17,'Mrs. Pansy Zboncak PhD','marianna.watsica@example.org','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','wiLIDHonyo','2026-07-22 08:13:16','2026-07-22 08:13:16'),(18,'Mrs. Lila Nitzsche Sr.','camryn21@example.net','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','aQn7ndPdIW','2026-07-22 08:13:16','2026-07-22 08:13:16'),(19,'Ceasar Glover','alexanne40@example.org','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','QmZsIKQhMY','2026-07-22 08:13:16','2026-07-22 08:13:16'),(20,'Chris Toy','rachelle68@example.org','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','JJjJtMyOKd','2026-07-22 08:13:16','2026-07-22 08:13:16'),(21,'Harrison Carroll','layne77@example.net','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','Xpm1lgEjk2','2026-07-22 08:13:16','2026-07-22 08:13:16'),(22,'Demetris Cummings','keely.bergnaum@example.org','chef','2026-07-22 08:13:16','$2y$12$6RSu31KWVQilrcJp0lBgnONDbb4Zd5ctnV5rUANdHahZfEhN4u7dy','cFhhQsTHoP','2026-07-22 08:13:16','2026-07-22 08:13:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-22 12:47:46
