$(document).ready(function(){
	
	// Referente al stage
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	var canvas 			  = document.getElementById('canvas');
	var vectorTriangulos  = [[0,0],[-10,-10],[-10,10]];
	
	context = canvas.getContext('2d');
	
	canvas.width = stageWidth;
	canvas.height = 400;
	
	crearTriangulo();
	
	function crearTriangulo(){
		
		// var
		context.fillStyle = "rgba(0, 0, 0, 0.2)";
		context.fillStyle = "rgba(150, 255, 0, 0.3)";
		context.strokeStyle = "#96FF00";
		context.restore();
		context.save();
		context.translate(200,200);
		context.rotate(0);
		context.beginPath();
		context.moveTo(vectorTriangulos[0][0],vectorTriangulos[0][1]);
		context.lineTo(vectorTriangulos[1][0],vectorTriangulos[1][1]);
		context.lineTo(vectorTriangulos[2][0],vectorTriangulos[2][1]);
		context.closePath();
		context.stroke();
		context.fill();
		context.restore();
		
		/*
		// triangle
		context.beginPath();
		context.moveTo(20, 0);
		context.lineTo(20, 10);
		
		context.moveTo(20,5);
		context.lineTo(10,10);
		
		context.moveTo(20,5);
		context.lineTo(10,0);
		
		context.closePath();
		 
		//context.fillRect(-20/2, -20/2, 20, 20);
		
		// the outline
		context.lineWidth = 1;
		context.strokeStyle = '#666666';
		context.stroke();
		 
		// the fill color
		context.fillStyle = "#FFCC00";
		context.fill();
		*/	
		
		/*
		 * 
		// triangle
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, 10);
		
		context.moveTo(10,5);
		context.lineTo(0,10);
		
		context.moveTo(10,5);
		context.lineTo(0,0);
		
		context.closePath();
		 
		//context.fillRect(-20/2, -20/2, 20, 20);
		
		// the outline
		context.lineWidth = 1;
		context.strokeStyle = '#666666';
		context.stroke();
		 
		// the fill color
		context.fillStyle = "#FFCC00";
		context.fill();
		*/
		
		/*
		
		var ax=0;
		var ay=0;
		var bx=0;
		var by=150;
		
		var dx=bx-ax
		var dy=by-ay;
		var dangle = Math.atan2(dy, dx) - Math.PI / 3;
		var sideDist = Math.sqrt(dx * dx + dy * dy);
		
		var cx = Math.cos(dangle) * sideDist + ax;
		var cy =  Math.sin(dangle) * sideDist + ay;
		
		var canvas = document.getElementById('equ');
		var ctx = canvas.getContext('2d');
		
		ctx.beginPath();  
		ctx.moveTo(ax,ay);  
		ctx.lineTo(bx,by);  
		ctx.lineTo(cx,cy);  
		
		ctx.fill(); 
		
		*/
		
	}
	
	
});