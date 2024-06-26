let carritoEnLocal = JSON.parse(localStorage.getItem("carrito"));
let carrito;
if (carritoEnLocal) {
  carrito = [...carritoEnLocal];
} else {
  carrito = [];
}

//Productos

const botines = [
  {
    titulo: "Botines Adidas",
    precio: 5000,
    img: "./img/botin-adidas1.jpg",
  },

  {
    titulo: "Botines Nike",
    precio: 7000,
    img: "./img/botin-nike1.jpg",
  },

  {
    titulo: "Botines Puma",
    precio: 3500,
    img: "./img/botin-puma1.webp",
  },
];

const productos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carritoSinNada");
const productosDelCarrito = document.querySelector("#productosDelCarrito");
const totalCarrito = document.querySelector("#totalDelCarrito");

//Se recorre el array

botines.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("cajas");
  div.innerHTML = `
  <img class="imagenes" src="${producto.img}" alt="${producto.titulo}">
  <h3>${producto.titulo}</h3>
  <h3>$${producto.precio}</h3>
 
  `;
  const botonDeAgregarProducto = document.createElement("button");
  botonDeAgregarProducto.classList.add("botonAgregar");
  botonDeAgregarProducto.innerText = "Agregar al carrito";

  botonDeAgregarProducto.addEventListener("click", () => {
    agregarCarrito(producto);
  });

  div.append(botonDeAgregarProducto);
  productos.append(div);
});

function carritoActualizado() {
  if (carrito.length === 0) {
    carritoVacio.classList.remove("ocultar");
    productosDelCarrito.classList.remove("ocultar");
  } else {
    carritoVacio.classList.add("ocultar");
    productosDelCarrito.classList.remove("ocultar");

    productosDelCarrito.innerHTML = "";

    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("productoDelCc");
      div.innerHTML = `
      
      <h5>${producto.titulo}</h5>
      <p>$${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <button class="botonCarrito">Eliminar</button>
      
      `;
      productosDelCarrito.append(div);
    });
  }
}

// pusheo al carrito
const agregarCarrito = (producto) => {
  const itemEncontrado = carrito.find(
    (item) => item.titulo === producto.titulo
  );
  if (itemEncontrado) {
    itemEncontrado.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  carritoActualizado();
  mostrarTotalCompra();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para eliminar un producto del carrito
const eliminarProducto = (titulo) => {
  const index = carrito.findIndex((producto) => producto.titulo === titulo);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }

    if (carrito.length === 0) {
      carritoVacio.classList.remove("ocultar");
      productosDelCarrito.classList.add("ocultar");
    }
  }
  carritoActualizado();
  mostrarTotalCompra();
};
carritoActualizado();

// Event listener para el boton eliminar
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("botonCarrito")) {
    const titulo = event.target.parentElement.querySelector("h5").textContent;
    eliminarProducto(titulo);
  }
});

//calcular y mostrar el total de la compra
const mostrarTotalCompra = () => {
  const total = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);
  totalCarrito.textContent = `$${total};`;
};

mostrarTotalCompra();

//Cambio de color de la pagina
const botonCambioColor = document.querySelector(".color");
botonCambioColor.addEventListener("click", () => {
  document.body.classList.toggle("cambioDeColor");
  if (document.body.classList.contains("cambioDeColor")) {
    botonCambioColor.innerText = "Modo claro";
  } else {
    botonCambioColor.innerText = "Modo oscuro";
  }
});
