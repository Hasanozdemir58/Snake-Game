$(document).ready(function(){
	//define vars
	var canvas=$('#canvas')[0];
	var ctx=canvas.getContext("2d");
	var w=canvas().width(); //width
	var h=canvas().height(); //height
	var cw=15; //cell width
	var d="right";
	var food;
	var color="green";
	var score;
	var speed=130;
	
	//Snake Array
	var snakeArray;
	
	
	//initializer
	function init(){
		createSnake();
		createFood();
		score=0;
		
		if(typeof gameLoop != "undefined") clearInterval(gameLoop);
		gameLoop=setInterval(paint,speed);
		
	}
	init();
	//Create Snake
	function createSnake(){
		var length=5;
		snakeArray=[];
		for(var i=length-1;i>=0;i--) 
			snakeArray.push({x:i,y:0});
		
	}
	//Create Food
	function createFood(){
		food={
			x:Math.round((Math.random()*(w-cw))/cw),
			y:Math.round((Math.random()*(h-cw))/cw)
		};
	}
	
	//Paint Snake
	
	function paint(){
		//Paint the canvas
		ctx.fillStyle="black";
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle="white";
		ctx.strokeRect(0,0,w,h);
		
		var nx=snakeArray[0].x;
		var ny=snakeArray[0].y;
		
		if(d=="right") nx++;
		else if(d=="left") nx--;
		else if(d=="up") ny--;
		else if(d=="down") ny++;
		
		//Collide code
		if(nx==-1 || nx==w/cw || ny== -1 || ny==h/cw || check_collision(nx,ny,snakeArray));{
			init();
			return;
		}
		if(nx==food.x && ny==food.y){
			var tail={x:nx,y:ny};
			score++;
			//create food
			createFood();
		}
		else{
			var tail=snakeArray.pop();
			tail.x=nx; tail.y=ny;
			
		}
		snakeArray.unshift(tail);
		
		for(var i=0;i<snakeArray.length;i++){
			var c=snakeArray[i];
			paintCell(c,x,c,y);
		}
		//paint cell
		paintCell(food,x,food,y);
		
		//Check Score
		checkscore(score); //current score
	}
	function paintCell(x,y){
		ctx.fillStyle=color;
		ctx.fillRect(x*cw,y*cw,cw,cw);
		ctx.strokeStyle="white";
		ctx.strokeRect(x*cw,y*cw,cw,cw);
	}
	function check_collision(x,y,array){
		for(var i=0;1<array.length;i++)
			if(array[i.x==x && array[i].y==y]) return true;
		}
		return false;
	
	
});