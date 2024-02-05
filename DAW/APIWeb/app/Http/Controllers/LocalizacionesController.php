<?php

namespace App\Http\Controllers;

use App\Models\Localizacion;
class LocalizacionesController extends Controller
{
    // Funcion para recoger todos los datos de la base
    public function RecogerDatos(){
        $localizaciones = Localizacion::all();
        return response()->json(['localizaciones'=>$localizaciones]);
    }
}
