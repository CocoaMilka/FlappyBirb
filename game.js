const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let birbX = canvas.clientWidth / 3;
let birbY = canvas.clientHeight / 2;
let eyeLook = 10;

let gravity = 5;

let pipeSpeed = 7;

let score = 0;

let pipeX = canvas.clientWidth;
let pipeHeight = Math.floor(Math.random() * 300) + 125;

class Pipes
{
    constructor(x, height)
    {
        this.x = x;
        this.height = height;
    }
}

const pipe = new Pipes(canvas.clientWidth, Math.floor(Math.random() * 300) + 125);
let pipeHolder = pipe;

function drawGame()
{
    let result = isGameOver();

    if (result)
    {
        return;
    }

    clearScreen();

    drawBirb();
    gravityBirb();

    drawPipes();

    checkCollision();

    writeScore();

    setTimeout(drawGame, 1000 / 60);
}

function clearScreen()
{
    ctx.fillStyle = "powderblue";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 300, 600, 100);
}

function isGameOver()
{
    let gameOver = false;

    //bottom pipe
    if ((birbX + 10  >= pipeHolder.x && birbX <= pipeHolder.x + 10) && (birbY >= pipeHolder.height))
    {
        gameOver = true;
    }

    //top pipe
    if ((birbX + 10 >= pipeHolder.x && birbX <= pipeHolder.x + 10) && (birbY <= pipeHolder.height - 150))
    {
        gameOver = true;
    }

    //ground
    if (birbY >= canvas.clientHeight)
    {
        gameOver = true;
    }

    if (gameOver)
    {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
    }

    return gameOver;
}

function drawBirb()
{
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(birbX, birbY, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(birbX + 7, birbY - 5, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(birbX + eyeLook, birbY - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    eyeLook = 10;

    ctx.fillStyle = "yellow";
    ctx.fillRect(birbX - 30, birbY, 15, 15);

    ctx.fillStyle = "orange";
    ctx.fillRect(birbX + 15, birbY, 15, 10);
}

function writeScore()
{
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 110, 30);
}

function drawPipes()
{
    ctx.fillStyle = "green";

    //bottom pipe
    ctx.fillRect(pipeHolder.x, pipeHolder.height, 50, 400);

    //top pipe
    ctx.fillStyle = "green";
    ctx.fillRect(pipeHolder.x, 0, 50, pipeHolder.height - 150);

    pipeHolder.x -= pipeSpeed; 


    //Pipe reaches end of canvas
    if (pipeHolder.x < -100)
    {
        pipeHolder.x = canvas.clientWidth;
        pipeHolder = null;
        pipeHolder = new Pipes(canvas.clientWidth, Math.floor(Math.random() * 300) + 125);
    }
}

function gravityBirb()
{
    birbY += gravity;
}

function checkCollision()
{
    //Score
    if (birbX >= pipeHolder.x && birbX <= pipeHolder.x + 10)
    {
        score++;
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event)
{
    if (event.keyCode == 32)
    {
        birbY -= 75;
    }
}


drawGame();