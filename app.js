const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'white';
const dragonColor = 'green';
const dragonBorder = 'black';
const foodColor = 'pink';
const unitSize = 25;
let running = false;
let xSpeed = unitSize
let ySpeed = 0;
let foodX;
let foodY;
let score = 0;
let dragon = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart(){};
function nextTick (){};
function clearBoard (){};
function createFood (){};
function drawFood (){};
function moveDragon (){};
function drawDragon (){};
function changeDirection (){};
function checkGameOver (){};
function displayGameOver (){};
function resetGame (){};

