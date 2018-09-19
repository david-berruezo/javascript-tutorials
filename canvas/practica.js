$(document).ready(function(){
	
	var canvas = $("canvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	var angle = 0;
	var angle2 = 0;
	var radio = canvasHeight / 2;
	
	var cuadrado = function(x1,y1,x2,y2){
		
		// Formar un cuadrado
		this.x1 = x1;
		this.y1 = y1;
		
		this.x2 = x2;
		this.y2 = y2;
		
		
		/*
		this.x3 = x3;
		this.y3 = y3;
		
		,x2,y2,x3,y3
		
		this.x4 = x4;
		this.y4 = y4;
		*/
	
	}
	
	context.beginPath();
	context.arc(canvasWidth/2,canvasHeight/2,radio,0,2 * Math.PI);
	context.stroke();
	
	
	/*
	context.beginPath();
	context.moveTo(canvasWidth/2,canvasHeight/2);
	context.lineTo(408,150);
	context.stroke();
	*/
	
	vectorCuadrados = new Array();
	
	for (var i=0;i<1;i++){
		
		// axis x,y
		var x = canvasWidth/2  + (radio * Math.cos(30 * (Math.PI/180 )));
		var y = canvasHeight/2 - (radio * Math.sin(30 * (Math.PI/180 )));
		
		var x2 = canvasWidth/2  + (radio * Math.cos(0 * (Math.PI/180 )));
		var y2 = canvasHeight/2 - (radio * Math.sin(0 * (Math.PI/180 )));
		
		vectorCuadrados.push(new cuadrado(x,y,x2,y2));
		
		/*
		context.beginPath();
		context.moveTo(canvasWidth/2,canvasHeight/2);
		context.lineTo(x,y);
		context.stroke();
		*/
		
		// radius
		var radius = 5+Math.random()*10;
		
		// velocidad
		var vX = Math.random()*14-2;
		var vY = Math.random()*14-2;
		
		// acceleration
		var aX = Math.random()*0.2-0.1;
		var aY = Math.random()*0.2-0.1;
		
		
		
		//asteroids.push(new Asteroid(x, y, radius,vX,vY,aX,aY));
		
	}
	
	
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		/*
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
		*/
	};
	
	
	var radio2 = 5;
	
	function animate(){
		
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		for (var i=0;i<1;i++){
			
			// axis x,y
			angle  += 1;
			angle2 += 1;
			
			if (angle == 360){
				
				angle  = 0;
				angle2 = 0;
				
			}
			
			
			
			// Linia hypotenusa
			var x = canvasWidth/2  + (radio * Math.cos(angle * (Math.PI/180 )));
			var y = canvasHeight/2 - (radio * Math.sin(angle * (Math.PI/180 )));
			
			// Linia coseno
			var x2 = canvasWidth/2 + (radio * Math.cos(angle2 * (Math.PI/180 )));
			
			// Linia seno
			var y2 = canvasHeight/2 + (radio * Math.sin(angle * (Math.PI/180 )));
			
			// Linia inventada
			
			
			//console.log("width: "+canvasWidth+"height: "+canvasHeight);
			//console.log("x: "+x+" y: "+y);
			
			//console.log("angle: "+angle);
			
			// Hypotenusa
			context.beginPath();
			context.moveTo(canvasWidth/2,canvasHeight/2);
			context.lineTo(x,y);
			context.strokeStyle="#000000";
			context.stroke();
			
			// Coseno
			context.beginPath();
			context.moveTo(canvasWidth/2,canvasHeight/2);
			context.lineTo(x2,canvasHeight/2);
			context.strokeStyle="#fa0320";
			context.stroke();
			
			// Seno
			context.beginPath();
			context.moveTo(canvasWidth/2,canvasHeight/2);
			context.lineTo(canvasWidth/2,y);
			context.strokeStyle="#1efc07";
			context.stroke();
			
			
			// Inventada
			context.beginPath();
			context.moveTo(x2,canvasHeight/2);
			context.lineTo(x2,y);
			context.strokeStyle="#fcae07";
			context.stroke();
			
			
			// Linia horizontal Circumferencia
			context.beginPath();
			context.moveTo(canvasWidth/2+radio,canvasHeight/2);
			context.lineTo(canvasWidth/2-radio,canvasHeight/2);
			context.strokeStyle="#cccccc";
			context.stroke();
			
			// Linia vertical Circumferencia
			context.beginPath();
			context.moveTo(canvasWidth/2,0);
			context.lineTo(canvasWidth/2,canvasHeight);
			context.strokeStyle="#cccccc";
			context.stroke();
			
			// Circunferencia
			context.beginPath();
			context.arc(canvasWidth/2,canvasHeight/2,radio,0,2 * Math.PI);
			context.strokeStyle="#cccccc";
			context.stroke();
			
			if (radio2 < radio){
				
				radio2 += .1;
				console.log(radio2);
				
			}else{
				
				radio2 += .1;
			}
			
			// Circunferencia peke
			context.beginPath();
			context.arc(canvasWidth/2,canvasHeight/2,radio2,0,2 * Math.PI);
			context.fillStyle="red";
			context.fill();
			context.strokeStyle="#999999";
			context.stroke();
			
			/*
			$(window).on("mousemove", function( event ) {
				  //$( "#log" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
					var distance = Math.sqrt((dX*dX)+(dY*dY));
					console.log("pageX: " + event.pageX + ", pageY: " + event.pageY);
			*/
			
			/*
			var canvasOffset = canvas.offset();
			console.log(canvasOffset.left);
			console.log(canvasOffset.top);
			console.log(window.pageXOffset);
			console.log(window.pageYOffset);
			*/
			
			
			/*
			var canvasX = Math.floor(e.pageX-canvasOffset.left);
			var canvasY = Math.floor(e.pageY-canvasOffset.top);
			*/
			
			
			
		}
		
		
		window.requestAnimationFrame(animate);
		//setTimeout(animate, 1000);
		
		
	}	
	
	animate();
	
});