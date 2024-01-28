function MostrarCard(lugar) {
    let card = document.getElementsByClassName(lugar)[0]
    let color = 0
    if (card.style.display == "none") {
        card.style.display = "block"
        color++
    }
    else {
        card.style.display = "none"
        $(document.getElementsByClassName(`Icon${lugar.nombre}`)[0]).css("filter", "hue-rotate(-120deg)")
        color--
    }
    return color
}

function CrearCard(lugar, cont) {
    let card = document.createElement("div")
    card.className += `card ${lugar.nombre}`
    card.style.display = "none"

    card.appendChild(CrearHeaderCard(lugar, cont))
    card.appendChild(CrearCuerpoCard(lugar))
    card.appendChild(CrearFooterCard(lugar))

    contenedor.appendChild(card)
}

function CrearHeaderCard(lugar, cont) {
    let header = document.createElement("div")
    header.className += `header`
    header.innerHTML = `<img class="Vien Vien${cont}" alt="Viento" src="Viento.png" height="40px">
                        <img class="Nube Nube${cont}" alt="Nubes" src="Nubes.png" height="40px">
                        <img class="Lluv Lluv${cont}" alt="Lluvia" src="Lluvia.png" height="40px">`
    return header
}

function CrearCuerpoCard(lugar) {
    let cuerpo = document.createElement("div")
    cuerpo.className += `cuerpo`
    for (let key in lugar) {
        let div = document.createElement("div")
        div.className += "Icono"

        let parrafo = document.createElement("p")
        parrafo.style.color = "rgba(70, 202, 246)"
        parrafo.style.display = "inline-block"

        let img = new Image()
        img.height = 40
        img.style.display = "inline-block"
        img.style.marginLeft = "2%"


        switch (key) {
            case 'temperatura':
                parrafo.innerHTML = "Temperatura: " + lugar.temperatura
                img.src = "Temp.png"
                img.alt = "Temperatura"
                div.appendChild(img)
                div.appendChild(parrafo)
                cuerpo.appendChild(div)
                break;
            case 'humedad':
                parrafo.innerHTML = "Humedad: " + lugar.humedad
                img.src = "Humedad.png"
                img.alt = "Humedad"
                div.appendChild(img)
                div.appendChild(parrafo)
                cuerpo.appendChild(div)

                break;
        }
    }

    predicciones(cuerpo, lugar.nombre)

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
                            icono.children[1].innerHTML = `Temperatura: ${NumRandom()[0]}ºC` // icono.children[1].innerHTML= `Temperatura: ${lugar.temperatura}ºC`
                            break;
                        case "Humedad":
                            icono.children[1].innerHTML = `Humedad: ${NumRandom()[0]}%` // icono.children[1].innerHTML= `Humedad: ${lugar.humedad}ºC`
                            break;
                        case "Viento":
                            icono.children[1].innerHTML = `Viento: ${NumRandom()[0]}m/s` // icono.children[1].innerHTML= `Viento: ${lugar.viento}ºC`
                            break;
                        case "Nubes":
                            icono.children[1].innerHTML = `Nubes: ${NumRandom()[0]}%` // icono.children[1].innerHTML= `Nubes: ${lugar.nubes}ºC`
                            break;
                        case "Lluvia":
                            icono.children[1].innerHTML = `Lluvia: ${NumRandom()[0]}mm` // icono.children[1].innerHTML= `Lluvia: ${lugar.lluvia}ºC`
                            break;
                        default:
                            break;
                    }

                }
            }
        }
    }
}