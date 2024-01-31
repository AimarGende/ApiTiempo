/*Graficos*/
function CrearDialog(lugar) {
    let dialog = document.createElement("div")
    dialog.className += `grafico graf${lugar.nombre}`
    dialog.title = `${lugar.nombre}`
    document.body.appendChild(dialog)
    $(".grafico").dialog({
        height: 400,
        width: 600,
        autoOpen: false,
    });
    graficos.push(CrearGrafico(dialog, lugar.nombre))
}

//Funcion para ir recogiendo nuevos datos
function NumRandom() {
    let numeros = new Array()
    for (let i = 0; i < 10; i++) {
        numeros.push(Math.floor(Math.random() * 20))
    }
    return numeros
}

function CrearGrafico(dialog, lugar) {
    let canvas = document.createElement("canvas")
    canvas.id += `canv${lugar}`
    dialog.appendChild(canvas)
    let graf = new Chart(canvas.id, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Temperatura',
                data: NumRandom(),
                borderWidth: 1
            }, {
                label: 'Humedad',
                data: NumRandom(),
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return graf
}

function AlternarGrafico(lugar) {
    if ($(`.graf${lugar}`).dialog("isOpen")) {
        $(`.graf${lugar}`).dialog("close")
    }
    else {
        $(`.graf${lugar}`).dialog("open")
    }
}

function ActualizarGraf() {
    graficos.forEach(grafico => {
        for (let i = 0; i < grafico.data.datasets.length; i++) {
            grafico.data.datasets[i].data = NumRandom()
        }
        grafico.update()
    });
}