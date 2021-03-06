let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;
let animator=undefined;
let hasEnd=undefined;
const animateSnake=function() {
  console.log(snake.head.getCoord());
  hasEnd=snake.hasHit([numberOfRows,numberOfCols]) || snake.hasEatenSelf();
  if(hasEnd){
    endGame();
  }

  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const endGame=function(){
  clearInterval(animator);
  let message=document.getElementById("message");
  message.innerText="Game Over...";
  restart();
};

const restart=function(){
  let restart=document.getElementById('restart');
  let button=createElement("button","Restart");
  button.onclick=()=>location.reload(true);
  restart.appendChild(button);
};

const createElement=function(type,textNode){
  let element=document.createElement(type);
  let name=document.createTextNode(textNode);
  element.appendChild(name);
  return element;
};

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
};

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,40);
}

window.onload=startGame;
