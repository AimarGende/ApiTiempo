<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Crea la tabla localizaciones
     */
    public function up(): void
    {
        Schema::create('localizaciones', function (Blueprint $table) {
            $table->string("nombre")->primary();
            $table->float("latitud");
            $table->float("longitud");
            $table->integer("temperatura");
            $table->integer("humedad");
            $table->integer("viento");
            $table->integer("lluvia");
            $table->integer("precipitacion");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('localizaciones');
    }
};
