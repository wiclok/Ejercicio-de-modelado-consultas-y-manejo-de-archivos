// Función para cargar y mostrar la lista de libros
async function cargarListaLibros() {
  try {
    const response = await fetch("/libros"); // Ajusta la URL según la ruta en tu servidor Express
    const libros = await response.json();

    const listaLibros = document.getElementById("listaLibros");

    libros.forEach((libro) => {
      const li = document.createElement("li");
      li.textContent = `Título: ${libro.titulo}, Género: ${libro.genero}, autor: ${libro.autor.nombre} ${libro.autor.apellido}`;
      listaLibros.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}

// Llama a la función para cargar la lista de libros cuando la página se carga
window.onload = cargarListaLibros;
