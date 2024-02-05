-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 05-02-2024 a las 08:47:25
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Aimar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localizaciones`
--

CREATE TABLE `localizaciones` (
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitud` double(8,2) NOT NULL,
  `longitud` double(8,2) NOT NULL,
  `temperatura` int NOT NULL,
  `humedad` int NOT NULL,
  `viento` int NOT NULL,
  `lluvia` int NOT NULL,
  `precipitacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `localizaciones_historico` (
  `fecha` timestamp NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `temperatura` int NOT NULL,
  `humedad` int NOT NULL,
  `viento` int NOT NULL,
  `lluvia` int NOT NULL,
  `precipitacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--
-- Volcado de datos para la tabla `localizaciones`
--

INSERT INTO `localizaciones` (`nombre`, `latitud`, `longitud`, `temperatura`, `humedad`, `viento`, `lluvia`, `precipitacion`) VALUES
('Barakaldo', 43.30, -3.00, 6, 90, 5, 0, 0),
('Bilbao', 43.26, -2.92, 6, 79, 7, 0, 1),
('Donostia', 43.32, -1.98, 8, 99, 4, 1, 1),
('Errenteria', 43.31, -1.90, 9, 100, 6, 1, 1),
('Irun', 43.34, -1.79, 8, 100, 3, 1, 1),
('Zarautz', 43.29, -2.18, 7, 79, 4, 1, 1);

--
-- Disparadores `localizaciones`
--
DELIMITER $$
CREATE TRIGGER `localizaciones_before_update` AFTER UPDATE ON `localizaciones` FOR EACH ROW BEGIN
DECLARE nueva_fecha TIMESTAMP;
    
    SET nueva_fecha = DATE_ADD(NOW(), INTERVAL 1 HOUR);
            INSERT INTO `localizaciones_historico` (
                `fecha`,
                `nombre`, 
                `temperatura`, 
                `humedad`, 
                `viento`, 
                `lluvia`,
                `precipitacion`
            ) VALUES (
                nueva_fecha,
                OLD.nombre, 
                OLD.temperatura, 
                OLD.humedad, 
                OLD.viento, 
                OLD.lluvia,
                OLD.precipitacion
            );
        END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `localizaciones`
--
ALTER TABLE `localizaciones`
  ADD PRIMARY KEY (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
