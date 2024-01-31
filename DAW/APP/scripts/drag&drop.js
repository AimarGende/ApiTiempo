let clases = []

$(".Vien,.Nube,.Lluv").on('dragstart', function (event) {
    clases = $(this).parent().parent()[0].className.split(" ")
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
        if (event.target !== draggedElement && event.target.tagName != "IMG" && event.target.tagName != "P") {
            $(draggedElement).attr('draggable', false)
            lugares.forEach(element => {
                if (element.nombre == clases[1]) {
                    switch (data.match(/.{1,3}./)[0]) {
                        case 'Vien':
                            parrafo.innerHTML = "Viento: " + element.viento;
                            break;
                        case 'Nube':
                            parrafo.innerHTML = "Nubes: " + element.nubes;
                            break;
                        case 'Lluv':
                            parrafo.innerHTML = "Lluvia: " + element.lluvia;
                            break;
                        case '':
                            parrafo.innerHTML;
                            break;
                    }
                    div.appendChild(draggedElement)
                    div.appendChild(parrafo)
                    event.target.appendChild(div);
                }
            })
        }
    }
    clases = []
});