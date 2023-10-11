const canvas = document.getElementById('gameCanvas');
const ctx1 = canvas.getContext('2d');
// Inicializar posición del personaje
let xp = 250;
let yp = 250;

// Configurar la velocidad de movimiento
const velp = 20;

// Función para dibujar al personaje
var imagen = new Image();
var imagencohete = imagen.src = "../.././assets/img/Nave-ojo.png";
function drawCharacter() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx1.drawimage = imagencohete;
    ctx1.fillRect(xp, yp, 100, 100);
}

// Manejar las teclas presionadas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        xp -= velp;
    } else if (event.key === 'ArrowRight') {
        xp += velp;
    } else if (event.key === 'ArrowUp') {
        yp -= velp;
     } else if (event.key === 'ArrowDown') {
        yp += velp;
    }
    // Redibujar al personaje
    drawCharacter();
});
// Dibujar al personaje inicialmente
drawCharacter();


