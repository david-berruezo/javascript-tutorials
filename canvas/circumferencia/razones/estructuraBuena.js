$(document).ready(function(){
	// Referente al stage
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	// Referente a la circumferencia
	var radio 			  = 150;
	var maxRadio		  = 0;
	var minRadio 		  = 0;
	var contadorGrados    = 0;
	var grados			  = 0;
	var contadorVueltas   = 0;
	var margenY	  		  = 20;
	var margenX	  	  	  = 20;
	var diferenciaGrados  = 0;
	var ncuadros		  = 10;
	var countOfColors 	  = 8;
	var escalado   		  = 1;
	var alpha			  = 1;
	var idEscalado 		  = 0;
	// Referente a la posicion del mouse y al radio de la circumferencia
	var mouseX			  = 200;
	var mouseY			  = 200;
	var mouseXcanvas	  = 0;
	var mouseYcanvas	  = 0;
	// Referente al interval de la animaci�n
	var miInterval  	  = 0;
	var miInterval2		  = 0;
	var startTime		  = 0;
	var nowTime			  = 0;
	var contadorTimer 	  = 0;
	var timerActivado 	  = false;
	// Referente a como guardamos los cuadrados
	var vectorObjetos 			= new Array();
	var vectorTriangulos  		= [[25,0],[20,-5],[20,5]];
	// Referente a como clicamos un objeto
	var selectId		  = 0;
	var finalizarAnim	  = false;
	var finalizarEventos  = false;
	var idSeleccionado    = -1;
	var idPinchado		  = -1;
	var estadoAplicacion  = 'inicial';
	// Referente a como guardamos las etiquetas
	var vectorObjetosCategoria = new Array();
	var totalCategorias		   = 0;
	var canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	// 1 Sinos positivos, 2 sinos negativos, 3 cosinos positivos, 4 cosinos negativos, 5 tg positivas, 6 tg negativas, 7 opuestos, 8 complementarios 9 mismaTangente
	// var opciones		 	 = 6;
    var opciones		 	 = 0;
	canvas.width  = stageWidth;
	canvas.height = stageHeight;

	/*
	// objeto cuadrado
	var cuadradoGrande = function(x, y, width, height,angle,radius) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.radius = radius;
	};
	var cuadradoPeke = function (x, y, width, height,angle,radius){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.radius = radius;
	}
	var cuadradoGrande = function (x, y, width, height,angle,radius){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.radius = radius;
		this.devolver = function(){
			return{
				x: this.x,
				y: this.y,
				x2:this.x+this.width,
				y2:this.y+this.height,
			}
		}// End functin
	}
	*/
	// Llamada a functiones
	configuration();
	keepAnglesInObject();
	lanzarPararAnimacion(1,animate);
	//captureMouse();
	//lanzar();
	//lanzarPararAnimacion(1,animate);
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
	
	function escribirMensaje(canvas,message){
		/*
		context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
		*/
		$('#texto').text(message);
	}
	
	// Configuration
	function configuration(){
		maxRadio = 200;//(canvas.height - 100 / 2) - (20 + margenY * 2);
		minRadio = maxRadio - 100;
		margenX  = maxRadio / 2;
		margenY  = maxRadio / 2;
		//window.addEventListener('mousemove',captureMouse,true);
		//canvas.addEventListener('mousemove',captureMouseCanvas,true);
		canvas.addEventListener('click',clickGrade,true);
	}
	
	function clickGrade(event){
		diferenciaGrados = 360 - vectorObjetos[idSeleccionado].angle;
		finalizarEventos = true;
		idPinchado = idSeleccionado;
		estadoAplicacion = 'seleccionado';
		console.log('diferenciaGrados: '+diferenciaGrados+' idSeleccionado: '+idSeleccionado);
	}
	
	//Capture Mouse
	function captureMouse(event){
		mouseX = event.pageX;
		mouseY = event.pageY;
	}
	
	 function getMousePos(canvas, evt) {
	     	var rect = canvas.getBoundingClientRect();
	       	return {
	          x: evt.clientX - rect.left,
	          y: evt.clientY - rect.top
	        };
	 }
	
	//Capture Mouse
	function captureMouseCanvas(event){
		mouseXcanvas = event.pageX;
		mouseYcanvas = event.pageY;
		var mousePos = getMousePos(canvas, event);
        var message = 'Mouse position: x:' + mousePos.x + ', y: ' + mousePos.y;
        escribirMensaje(canvas, message);
       	mouseXcanvas = mousePos.x;
		mouseYcanvas = mousePos.y;
	}
	
	
	function crearNuevoTimer(){
		var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	   	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame =
	          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
		if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	   	if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	} // End function
	
	function lanzar(){
			  window.requestAnimFrame = (function(){
		      return  window.requestAnimationFrame       || 
		              window.webkitRequestAnimationFrame || 
		              window.mozRequestAnimationFrame    || 
		              window.oRequestAnimationFrame      || 
		              window.msRequestAnimationFrame     || 
		              function(/* function */ callback, /* DOMElement */ element){
		                window.setTimeout(callback, 1000 / 60);
		              };
		    })();
	}
	
	// Save angles in a object
	function keepAnglesInObject(){
		var tempGrados    = 0;
		var suplementario = 0;
		radio = 150;
		grados = 360 / ncuadros;
		for (var i=0;i < ncuadros;i++){
			tempGrados = grados * i;
			var adjRatio = margenX + radio * Math.cos(tempGrados*(Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(tempGrados*(Math.PI/180)); // SOH
			var objeto1 = new cuadradoGrande(adjRatio,oppRatio,50,50,tempGrados,radio);
			vectorObjetos.push(objeto1);
			// Keep angles to different options
			// Quant sinus positiu i negatiu | Part superior inferior circumferencia
			/*
			if (Math.sin(tempGrados*Math.PI/180) >= 0 && Math.sin(tempGrados*Math.PI/180) <= 180){
				vectorSinosPositivos.push(tempGrados);
			}else{
				vectorSinosNegativos.push(tempGrados);
			}// End if
			// Quant cosinus positiu i negatiu | Part dret i esquerra circumferencia
			if (Math.cos(tempGrados*Math.PI/180) >= 0 && Math.cos(tempGrados*Math.PI/180) <= 180){
				vectorCosPositivos.push(tempGrados);
			}else{
				vectorCosNegativos.push(tempGrados);
			}// End if
			// Angulos suplementarios
			suplementario = Math.abs(180 - tempGrados);
			vectorSuplementarios[tempGrados] = suplementario;
			// Angulos opuestos
			opuesto = Math.abs(360 - tempGrados);
			vectorOpuestos[tempGrados] = opuesto;
			*/
		}// end for
		/*
		console.log('senos Positivos: '+vectorSinosPositivos);
		console.log('senos Negativos: '+vectorSinosNegativos);
		console.log('cosenos Positivos: '+vectorCosPositivos);
		console.log('cosenos Negativos: '+vectorCosNegativos);
		console.log('Complmentarios: '+vectorSuplementarios);
		console.log('Opuestos: '+vectorOpuestos);
		*/
	} // end function
	
	function circumferenciaEventos(){
		var color 	    = '';
		var tamCuadro   = '';
		var cursor		= 'default';
		if (finalizarEventos === false){
			for (var i=0;i < ncuadros;i++){
				// Ejex X e Y
				var adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
				var oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
				// color
				color = rainbow(countOfColors, i);
				color = '#00000';
				// canvas
				context.save(); 
				context.translate(adjRatio,oppRatio);
				context.rotate(vectorObjetos[i].angle * Math.PI/180);
				if (mouseXcanvas >= adjRatio -10 && mouseXcanvas <= adjRatio + 20){
					if (mouseYcanvas >= oppRatio -10 && mouseY <= oppRatio + 20){
						idSeleccionado  = i;
						color 	    	= '#515050';
						tamCuadro   	= 30;
						cursor			= 'pointer';
					}else{
						if (i != idPinchado){
							tamCuadro = 20;
						}else{
							tamCuadro = 30;
						}
						cursor		= 'default';
					}// End if
				}else{
					if (i != idPinchado){
						tamCuadro = 20;
					}else{
						tamCuadro = 30;
					}
					cursor		= 'default';
				}// End if
				// Color y tama�o cuadro
				context.fillStyle=color;
				context.fillRect(-tamCuadro/2, -tamCuadro/2, tamCuadro, tamCuadro);
				context.restore();
			}// End for

			if (idPinchado != - 1){
				context.font="14px Georgia";
				context.fillStyle='#000000';
				context.fillText("Contratame !!!",margenX + 30 + radio,margenY + 5);
				context.font="12px Georgia";
				context.fillStyle='#999999';
				context.fillText("Circumferencia y mucho m�s de regalo",margenX + 30 + radio,margenY + 5  + 20);
				context.fillStyle='#cccccc';
				context.fillText("Ll�vame a tu oficina",margenX + 30 + radio,margenY + 5 + 35);
			}
		}// End if
	}// End function
	
	
	function ampliarCircumferencia(){
		var color = '';
		if (contadorTimer > 49 && radio < maxRadio){
			radio++;
		}else if(contadorTimer < 49){
			radio = 10;
		}else if(contadorTimer > 49 && radio == maxRadio){
			estadoAplicacion = 'rotando';
		}// End if
		for (var i=0;i < ncuadros;i++){
			context.save();
			vectorObjetos[i].angle = vectorObjetos[i].angle + 3;
			if (vectorObjetos[i].angle > 360){
				vectorObjetos[i].angle = vectorObjetos[i].angle - 360;
			}
			var adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
			context.translate(adjRatio,oppRatio);
			context.rotate(vectorObjetos[i].angle * Math.PI/180);
			color = rainbow(countOfColors, i);
			color = '#000000';
			context.fillStyle=color;
			context.fillRect(-20/2, -20/2, 20, 20);
			context.restore();
		}// End for
		contadorTimer++;
	}// End function
	
	function irAlGrado(){
		//console.log('contadorGrados: '+contadorGrados+' diferenciaGrados: '+diferenciaGrados);
		var finalizarGrado = false;
		var color 		   = '';
		var proporcion     = 0;
		var tamNormal      = 20;
		if (contadorGrados + 3 > diferenciaGrados){
			contadorGrados = diferenciaGrados - contadorGrados;
			finalizarGrado = true;
		}else if(contadorGrados + 3 == diferenciaGrados){
			finalizarGrado = true;
		}else{
			contadorGrados = contadorGrados + 3;
		}
		for (var i=0;i < ncuadros;i++){
				context.save();
				vectorObjetos[i].angle = vectorObjetos[i].angle + 3;
				if (vectorObjetos[i].angle > 360){
					vectorObjetos[i].angle = vectorObjetos[i].angle - 360;
				}
				var adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
				var oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
				context.translate(adjRatio,oppRatio);
				context.rotate(vectorObjetos[i].angle * Math.PI/180);
				color = rainbow(countOfColors, i);
				if (i == idPinchado){
					color 	    	= '#515050';
				}else{
					color = '#000000';
				}
				context.fillStyle=color;
				if (finalizarGrado === false){
					proporcion = tamNormal + (contadorGrados / 3) / 10;
				}else{
					proporcion = tamNormal + (contadorGrados / 3) / 10;
					//proporcion = tamNormal + 10;
				}
				if (idSeleccionado == i){
					context.fillRect(-proporcion/2, -proporcion/2, proporcion, proporcion);
				}else{
					context.fillRect(-20/2, -20/2, 20, 20);
				}
				context.restore();
				//console.log('mouseX: '+mouseXcanvas+' mouseY:'+mouseYcanvas+'adjRatio: '+adjRatio+' oppRatio:'+oppRatio);
		}// End for
		if (finalizarGrado === true){
			context.font="14px Georgia";
			context.fillStyle='#000000';
			context.fillText("Contratame !!!",margenX + 30 + radio,margenY + 5);
			context.font="12px Georgia";
			context.fillStyle='#999999';
			context.fillText("Circumferencia y mucho m�s de regalo",margenX + 30 + radio,margenY + 5  + 20);
			context.fillStyle='#cccccc';
			context.fillText("Ll�vame a tu oficina",margenX + 30 + radio,margenY + 5 + 35);
			estadoAplicacion = 'parar';
			//contadorGrados = 0;
		}// End if
	}// End function
	
	function devolverSinus(valor,opcion){
		var positivo = 0;
		var negativo = 0;
		if (opcion == 1){
			positivo = 2;
			negativo = 1;
		}else{
			positivo = 1;
			negativo = 2;
		}
		if ( Math.sin(valor*Math.PI/180) >= 0 && Math.sin(valor*Math.PI/180) <= 180){
			escalado = positivo;
		}else{
			escalado = negativo;
		}// End if
	}// End function
	
	function devolverCosinus(valor,opcion){
		var positivo = 0;
		var negativo = 0;
		if (opcion == 1){
			positivo = 2;
			negativo = 1;
		}else{
			positivo = 1;
			negativo = 2;
		}
		// Quant cosinus positiu i negatiu | Part dret i esquerra circumferencia
		// console.log('Hola');
		if (Math.cos(valor * Math.PI/180) >= 0){
			escalado = positivo;
		}else{
			escalado = negativo;
		}// End if
		console.log('cos: '+Math.cos(valor * Math.PI/180));
	}
	
	
	function devolverTangente(valor,opcion){
		var positivo = 0;
		var negativo = 0;
		if (opcion == 1){
			positivo = 1.5;
			negativo = 1;
		}else{
			positivo = 1;
			negativo = .5;
		}
		// Quant cosinus positiu i negatiu | Part dret i esquerra circumferencia
		// console.log('Hola');
		if (Math.tan(valor * Math.PI/180) >= 0){
			escalado = positivo;
			//alpha    =  .5;
		}else{
			escalado = negativo;
		}// End if
	}
	
	function devolverSegundoCuadrante(valor,opcion){
		var anguloSimetrico = 0;
		//anguloSimetrico = ;
		
	}
	
	function dibujarTriangulo(adj,opp){
		context.beginPath();
		context.moveTo(vectorTriangulos[0][0],vectorTriangulos[0][1]);
		context.lineTo(vectorTriangulos[1][0],vectorTriangulos[1][1]);
		context.lineTo(vectorTriangulos[2][0],vectorTriangulos[2][1]);
		context.closePath();
		context.stroke();
		context.fill();
		context.textAlign = "center";
		context.fillText("Cosinus", 50, 5);
	}
	
	function moverCircumferencia(){
		// var
		var color      = '';
		radio 	       = 150;
		escalado       = 1;
		alpha		   = 1;
		//if (contadorTimer < 1){
		for (var i=0;i < ncuadros;i++){
			context.save();

			vectorObjetos[i].angle = vectorObjetos[i].angle + 1;
			//console.log("Seno: "+seno+" Coseno: "+coseno);

			if (vectorObjetos[i].angle > 360){
				vectorObjetos[i].angle = vectorObjetos[i].angle - 360;
			}

			var tempY = parseInt( $('#canvas').css('top') ) +  margenX;
			var tempX = parseInt( $('#canvas').css('left') ) + margenY;
			var distX = mouseX - tempX;
			var distY = mouseY - tempY;
			var dist  = Math.sqrt(distX * distX + distY * distY);
			var maxDist = 50;
			if (Math.abs(dist) >=25 && Math.abs(dist) <=  maxDist){
				radio = maxRadio * dist / maxDist;
			}else if(Math.abs(dist) < 25){
				estadoAplicacion = 'parar';
				//console.log('Se para');
			}else if (Math.abs(dist) >  maxDist){
				radio = maxRadio;
			}// End if
			radio 	       = 150;
			// Vectors to affect different parts of circumference
			/*
			var vectorSuplementarios = new Array();
			var vectorSinosPositivos = new Array();
			var vectorSinosNegativos = new Array();
			var vectorCosPositivos	 = new Array();
			var vectorCosNegativos   = new Array();
			var vectorTgPositivos    = new Array();
			var vectorTgNegativos    = new Array();
			var vectorOpuestos       = new Array();
			var vectorMismaTangente  = new Array();
			*/
			switch (opciones){
				case 0: console.log('opciones normal');
				break;
				case 1:devolverSinus(vectorObjetos[i].angle,1);
				break;
				case 2:devolverSinus(vectorObjetos[i].angle,2);
				break;
				case 3:devolverCosinus(vectorObjetos[i].angle,1);
				break;
				case 4:devolverCosinus(vectorObjetos[i].angle,2);
				break;
				case 5:devolverTangente(vectorObjetos[i].angle,1);
				break;
				case 6:devolverTangente(vectorObjetos[i].angle,2);
				break;
				case 7:
					if (vectorObjetos[i].angle <= 90 ){
						devolverSegundoCuadrante(vectorObjetos[i].angle,1)
					}
				break;
				/*
				case 5:
					idEscalado = vectorTgPositivos[i]; 
					escalado   = 2;
				break;
				
				case 6:
					idEscalado = vectorTgNegativos[i]; 
					escalado   = 2;
				break;
				
				case 8:
					idEscalado = vectorSuplementarios[i]; 
					escalado   = 2;
				break;
				*/
			}
			/*
			if (idEscalado == i){
				escalado = 2;
			}else{
				escalado = 1;
			}
			*/
			var adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH

            //var adjRatio = margenX + radio * ( Math.sin(vectorObjetos[i].angle * (Math.PI/180))* Math.cos(0* (Math.PI/180)) + Math.sin(vectorObjetos[i].angle * (Math.PI/180)) * Math.cos(0* (Math.PI/180)));
            //var oppRatio = margenY + radio * ( Math.cos(vectorObjetos[i].angle* (Math.PI/180)) * Math.cos(1* (Math.PI/180)) - Math.sin(vectorObjetos[i].angle * (Math.PI/180)) * Math.sin(1* (Math.PI/180)));

			context.translate(adjRatio,oppRatio);
			context.rotate(vectorObjetos[i].angle * Math.PI/180);
			context.scale(escalado,escalado);
			context.globalAlpha = alpha;
			color = rainbow(countOfColors, i);
			color = '#000000';
			context.fillStyle=color;	
			dibujarTriangulo(adjRatio,oppRatio);
			context.fillRect(-20/2, -20/2, 20, 20);
			context.restore();
		}// End for
		//}//End if
		//contadorTimer++;
	}
	
	function animate(){
		if (!finalizarAnim){
			miInterval     = requestAnimationFrame(animate);
			context.clearRect(0, 0, canvas.width, canvas.height);
			ponerEstado();
		} // End if
	}
	
	function ponerEstado(){
		if (estadoAplicacion == 'inicial'){
			ampliarCircumferencia();
			console.log('inicial');
		}else if (estadoAplicacion == 'rotando') {
			console.log('rotando');
			//resetearValores();
			//resetearTimer();
			//idPinchado		 = -1;
			moverCircumferencia(); // draw
			//dibujarTriangulo();
		}else if(estadoAplicacion == 'parar'){
			//resetearValores();
			//empezarContar();
			//circumferenciaEventos();
		}else if(estadoAplicacion == 'seleccionado'){
			//console.log('llega Aqui');
			irAlGrado();
			// Llamar a un timer
			// Esperar tiempo pruedencial si no se apreta boton
			// si es apreta ir al grado y cuando finalize otra vez timer
		}// End if
	}
	

	function resetearValores() {
		// var
		contadorGrados   = 0;
		diferenciaGrados = 0;
		finalizarEventos = false;
		idSeleccionado   = -1;
		//finalizarAnim  = false;
	}

	function resetearTimer(){
		contadorTimer    = 0;
	}
	
	function empezarContar(){
		//contadorTimer++;
			if (mouseXcanvas >= margenX - radio && mouseXcanvas <= margenX + radio){
				if (mouseYcanvas >= margenY - radio && mouseYcanvas <= margenY + radio){
					console.log('Esta dentro '+radio+' margenX: '+margenX+' margenY: '+margenY);
				}else{
					contadorTimer++;
					console.log('Esta fuera'+radio+ ' margenX: '+margenX+' margenY: '+margenY);
				}
			}else{
				contadorTimer++;
				console.log('Esta fuera'+radio+' margenX: '+margenX+' margenY: '+margenY);
			}
			//console.log('contadorTimer: '+contadorTimer);
			if (contadorTimer == 100){
				console.log('finalizar');
				estadoAplicacion = 'rotando';
			}
	}
	
	function lanzarPararAnimacion(lanzarParar,funcion){
		if (lanzarParar == 1){
			miInterval     = requestAnimationFrame(funcion);
		}else{
			window.cancelAnimationFrame(miInterval);
			resetearValores();
		}// End if
	}// End function
});
