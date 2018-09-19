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
	var opciones		  = 1;
	// Referente a la posicion del mouse y al radio de la circumferencia
	var mouse			  = 0;
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
	// Referente al propio canvas
	var canvas;
	var context;
	// Llamada a functiones
	configuration();
	//keepAnglesInObject();
	keepAnglesInObject2();
	lanzarPararAnimacion(1,animate);
	//captureMouse();
	//lanzar();
	//lanzarPararAnimacion(1,animate);
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
		// canvas
		canvas  	  = document.getElementById('canvas');
		context 	  = canvas.getContext('2d');
		canvas.width  = stageWidth;
		canvas.height = 400;
		// Radio
		maxRadio = (canvas.height / 2) - (20 + margenY * 2);
		minRadio = maxRadio - 100;
		margenX  = maxRadio + 50;
		margenY  = maxRadio + 50;
		// Mouse
		mouse   = captureMouse(document.getElementById('canvas'));
		//canvas.addEventListener('click',clickGrade,true);
	}
	
	function clickGrade(event){
		diferenciaGrados = 360 - vectorObjetos[idSeleccionado].angle;
		finalizarEventos = true;
		idPinchado = idSeleccionado;
		estadoAplicacion = 'seleccionado';
		//console.log('diferenciaGrados: '+diferenciaGrados+' idSeleccionado: '+idSeleccionado);
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
		var tempGrados = 0;
		radio = 150;
		grados = 360 / ncuadros;
		for (var i=0;i < ncuadros;i++){
			tempGrados = grados * i;
			var adjRatio = margenX + radio * Math.cos(tempGrados*(Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(tempGrados*(Math.PI/180)); // SOH
			var objeto1 = new cuadradoGrande(adjRatio,oppRatio,50,50,tempGrados,radio);
			vectorObjetos.push(objeto1);
		}// end for
	} // end function
	
	// Save angles in a object
	function keepAnglesInObject2(){
		var tempGrados = 0;
		radio = 150;
		grados = 360 / 36;
		for (var i=0;i < 36;i++){
			tempGrados = 0 * i;
			var adjRatio = margenX + radio * Math.cos(0*(Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(0*(Math.PI/180)); // SOH
			var objeto1 = new cuadradoGrande(adjRatio,oppRatio,50,50,tempGrados,radio);
			vectorObjetos.push(objeto1);
		}// end for
	} // end function
	
	function crearCircumferencia2(){
		grados = 360 / 10;
		var color = '#000000';
		console.log('radio: '+radio+' margenX: '+margenX+' margenY: '+margenY);
		if (finalizarEventos === false){
			for (var i = 0; i < 36; i++ ){
				var prueba =  i * 36;
				var adjRatio = margenX + radio * Math.cos(prueba*(Math.PI/180)); // CAH
				var oppRatio = margenY + radio * Math.sin(prueba*(Math.PI/180)); // SOH
				// canvas
				context.translate(adjRatio,oppRatio);
				context.rotate(prueba * Math.PI/180);
				context.fillStyle=color;
				context.fillRect(-20/2, -20/2, 20, 20);
				context.save();
				context.translate(adjRatio,oppRatio);
			}
			estadoAplicacion = 'moverAngulos';
		}
	}
	
	function moverAngulos(){
		// var
		grados 		   = 360 / 36;
		var color 	   = '#000000';
		var tempGrados = 0;
		var adjRatio = 0; // CAH
		var oppRatio = 0; // SOH
		//console.log('radio: '+radio+' margenX: '+margenX+' margenY: '+margenY);
		if (finalizarEventos === false && contadorGrados < 30){
			for (var i = 0; i < 36; i++ ){
				context.restore();
				if (contadorGrados < i){
					tempGrados = contadorGrados * grados;
				}else{
					tempGrados = grados * i;
				}
				adjRatio = margenX + radio * Math.cos(tempGrados*(Math.PI/180)); // CAH
				oppRatio = margenY + radio * Math.sin(tempGrados*(Math.PI/180)); // SOH
				// canvas
				context.translate(adjRatio,oppRatio);
				//context.rotate(tempGrados * Math.PI/180);
				context.fillStyle=color;
				context.fillRect(0, 0, 20, 20);
				context.save();
				//context.translate(adjRatio,oppRatio);
				console.log('tempGrados: '+tempGrados+'adjRatio: '+adjRatio+' oppRatio: '+oppRatio);
			}
		}
		contadorGrados++;
		//console.log('mover angulos');
	}
	
	function circumferenciaEventos(){
		var color 	    = '';
		var tamCuadro   = '';
		var cursor		= 'default';
		if (finalizarEventos === false){
			for (var i=0;i < ncuadros;i++){
				// Ejex X e Y
				var adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
				var oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
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
				
				// color
				color = rainbow(countOfColors, i);
				color = '#00000';
				
				// canvas
				context.save(); 
				context.translate(adjRatio,oppRatio);
				context.rotate(vectorObjetos[i].angle * Math.PI/180);
				context.scale(escalado,escalado);
				context.globalAlpha = alpha;
				
				if (mouse.x >= adjRatio -10 && mouse.x <= adjRatio + 20){
					
					if (mouse.y >= oppRatio -10 && mouse.y <= oppRatio + 20){
						
						idSeleccionado  = i;
						color 	    	= '#515050';
						tamCuadro   	= 30;
						cursor			= 'pointer';
						
					}else{
						
						if (i != idPinchado){
							
							tamCuadro = 20;
							
						}else{
							
							tamCuadro = 20;
						}
						
						cursor		= 'default';
						
					}// End if	
					
				}else{
					
					if (i != idPinchado){
						
						tamCuadro = 20;
						
					}else{
						
						tamCuadro = 20;
						
					}
					
					cursor		= 'default';
					
				}// End if	
				
				// Color y tama�o cuadro
				context.fillStyle=color;
				context.fillRect(-tamCuadro/2, -tamCuadro/2, tamCuadro, tamCuadro);
				//dibujarTriangulo();
				context.restore();
						
			}// End for  

			if (idPinchado != - 1){
				
				/*
				context.font="14px Georgia";
				context.fillStyle='#000000';
				context.fillText("Contratame !!!",margenX + 30 + radio,margenY + 5);
				context.font="12px Georgia";
				context.fillStyle='#999999';
				context.fillText("Circumferencia y mucho m�s de regalo",margenX + 30 + radio,margenY + 5  + 20);
				context.fillStyle='#cccccc';
				context.fillText("Ll�vame a tu oficina",margenX + 30 + radio,margenY + 5 + 35);
				*/
				
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
			
			/*
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
											
		}
		*/	
			
			context.translate(adjRatio,oppRatio);
			context.rotate(vectorObjetos[i].angle * Math.PI/180);
			context.scale(escalado,escalado);
			context.globalAlpha = alpha;
			
			color = rainbow(countOfColors, i);
			color = '#000000';
			
			context.fillStyle=color;	
			
			//dibujarTriangulo();
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
		var escalado	   = 1;
		
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
				
				
				
				color = rainbow(countOfColors, i);
				
				if (i == idPinchado){
					
					color 	    	= '#515050';
					
				}else{
					
					color = '#000000';
				}
				
			
				context.fillStyle=color;	
				
				if (finalizarGrado === false){
					
					//escalado = 2;
					proporcion = tamNormal + (contadorGrados / 3) / 10;
					
				}else{
					
					
					proporcion = tamNormal + (contadorGrados / 3) / 10;
					//proporcion = tamNormal + 10;
					
				}
				
				context.translate(adjRatio,oppRatio);
				context.rotate(vectorObjetos[i].angle * Math.PI/180);
				
				if (idSeleccionado == i){
					
					//dibujarTriangulo();
					console.log('suma: '+vectorObjetos[idSeleccionado].angle+'graus: '+contadorGrados);
					escalado = 1 + ((vectorObjetos[idSeleccionado].angle + contadorGrados) / 360) * 10;
					context.fillRect(-20/2, -20/2, 20, 20);
				
				}else if(finalizarGrado == true && idSeleccionado == i){	
					
					escalado = 10;
					context.fillRect(-20/2, -20/2,20, 20);
					
				}else{
					
					//dibujarTriangulo();
					//escalado = 1;
					context.fillRect(-20/2, -20/2, 20, 20);
					
				}
				
				context.scale(escalado,escalado);
				
				context.globalAlpha = alpha;
				
				context.restore();
				
				//console.log('mouseX: '+mouseXcanvas+' mouseY:'+mouseYcanvas+'adjRatio: '+adjRatio+' oppRatio:'+oppRatio);
				
						
		}// End for  
		
		if (finalizarGrado === true){
		
			/* 
			context.font="14px Georgia";
			context.fillStyle='#000000';
			context.fillText("Contratame !!!",margenX + 30 + radio,margenY + 5);
			context.font="12px Georgia";
			context.fillStyle='#999999';
			context.fillText("Circumferencia y mucho m�s de regalo",margenX + 30 + radio,margenY + 5  + 20);
			context.fillStyle='#cccccc';
			context.fillText("Ll�vame a tu oficina",margenX + 30 + radio,margenY + 5 + 35);
			*/
			
			estadoAplicacion = 'parar';
				
		  //contadorGrados = 0;
	  
		}// End if	
		
	 
		
	}// End function
	
function devolverSinus(valor,opcion){
		
		var positivo = 0;
		var negativo = 0;
		
		if (opcion == 1){
			
			positivo = .5;
			negativo = 1;
			
		}else{
			
			positivo = 1;
			negativo = .5;
			
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
			
			positivo = .5;
			negativo = 1;
			
		}else{
			
			positivo = 1;
			negativo = .5;
			
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
			
			positivo = .5;
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
		
		var color = '';
		
		for (var i=0;i < ncuadros;i++){
						
			context.save(); 
			
			var tempY = margenY;
			var tempX = margenX;
			var distX = mouse.x - tempX;
			var distY = mouse.y - tempY;
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
			
			//console.log('mouseX: '+mouse.x+' mouseY: '+mouse.y+' distX: '+distX+' distY: '+distY);
			
			vectorObjetos[i].angle = vectorObjetos[i].angle + 3;
			
			if (vectorObjetos[i].angle > 360){
				
				vectorObjetos[i].angle = vectorObjetos[i].angle - 360;
			
			}
			
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
			
			var adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
			
			context.translate(adjRatio,oppRatio);
			context.rotate(vectorObjetos[i].angle * Math.PI/180);
			context.scale(escalado,escalado);
			context.globalAlpha = alpha;
			color = rainbow(countOfColors, i);
			color = '#000000';
			
			context.fillStyle=color;	
			//dibujarTriangulo();
			context.fillRect(-20/2, -20/2, 20, 20);
			
			context.restore();
			
			
		}// End for
		
	}
	
	function animate(){
		if (!finalizarAnim){
			context.clearRect(0, 0, canvas.width, canvas.height);
			requestAnimationFrame(animate);
			ponerEstado();
		} // End if
	}
	
	function ponerEstado(){
		
		if (estadoAplicacion == 'inicial'){
		
			crearCircumferencia2();
			//ampliarCircumferencia();
			
		}else if (estadoAplicacion == 'rotando') {	
			
			resetearValores();
			resetearTimer();
			idPinchado		 = -1;
			moverCircumferencia(); // draw	
		
		}else if (estadoAplicacion = 'moverAngulos'){	
			
			moverAngulos();
			
		}else if(estadoAplicacion == 'parar'){	
			
			resetearValores();	
			empezarContar();
			circumferenciaEventos();
		
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
		//idSeleccionado   = -1;
	
		//finalizarAnim  = false;
	
	}

	function resetearTimer(){
		
		contadorTimer    = 0;
		
	}
	
	function empezarContar(){
		
		//contadorTimer++;
		
			if (mouse.x >= margenX - radio && mouse.x <= margenX + radio){
				
				if (mouse.y >= margenY - radio && mouse.y <= margenY + radio){
					
					//console.log('Esta dentro '+radio+' margenX: '+margenX+' margenY: '+margenY);
					
				}else{
					
					contadorTimer++;
					//console.log('Esta fuera'+radio+ ' margenX: '+margenX+' margenY: '+margenY);
				}
					
			}else{
				
				contadorTimer++;
				//console.log('Esta fuera'+radio+' margenX: '+margenX+' margenY: '+margenY);
			}
			
			//console.log('contadorTimer: '+contadorTimer);
			
			if (contadorTimer == 100){
			
				//console.log('finalizar');
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
