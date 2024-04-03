let camisetas = [];

fetch("json/camis.json")
    .then(response => response.json())
    .then(data => {
        camisetas = data;
        // Llamar a la función para crear las camisetas dinámicamente
        bucleCamisetas(camisetas);
    })

const contCamisetas = document.querySelector("#contCamisetas"),
    contCarrito = document.querySelector(".contCarrito"),
    vaciarCarritoBtn = document.querySelector("#vaciarCarritoBtn"),
    comprarBtn = document.querySelector("#comprarBtn"),
    totPrecio = document.querySelector("#totalPrecio"),
    filtrar = document.querySelector("#buscador"),
    mensajeNoEncontrado = document.createElement("p"); // Crear elemento <p> para mensaje de país no encontrado (filtrar)

// array vacio del carrito
let carrito = [];

// Función para guardar el carrito en localStorage (carrito)
function guardarCarritoEnLs() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage (carrito)
function cargarCarritoDesdeLs() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Función para agregar camiseta al carrito (Carrito)
function agregarAlCarrito(camiseta) {
    carrito.push(camiseta);
    actualizarCarrito();
    guardarCarritoEnLs();
}

// Evento para vaciar el carrito (carrito)
vaciarCarritoBtn.addEventListener("click", () => {
    if (carrito.length != 0) {
        // sweetalert
        Swal.fire({
            title: "¿Quieres limpiar el carrito?",
            text: "¡Perderás todas las camisetas agregadas!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Vaciar carrito"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Limpio!",
                    text: "¡Tu carrito ha sido vaciado!",
                    icon: "info"
                });
                // limpiar carrito
                carrito = [];
                actualizarCarrito();
                guardarCarritoEnLs();
            }
        });
    } else {
        document.querySelector('#mensajeCompra').innerHTML = "<strong style='color: red'>¡No hay camisetas en el carrito para vaciar!</strong>";
    }
});

// Evento para comprar camisetas (carrito)
comprarBtn.addEventListener("click", () => {
    if (carrito.length > 0) {
        // Mostrar mensaje de compra (sweetalert)
        Swal.fire({
            title: "¡Compra Realizada!",
            text: "¡Su pedido será entregado próximamente!",
            icon: "success"
        });

        // limpiar carrito
        carrito = [];
        actualizarCarrito();
        guardarCarritoEnLs();
        document.querySelector('#mensajeCompra').innerHTML = "";
    } else {
        document.querySelector('#mensajeCompra').innerHTML = "<strong style='color: red'>¡No hay camisetas en el carrito para comprar!</strong>";
    }
});

// Función para actualizar la visualización del carrito (Carrito)
function actualizarCarrito() {
    contCarrito.innerHTML = "";
    carrito.forEach((camiseta, index) => {
        const div = document.createElement("div");
        div.classList.add("prodCarrito");
        div.innerHTML = `
            <div><p class="my-0">${camiseta.equipo}</p></div>
            <div><p class="my-0">$${camiseta.precio}</p></div>
            <button class="eliminarBtn" data-index="${index}"><i class="bi bi-trash-fill"></i></button>
        `;
        contCarrito.append(div);
    });

    // Agregar evento de clic a los botones de eliminar
    const eliminarBtns = document.querySelectorAll(".eliminarBtn");
    eliminarBtns.forEach(btn => {
        btn.addEventListener("click", (event) => {
            Toastify({
                text: "Camiseta Eliminada",
                duration: 1000,
                gravity: "top",
                position: "right",
                stopOnFocus: false,
                style: {
                    background: "linear-gradient(to right, #c97d36, #d1853d)",
                    border: "2px solid white",
                    borderRadius: "1rem"
                },
                offset: {
                    x: 15,
                    y: 15
                },
                onClick: function () { }
            }).showToast();
            const index = parseInt(event.target.getAttribute("data-index"));
            eliminarDelCarrito(index);
        });
    });

    // Calcular el total del carrito (carrito)
    const total = carrito.reduce((acc, camiseta) => acc + camiseta.precio, 0);
    totPrecio.textContent = `$${total}`;

    // Mostrar mensaje de carrito vacío si está vacío (carrito)
    if (carrito.length === 0) {
        contCarrito.innerHTML = '<strong class="carritoVacio">Carrito vacío</strong>';
    }
}

// Función para eliminar una camiseta del carrito (Carrito)
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar la camiseta del carrito usando el índice (index)
    actualizarCarrito(); // Actualizar la visualización del carrito
    guardarCarritoEnLs(); // Guardar el carrito actualizado en localStorage
}

// Función para crear las camisetas dinámicamente (productos)
function bucleCamisetas(camisetasFiltradas) {
    contCamisetas.innerHTML = "";
    camisetasFiltradas.forEach(camiseta => {
        const div = document.createElement("div");
        div.classList.add("camiseta");
        div.innerHTML = `   
            <img class="imgProductos" src="${camiseta.imagen}" alt="camiseta de ${camiseta.equipo}">
            <div class="prodInfo py-2">
                <div class="prodTexto">
                    <p class="mb-0 fs-6">${camiseta.pais}</p>
                    <h3 class="mb-0 fs-6 fw-bold">${camiseta.equipo}</h3>
                </div>
                <div class="prodTexto pb-2">
                    <p class="mb-0">${camiseta.ano}</p>
                    <h3 class="mb-0 fw-bold">$${camiseta.precio}</h3>
                </div>
                <button class="agregarBtn"><i class="bi bi-cart-plus-fill"></i> Agregar</button>
            </div>
        `;

        contCamisetas.append(div);

        // Agregar evento de clic al botón de agregar
        div.querySelector(".agregarBtn").addEventListener("click", () => {
            agregarAlCarrito(camiseta);
            document.querySelector('#mensajeCompra').innerHTML = "";
            Toastify({
                text: "Camiseta Agregada",
                duration: 1000,
                gravity: "top",
                position: "left",
                stopOnFocus: false,
                style: {
                    background: "linear-gradient(to right, #c97d36, #d1853d)",
                    border: "2px solid white",
                    borderRadius: "1rem"
                },
                offset: {
                    x: 15,
                    y: 15
                },
                onClick: function () { }
            }).showToast();
        });

    });
}

// Función para limpiar el contenedor de camisetas (Filtrar) 
function limpiarContCamisetas() {
    contCamisetas.innerHTML = "";
}

// Función para filtrar las camisetas por país (filtrar)
function filtrarCamisetas(pais) {
    limpiarContCamisetas();
    const camisetasFiltradas = camisetas.filter(camiseta =>
        camiseta.pais.toLowerCase().includes(pais.toLowerCase())
    );
    if (camisetasFiltradas.length === 0) {
        mensajeNoEncontrado.innerHTML = "<strong class='sinPais'>No se venden camisetas de un pais con esa combinacion de letras.</strong>";
        contCamisetas.append(mensajeNoEncontrado);
    } else {
        mensajeNoEncontrado.textContent = "";
        bucleCamisetas(camisetasFiltradas);
    }
}

// Evento para filtrar camisetas al enviar el formulario (filtrar)
filtrar.addEventListener("submit", (event) => {
    event.preventDefault();
    const pais = filtrar.querySelector("input[type='search']").value;
    filtrarCamisetas(pais);
});

// Cargar el carrito al recargar la página ()
cargarCarritoDesdeLs();

