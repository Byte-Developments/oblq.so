CREATE TABLE IF NOT EXISTS `urls` (
  `code` varchar(6) PRIMARY KEY,
  `url` varchar(2048) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);