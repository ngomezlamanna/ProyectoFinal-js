// fotos random para inicio de secion y registrarse

const imgFondoDos = document.querySelector("#fondoAleatorio");

const bgsDos = ["login1.png", "login2.png", "login3.png", "login4.png", "login5.png"];

function cambiarBgsDos(fondos) {
    let random = Math.floor(Math.random() * fondos.length)
    imgFondoDos.setAttribute("src", `../img/imglogin/${fondos[random]}`);
    //console.log(random);
}

window.onload = cambiarBgsDos(bgsDos)

