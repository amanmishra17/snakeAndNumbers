var mySnake;
var obstacles = [];

function startGame() {
     myGameArea.start();
    mySnake = new component(30,90,"yellow",125,430);    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.frame = 0;
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
            
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
            
        })
        
    },
    
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function component(width,height,color,x,y){
    this.width=width;
    this.height=height;
    this.speedX = 0;
    this.speedY = 0;
    this.x=x;
    this.y=y;
    
    this.update = function(){ctx=myGameArea.context;
    ctx.fillStyle=color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
      }
     this.newPos = function() {
         
       
         if(this.width+this.x > myGameArea.canvas.width )
            { this.x-=1;

            }
         else if(this.x<0)
             {this.x+=1;}
        
         else
            { this.x += this.speedX;
            }
    }
     
     
}

     
    
    
function updateGameArea(){ 
    var x, width, gap, minWidth, maxWidth;
    
     myGameArea.clear();
    myGameArea.frame += 1;
    if (myGameArea.frame == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        minWidth = 30;
        maxWidth = 50;
        width = Math.floor(Math.random()*(maxWidth - minWidth + 1)+minWidth);

        obstacles.push(new component(width, 30, "green", x-50, 0));
        obstacles.push(new component(width, 30, "pink", x-150, 0));
        
    }
    
    if (myGameArea.frame == 1 || everyinterval(100)) {
        x = myGameArea.canvas.width;
         minWidth = 30;
        maxWidth = 50;
        width = Math.floor(Math.random()*(maxWidth - minWidth + 1)+minWidth);
     obstacles.push(new component(width, 30, "blue", x-250, 0));
          obstacles.push(new component(width, 30, "brown", x-350, 0));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].y += 1;
        obstacles[i].update();
    }
    
    mySnake.speedX=0;
    mySnake.speedY=0;
    if ( myGameArea.key == 37) {mySnake.speedX = -1; }
    if ( myGameArea.key == 39) {mySnake.speedX = 1; }
    mySnake.newPos();    
    mySnake.update();
   
}

function everyinterval(n) {
    if ((myGameArea.frame / n) % 1 == 0) {return true;}
    return false;
}



    