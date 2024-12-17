// Función para abrir y cerrar el menú lateral
document.getElementById('menu-icon').addEventListener('click', function () {
    document.getElementById('side-menu').classList.toggle('open');
    document.getElementById('menu-icon').style.display = 'none'; // Ocultar icono al abrir el menú
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('menu-icon').style.display = 'block'; // Mostrar icono al cerrar el menú
});
