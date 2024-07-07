USE emmanuelle_mingle;

-- Créer la table users en premier
CREATE TABLE users (
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    biographie TEXT,
    service_count INT,
    service_type VARCHAR(255)
);

-- Créer la table messages
CREATE TABLE messages (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    objet VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    date_heure DATETIME NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Créer la table services
CREATE TABLE services (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    illustration LONGBLOB NOT NULL,
    date DATETIME NOT NULL,
    user_id INT,
    message_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
);

-- Créer la table category_service
CREATE TABLE category_service (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre_catégorie VARCHAR(100) NOT NULL,
    titre_sous_catégorie VARCHAR(100),
    category_image VARCHAR(255)
);

-- Créer la table service_type
CREATE TABLE service_type (
    service_id INT,
    catégorie_id INT,
    PRIMARY KEY (service_id, catégorie_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (catégorie_id) REFERENCES category_service(id) ON DELETE CASCADE
);

-- Peupler la table users
INSERT INTO users (username, mail, user_pass, localisation, avatar, biographie, service_count, service_type)
VALUES
('JohnDoe', 'johndoe@example.com', 'password123', 'Paris', 'avatar1.png', 'Biographie de John Doe', 2, 'type1'),
('JaneSmith', 'janesmith@example.com', 'password456', 'Lyon', 'avatar2.png', 'Biographie de Jane Smith', 1, 'type2'),
('AliceWonder', 'alice@example.com', 'alicepwd', 'Marseille', 'avatar3.png', 'Biographie de Alice Wonder', 3, 'type3'),
('BobBuilder', 'bob@example.com', 'bobpwd', 'Nice', 'avatar4.png', 'Biographie de Bob Builder', 0, 'type1');

-- Peupler la table messages
INSERT INTO messages (objet, message, date_heure, user_id)
VALUES
('Bienvenue', 'Bienvenue sur notre plateforme', '2024-06-01 10:00:00', 1),
('Mise à jour', 'Votre profil a été mis à jour', '2024-06-02 15:30:00', 2),
('Nouvelle offre', 'Découvrez notre nouvelle offre', '2024-06-06 10:30:00', 3),
('Promotion', 'Profitez de notre promotion spéciale', '2024-06-07 09:15:00', 4);

-- Peupler la table services
INSERT INTO services (titre, description, illustration, date, user_id, message_id)
VALUES
('Service 1', 'Description du service 1', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-03 12:00:00', 1, 2),
('Service 2', 'Description du service 2', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E159302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-04 14:00:00', 2, 2),
('Service 3', 'Description du service 3', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226FDFDFDCD6BCDC1B60000000049454E44AE426082, '2024-06-05 16:00:00', 2, 2),
('Service 4', 'Description du service 4', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E15930226041302260413022604130226FEDFDFD2CD6BCDC1B60000000049454E44AE426082, '2024-06-08 11:00:00', 3, 3),
('Service 5', 'Description du service 5', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-09 13:00:00', 3, 4),
('Service 6', 'Description du service 6', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-10 14:30:00', 1, 3);


-- Peupler la table services
-- INSERT INTO services (titre, description, illustration, date, user_id, message_id)
-- VALUES
-- ('Service 1', 'Description du service 1', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-03 12:00:00', 27, 486),
-- ('Service 2', 'Description du service 2', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E159302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-04 14:00:00', 27, 486),
-- ('Service 3', 'Description du service 3', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226FDFDFDCD6BCDC1B60000000049454E44AE426082, '2024-06-05 16:00:00', 27, 486),
-- ('Service 4', 'Description du service 4', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E15930226041302260413022604130226FEDFDFD2CD6BCDC1B60000000049454E44AE426082, '2024-06-08 11:00:00', 27, 486),
-- ('Service 5', 'Description du service 5', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-09 13:00:00', 27, 486),
-- ('Service 6', 'Description du service 6', 0x89504E470D0A1A0A0000000D494844520000012C000000A908020000001E1593022604130226041302260413022604130226848716DA5F02CD6BCDC1B60000000049454E44AE426082, '2024-06-10 14:30:00', 27, 486);

-- Peupler la table category_service
INSERT INTO category_service (titre_catégorie, titre_sous_catégorie)
VALUES
('Catégorie 1', 'Sous-catégorie 1'),
('Catégorie 2', 'Sous-catégorie 2'),
('Catégorie 3', 'Sous-catégorie 3'),
('Catégorie 4', 'Sous-catégorie 4');

-- Peupler la table service_type
INSERT INTO service_type (service_id, catégorie_id)
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 3),
(6, 4);
