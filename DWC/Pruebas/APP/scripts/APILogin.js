let formLogin = document.getElementById("login")
formLogin.addEventListener("submit", event => {
    event.preventDefault()
    login()
})

let formrRegister = document.getElementById("register")
formrRegister.addEventListener("submit", event => {
    event.preventDefault()
    console.log()
    register()
})


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