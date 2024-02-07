//Funcion para recoger datos de la base la primera vez y crear el html
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
                var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map); //Marcador que aparece en el mapa
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
                    permanent: false,
                    direction: 'top',
                    offset: L.point(-15, -8)
                })


            })

            let clases = [] //Variable para guardar la clase con el mismo nombre de la ciudad

            $(".Vien,.Nube,.Lluv").on('dragstart', function (event) {
                if ($(this).parent().parent()[0].className == 'cuerpo') {

                    clases = $(this).parent().parent().parent()[0].className.split(" ")
                }
                else {
                    clases = $(this).parent().parent()[0].className.split(" ") //Guardar las clases de la card en la que se empieza el drag, es decir si la card tiene clases 'card' y 'Bilbo' se guardaria asi ['card','Bilbo']

                }
                event.originalEvent.dataTransfer.setData("text/plain", event.target.className.split(" ")[1]);
            });

            $(".cuerpo,.header").on('dragover', function (event) {
                event.preventDefault();
            });

            $(".cuerpo").on('drop', function (event) {
                event.preventDefault();
                if ($(this).parent()[0].className.split(" ")[1] == clases[1]) { //Condicion para comprobar que la card donde estamos dropeando es la misma en la que hemos empezado el drag
                    var data = event.originalEvent.dataTransfer.getData("text/plain");

                    var draggedElement = document.getElementsByClassName(data)[0] //Conseguir la imagen que se esta drageando;

                    let parrafo = document.createElement("p")

                    let div = document.createElement("div")
                    div.className += "Icono "
                    if (event.target !== draggedElement && event.target.tagName != "IMG" && event.target.tagName != "P" && event.target.className != "Icono") { //Condicion para solo poder dropear en los espacios en blanco de la card
                        lugares.forEach(element => {
                            if (element.nombre == clases[1]) {
                                switch (data.match(/.{1,3}./)[0]) { //Separar de el nombre de la clase el numero asignado para identificar en que lugar estaba
                                    case 'Vien':
                                        parrafo.innerHTML = "Viento: " + element.viento + "m/s";
                                        break;
                                    case 'Nube':
                                        parrafo.innerHTML = "Precipitacion: " + element.precipitacion + "%";
                                        break;
                                    case 'Lluv':
                                        parrafo.innerHTML = "Lluvia: " + element.lluvia + "mm";
                                        break;
                                    case '':
                                        parrafo.innerHTML;
                                        break;
                                }
                                div.appendChild(draggedElement)
                                div.appendChild(parrafo)
                                event.target.appendChild(div)
                            }
                        })
                    }
                }
                clases = [] //Vaciar array donde se guardaban las clases de la card
            });

            $(".header").on('drop', function (event) {
                event.preventDefault();
                if ($(this).parent()[0].className.split(" ")[1] == clases[1]) { //Condicion para comprobar que la card donde estamos dropeando es la misma en la que hemos empezado el drag
                    var data = event.originalEvent.dataTransfer.getData("text/plain");

                    var draggedElement = document.getElementsByClassName(data)[0] //Conseguir la imagen que se esta drageando;
                    console.log($(draggedElement).parent().parent()[0].removeChild($(draggedElement).parent()[0]))

                    event.target.appendChild(draggedElement)
                }
                clases = [] //Vaciar array donde se guardaban las clases de la card
            });
            LocalStorage()

        })
}

//Funcion para coger de la API las predicciones de las localizaciones
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

//Funcion para recoger los datos nuevos de la base de datos y asignarlos a la variable de lugares ya existente
function ActualizarDatos() {
    fetch(`http://10.10.17.121:8086/api/recoger`)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            lugares = data.localizaciones
        })
}