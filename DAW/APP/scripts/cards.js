//Funcion para mostrar cards si estan ocultas y esconderals si se estan enseñando
function MostrarCard(lugar) {
    let card = document.getElementsByClassName(lugar)[0] //Encontrar la card que tenga la clase con el nombre del lugar
    let color = 0
    if (card.style.display == "none") {
        card.style.display = "block"
        if (!lugaresGuardados.includes(card.className.split(' ')[1])) { //Si el lugar no esta en el local storage la añade
            lugaresGuardados.push(card.className.split(' ')[1])
        }
        localStorage.setItem('lugares', lugaresGuardados)
        color++
    }
    else {
        card.style.display = "none"
        color--
        lugaresGuardados = lugaresGuardados.filter(lugar => lugar != card.className.split(' ')[1]) //Filtro para eliminar el lugar de la card que acabamos de ocultar
        localStorage.setItem('lugares', lugaresGuardados)
    }
    return color //devovler 1 o -1 para cambiar el color del marcador
}

//Funcion crear las cards
function CrearCard(lugar, cont) {
    let card = document.createElement("div")
    card.className += `card ${lugar.nombre}` //Añadirle a la card la clase 'card' y el nombre del lugar
    card.style.display = "none"
    card.appendChild(CrearHeaderCard(cont))
    card.appendChild(CrearCuerpoCard(lugar))
    card.appendChild(CrearFooterCard(lugar))
    predicciones(card, lugar.nombre)

    contenedor.appendChild(card)
}

//Funcion para crear el header de las cards
function CrearHeaderCard(cont) {
    let header = document.createElement("div")
    header.className += `header`
    header.innerHTML = `<img class="Vien Vien${cont}" alt="Viento" src="imagenes/Viento.png" height="40px">
                        <img class="Nube Nube${cont}" alt="Nubes" src="imagenes/Nubes.png" height="40px">
                        <img class="Lluv Lluv${cont}" alt="Lluvia" src="imagenes/Lluvia.png" height="40px">`
    return header
}

//Funcion para crear el cuerpo de las cards
function CrearCuerpoCard(lugar) {
    let cuerpo = document.createElement("div")
    cuerpo.className += `cuerpo`
    for (let dato in lugar) {
        let div = document.createElement("div")
        div.className += "Icono"

        let parrafo = document.createElement("p")
        let img = new Image()

        switch (dato) { //Para diferenciar que dato se esta poniendo en el cuerpo, es decir temperatura o humedad, y insertar las caracteristicas correspondientes
            case 'temperatura':
                parrafo.innerHTML = "Temperatura: " + lugar.temperatura + "ºC"
                img.src = "imagenes/Temp.png"
                img.alt = "Temperatura"
                //Insertar en el div la imagen y el texto
                div.appendChild(img)
                div.appendChild(parrafo)
                cuerpo.appendChild(div)
                break;
            case 'humedad':
                parrafo.innerHTML = "Humedad: " + lugar.humedad + "%"
                img.src = "imagenes/Humedad.png"
                img.alt = "Humedad"
                //Insertar en el div la imagen y el texto
                div.appendChild(img)
                div.appendChild(parrafo)
                cuerpo.appendChild(div)

                break;
        }
    }
    return cuerpo
}

//Funcion para crear el footer de las cards
function CrearFooterCard(lugar) {
    let footer = document.createElement("div")
    footer.className += `footer`
    footer.innerHTML = `<h1>${lugar.nombre}</h1> <button onclick="AlternarGrafico('${lugar.nombre}')">Grafico</button>`
    return footer
}

//Funcion para ir actualizando los datos que llegan de la base
function ActualizarInfoCard(lugar) {
    let cuerpocard = document.getElementsByClassName(`cuerpo`)
    for (let card of cuerpocard) { //Recorrer todas las cards
        if (card.parentElement.className.split(" ")[1] == lugar.nombre) { //Condicion para encontrar la card a la que se le quieren actualizar los datos
            for (let icono of card.children) { // Recorrer los elemento hijo de el cuerpo de la card del lugar al que queremos actualizar los datos.
                if (icono.className == "Icono") { //Buscar los div que tengan la clase Icono ya que son los que contienen la info
                    switch (icono.children[1].innerHTML.split(": ")[0]) { // Coger el dato meteorologico que se esta enseñando y cambiarle el valor
                        case "Temperatura":
                            icono.children[1].innerHTML = `Temperatura: ${lugar.temperatura}ºC`
                            break;
                        case "Humedad":
                            icono.children[1].innerHTML = `Humedad: ${lugar.humedad}%`
                            break;
                        case "Viento":
                            icono.children[1].innerHTML = `Viento: ${lugar.viento}m/s`
                            break;
                        case "Precipitacion":
                            icono.children[1].innerHTML = `Precipitacion: ${lugar.precipitacion}%`
                            break;
                        case "Lluvia":
                            icono.children[1].innerHTML = `Lluvia: ${lugar.lluvia}mm`
                            break;
                    }

                }
            }
        }
    }
}

//Funcion para mirar el localStorage y mostrar las cards que esten en el
function LocalStorage() {
    lugaresGuardados.forEach(lugar => {
        if (lugar != '') {
            let card = document.getElementsByClassName(lugar)[0]
            if (card != undefined) {
                $(document.getElementsByClassName(`Icon${lugar}`)[0]).css("filter", "hue-rotate(120deg)")
                card.style.display = "block"
            }
        }

    });

}