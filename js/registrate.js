//js para registro.html (registrarse)

const formRegistro = document.querySelector("#formReg"),
    nombre = document.querySelector("#nombre"),
    correo = document.querySelector("#correo"),
    usuario = document.querySelector("#usuario"),
    contrasenia = document.querySelector("#contrasenia"),
    boton = document.querySelector("#botonReg");


// OPERADOR "||"    
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


class Usuario {
    constructor(nombre, correo, usuario, contrasenia) {
        this.nombre = nombre;
        this.correo = correo;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }
}

function usuarioGuardar(usuario) {
    return usuarios.push(usuario);
}

function guardarEnLs(arr) {
    return localStorage.setItem("usuarios", JSON.stringify(arr));
}

formRegistro.addEventListener('submit', (e) => {
    e.preventDefault()
    const newUsuario = new Usuario(nombre.value, correo.value, usuario.value, contrasenia.value);
    usuarioGuardar(newUsuario);
    guardarEnLs(usuarios);

    //vaciar los inputs dsp de submitear
    nombre.value = "";
    correo.value = "";
    usuario.value = "";
    contrasenia.value = "";

    //texto dinamico
    document.querySelector('#usuarioHecho').innerHTML = "<strong style='color: green'>¡Usuario Creado! inicie sesion.</strong>";
})
