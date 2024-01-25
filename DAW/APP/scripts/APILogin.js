function logout() {
    let config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch("http://10.10.17.121:8086/api/logout", config)
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no se pudo completar correctamente.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
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
            console.log(data)
        })
}

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
            console.log(data)
        })
}