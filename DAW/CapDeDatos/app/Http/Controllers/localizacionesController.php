<?php

namespace App\Http\Controllers;
use App\Models\Localizacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
class LocalizacionesController extends Controller
{

    
    public function recogerDatosApi()
    {
        $codigos = [
            'Bizkaia' => [
                'ID' => 48,
                'Ciudades' => [
                    'Bilbao' => 48020,
                    'Barakaldo' => 48013,
                ],
            ],
            'Gipuzkoa' => [
                'ID' => 20,
                'Ciudades' => [
                    'Zarautz' => 20079,
                    'Irun' => 20045,
                    'Errenteria' => 20067,
                    'Donosti' => 20069,
                ],
            ],
        ];

        $lugares = [];

        foreach ($codigos as $provincia => $provinciaData) {
            foreach ($provinciaData['Ciudades'] as $ciudadNombre => $ciudadCOD) {
                $response = Http::get("https://www.el-tiempo.net/api/json/v2/provincias/{$provinciaData['ID']}/municipios/{$ciudadCOD}");

                if ($response->failed()) {
                    throw new \Exception("La solicitud no se pudo completar correctamente.");
               }

                $data = $response->json();
                if ($ciudadCOD == 20069) {
                    $data['municipio']['NOMBRE'] = "Donostia";
                };
                $nombre = $data['municipio']['NOMBRE']; 
                $localizacion = Localizacion::where('nombre', $nombre)->first();

                if($localizacion){
                    $localizacion->temperatura = $data['temperatura_actual'] ?? 0;
                    $localizacion->humedad = $data['humedad'] ?? 0;
                    $localizacion->lluvia = $data['lluvia'] ?? 0;
                    $localizacion->viento =  $data['viento'] ?? 0;
                    $localizacion->precipitacion = $data['precipitacion'] ?? 0;
            
                    $localizacion->save();
                }
                else{
                    Localizacion::create([
                        'nombre' => $data['municipio']['NOMBRE'],
                        'latitud' => $data['municipio']['LATITUD_ETRS89_REGCAN95'],
                        'longitud' => $data['municipio']['LONGITUD_ETRS89_REGCAN95'],
                        'temperatura' => $data['temperatura_actual'] ?? 0,
                        'humedad' => $data['humedad'] ?? 0,
                        'lluvia' => $data['lluvia'] ?? 0,
                        'viento' => $data['viento'] ?? 0,
                        'precipitacion' => $data['precipitacion'] ?? 0,]);
                }
            }
        }
    }
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
        $nombre = $request->input('nombre');
        $localizacion = Localizacion::where('nombre', $nombre)->first();

        if (!$localizacion) {
            return response()->json(['mensaje' => 'Lugar no encontrado'], 404);
        }
        $localizacion->temperatura = $request->input('temperatura');
        $localizacion->humedad = $request->input('humedad');
        $localizacion->lluvia = $request->input('lluvia');
        $localizacion->viento = $request->input('viento');
        $localizacion->precipitacion = $request->input('precipitacion');

        $localizacion->save();
    }
}
