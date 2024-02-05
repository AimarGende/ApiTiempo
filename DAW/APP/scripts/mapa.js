//Creacion del mapa
var map = L.map('mapid').setView([43.316893, -1.980888], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

