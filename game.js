function startGame() {
    myGameArea.start();
    mySnake = new component(50,120,"green",125,430);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
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
    ctx.fillstyle=color;
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
    
    myGameArea.clear();
    mySnake.speedX=0;
    mySnake.speedY=0;
    if ( myGameArea.key == 37) {mySnake.speedX = -1; }
    if ( myGameArea.key == 39) {mySnake.speedX = 1; }
    mySnake.newPos();    
    mySnake.update();
    
}
    