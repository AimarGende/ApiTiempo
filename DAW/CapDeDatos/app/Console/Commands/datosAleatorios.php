<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LocalizacionesController;

class datosAleatorios extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:datos-aleatorios';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     * Ejecucion del comando
     */
    public function handle()
    {
        $controlador = new LocalizacionesController();
        $controlador -> DatosAleatorios();
    }
}
