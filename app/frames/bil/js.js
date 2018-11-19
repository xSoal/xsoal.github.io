



var conf = {
	playerRadius: (window.innerWidth > 1024) ? 155 : 55,
	dotes: (window.innerWidth > 1024) ? 1000 : 255,
};

var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");


canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


var dotes = [];

var mouse = {

};


function DOTE(x,y,width,height) {
	var self 	= this;
	self.x      = parseFloat(x) || 0;
	self.y      = parseFloat(y) || 0;
	self.radius = 5;
	self.vx     = 0;
	self.vy     = 0;
	self.friction = 0.99;
	self.color    = "rgba("+random(0,255)+", "+random(0,255)+", "+random(0, 255)+", 1)";

	this.think  = function(){
		var dx = self.x - mouse.x;
		var dy = self.y - mouse.y;

		var distance = Math.sqrt(dx*dx + dy*dy);
		
		if(distance < conf.playerRadius) {
			var angle = Math.atan2(dy,dx);
			var tx    = mouse.x + Math.cos(angle) * conf.playerRadius;
			var ty    = mouse.y + Math.sin(angle) * conf.playerRadius;

			self.vx   += tx - self.x;
			self.vy   += ty - self.y;
		}

		self.vx *= self.friction/1.14;
		self.vy *= self.friction/1.14;

		self.x  += self.vx;
		self.y  += self.vy;
	} 

	this.move = function(){
		// self.speed = self.speed*self.speedCoef; 


		if((self.x > canvas.width && self.vx > 0) || (self.x < 0 && self.vx < 0)){
			self.vx = -self.vx;
		}

		if((self.y > canvas.height && self.vy > 0) || (self.y < 0 && self.vy < 0)){
			self.vy = -self.vy;
		}



		// self.y;

		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = self.color;
		ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

}


for(var i = 0; i<conf.dotes; i++){
	var dote = new DOTE(random(0, canvas.width), random(0,canvas.height));
	dotes.push(dote);
}





var mouseListener = canvas.addEventListener("mousemove", mouseMove, false);



function mouseMove(event){
	mouse.x = event.x;
	mouse.y = event.y;
}



function paint(){

	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = "black";

	dotes.forEach(function(item, i , dotes){
		item.think();
		item.move();
	});


	ctx.beginPath();
	ctx.fillStyle = "green";
	ctx.arc(mouse.x, mouse.y, conf.playerRadius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
}


function render(){
	paint();
	requestAnimationFrame(render);
}


render();







function random(min, max) {
  var e = Math.random() * (max - min) + min;
  return e.toFixed(0);
}