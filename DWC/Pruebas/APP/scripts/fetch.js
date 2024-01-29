
function predicciones(cuerpoCard, lugar) {
    let div = document.createElement("div")
    div.className += `prediccion prediccion${lugar}`
    switch (lugar) {
        case 'Irun':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data["forecastText"]["SPANISH"])
                    console.log("Irun")
                    div.innerHTML = data["forecastText"]["SPANISH"]
                    cuerpoCard.appendChild(div)
                })
            break;
        case 'Donosti':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data["forecastText"]["SPANISH"])
                    console.log("Donosti")
                    div.innerHTML = data["forecastText"]["SPANISH"]
                    cuerpoCard.appendChild(div)
                })
            break;
        case 'Bilbao':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data["forecastText"]["SPANISH"])
                    console.log("Bilbao")
                    div.innerHTML = data["forecastText"]["SPANISH"]
                    cuerpoCard.appendChild(div)
                })
            break;
        case 'Zarautz':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/zarautz/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    div.innerHTML = data["forecastText"]["SPANISH"]
                    cuerpoCard.appendChild(div)
                })
            break;
        case 'Errenteria':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/errenteria/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data["forecastText"]["SPANISH"])
                    console.log("Errenteria")
                    div.innerHTML = data["forecastText"]["SPANISH"]
                    cuerpoCard.appendChild(div)
                })
            break;
        case 'Barakaldo':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/barakaldo/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    div.innerHTML = data["forecastText"]["SPANISH"]
                    cuerpoCard.appendChild(div)
                })
            break;
    }
}

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
                        console.log(location)
                        localizaciones.push(location["regionZoneLocationId"])
                    }
                }
            })
    }

    return localizaciones
}

function RecogerDatosApi(codigos) {
    for (let provincia in codigos) {
        for (let carac in codigos[provincia]) {
            for (let ciudadCOD in codigos[provincia][carac]) {
                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${codigos[provincia].ID}/municipios/${codigos[provincia][carac][ciudadCOD]}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("La solicitud no se pudo completar correctamente.");
                        }
                        return response.json();
                    })
                    .then(data => {

                        let ciudad = {
                            nombre: data["municipio"]["NOMBRE"],
                            latitud: data["municipio"]["LATITUD_ETRS89_REGCAN95"],
                            longitud: data["municipio"]["LONGITUD_ETRS89_REGCAN95"],
                            temperatura: ((data["temperatura_actual"] == "") ? 0 : data["temperatura_actual"]),
                            humedad: ((data["humedad"] == "") ? 0 : data["humedad"]),
                            lluvia: ((data["lluvia"] == "") ? 0 : data["lluvia"]),
                            viento: ((data["viento"] == "") ? 0 : data["viento"]),
                            precipitacion: ((data["precipitacion"] == "") ? 0 : data["precipitacion"])
                        }
                        if (codigos[provincia][carac][ciudadCOD] == 20069) {
                            ciudad.nombre = "Donostia"
                        }
                        lugares.push(ciudad)
                    })
            }
        }
    }

}

function RecogerDatosBase() {
    fetch(`http://10.10.17.121:8083/api/recoger`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data=>{
            lugares=data.localizaciones
        })
}

function DatosAleatorios(ciudades) {
    let ciudadesAleatorias = ciudades
    ciudadesAleatorias.forEach(ciudad => {
        ciudad["temperatura"] = parseInt(ciudad["temperatura"]) + (Math.round(Math.random()) * 2 - 1)
        ciudad["humedad"] = parseInt(ciudad["humedad"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
        ciudad["lluvia"] = parseInt(ciudad["lluvia"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
        ciudad["viento"] = parseInt(ciudad["viento"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
        ciudad["precipitacion"] = parseInt(ciudad["precipitacion"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
    });
    return ciudadesAleatorias
}