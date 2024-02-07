//Variable constante para guardar el metodo y la token de euskalmet
const options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXVAcGxhaWF1bmRpLm5ldCJ9.WmgNDEzi60hZ9lzj0lkmLEVgUdJN8Mw24kJacq2u9BMuhaycjTKqerRp9QmnVbez3iyqmsABu93rNPeFAuKvPIohyRBe2a1j4iclFT7Ro5slaBlhsTWiaB874mKCMbX2JSNYu_IqArqEcVblHxfZEtdT2jo1aw63-KGpggSzyYpAUeM32WGsUGs34L1CF55bwmj3risa8KMp9BfB4cOykcP4qX-lE2P2MiL0ea2lhUTWtAv943JhsHNTYKBwXU56otJwHMKPwCVL3_CwhLgYcoyFtLGKx9zFm2wTmJqegFJWtZ2CSoRBoXkefsq9atjTZ2OfSd4pPolRVo2dlCLY8g'
    }
}

//Variable constante para guardar el metodo post
const optionsPOST = {
    method: 'POST',
}

//Variable para recoger las localizaciones que hay en el localStorage 
let lugaresGuardados = localStorage.getItem('lugares') || ""
lugaresGuardados = lugaresGuardados.split(',')

//Variable para recoger la fecha de hoy
let fechaActual = new Date()
//Variable para recoger la fecha de mañana
let fechaManana = new Date()
fechaManana.setDate(parseInt(fechaActual.getDate()) + 1)

//Variable para separar la fecha en un  array de la siguiente manera ['YYYY','MM','dd']
let fechaActualSeparada = fechaActual.toISOString().split('T')[0].split('-')
let fechaMananaSeparada = fechaManana.toISOString().split('T')[0].split('-')

//Variable constante para recoger el contenedor done se guardaran las cards
const contenedor = document.getElementById("contenedor")
//Array para guardar los graficos creados
let graficos = new Array()
//Variable contador para el drag&&drop
let cont = 0
//Variable para guardar los lugares
let lugares = new Array()
//Varibale para guardar la token de autentificacion
let token = localStorage.getItem('token')