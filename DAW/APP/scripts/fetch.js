const options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXVAcGxhaWF1bmRpLm5ldCJ9.WmgNDEzi60hZ9lzj0lkmLEVgUdJN8Mw24kJacq2u9BMuhaycjTKqerRp9QmnVbez3iyqmsABu93rNPeFAuKvPIohyRBe2a1j4iclFT7Ro5slaBlhsTWiaB874mKCMbX2JSNYu_IqArqEcVblHxfZEtdT2jo1aw63-KGpggSzyYpAUeM32WGsUGs34L1CF55bwmj3risa8KMp9BfB4cOykcP4qX-lE2P2MiL0ea2lhUTWtAv943JhsHNTYKBwXU56otJwHMKPwCVL3_CwhLgYcoyFtLGKx9zFm2wTmJqegFJWtZ2CSoRBoXkefsq9atjTZ2OfSd4pPolRVo2dlCLY8g'
    }
}
//`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/donostialdea/locations` errenteria y donostia
//`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/coast_zone/locations` irun y zarautz
// `https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/great_bilbao/locations` bilbao y barakaldo
// `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/${zoneID}/locations/${locationID}/forecast/at/${fechaActual.getFullYear()}/${meses[0]}/${dias[0]}/for/${fechaManana.getFullYear()}${meses[1]}${dias[1]}`


function RecogerLocalizaciones(idsZonas) {
    let localizaciones = new Array()
    for (let zona of idsZonas) {
        fetch(`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/${zona}/locations`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no se pudo completar correctamente.");
                }
                return response.json();
            })
            .then(data => {
                // console.log(data["forecastText"])
                for (let location of data) {
                    if (location["regionZoneLocationId"] == "barakaldo" || location["regionZoneLocationId"] == "bilbao" || location["regionZoneLocationId"] == "irun" || location["regionZoneLocationId"] == "zarautz" || location["regionZoneLocationId"] == "errenteria" || location["regionZoneLocationId"] == "donostia") {
                        localizaciones.push(location["regionZoneLocationId"])
                    }
                }
            })
    }
    return localizaciones
}