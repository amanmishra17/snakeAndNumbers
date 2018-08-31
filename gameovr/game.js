var mySnake;
var obstacles = [];
var score;
var food = [];
var gameOver;
var food_sound = new Audio("bite.wav");
var obstacles_sound = new Audio("obs_bite.wav");

function startGame() {
     myGameArea.start();
    mySnake = new component(40,150,"./img/s5.png",125,430,"image"); 
    score = new component("30px", "Consolas", "white", 250, 40, "text");
    gameOver = new component("30px", "Consolas", "white", 150, 320, "text");
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
        document.getElementById('myimage').style.display = 'block';
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
    var ctx = myGameArea.context; 
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
         
         else if(this.y<250)
             {this.y+=1;}
        
         else if(this.height+this.y > myGameArea.canvas.height +100)
            { this.y-=1;}
         
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
    var i,j;
    
     for (i = 0; i < obstacles.length; i += 1) {
        if (mySnake.collision(obstacles[i])) {
            mySnake.height = mySnake.height - obstacles[i].height;
            obstacles_sound.play();
            obstacles[i].width = 0;
            obstacles[i].height = -1000;
            
            }
            
            if(mySnake.height <= 0){
                mySnake.height=0;
               gameOver.text="GAME OVER";
            gameOver.update();            
                myGameArea.stop();

            }
    }
    
    for (j = 0; j < food.length; j += 1) {
        if (mySnake.collision(food[j])) {
            mySnake.height = mySnake.height + 10;
            food_sound.play();
            food[j].width = 0;
            food[j].height = -1000;
            myGameArea.scoring+=10;
            }
    }
    
    
     myGameArea.clear();
    myGameArea.frame += 1;
    if (everyinterval(200)) {
    
        obstacles.push(new component(40, 40, "./img/4.png", Math.floor(Math.random()*50)+10, -10, "image"));
        obstacles.push(new component(28, 28, "./img/2.png", Math.floor(Math.random()*100)+90, -10,"image"));
        
    }
    
    if ( everyinterval(150)) {
        
     obstacles.push(new component(33,33, "./img/3.png", Math.floor(Math.random()*100)+200, -10,"image"));
        
        obstacles.push(new component(20,20, "./img/1.png", Math.floor(Math.random()*200)+290, -10,"image"));
          
    }
    
    if (everyinterval(400)) {
    
        food.push(new component(40, 40, "./img/cockroaches.png", Math.floor(Math.random()*50)+90, -10, "image"));
        food.push(new component(40, 40, "./img/frog.png", Math.floor(Math.random()*125)+180, -10, "image"));
        
    }
    
    if ( everyinterval(500)) {
        
     food.push(new component(40,40, "./img/grasshopper.png", Math.floor(Math.random()*250)+300, -10,"image"));
        
          
    }
    for (i = 0; i < obstacles.length; i += 1) {
          if(myGameArea.frame>=0 && myGameArea.frame <= 2000)
           obstacles[i].y += 1;
          if(myGameArea.frame>2000)
              obstacles[i].y += 2;
           obstacles[i].update();
    }
    for (j = 0; j < food.length; j += 1) {
          if(myGameArea.frame>=0 && myGameArea.frame <=2000)
           food[j].y += 1.5;
          if(myGameArea.frame>=2000)
           food[j].y += 2.5;
           food[j].update();
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



    