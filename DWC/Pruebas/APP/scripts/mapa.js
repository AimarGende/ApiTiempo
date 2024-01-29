
var map = L.map('mapid').setView([43.316893, -1.980888], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

lugares.forEach(lugar => {
    console.log(lugar)
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
