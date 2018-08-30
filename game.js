var mySnake;
var obstacles = [];
var score;

function startGame() {
     myGameArea.start();
    mySnake = new component(30,90,"yellow",125,430); 
    score = new component("30px", "Consolas", "white", 250, 40, "text");
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 640;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.frame = 0;
        this.scoring=0;
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
    
    stop : function() {
        clearInterval(this.interval);
    }    
}

function component(width,height,color,x,y,type){
    this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
    this.width=width;
    this.height=height;
    this.speedX = 0;
    this.speedY = 0;
    this.x=x;
    this.y=y;
    
    this.update = function(){
    ctx = myGameArea.context; 
    if (type == "image") {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    } 
        
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }  
                             
                             
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
      }
     this.newPos = function() {
         
       
         if(this.width+this.x > myGameArea.canvas.width )
            { this.x-=1;}
         else if(this.x<0)
             {this.x+=1;}
         
         else if(this.y<0)
             {this.y+=1;}
        
         else
            { this.x += 3*this.speedX;
              this.y += 3*this.speedY;
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
            mySnake.height = mySnake.height - 10;
            obstacles[i].width = 0;
            obstacles[i].height = -200;
            myGameArea.scoring+=10;
            }
            
            if(mySnake.height == 0)
            myGameArea.stop();
    }
    
    
     myGameArea.clear();
    myGameArea.frame += 1;
    if (everyinterval(200)) {
        x = myGameArea.canvas.width;
        obstacles.push(new component(40, 40, "./img/1.png", Math.floor(Math.random()*50)+10, -10, "image"));
        obstacles.push(new component(40, 40, "./img/2.png", Math.floor(Math.random()*400)+50, -10,"image"));
        console.log(obstacles)
        
    }
    
    if ( everyinterval(150)) {
        x = myGameArea.canvas.width;
     obstacles.push(new component(40,40, "./img/3.png", Math.floor(Math.random()*250)+90, -10,"image"));
        
        obstacles.push(new component(40,40, "./img/4.png", Math.floor(Math.random()*450)+130, -10,"image"));
          
    }
    for (i = 0; i < obstacles.length; i += 1) {
          if(myGameArea.frame>=0 && myGameArea.frame <=2000)
           obstacles[i].y += 1;
          if(myGameArea.frame>2000)
           obstacles[i].y += 2;
           obstacles[i].update();
    }
    score.text="My Score: " + myGameArea.scoring;
    score.update();
    
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
    if (myGameArea.frame % n == 0) {return true;}
    return false;
}



    