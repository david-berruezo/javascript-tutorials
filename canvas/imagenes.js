$(document).ready(function(){
	
	var canvas = $("canvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	var playanimation = true;
	var nAnimacion = 1;
	var countOfColors = 50;
	
	function rainbow(numOfSteps, step) {
	    
		// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distiguishable vibrant markers in Google Maps and other apps.
	    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	    // Adam Cole, 2011-Sept-14
	    
	    var r, g, b;
	    var h = step / numOfSteps;
	    var i = ~~(h * 6);
	    var f = h * 6 - i;
	    var q = 1 - f;
	    switch(i % 6){
	        case 0: r = 1, g = f, b = 0; break;
	        case 1: r = q, g = 1, b = 0; break;
	        case 2: r = 0, g = 1, b = f; break;
	        case 3: r = 0, g = q, b = 1; break;
	        case 4: r = f, g = 0, b = 1; break;
	        case 5: r = 1, g = 0, b = q; break;
	    }
	    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
	    return (c);
	}
	
	
	var cuadros = function(x, y,width,height){
		
		// Variables x,y
		this.x = x;
		this.y = y;
		
		// Variables tama�o
		this.width = width;
		this.height = height;

		/*
		// Radio
		this.radius = radius;
		
		// Velocidad
		this.vX = vX;
		this.vY = vY;
		
		// Aceleraci�n
		this.aX = aX;
		this.aY = aY;
		*/
		
		
	};
	
	var vectorcuadros = new Array();
	
	for (var i=0;i<3;i++){
		
		x = i * 50;
		console.log(x);
		cuadro = new cuadros(x,0,50,50);
		vectorcuadros.push(cuadro);
		context.fillRect(vectorcuadros[i].x, vectorcuadros[i].y, vectorcuadros[i].width, vectorcuadros[i].height);
	}
		
	var escalado = 1;
	
	function animate(){
	
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		for (var i=0;i<3;i++){
			
			console.log("Hola");
			
			if (nAnimacion == 1){
				
				context.scale(escalado,escalado);
				context.fillStyle = rainbow(countOfColors, i);
				//context.fillStyle="#000000";
				context.fillRect(vectorcuadros[i].x, vectorcuadros[i].y, vectorcuadros[i].width, vectorcuadros[i].height);
				//escalado += 0.0001;
				
				//TweenMax.to(context), 1, {scale:2, ease:Expo.easeOut,onComplete:parar});	
				//TweenMax.to($("#context"), 1, {scale:2, ease:Expo.easeOut});	
				
				
			}
			
		}
		
		if (playanimation) {
			setTimeout(animate, 33);
		}
		
	}
	
	function parar(){
		
		playanimation = false;
		
	}
	
	TweenMax.to($("#context"), 1, {scaleX:2,scaleY:2, ease:Expo.easeOut});
	//animate();
	
	
});

