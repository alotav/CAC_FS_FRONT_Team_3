document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');
    const mensajeValidacion = document.createElement('p');
    mensajeValidacion.classList.add('mensaje-validacion');

    form.appendChild(mensajeValidacion);

    form.addEventListener('submit', function(event) {
         // Evitar el envío del formulario por defecto
        event.preventDefault();

        if (validateForm()) {
            // Mostramos mensaje "consulta enviada correctamente"
            mensajeValidacion.textContent = 'Consulta enviada correctamente';
            mensajeValidacion.style.color = 'green';
            // Limpiar el formulario
            form.reset(); 
        }
    });

    function validateForm() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked');
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validamos que los campos requeridos no estén vacíos
        if (nombre === '' || apellido === '' || email === '' || tipoUsuario === null || mensaje === '') {
            mensajeValidacion.textContent = 'Por favor, complete todos los campos obligatorios.';
            mensajeValidacion.style.color = 'red';
            return false;
        }

        // Validamos formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mensajeValidacion.textContent = 'Por favor, ingrese un correo electrónico válido.';
            mensajeValidacion.style.color = 'red';
            return false;
        }

        // Si todas las validaciones pasan, devolver true
        return true;
    }
});