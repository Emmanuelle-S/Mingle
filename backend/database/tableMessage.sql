CREATE TABLE Messages(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    objet VARCHAR(100) NOT NULL,
    message VARCHAR(120) NOT NULL,
    date_heure DATETIME NOT NULL,
    user_id INT,
);
