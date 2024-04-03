// fotos random para inicio de secion y registrarse

const imgFondo = document.querySelector("#fondoAleat");

const bgs = ["login1.png", "login2.png", "login3.png", "login4.png", "login5.png"];

function cambiarBgs(fondos) {
    let random = Math.floor(Math.random() * fondos.length)
    imgFondo.setAttribute("src", `img/imglogin/${fondos[random]}`);
    //console.log(random);
}

window.onload = cambiarBgs(bgs)


