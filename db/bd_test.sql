-- Crear la base de datos 'test' si no existe
CREATE DATABASE IF NOT EXISTS test;

-- Seleccionar la base de datos 'test'
USE test;

-- Crear la tabla 'users' si no existe
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO users (username, password, email) VALUES
('johndoe', 'password123', 'john@example.com'),
('Juan', 'securepassword', 'Juan@example.com'),
('adminuser', 'adminpass', 'admin@example.com');
