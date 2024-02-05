<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Trigger de la base de datos para actualizar la base
     */
    public function up(): void
    {
        DB::unprepared('
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
    ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS localizaciones_after_update');
    }
};
