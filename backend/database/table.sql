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

-- Table messages
CREATE TABLE messages (
    message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    objet VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    date_heure DATETIME NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
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
