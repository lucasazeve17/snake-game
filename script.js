let canvas = document.getElementById("snake");
let btnPause = document.querySelector('.btn-pause')
let context = canvas.getContext("2d");
let box = 32;
let level =1
let countFood = 0
let snake = []
snake[0] = {
    x:8*box,
    y:8*box
}

let food = {
    x:Math.floor(Math.random()* 15+1) *box,
    y:Math.floor(Math.random()* 15+1) *box
}


let clicked = false
let direction = "up";


function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobrinha(){
    for(let i = 0; i < snake.length;i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x,snake[i].y,box,box)
    }
}

function drawFood(){
    context.fillStyle = "red"
    context.fillRect(food.x,food.y,box,box)
}

document.addEventListener('keydown',update)
btnPause.addEventListener('click',()=>{
    if(clicked ==false){
        clearInterval(this.jogo)
        btnPause.innerHTML="Play"
        clicked = true
    }else{
        btnPause.innerHTML="Pause"
        clicked = false
        Ijogo()
    }
})

function update (event){
    if(event.keyCode == 37 && direction != 'right') direction= 'left'
    if(event.keyCode == 39 && direction != 'left') direction= 'right'
    if(event.keyCode == 40 && direction != 'down') direction= 'up'
    if(event.keyCode == 38 && direction != 'up') direction= 'down'

}


function inciarJogo(){
    
    if(snake[0].x > box*15 && direction == 'right' ) snake[0].x = 0
    if(snake[0].x < 0 &&  direction=="left" ) snake[0].x = 512
    if(snake[0].y > box*15 && direction =="up" ) snake[0].y = 0
    if(snake[0].y < 0  && direction == "down" ) snake[0].y = 512
    
    
    for(i = 1;i < snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert("Game over")
        }
    }
    document.querySelector('span').innerHTML = countFood
    criarBG();
    criarCobrinha()
    drawFood()
    
    let snakeX= snake[0].x
    let snakeY= snake[0].y
    
    
    if(direction == "right") snakeX += box 
    if(direction == "left") snakeX -= box 
    if(direction == "up") snakeY += box 
    if(direction == "down") snakeY -= box 
    


    if(snakeX!= food.x || snakeY != food.y){
        snake.pop()
    }else{
        countFood += 1
        food.x=Math.floor(Math.random()* 15+1) *box
        food.y=Math.floor(Math.random()* 15+1) *box
    }
    
    let newHeader = {
        x:snakeX,
        y:snakeY
    }
    
    snake.unshift(newHeader)
    
    
    
    
    
    
}
function Ijogo () {
  this.jogo =  setInterval(inciarJogo,100)
}
Ijogo()
