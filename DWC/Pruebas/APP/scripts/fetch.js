function RecogerDatosBase() {
    fetch(`http://10.10.17.121:8086/api/recoger`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            lugares = data.localizaciones
            lugares.forEach(lugar => {
                cont++
                CrearCard(lugar, cont)
                CrearDialog(lugar)
                var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
                marker._icon.classList.add(`Icon${lugar.nombre}`);
                marker.on("click", function () {
                    let color = MostrarCard(lugar.nombre)
                    if (color == 1) {
                        $(document.getElementsByClassName(`Icon${lugar.nombre}`)[0]).css("filter", "hue-rotate(120deg)")
                    }
                    else {
                        $(document.getElementsByClassName(`Icon${lugar.nombre}`)[0]).css("filter", "hue-rotate(0deg)")
                    }
                })
                marker.bindTooltip(lugar.nombre, {
                    permanent: false,    // El tooltip no será permanente
                    direction: 'top',    // Se mostrará encima del marcador
                    offset: L.point(-15, -8) // Desplazamiento del tooltip respecto al marcador
                })


            })
            
            let clases = []

            $(".Vien,.Nube,.Lluv").on('dragstart', function (event) {
                clases = $(this).parent().parent()[0].className.split(" ")
                console.log(clases[1])
                event.originalEvent.dataTransfer.setData("text/plain", event.target.className.split(" ")[1]);
            });

            $(".cuerpo").on('dragover', function (event) {
                event.preventDefault();
            });

            $(".cuerpo").on('drop', function (event) {
                event.preventDefault();
                if ($(this).parent()[0].className.split(" ")[1] == clases[1]) {
                    var data = event.originalEvent.dataTransfer.getData("text/plain");

                    var draggedElement = document.getElementsByClassName(data)[0];
                    draggedElement.style.display = "inline-block"
                    draggedElement.style.marginLeft = "2%"

                    let parrafo = document.createElement("p")
                    parrafo.style.color = "rgba(70, 202, 246)"
                    parrafo.style.display = "inline-block"

                    let div = document.createElement("div")
                    div.className += "Icono"
                    div.style.margin = "5px"
                    if (event.target !== draggedElement && event.target.tagName != "IMG" && event.target.tagName != "P" && event.target.className != "Icono" && !event.target.className.includes("prediccion")) {
                        $(draggedElement).attr('draggable', false)
                        lugares.forEach(element => {
                            if (element.nombre == clases[1]) {
                                switch (data.match(/.{1,3}./)[0]) {
                                    case 'Vien':
                                        parrafo.innerHTML = "Viento: " + element.viento + "m/s";
                                        break;
                                    case 'Nube':
                                        parrafo.innerHTML = "Precipitacion: " + element.precipitacion + "%";
                                        break;
                                    case 'Lluv':
                                        parrafo.innerHTML = "Lluvia: " + element.lluvia + " %";
                                        break;
                                    case '':
                                        parrafo.innerHTML;
                                        break;
                                }
                                div.appendChild(draggedElement)
                                div.appendChild(parrafo)
                                event.target.insertBefore(div, $(`.prediccion${clases[1]}`)[0])
                            }
                        })
                    }
                }
                clases = []
            });
            LocalStorage()

        })
}
function predicciones(card, lugar) {
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
                    card.title = data["forecastText"]["SPANISH"]
                })
            break;
        case 'Donostia':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${fechaActualSeparada[0]}/${fechaActualSeparada[1]}/${fechaActualSeparada[2]}/for/${fechaMananaSeparada[0]}${fechaMananaSeparada[1]}${fechaMananaSeparada[2]}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    card.title = data["forecastText"]["SPANISH"]
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
                    card.title = data["forecastText"]["SPANISH"]
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
                    card.title = data["forecastText"]["SPANISH"]
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
                    card.title = data["forecastText"]["SPANISH"]
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
                    card.title = data["forecastText"]["SPANISH"]
                })
            break;
    }
}

function ActualizarDatos() {
    fetch(`http://10.10.17.121:8086/api/recoger`)
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
// function RecogerLocalizaciones(idsZonas) {
//     let localizaciones = new Array()
//     for (let zona of idsZonas) {
//         fetch(`https://api.euskadi.eus/euskalmet/geo/regions/basque_country/zones/${zona}/locations`, options)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("La solicitud no se pudo completar correctamente.");
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // console.log(data["forecastText"])
//                 for (let location of data) {
//                     if (location["regionZoneLocationId"] == "barakaldo" || location["regionZoneLocationId"] == "bilbao" || location["regionZoneLocationId"] == "irun" || location["regionZoneLocationId"] == "zarautz" || location["regionZoneLocationId"] == "errenteria" || location["regionZoneLocationId"] == "donostia") {
//                         console.log(location)
//                         localizaciones.push(location["regionZoneLocationId"])
//                     }
//                 }
//             })
//     }

//     return localizaciones
// }

// function RecogerDatosApi(codigos) {
//     for (let provincia in codigos) {
//         for (let carac in codigos[provincia]) {
//             for (let ciudadCOD in codigos[provincia][carac]) {
//                 fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${codigos[provincia].ID}/municipios/${codigos[provincia][carac][ciudadCOD]}`)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error("La solicitud no se pudo completar correctamente.");
//                         }
//                         return response.json();
//                     })
//                     .then(data => {

//                         let ciudad = {
//                             nombre: data["municipio"]["NOMBRE"],
//                             latitud: data["municipio"]["LATITUD_ETRS89_REGCAN95"],
//                             longitud: data["municipio"]["LONGITUD_ETRS89_REGCAN95"],
//                             temperatura: ((data["temperatura_actual"] == "") ? 0 : data["temperatura_actual"]),
//                             humedad: ((data["humedad"] == "") ? 0 : data["humedad"]),
//                             lluvia: ((data["lluvia"] == "") ? 0 : data["lluvia"]),
//                             viento: ((data["viento"] == "") ? 0 : data["viento"]),
//                             precipitacion: ((data["precipitacion"] == "") ? 0 : data["precipitacion"])
//                         }
//                         if (codigos[provincia][carac][ciudadCOD] == 20069) {
//                             ciudad.nombre = "Donostia"
//                         }
//                         lugares.push(ciudad)
//                     })
//             }
//         }
//     }
// }



// function DatosAleatorios(ciudades) { //cada minuto
//     let ciudadesAleatorias = ciudades
//     ciudadesAleatorias.forEach(ciudad => {
//         ciudad["temperatura"] = parseInt(ciudad["temperatura"]) + (Math.round(Math.random()) * 2 - 1)
//         ciudad["humedad"] = parseInt(ciudad["humedad"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
//         ciudad["lluvia"] = parseInt(ciudad["lluvia"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
//         ciudad["viento"] = parseInt(ciudad["viento"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
//         ciudad["precipitacion"] = parseInt(ciudad["precipitacion"]) + ((Math.round(Math.random()) * 2 - 1) < 0 ? 1 : (Math.round(Math.random()) * 2 - 1))
//     });
//     return ciudadesAleatorias
// }

// function ActualizarDatos(lugares) {
//     for (let i = 0; i < lugares.length; i++) {
//         fetch(`http://10.10.17.121:8083/api/actualizar?nombre=${ciudades[i].nombre}&temperatura=${ciudades[i].temperatura}&humedad=${ciudades[i].humedad}&viento=${ciudades[i].viento}&lluvia=${ciudades[i].lluvia}&precipitacion=${ciudades[i].precipitacion}`, optionsPOST)
//     }
// }
