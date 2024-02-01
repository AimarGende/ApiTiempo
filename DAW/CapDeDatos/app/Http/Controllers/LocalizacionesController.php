<?php

namespace App\Http\Controllers;

use App\Models\Localizacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
class LocalizacionesController extends Controller
{

    
    public function RecogerDatosApi()
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
                    $localizacion->temperatura = $data['temperatura_actual'] == "" ? 0 : $data['temperatura_actual'];
                    $localizacion->humedad = $data['humedad'] == "" ? 0 : $data['humedad'];
                    $localizacion->lluvia = $data['lluvia'] == "" ? 0 : $data['lluvia'];
                    $localizacion->viento =  $data['viento'] == "" ? 0 : $data['viento'];
                    $localizacion->precipitacion = $data['precipitacion'] == "Ip" ? 0 : $data['precipitacion'];
            
                    $localizacion->save();
                }
                else{
                    Localizacion::create([
                        'nombre' => $data['municipio']['NOMBRE'],
                        'latitud' => $data['municipio']['LATITUD_ETRS89_REGCAN95'],
                        'longitud' => $data['municipio']['LONGITUD_ETRS89_REGCAN95'],
                        'temperatura' => $data['temperatura_actual'] == "" ? 0 : $data['temperatura_actual'],
                        'humedad' => $data['humedad'] == "" ? 0 : $data['humedad'],
                        'lluvia' => $data['lluvia'] == "" ? 0 : $data['lluvia'],
                        'viento' => $data['viento'] == "" ? 0 : $data['viento'],
                        'precipitacion' => $data['precipitacion'] == "Ip" ? 0 : $data['precipitacion'],]);
                }
            }
        }
    }

    public function DatosAleatorios(){
        $localizaciones = Localizacion::all();
        foreach( $localizaciones as $localizacion){
            $localizacion->temperatura =$localizacion->temperatura - (($localizacion->temperatura<=0)?-1:rand(-1,1)); 
            $localizacion->humedad = $localizacion->humedad - (($localizacion->humedad<=0)?-1:rand(-1,1));
            $localizacion->lluvia = $localizacion->lluvia - (($localizacion->lluvia<=0)?-1:rand(-1,1));
            $localizacion->viento = $localizacion->viento - (($localizacion->viento<=0)?-1:rand(-1,1));
            $localizacion->precipitacion = $localizacion->precipitacion - (($localizacion->precipitacion<=0)?-1:rand(-1,1));
    
            $localizacion->save();
        }

    }
}
