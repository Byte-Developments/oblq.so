CREATE TABLE IF NOT EXISTS `pastes` (
  `id` varchar(16) PRIMARY KEY,
  `content` text NOT NULL,
  `title` varchar(255),
  `language` varchar(50) DEFAULT 'plaintext',
  `expires_at` timestamp NULL,
  `burn_after_read` boolean DEFAULT false,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `viewed` boolean DEFAULT false
);