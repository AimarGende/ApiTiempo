<?php

namespace App\Http\Controllers;

use App\Models\Localizacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
class LocalizacionesController extends Controller
{
    public function RecogerDatos(){
        $localizaciones = Localizacion::all();
        return response()->json(['localizaciones'=>$localizaciones]);
    }
}
