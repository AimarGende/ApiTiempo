<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LocalizacionesController;

class datosAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:datos-a-p-i';

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
        $controlador -> RecogerDatosApi();
    }
}
