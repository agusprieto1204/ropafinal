let totalCarrito = 0;
const carrito = [];

function addToCart(button) {
    const producto = button.closest(".producto");
    const precio = parseFloat(producto.dataset.precio);
    totalCarrito += precio;

    const nombreProducto = producto.querySelector("h2").innerText;
    carrito.push({ nombre: nombreProducto, precio });
    aplicarBonificacion();
    actualizarVisualizacionCarrito();
    guardarCarritoEnLocalStorage();
}

function aplicarBonificacion() {
    let bonificacion = 0;

    if (totalCarrito > 85000) {
        bonificacion = totalCarrito * 0.10;
        mostrarBonificacionInfo("¡Bonificación del 10% aplicada!");
    } else if (totalCarrito > 65000) {
        bonificacion = totalCarrito * 0.05;
        mostrarBonificacionInfo("¡Bonificación del 5% aplicada!");
    }
    totalCarrito -= bonificacion;
}

function mostrarBonificacionInfo(info) {
    const bonificacionInfo = document.getElementById("bonificacion-info");
    bonificacionInfo.innerText = info;
}

function actualizarVisualizacionCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        const listItem = document.createElement("li");
        listItem.innerText = `${item.nombre} - $${item.precio.toFixed(2)}`;
        listaCarrito.appendChild(listItem);
    }

    // total
    const totalCarritoElement = document.getElementById("total-carrito");
    totalCarritoElement.innerText = `Total: $${totalCarrito.toFixed(2)}`;
}

function limpiarCarrito() {
    // limpieza
    carrito.length = 0;
    totalCarrito = 0;

    //  bonificación
    mostrarBonificacionInfo("");

    actualizarVisualizacionCarrito();
    guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("DOMContentLoaded", function () {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarVisualizacionCarrito();
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => addToCart(button));
    });

    const limpiarCarritoButton = document.getElementById("limpiar-carrito-button");
    if (limpiarCarritoButton) {
        limpiarCarritoButton.addEventListener("click", limpiarCarrito);
    }
});
