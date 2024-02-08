let urlActual = (new URL(window.location.origin)).hostname;

//Funcion para recoger los datos del formulario de login y llamar a la ruta de la API para hacer login en la APP
function login(event) {
    event.preventDefault()
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("contrasena").value,
    }
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    } //Variable para poder psarle a la ruta los datos y como se va a ejecutar
    fetch("http://"+urlActual+":8086/api/login", config) //Llamada a ruta de API de login para hacer un login en la base de datos
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data["data"]["token"])
            localStorage.setItem("token", data["data"]["token"])
            window.location.assign("APP.html")
        })
        .catch(error => {
            console.error('API error:', error);
        })
}

//Funcion para llamar a la ruta logout de la API de laravel y cerra sesion en la APP
function logout() {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    } //Variable para mandar la token a la ruta logout y esta pueda eliminarla de la base de datos
    fetch("http://"+urlActual+":8086/api/logout", config) 
    localStorage.removeItem("token") 
    window.location.assign("index.html") 
}

//Funcion para recoger los datos del formulario de register y llamar a la ruta de la API para registrarse en la APP
function register(event) {
    event.preventDefault()
    let data = {
        name: document.getElementById("usuario").value,
        email: document.getElementById("correo").value,
        password: document.getElementById("contrasenaReg").value,
        c_password: document.getElementById("confcontrasena").value
    }
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }//Variable para poder psarle a la ruta los datos


    fetch("http://"+urlActual+":8086/api/register", config)//Llamada a la ruta para registrarse con los datos del formulario y entrar a la APP
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token", data["data"]["token"])
            window.location.assign("APP.html")
        })
        .catch(error => {
            console.error('API error:', error);
        })
}