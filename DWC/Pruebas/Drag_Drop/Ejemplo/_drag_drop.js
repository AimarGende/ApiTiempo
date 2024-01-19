$(document).ready(function() {
    // Hacer que la imagen sea arrastrable
    // $("#Alfil").attr('draggable', false);

    $("#Caballo,#Alfil").on('dragstart', function(event) {
        console.log(event.target.id)
        event.originalEvent.dataTransfer.setData("text/plain", event.target.id);
    });

    // Permitir que el destino reciba elementos arrastrados
    $("#destino,#inicio,body").on('dragover', function(event) {
        event.preventDefault();
    });

    $("#destino,#inicio").on('dragover', function(event) {
        $(this).css('background-color', $(this).css("border-color"))

    });
 
    $("#destino,#inicio").on('dragleave', function(event) {
        $(this).css('background-color', 'white')
    }); 
 
    // Manejar la acción de soltar el elemento

    $("#destino").on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text/plain");
        
        var draggedElement = document.getElementById(data);
        if (event.target !== draggedElement && data == 'Caballo') {
            event.target.appendChild(draggedElement);
            $(draggedElement).attr('draggable', false)
        }
        $(this).css('background-color', 'white')
    });

    $("#inicio").on('drop', function(event) {
        event.preventDefault();
        var data = event.originalEvent.dataTransfer.getData("text/plain");
        var draggedElement = document.getElementById(data);
        if (event.target !== draggedElement && data == 'Alfil') {
            event.target.appendChild(draggedElement);
            $(draggedElement).attr('draggable', false)
        }
        $(this).css('background-color', 'white')
        
    });
});
// && !draggedElement.contains(event.target) && !event.target.hasChildNodes()