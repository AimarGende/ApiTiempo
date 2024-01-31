<?php

namespace App\Http\Controllers;

use App\Models\Localizacion;
class LocalizacionesController extends Controller
{
    public function RecogerDatos(){
        $localizaciones = Localizacion::all();
        return response()->json(['localizaciones'=>$localizaciones]);
    }
}
