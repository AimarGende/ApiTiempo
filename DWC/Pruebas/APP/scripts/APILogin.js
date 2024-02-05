//Reocger fotmulario login y añadirle un evento para cuando se haga un submit ejecute la funcion login()
let formLogin = document.getElementById("login")
formLogin.addEventListener("submit", event => {
    event.preventDefault()
    login()
})
//Reocger fotmulario register y añadirle un evento para cuando se haga un submit ejecute la funcion register()
let formrRegister = document.getElementById("register")
formrRegister.addEventListener("submit", event => {
    event.preventDefault()
    console.log()
    register()
})

//Funcion para recoger los datos del formulario de login y llamar a la ruta de la API para hacer login 
function login() {
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
    }
    fetch("http://10.10.17.121:8086/api/login", config)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data["data"]["token"])
            localStorage.setItem("token",data["data"]["token"])
            window.location.assign("algo.html")
        })
        .catch(error => {
            console.error('API error:', error);
        })
}

//Funcion para llamar a la ruta logout de la API de laravel
function logout() {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    }
    fetch("http://10.10.17.121:8086/api/logout", config)
}

//Funcion para recoger los datos del formulario de register y llamar a la ruta de la API para hacer register
function register() {
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
    }


    fetch("http://10.10.17.121:8086/api/register", config)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data["data"]["token"])
            localStorage.setItem("token",data["data"]["token"])
            window.location.assign("algo.html")
        })
        .catch(error => {
            console.error('API error:', error);
        })
}