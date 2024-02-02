function MostrarCard(lugar) {
    let card = document.getElementsByClassName(lugar)[0]
    let color = 0
    if (card.style.display == "none") {
        card.style.display = "block"
        if (!lugaresGuardados.includes(card.className.split(' ')[1])) {
            lugaresGuardados.push(card.className.split(' ')[1])
        }
        localStorage.setItem('lugares', lugaresGuardados)
        color++
    }
    else {
        card.style.display = "none"
        color--
        lugaresGuardados = lugaresGuardados.filter(lugar => lugar != card.className.split(' ')[1])
        console.log(lugaresGuardados)
        localStorage.setItem('lugares', lugaresGuardados)
    }
    return color
}

function CrearCard(lugar, cont) {
    let card = document.createElement("div")
    card.className += `card ${lugar.nombre}`
    card.style.display = "none"
    card.appendChild(CrearHeaderCard(cont))
    card.appendChild(CrearCuerpoCard(lugar))
    card.appendChild(CrearFooterCard(lugar))
    predicciones(card, lugar.nombre)

    contenedor.appendChild(card)
}

function CrearHeaderCard(cont) {
    let header = document.createElement("div")
    header.className += `header`
    header.innerHTML = `<img class="Vien Vien${cont}" alt="Viento" src="imagenes/Viento.png" height="40px">
                        <img class="Nube Nube${cont}" alt="Nubes" src="imagenes/Nubes.png" height="40px">
                        <img class="Lluv Lluv${cont}" alt="Lluvia" src="imagenes/Lluvia.png" height="40px">`
    return header
}

function CrearCuerpoCard(lugar) {
    let cuerpo = document.createElement("div")
    cuerpo.className += `cuerpo`
    for (let key in lugar) {
        let div = document.createElement("div")
        div.className += "Icono"

        let parrafo = document.createElement("p")
        parrafo.style.color = "rgb(38, 106, 170)"
        parrafo.style.display = "inline-block"

        let img = new Image()
        img.height = 40
        img.style.display = "inline-block"
        img.style.marginLeft = "2%"


        switch (key) {
            case 'temperatura':
                parrafo.innerHTML = "Temperatura: " + lugar.temperatura + "ºC"
                img.src = "imagenes/Temp.png"
                img.alt = "Temperatura"
                div.appendChild(img)
                div.appendChild(parrafo)
                cuerpo.appendChild(div)
                break;
            case 'humedad':
                parrafo.innerHTML = "Humedad: " + lugar.humedad + "%"
                img.src = "imagenes/Humedad.png"
                img.alt = "Humedad"
                div.appendChild(img)
                div.appendChild(parrafo)
                cuerpo.appendChild(div)

                break;
        }
    }


    return cuerpo
}

function CrearFooterCard(lugar) {
    let footer = document.createElement("div")
    footer.className += `footer`
    footer.innerHTML = `<h1>${lugar.nombre}</h1> <button onclick="AlternarGrafico('${lugar.nombre}')">Grafico</button>`
    return footer
}

function OcultarCard(lugar) {
    document.getElementsByClassName(lugar)[0].style.display = "none"
}

function ActualizarInfoCard(lugar) {
    let cuerpocard = document.getElementsByClassName(`cuerpo`)
    for (let card of cuerpocard) {
        if (card.parentElement.className.split(" ")[1] == lugar.nombre) {
            for (let icono of card.children) {
                if (icono.className == "Icono") {
                    switch (icono.children[1].innerHTML.split(": ")[0]) {
                        case "Temperatura":
                            icono.children[1].innerHTML = `Temperatura: ${lugar.temperatura}ºC` // icono.children[1].innerHTML= `Temperatura: ${lugar.temperatura}ºC`
                            break;
                        case "Humedad":
                            icono.children[1].innerHTML = `Humedad: ${lugar.humedad}%` // icono.children[1].innerHTML= `Humedad: ${lugar.humedad}ºC`
                            break;
                        case "Viento":
                            icono.children[1].innerHTML = `Viento: ${lugar.viento}m/s` // icono.children[1].innerHTML= `Viento: ${lugar.viento}ºC`
                            break;
                        case "Precipitacion":
                            icono.children[1].innerHTML = `Precipitacion: ${lugar.precipitacion}%` // icono.children[1].innerHTML= `Nubes: ${lugar.precipitacion}ºC`
                            break;
                        case "Lluvia":
                            icono.children[1].innerHTML = `Lluvia: ${lugar.lluvia}mm` // icono.children[1].innerHTML= `Lluvia: ${lugar.lluvia}ºC`
                            break;
                        default:
                            break;
                    }

                }
            }
        }
    }
}

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