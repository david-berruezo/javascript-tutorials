// Objeto Context

var canvas  = "";
var context = "";

window.onload=function(){
	
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	//alert(canvas);
	//alert(this.canvas);
	//alert(this);
	
	console.log("objeto circumferencia");
	
	
};



// Ejemplo 1
var runCode = {
		x: 35,
		y:55,
		html: '<div></div>',
		execute: function(callback){
			callback(this.x, this.y);
		}
};

var obj  = {
		x:12,
		y:22,
		multiply: function(){
			return this.x * this.y;
		},
		divide: function(){
			return this.x / this.y;
		},

		operate:function(callback,param1,param2){
			
			//return call(callback); 
			
		},

		suma: function(){
			return this.x + this.y;
		},
		
};

var circumferencia = function(){
	
		// Objeto Circumferencia
		this.radius 	= "",
		this.diameter	= "",
		this.hipotenusa = "",
		this.sin		= "",
		this.cos		= "",
		this.tang		= "",
		this.cateto1	= "",
		this.cateto2	= "",
		
		this.drawSquares = function (){
			
			for (var i=0;i<360;i++){
				
				if (i%30 == 0){
					
					context.beginPath();
				    context.rect(50, 50, 200, 100);
				    context.fillStyle = 'yellow';
				    context.fill();
				    context.lineWidth = 7;
				    context.strokeStyle = 'black';
				    context.stroke();
					
					
				}
				
				context.rotate(Math.PI / 4);
				
				
			}
			
			
		},
		
		this.drawArc = function(){
			
			context.lineWidth = 1;
			context.strokeStyle = "#cccccc";
			
			var x = canvas.width / 2;
		    var y = canvas.height / 2;
		    var radius = 100;
		    var startAngle = 1.1 * Math.PI;
		    var endAngle = 1.9 * Math.PI;
		    var startAngle = 0 * Math.PI;
		    var endAngle = 180 * Math.PI / 180;
		    var counterClockwise = true;

		    context.beginPath();
		    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		    context.lineWidth = 15;

		    // line color
		    context.strokeStyle = 'black';
		    context.stroke();
			
			
		},
		
		
		this.drawQuadraticCurveTo = function(){
			
			context.lineWidth = 5;
			context.strokeStyle = "#cccccc";
			
			context.moveTo(100, canvas.height - 50);
			context.quadraticCurveTo(canvas.width / 2, -50, canvas.width - 100, canvas.height - 50);
			context.stroke();
			
			
		},
		
		this.drawLine = function(){
			
			//alert("Draw Line");
			
			/*
			// Diagonal
			context.lineWidth = 10;
			context.strokeStyle = "blue";
			context.moveTo(50, canvas.height - 50);
			context.lineTo(canvas.width - 50, 50);
			context.stroke();
			*/
			
			// Vertical
			context.lineWidth = 5;
			context.strokeStyle = "#cccccc";
			context.moveTo(canvas.width / 2, canvas.height / 2 - 50);
			context.lineTo(canvas.width / 2, canvas.height / 2 + 50);
			context.lineCap = "round";
			context.stroke();
			
			
			
		},
		
		this.drawCircumference = function (){
			
			//alert("Draw Circumference");
			
			// Clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
				
			// Move registration point to the center of the canvas
			context.translate(canvas.width/2, canvas.width/2);
				
			// Rotate 1 degree
			context.rotate(Math.PI / 180);
			    
			// Move registration point back to the top left corner of canvas
			context.translate(-canvas.width/2, -canvas.width/2);
			
			context.beginPath();
			context.arc(100,75,50,0,2 * Math.PI);
			context.stroke();
			
			console.log(this);
			
		}

		
};




$(document).ready(function(){
	

	//var objetoCircumferencia = new circumferencia();
	//objetoCircumferencia.drawLine();
	//objetoCircumferencia.drawArc();
	
	//runCode.execute(function(){24, 45});
	
	obj.y = 444;
	//alert(obj.multiply());
	obj.operate("suma");
	obj.operate.call(obj, 10, 2);     // Will return 20 


	//alert(obj.cridaFuncio(function(){return 'David un crack';} ));
	
	//objetoCircumferencia.drawCircumferencia);
	//setInterval(objetoCircumferencia.drawCircumferencia, 100);
	//objetoCircumferencia.drawSquares();
	
	
});
