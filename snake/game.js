var mySnake;
var obstacles = [];

function startGame() {
     myGameArea.start();
    mySnake = new component(20,90,"yellow",125,430);    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 640;
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
    },
    
    decrease : function() {
      mySnake.height = mySnake.height - 10;
      },
    
    stop : function() {
        clearInterval(this.interval);
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
              this.y += this.speedY;
            }
      }

      this.collision = function(obstructs) {
        var snakeleft = this.x;
        var snakeright = this.x + (this.width);
        var snaketop = this.y;
        var snakebottom = this.y + (this.height);
        var obstructsleft = obstructs.x;
        var obstructsright = obstructs.x + (obstructs.width);
        var obstructstop = obstructs.y;
        var obstructsbottom = obstructs.y + (obstructs.height);
        var blast = true;
        if ((snakebottom < obstructstop) || (snaketop > obstructsbottom) || (snakeright < obstructsleft) || (snakeleft > obstructsright)) {
            blast = false;
        }
        return blast;
    }
      
      
     
}

     
    
    
function updateGameArea(){ 
    var x;
    
     for (i = 0; i < obstacles.length; i += 1) {
        if (mySnake.collision(obstacles[i])) {
            myGameArea.decrease();
            obstacles[i].width = 0;
            obstacles[i].height = -200;
            }
            
            if(mySnake.height == 0)
            myGameArea.stop();
    }
    
    
     myGameArea.clear();
    myGameArea.frame += 1;
    if (myGameArea.frame == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        obstacles.push(new component(20, 20, "green",Math.floor(Math.random()*150), 0));
        obstacles.push(new component(20, 20, "pink",Math.floor(Math.random()*250), 0));
        
    }
    
    if (myGameArea.frame == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
     obstacles.push(new component(20,20, "blue", Math.floor(Math.random()*400), 0));
          obstacles.push(new component(20,20, "brown",Math.floor(Math.random()*400), 0));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].y += 1;
        obstacles[i].update();
    }
    
    mySnake.speedX=0;
    mySnake.speedY=0;
    if ( myGameArea.key == 37) {mySnake.speedX = -1; }
    if ( myGameArea.key == 39) {mySnake.speedX = 1; }
    if ( myGameArea.key == 38) {mySnake.speedY = -1; }
    if ( myGameArea.key == 40) {mySnake.speedY = 1; }
    
    mySnake.newPos();    
    mySnake.update();
   
}

function everyinterval(n) {
    if ((myGameArea.frame / n) % 1 == 0) {return true;}
    return false;
}



    