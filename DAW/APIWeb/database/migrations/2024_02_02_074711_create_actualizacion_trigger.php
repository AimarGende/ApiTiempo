<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
        CREATE TRIGGER `localizaciones_after_update` AFTER UPDATE ON `localizaciones`
        FOR EACH ROW
        BEGIN
            INSERT INTO `localizaciones_historico` (
                `fecha`,
                `nombre`, 
                `temperatura`, 
                `humedad`, 
                `viento`, 
                `lluvia`,
                `precipitacion`
            ) VALUES (
                NOW(),
                OLD.nombre, 
                OLD.temperatura, 
                OLD.humedad, 
                OLD.viento, 
                OLD.lluvia,
                OLD.precipitacion
            );
        END;
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
