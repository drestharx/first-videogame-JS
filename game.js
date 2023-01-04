const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//addEventListener de los botones para el jugador (pantalla)
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

//PLAYER POSITION
const playerPosition = {
    x: undefined,
    y: undefined,
};

btnUp.addEventListener('click', botonPresionado);
btnDown.addEventListener('click', botonPresionado);
btnLeft.addEventListener('click', botonPresionado);
btnRight.addEventListener('click', botonPresionado);

function botonPresionado() {
    console.log('se presiono el boton de pantalla')
}

//addEventListener de los botones para el jugador (teclado)
window.addEventListener('keydown', function(event) {
    switch(event.key) {
        case "ArrowLeft":
            playerPosition.x = playerPosition.x - elementsSize;
            movePlayer();
            break;
        case "ArrowRight":
            playerPosition.x = playerPosition.x + elementsSize;
            movePlayer();
            break;
        case "ArrowUp":
            playerPosition.y = playerPosition.y - elementsSize;
            movePlayer();
            break;
        case "ArrowDown":
            playerPosition.y = playerPosition.y + elementsSize;
            movePlayer();
            break;
        default:
    }
})

//con la constante game podemos acceder a los metodos en 2d para poder manipular el canvas

let canvasSize;
let elementsSize;

//Render function
function startGame() {
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = 'start';

    const map = maps[1];
    const mapRows = map.trim().split('\n').map(row => row.trim());
    const mapRowsCols = mapRows.map(col => col.split(''));

    // for(let row = 1; row <= 10; row++) {
    //     for(let col = 0; col < 10; col++) {
    //         game.fillText(emojis[mapRowsCols[row - 1][col]], col * elementsSize, row * elementsSize);
    //     }
    // }

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * colIndex;
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY);

            //Posicion del jugador
            if(col === 'O') {
                console.log('aqui ira el jugador');
                playerPosition.x = posX;
                playerPosition.y = posY;
            }
        });
    });
    movePlayer();
    
}

//Resize Function
function setCanvasSize() {

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;

    startGame();
}

function movePlayer() {
    game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);