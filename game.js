const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//elemento de la vida
const livesCount = document.querySelector('#lives');

//Elemento del cronometro y record
const timeCount = document.querySelector('#time');
const records = document.querySelector('#record');
const pResult = document.querySelector('#result');


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

//GIFT POSITION
const giftPosition = {
    x: undefined,
    y: undefined,
};

//ENEMIES POSITIONS
const enemiesPositions = [];

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
            if(playerPosition.x < elementsSize) {
                console.log('OUT');
            } else {
                playerPosition.x = playerPosition.x - elementsSize;
                startGame();
            }
            break;
        case "ArrowRight":
            if((playerPosition.x + elementsSize) > (canvasSize - elementsSize)) {
                console.log('OUT');
            } else {
                playerPosition.x = playerPosition.x + elementsSize;
                startGame();
            }
            break;
        case "ArrowUp":
            if((playerPosition.y - elementsSize) < elementsSize) {
                console.log('OUT');
            } else {
                playerPosition.y = playerPosition.y - elementsSize;
                startGame();
            }
            break;
        case "ArrowDown":
            if((playerPosition.y + elementsSize) > canvasSize) {
                console.log('OUT');
            } else {
                playerPosition.y = playerPosition.y + elementsSize;
                startGame();
            }
            break;
        default:
    }
})

//con la constante game podemos acceder a los metodos en 2d para poder manipular el canvas

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

//variables para el cronometro
let timeStart;
let timePlayer;
let timeInterval;

//Resize Function
function setCanvasSize() {

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.70;
    } else {
        canvasSize = window.innerHeight * 0.70;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}
//Render function
function startGame() {
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = 'start';

    const map = maps[level];

    if(!map) {
        gameWin();
        return;
    }

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 10);
        showRecord();
    }

    const mapRows = map.trim().split('\n').map(row => row.trim());
    const mapRowsCols = mapRows.map(col => col.split(''));

    //llamamos la funcion que inserta la cantidad de vidas sobrantes
    showLives();

    //eliminamos Todas las posiciones del array enemiesPositions
    enemiesPositions.splice(0);
    //Eliminamos todos los elementos del mapa antes de renderizarlos nuevamente
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * colIndex;
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY);

            //Posicion del jugador
            if(col === 'O') {
                if(playerPosition.x === undefined && playerPosition.y === undefined) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if(col === 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col === 'X') {
                enemiesPositions.push({
                    x: posX,
                    y: posY,
                });
            }
        });
    });
    movePlayer();
    
}

function showLives() {
    // const heartsArray = Array(lives).fill(emojis['HEART']);
    // livesCount.innerText = '';
    // heartsArray.forEach(heart => livesCount.append(heart));
    livesCount.innerText = '💝'.repeat(lives);
}

function showTime () {
    timeCount.innerText = Date.now() - timeStart;
}

function showRecord() {
    records.innerText = localStorage.getItem('record_time');
}

function levelWin() {
    console.log('ganaste');
    level++;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;
    if(recordTime) {
        if(recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerText = 'Superaste el record';
        } else {
            pResult.innerText = 'No superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerText = 'Primera Vez?'
    }
    console.log({
        recordTime,
        playerTime
    })
}

function levelFail() {
    lives--;
    
    if(lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
};

function movePlayer() {
    const giftCollitionX = giftPosition.x.toFixed(3) == playerPosition.x.toFixed(3);
    const giftCollitionY = giftPosition.y.toFixed(3) == playerPosition.y.toFixed(3);
    const giftCollition = giftCollitionX && giftCollitionY;

    if(giftCollition) {
        levelWin();
    };
    
    const enemyCollition = enemiesPositions.find(enemy => {
        const enemyCollitionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollitionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollitionX && enemyCollitionY;
    });

    if(enemyCollition) {
        levelFail();
    };

    game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);