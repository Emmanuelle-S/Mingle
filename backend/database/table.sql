DROP SCHEMA IF EXISTS emmanuelle_mingle;
CREATE SCHEMA emmanuelle_mingle;
USE emmanuelle_mingle;

-- Table users
CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    avatar VARCHAR,
    biographie TEXT,
    service_count INT,
    service_type VARCHAR
);

-- Table services
CREATE TABLE services (
    service_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    illustration VARCHAR NOT NULL,
    date DATETIME NOT NULL,
    user_id INT,
    message_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (message_id) REFERENCES messages(message_id)
);

-- Table service_type
CREATE TABLE service_type (
    service_id INT,
    catégorie_id INT,
    PRIMARY KEY (service_id, catégorie_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id),
    FOREIGN KEY (catégorie_id) REFERENCES category_service(catégorie_id)
);

-- Table category_service
CREATE TABLE category_service (
    catégorie_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre_catégorie VARCHAR(100) NOT NULL,
    titre_sous_catégorie VARCHAR(100)
);

-- Table faq
CREATE TABLE faq (
    faq_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `conversations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `last_message` text DEFAULT NULL,
  `last_message_time` datetime DEFAULT NULL,
  `friend_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `messages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friends` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`friends`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;