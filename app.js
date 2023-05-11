//make sure canvas is initialized after page is loaded
const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;


const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const boardBackground = 'lightBlue';
const dragonColor = 'darkGrey';
const dragonBorder = 'black';
const foodColor = 'pink';
const unitSize = 25;
let running = false;
let xSpeed = unitSize
let ySpeed = 0;
let foodX;
let foodY;
let score = 0;

//dragon array
let dragon = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

//arrow key functions and reset button
window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

//food appears when game starts
function gameStart(){
    running = true
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

//if-else statement for nextTick
function nextTick (){
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveDragon();
            drawDragon();
            checkGameOver();
            nextTick();
        }, 100);
    }
    else{
        displayGameOver();
    }
};

function clearBoard (){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

//random food appear on screen
function createFood (){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

};
function drawFood (){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

//dragon grows when eating dragonfruit
function moveDragon (){
    const head = {x: dragon[0].x + xSpeed,
                  y: dragon[0].y + ySpeed};
    
    dragon.unshift(head);
//when dragon eats food, they grow 1 unitSize
    if(dragon[0].x == foodX && dragon[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        dragon.pop();
    }
    //if player reaches a score of 50, call gameWin, player may still keep going
    if(score === 2) {
        running = true;
        gameWin();
    }
};

//create dragon!
function drawDragon (){
    ctx.fillStyle = dragonColor;
    ctx.strokeStyle = dragonBorder;
    dragon.forEach(dragonPart => {
        ctx.fillRect(dragonPart.x, dragonPart.y, unitSize, unitSize);
        ctx.strokeRect(dragonPart.x, dragonPart.y, unitSize, unitSize);
    })
};
function changeDirection (event){
    const arrowPressed = event.keyCode;

    const arrowUp = (ySpeed == -unitSize);
    const arrowDown = (ySpeed == unitSize);
    const arrowLeft = (xSpeed == -unitSize);
    const arrowRight = (xSpeed == unitSize);

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

//dragon cannot move immediately into itself
    switch(true){
        case(arrowPressed == LEFT && !arrowRight):
            xSpeed = -unitSize;
            ySpeed = 0;
            break;
        case(arrowPressed == UP && !arrowDown):
            xSpeed = 0;
            ySpeed = -unitSize;
            break;
        case(arrowPressed == RIGHT && !arrowLeft):
            xSpeed = unitSize;
            ySpeed = 0;
            break;
        case(arrowPressed == DOWN && !arrowUp):
            xSpeed = 0;
            ySpeed = unitSize;
            break;
    }
};

//Game end
function checkGameOver (){
    //Dragon touches border, game is over
    switch(true){
        case (dragon[0].x < 0):
            running = false;
            break;
        case (dragon[0].x >= gameWidth):
            running = false;
            break;
        case (dragon[0].y < 0):
            running = false;
            break;
        case (dragon[0].y >= gameHeight):
            running = false;
            break;
    }
    //use for loop to iterate over body parts. When dragon eats itself, game is over.
    for(let i = 1; i < dragon.length; i += 1){
        if(dragon[i].x == dragon[0].x && dragon[i].y == dragon[0].y){
            running = false;
        }
    }
};
function displayGameOver (){
    ctx.font = '50px Modak';
    ctx.fillStyle = 'red';
    ctx.textAlign = "center";
    ctx.fillText('GAME OVER', gameWidth / 2, gameHeight / 2);
    running = false;
};

//Display win game when you reach score of 50
function gameWin(){
    ctx.font = '50px Modak';
    ctx.fillStyle = 'gold';
    ctx.textAlign = 'center';
    ctx.fillText('YOU WON', gameWidth / 2, gameHeight / 2);
};

//game should reset body parts and food item
function resetGame (){
    score = 0;
    xSpeed = unitSize;
    ySpeed = 0;
    dragon = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
