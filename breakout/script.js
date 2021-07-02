

let canvas=document.getElementById("myCanvas") 
ctx=canvas.getContext("2d")

const CANVAS_WIDTH=canvas.width
CANVAS_HEIGHT=canvas.height

let redBox={
    width: 80,
    height: 20,
    x: CANVAS_WIDTH/2 -40,
    y: CANVAS_HEIGHT-20
}

blueCircle={
    radius:10,
    x:redBox.x+redBox.width/2,
    y:redBox.y-10,
    direction:1
}



function draw(){
    // draw box
    ctx.beginPath();
    ctx.rect(redBox.x, redBox.y, redBox.width, redBox.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    //draw circle
    ctx.beginPath();
    ctx.arc(blueCircle.x, blueCircle.y, 10, 0, Math.PI*2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function toRight(){
    if (redBox.x+redBox.width==CANVAS_WIDTH){
        return
    }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redBox.x+=10;
        draw()
}


function toLeft(){
    if (redBox.x==0){
        return
    }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redBox.x+=-10;
        draw()
}



function autoRight(){

    if (blueCircle.x+blueCircle.radius>=CANVAS_WIDTH || blueCircle.y-blueCircle.radius<=0 || blueCircle.x-blueCircle.radius<=0 || (blueCircle.x>=redBox.x && blueCircle.x<=redBox.x+redBox.width && blueCircle.y>=redBox.y) ){
        blueCircle.direction=-blueCircle.direction;
    }
    
    if (blueCircle.y+blueCircle.radius>=CANVAS_HEIGHT){
        alert("GAME OVER");
        blueCircle.direction=0;
    }

    blueCircle.x+=-blueCircle.direction;
    blueCircle.y+=-blueCircle.direction;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    draw();
    collisionDetection()
    
}


document.getElementById("right").addEventListener("click", toRight);
document.getElementById("left").addEventListener("click", toLeft);


const brickWidth = 75;
const brickHeight = 20;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickColumnCount = 5;
const brickRowCount = 3;
const brickPadding = 10;

function drawBricks(){
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r] = { x: brickX, y: brickY }
        
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();

    }
}
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(blueCircle.x > b.x && blueCircle.x < b.x+brickWidth && blueCircle.y > b.y && blueCircle.y < b.y+brickHeight) {
                blueCircle.direction = -blueCircle.direction;
            }
        }
    }
}
setInterval(autoRight,10);


