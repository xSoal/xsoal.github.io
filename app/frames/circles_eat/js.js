




var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");

var w = canvas.width  = window.innerWidth;
var h =canvas.height = window.innerHeight; 

var playerRadius = 15;

var mouse = {x: 0, y:0};

var balls = {};
var ballsCount = 0;
document.addEventListener("mousemove", mouseMove);

var isPause = false;
var isWin = false;

function mouseMove(event){
	mouse.x = event.x || event.clientX;
	mouse.y = event.y || event.clientY;
}


var config = {
	fps: 0,
}

var frags = 0;
var killer = null;
var radiusBeforeDeath = 0;

function PLAYER(){
	var self = this;
	self.x = 0;
	self.y = 0;
	self.radius = playerRadius;
	self.color  = "white";

	self.move = function(){
		self.x = mouse.x;
		self.y = mouse.y;

		self.think();

		ctx.fillStyle = self.color;
		ctx.beginPath();
		ctx.arc(self.x,self.y, self.radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		
	}

	self.think = function(){

		if(playerRadius > 700){
			isWin = true;
		}

		for(var i in balls){
			var distance;
			var x = Math.abs(balls[i].x - self.x);
			var y = Math.abs(balls[i].y - self.y);
			var ballRadius = balls[i].radius;

			distance = Math.sqrt(x*x + y*y);

			if(distance < (ballRadius + self.radius)){
				if(self.radius > ballRadius){
					this.eat(balls[i].id);
				}
				else{
					this.restart(balls[i].radius);
				}
			}

		}
	}

	self.eat = function(id){
		self.radius = playerRadius = ++playerRadius;
		delete balls[id];
		frags++;

	}

	self.restart = function(r){
		for(var i in balls){
			delete balls[i];
		}
		radiusBeforeDeath = playerRadius;
		self.radius = playerRadius = 15;
		frags = 0;
		isPause = true;


		killer = r;
	}

	self.newGame = function(){
		for(var i in balls){
			delete balls[i];
		}
		radiusBeforeDeath = playerRadius;
		playerRadius = 15;
		frags = 0;
		isWin = false;
	}
} 

var player = new PLAYER();



function BALLS (x,y,radius){
	var self = this;
	self.x = x || 0;
	self.y = -75;

	self.radius = radius || (playerRadius*rand(0.5,1.5)) ;

	if(playerRadius > 100){
		self.radius = playerRadius - 15;
	}

	self.color = "#123123"
	self.color = "#"+randInt(3,10)+randInt(3,10)+randInt(3,10)+randInt(3,10)+randInt(3,10)+randInt(3,10);

	self.id = ballsCount;

	self.wx = randInt(-10,10);
	self.wy = randInt(-10,10);

	self.move = function(){
		self.x += self.wx/5;
		self.y += self.wy/5 + rand(0,1);

		self.think();

		ctx.fillStyle = self.color;
		ctx.beginPath();
		ctx.arc(self.x,self.y, self.radius, 0, 2 * Math.PI);

		ctx.closePath();
		ctx.fill();

		
	}

	self.think = function(){
		if(self.x>w || self.y>h || self.x<0 || self.y< -100 ){
			delete balls[self.id];
		}

	}
}




function createBalls(){
	var count = 0;
	for(var i in balls){
		count++;
	}

	if(count < 35){
		balls[ballsCount] = new BALLS(rand(0, w),rand(0, h));
		ballsCount++;
	}
	
}



function animate(){
	ctx.clearRect(0,0,w,h);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,w,h);


	createBalls();

	player.move();

	for(var i in balls){
		balls[i].move();
	}


}


function render(){
	config.fps++;

	if(isPause == false && isWin == false){
		animate();
		document.getElementById("frags").innerHTML = frags;
	}

	else{
		pause();
	}

	requestAnimationFrame(render);
}


render();








function pause(){
	var cont = document.getElementById("pause");
	var contW = document.getElementById("win");

	if(isPause){
		
		var killerC = document.getElementById("killer");
		var youC    = document.getElementById("you");

		killerC.innerHTML = killer;
		youC.innerHTML = radiusBeforeDeath;
		cont.style.display = "block";

		cont.onclick = function(){
			isPause = false;
			cont.style.display = "none";
		};

	}

	if(isWin == true){

		contW.style.display = "block";

		contW.onclick = function () {
			player.newGame();
			contW.style.display = "none";
		};

	}
}




function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  var a = parseInt(Math.random() * (max - min) + min);
  if(a!=0) return a;
  else{
  	return randInt(min,max);
  }
}




//fps clear&&consoling
setInterval(function(){
	console.log("fps",config.fps);
	config.fps = 0;
},1000);




