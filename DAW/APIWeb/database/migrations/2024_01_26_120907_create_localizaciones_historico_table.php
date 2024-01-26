<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('localizaciones_historico', function (Blueprint $table) {
            $table->date("fecha");
            $table->string("nombre");
            $table->integer("temperatura");
            $table->integer("humedad");
            $table->integer("viento");
            $table->integer("lluvia");
            $table->integer("precipitacion");

            $table->primary(['nombre','fecha']);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('localizaciones_historico');
    }
};
