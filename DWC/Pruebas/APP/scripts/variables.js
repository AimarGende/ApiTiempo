
const options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXVAcGxhaWF1bmRpLm5ldCJ9.WmgNDEzi60hZ9lzj0lkmLEVgUdJN8Mw24kJacq2u9BMuhaycjTKqerRp9QmnVbez3iyqmsABu93rNPeFAuKvPIohyRBe2a1j4iclFT7Ro5slaBlhsTWiaB874mKCMbX2JSNYu_IqArqEcVblHxfZEtdT2jo1aw63-KGpggSzyYpAUeM32WGsUGs34L1CF55bwmj3risa8KMp9BfB4cOykcP4qX-lE2P2MiL0ea2lhUTWtAv943JhsHNTYKBwXU56otJwHMKPwCVL3_CwhLgYcoyFtLGKx9zFm2wTmJqegFJWtZ2CSoRBoXkefsq9atjTZ2OfSd4pPolRVo2dlCLY8g'
    }
}
const optionsPOST = {
    method: 'POST',
}
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

let fechaActual = new Date()
let fechaManana = new Date()
fechaManana.setDate(parseInt(fechaActual.getDate()) + 1)
let fechaActualSeparada = fechaActual.toISOString().split('T')[0].split('-')
let fechaMananaSeparada = fechaManana.toISOString().split('T')[0].split('-')

const contenedor = document.getElementById("contenedor")
let graficos = new Array()
let cont = 0
let lugares = new Array()
