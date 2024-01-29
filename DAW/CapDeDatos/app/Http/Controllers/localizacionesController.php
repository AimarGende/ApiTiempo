<?php

namespace App\Http\Controllers;
use App\Models\Localizacion;
use Illuminate\Http\Request;

class LocalizacionesController extends Controller
{
    public function RecogerDatos(){
        $localizaciones = Localizacion::all();
        return response()->json(['localizaciones'=>$localizaciones]);
    }

    public function InsertarDatos(Request $request){
        $request->validate([
            'nombre' => 'required',
            'latitud' => 'required',
            'longitud' => 'required',
            'temperatura' => 'required',
            'humedad' => 'required',
            'viento' => 'required',
            'lluvia' => 'required',
            'precipitacion' => 'required'
        ]);

        Localizacion::create($request->all());
    }

    public function ActualizarDatos(Request $request){
        $localizacion = Localizacion::find($request->input('nombre'));

        if (!$localizacion) {
            return response()->json(['mensaje' => 'Lugar no encontrado'], 404);
        }
        $localizacion->temperatura = $request->input('temperatura');
        $localizacion->humedad = $request->input('humedad');
        $localizacion->lluvia = $request->input('nubes');
        $localizacion->viento = $request->input('viento');
        $localizacion->precipitacion = $request->input('precipitacion');

        $localizacion->save();
    }
}
