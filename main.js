let canvas = document.getElementById("snake");
let context =canvas.getContext("2d");//Reinderiza o desenho que vai acontecer dentro do canvas
let box=32;
let snake = [];
snake[0]= {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1)* box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);//vai desenhar o retangulo do jogo
}

function criarCobrinha(){
  for(i=0; i < snake.length; i++){
    context.fillStyle = "black";
    context.fillRect(snake[i].x, snake[i].y, box, box);
}
}

//criar comida
function drawFood(){
    context.fillStyle ="red";
    context.fillRect(food.x, food.y,box, box);
}

document.addEventListener('keydown', update);// o eventlistener vai pegar o keydown que é evento de clique do teclado e vai chamar a update
// 37 direita, 38, 39, 40 (usar o teclado para comandar)
function update (event){
    if(event.keyCode == 37 && direction != "right") direction="left";
    if(event.keyCode == 38 && direction != "down") direction="up";
    if(event.keyCode == 39 && direction != "left") direction="right";
    if(event.keyCode == 40 && direction != "up") direction="down";
}

function iniciarJogo(){
 //plano cartesiano com 0x e 0y (snake[0] é a cabeça dela)
 // cobrinha sair de um lado e voltar do outro
 
 if(snake[0].x > 15 * box && direction == "right") snake[0].x =0;
 if(snake[0].x <0 * box && direction == "left") snake[0].x =16* box;
 if(snake[0].y > 15 * box && direction == "down") snake[0].y =0;
 if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

  //morte da cobrinha o i é o corpo e 0 é a cabeça
  
  for(i=1; i < snake.length; i++){
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
          clearInterval(jogo);
          alert("Game Over :(");
      }
  }

criarBG();
criarCobrinha();
drawFood();

//partida
let snakex = snake[0].x;
let snakey = snake[0].y;

//condicionais plano cartesiano ( direira aumenta e esquerda diminui)
if(direction == "right") snakex += box;
if(direction == "left") snakex -= box;
if(direction =="up")snakey -= box;
if(direction == "down") snakey += box;

// comer a comidinha

if(snakex != food.x || snakey != food.y){
    snake.pop();
}
else{ food.x = Math.floor(Math.random() * 15 + 1)* box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

}


//retira o último elemento
//snake.pop();
let newHead = {
    x: snakex,
    y: snakey,
}
snake.unshift(newHead);


}

let jogo = setInterval(iniciarJogo, 100);//intervalo de 100 milisegundos





