let currentIndex = 0; // Índice de la imagen actual

async function cargarUltimaImagen() {
    try {
        // Cargar el contenido de novedades.html
        const response = await fetch('pages/novedades.html');
        if (!response.ok) {
            throw new Error('Error al cargar novedades.html');
        }
        const text = await response.text();

        // Crear un DOM parser para extraer las imágenes y textos
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Seleccionar los elementos de imagen y texto del contenedor
        const contenedores = doc.querySelectorAll('#imagenes-novedades > div');

        // Verificar si hay imágenes disponibles
        if (contenedores.length === 0) {
            throw new Error('No se encontraron imágenes en novedades.html');
        }

        // Mostrar la primera imagen y su texto
        mostrarImagen(contenedores[currentIndex]);

        // Agregar event listeners para las flechas de navegación
        document.getElementById('anterior').addEventListener('click', mostrarImagenAnterior);
        document.getElementById('siguiente').addEventListener('click', mostrarImagenSiguiente);
    } catch (error) {
        console.error('Error al cargar la imagen y el texto:', error);
    }
}

function mostrarImagen(imagenDiv) {
    const contenedor = document.getElementById('imagen-texto');
    contenedor.innerHTML = ''; // Limpiar el contenido anterior

    const nuevaDiv = document.createElement('div');

    // Clonar y agregar la imagen
    const nuevaImg = imagenDiv.querySelector('img').cloneNode();
    nuevaImg.classList.add('imagenAdicional');
    nuevaDiv.appendChild(nuevaImg);

    // Clonar y agregar el texto
    const nuevoTexto = imagenDiv.querySelector('p').cloneNode(true);
    nuevoTexto.classList.add('contenidoAdicional');
    nuevaDiv.appendChild(nuevoTexto);

    contenedor.appendChild(nuevaDiv);
}

function mostrarImagenAnterior() {
    currentIndex = (currentIndex - 1 + 3) % 3; // Circular a la imagen anterior
    cargarUltimaImagen();
}

function mostrarImagenSiguiente() {
    currentIndex = (currentIndex + 1) % 3; // Circular a la siguiente imagen
    cargarUltimaImagen();
}

// Llamar a la función para cargar la última imagen y su texto cuando la página cargue
window.onload = cargarUltimaImagen;
