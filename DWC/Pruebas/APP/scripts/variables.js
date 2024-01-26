var lugares = [
    { "nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896, "temperatura": "12ºC", "humedad": "23%", "viento": "22 m/s", "nubes": "100%", "lluvia": "5000mm" },
    { "nombre": "Donosti", "latitud": 43.3183, "longitud": -1.9812, "temperatura": "21ºC", "humedad": "53%", "viento": "12 m/s", "nubes": "43%", "lluvia": "300mm" },
    { "nombre": "Renteria", "latitud": 43.3119, "longitud": -1.8985, "temperatura": "5ºC", "humedad": "39%", "viento": "32 m/s", "nubes": "0%", "lluvia": "0mm" },
    { "nombre": "Bilbao", "latitud": 43.266134, "longitud": -2.936054, "temperatura": "30ºC", "humedad": "78%", "viento": "42 m/s", "nubes": "200%", "lluvia": "10mm" }
]
const codigos = {
    Bizkaia: {
        ID: 48,
        Ciudades: {
            Bilbao: 48020,
            Barakaldo: 48013
        }

    },
    Gipuzkoa: {
        ID: 20,
        Ciudades: {
            Zarautz: 20079,
            Irun: 20045,
            Errenteria: 20067,
            Donosti: 20069
        }
    },
}
const contenedor = document.getElementById("contenedor")
let graficos = new Array()
let cont = 0
let ciudades = new Object()
