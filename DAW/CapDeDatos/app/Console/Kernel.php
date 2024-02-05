<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {   
        $schedule->command('app:datos-a-p-i');//Ejecucion commando para coger datos reales nada mas empezar
        $schedule->command('app:datos-a-p-i')->everyFifteenMinutes();//Ejecucion de comando cada 15 minutos para coger datos reales de la API e insertarlos en la base
        $schedule->command('app:datos-aleatorios')->everyFifteenSeconds();//Ejecucion de comando cada 15 segundos para coger datos de la base y aleatorizarlos
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
