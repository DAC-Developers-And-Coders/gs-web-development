const register = () => {
    const login = document.getElementById("user").value
    const password = document.getElementById("password").value 

    if(login === "" || password === ""){
        alert("falta preencher a senha ou o usuário")
        return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []
    const existentUsers = users.find(user => user.login === login)

    if(existentUsers){
        alert("Usuário já existe")
        return
    }

    users.push({
        login:login,
        password:password
    })

    localStorage.setItem("users", JSON.stringify(users))
    alert("Usuário cadastrado")
}

const login = () => {
    const login = document.getElementById("user").value
    const password = document.getElementById("password").value

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user =>
        user.login === login && user.password === password
    );

    if(validUser){
        alert("Login realizado com sucesso");
        window.location.href = "index.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
}