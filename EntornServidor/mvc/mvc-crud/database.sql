CREATE DATABASE IF NOT EXISTS mimvc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mimvc;
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  body TEXT NOT NULL
);
INSERT INTO posts (title, body) VALUES
('Primer post', 'Este es el primer post CRUD.'),
('Segundo post', 'Más contenido editable y eliminable.');
