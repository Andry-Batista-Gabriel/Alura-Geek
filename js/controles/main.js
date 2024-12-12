import {serviciosProductos} from "../servicios/servicio-productos.js";

const contenedorProductos = document.querySelector("[data-producto]");
const formulario = document.querySelector("[data-formulario]");

// Crea la estructura HTML para ser renderizada dinámicamente con JS
function crearTarjeta({ nombre, precio, imagen, id }) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML = `
        <div class="img-container">
            <img src=${imagen} alt=${nombre}>
        </div>
        <div class="tarjeta-contenedor--info">
            <h2 class="produc-name">${nombre}</h2>
            <div class="tarjeta-contenedor--valor">
                <p class="precio">$${precio}</p>
                <button class="boton-eliminar" data-id=${id}>
                    <img src="imagenes/btn-eliminar.png" alt="Eliminar">
                </button>
            </div>
        </div>
    `;
  // Asigna el evento de eliminación
    asignarEventoEliminar(tarjeta, id);

    return tarjeta;
}

// Asigna el evento de eliminar producto a la tarjeta
function asignarEventoEliminar(tarjeta, id) {
    const botonEliminar = tarjeta.querySelector(".boton-eliminar");
    botonEliminar.addEventListener("click", async () => {
    try {
        await serviciosProductos.eliminarProducto(id);
        tarjeta.remove();
        console.log(`Producto con id ${id} eliminado`);
    } catch (error) {
        console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
    });
}

// Renderiza los productos en el DOM
const renderizarProductos = async () => {
    try {
    const listaProductos = await serviciosProductos.listarProductos();
    listaProductos.forEach((producto) => {
        const tarjetaProducto = crearTarjeta(producto);
        contenedorProductos.appendChild(tarjetaProducto);
    });
    } catch (err) {
    console.error("Error al renderizar productos:", err);
    }
};

// Manejo del evento de envío del formulario
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    if (nombre === "" || precio === "" || imagen === "") {
    alert("Por favor, complete todos los campos");
    } else {
    try {
        const nuevoProducto = await serviciosProductos.crearProducto(
        nombre,
        precio,
        imagen
        );
        console.log("Producto creado:", nuevoProducto);
        const nuevaTarjeta = crearTarjeta(nuevoProducto);
        contenedorProductos.appendChild(nuevaTarjeta);
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }

    formulario.reset(); // Reinicia el formulario
    }
});

// Ejecuta la función de renderizado inicial
renderizarProductos();