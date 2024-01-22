CREATE TABLE `localizaciones` (
  `nombre` varchar(255) NOT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `temperatura` int(11) NOT NULL,
  `humedad` int(11) NOT NULL,
  `viento` int(11) NOT NULL,
  `lluvia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `localizacionesHistorico` (
  `fecha` timestamp NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `temperatura` int(11) NOT NULL,
  `humedad` int(11) NOT NULL,
  `viento` int(11) NOT NULL,
  `lluvia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TRIGGER `localizaciones_after_update` AFTER UPDATE ON `localizaciones`
FOR EACH ROW
BEGIN
    INSERT INTO `localizacionesHistorico` (
        `fecha`,
        `nombre`, 
        `latitud`, 
        `longitud`, 
        `temperatura`, 
        `humedad`, 
        `viento`, 
        `lluvia`
    ) VALUES (
        NOW(),
        OLD.`nombre`, 
        OLD.`latitud`, 
        OLD.`longitud`, 
        OLD.`temperatura`, 
        OLD.`humedad`, 
        OLD.`viento`, 
        OLD.`lluvia`        
    );
END;