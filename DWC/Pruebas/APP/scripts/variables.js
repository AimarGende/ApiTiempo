
const options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXVAcGxhaWF1bmRpLm5ldCJ9.WmgNDEzi60hZ9lzj0lkmLEVgUdJN8Mw24kJacq2u9BMuhaycjTKqerRp9QmnVbez3iyqmsABu93rNPeFAuKvPIohyRBe2a1j4iclFT7Ro5slaBlhsTWiaB874mKCMbX2JSNYu_IqArqEcVblHxfZEtdT2jo1aw63-KGpggSzyYpAUeM32WGsUGs34L1CF55bwmj3risa8KMp9BfB4cOykcP4qX-lE2P2MiL0ea2lhUTWtAv943JhsHNTYKBwXU56otJwHMKPwCVL3_CwhLgYcoyFtLGKx9zFm2wTmJqegFJWtZ2CSoRBoXkefsq9atjTZ2OfSd4pPolRVo2dlCLY8g'
    }
}
const optionsPOST = {
    method: 'POST',
}

let lugaresGuardados = localStorage.getItem('lugares') || ""
lugaresGuardados = lugaresGuardados.split(',')

let fechaActual = new Date()
let fechaManana = new Date()
fechaManana.setDate(parseInt(fechaActual.getDate()) + 1)
let fechaActualSeparada = fechaActual.toISOString().split('T')[0].split('-')
let fechaMananaSeparada = fechaManana.toISOString().split('T')[0].split('-')

const contenedor = document.getElementById("contenedor")
let graficos = new Array()
let cont = 0
// let lugares = new Array()
let lugares = [
    { "nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896, "temperatura": "12", "humedad": "23", "viento": "22", "precipitacion": "100", "lluvia": "5000" },
    { "nombre": "Donostia", "latitud": 43.3183, "longitud": -1.9812, "temperatura": "21", "humedad": "53", "viento": "12", "precipitacion": "43", "lluvia": "300" },
    { "nombre": "Errenteria", "latitud": 43.3119, "longitud": -1.8985, "temperatura": "5", "humedad": "39", "viento": "32", "precipitacion": "0", "lluvia": "0" },
    { "nombre": "Bilbao", "latitud": 43.266134, "longitud": -2.936054, "temperatura": "30", "humedad": "78", "viento": "42", "precipitacion": "200", "lluvia": "10" }
]



// const codigos = {
//     Bizkaia: {
//         ID: 48,
//         Ciudades: {
//             Bilbao: 48020,
//             Barakaldo: 48013
//         }

//     },
//     Gipuzkoa: {
//         ID: 20,
//         Ciudades: {
//             Zarautz: 20079,
//             Irun: 20045,
//             Errenteria: 20067,
//             Donosti: 20069
//         }
//     },
// }