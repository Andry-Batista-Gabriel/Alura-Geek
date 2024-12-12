const URL_BASE = "http://localhost:3001/productos";

const listarProductos = async () => {
    try {
    const respuesta = await fetch(URL_BASE);
    const datos = await respuesta.json();
    return datos;
    } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    }
};

const crearProducto = async (nombre, precio, imagen) => {
    try {
    const respuesta = await fetch(URL_BASE, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, precio, imagen }),
    });

    const datos = await respuesta.json();
    console.log("Solicitud POST exitosa:", datos);
    return datos;
    } catch (error) {
    console.error("Error en la solicitud POST:", error);
    }
};

const eliminarProducto = async (id) => {
    try {
    await fetch(`${URL_BASE}/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });
    console.log(`Producto con id ${id} eliminado exitosamente`);
    } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    }
};

export const serviciosProductos = {
    listarProductos,
    crearProducto,
    eliminarProducto,
};