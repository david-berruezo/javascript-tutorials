$(document).ready(function(){
	
	// var	
	// Screen
	var stageWidth  = $(window).innerWidth();
	var stageHeight = $(window).innerHeight();
	
	// Referente a la circumferencia
	var radioRueda 			 = 150;
	var maxRadio		 	 = 0;
	var minRadio 		 	 = 0;
	var contadorGrados   	 = 0;
	var grados			 	 = 0;
	var contadorVueltas  	 = 0;
	var margenY	  		 	 = 200;
	var margenX	  	  	 	 = 200;
	var diferenciaGrados 	 = 0;
	var ncuadros		  	 = 10;
	var countOfColors 	 	 = 8;
	var escalado   		 	 = 1;
	var alpha			 	 = 1;
	var idEscalado 		  	 = 0;	
	var opciones		 	 = 6;
	var miInterval		 	 = 0;
	var lanzarParar		  	 = 0;
	var finalizarAnim	  	 = false;
	
	
	//Caracteristicas
	var idCaracteristica  	 		= 0;
	var totalCaracteristicas 		= 20;
	var animFinalizada		 		= false;
	var vectorObjetoCaracteristicas = new Array();
	var radioCaracteristicas		= 150;
	
	// Imagenes
	var vectorImagenes       = new Array(); 
	var vectorObjetoImagenes = new Array();
	
	// Referente al propio canvas
	var canvas;
	var context;
	var canvas1;
	var context1;
	
	// Llamada a functiones
	configuration();
	//loadImages();
	keepAnglesInObject();
	lanzarPararAnimacion(1,animate);
	
	
	// Configuration
	function configuration(){
		
		$('#siguiente').click(function(event){
			
			ponerIndice(event);
		
		});
		
		$('#anterior').click(function(event){
			
			ponerIndice(event);
			
		});
		
		
		// vector
		vectorImagenes.push('http://localhost/javascript/canvas/rueda.png');
		vectorImagenes.push('http://localhost/javascript/canvas/rueda1.png');
		
		// canvas
		canvas  	  = document.getElementById('canvas');
		context 	  = canvas.getContext('2d');
		canvas.width  = stageWidth;
		canvas.height = stageHeight;
		
		canvas1  	   = document.getElementById('canvas1');
		context1 	   = canvas1.getContext('2d');
		canvas1.width  = stageWidth;
		canvas1.height = stageHeight;
		
		// Radio
		/*
		maxRadio = (canvas.height / 2) - (20 + margenY * 2);
		minRadio = maxRadio - 100;
		margenX  = maxRadio + 50;
		margenY  = maxRadio + 50;
		*/
		
		$('#canvas').css('bottom',0);
		
		// Mouse
		mouse   = captureMouse(document.getElementById('canvas'));
		
		//canvas.addEventListener('click',clickGrade,true);
		loadImages();
		
		
	}
	
	function ponerIndice(event){
		
		if (event.target.id == 'anterior'){
			
			if (idCaracteristica - 2 >= 0 && animFinalizada == false){
				
				
			}
			
		}else if(event.target.id == 'siguiente'){
			
			if (idCaracteristica + 2 <= totalCaracteristicas && animFinalizada == false){
				
				
				
			}
			
		}
		
	}
	
	// Save angles in a object
	function keepAnglesInObject(){
		
		var tempGrados = 0;
		var scale 	   = 1;
		var nombre	   = 'Equipamiento';
		var valor	   = 'Deportivo';
		
		grados = 360 / 10;
		
		for (var i = 0;i < 10;i++){
			
			tempGrados = grados * i;
			
			var adjRatio = margenX + radioCaracteristicas * Math.cos(tempGrados*(Math.PI/180)); // CAH
			var oppRatio = margenY + radioCaracteristicas * Math.sin(-tempGrados*(Math.PI/180)); // SOH
		
			var objeto1 = new caracteristicas(tempGrados,adjRatio,oppRatio,scale,nombre,valor);
			vectorObjetoCaracteristicas.push(objeto1);
				
			
		}// end for
		
	
	} // end function
	
	function loadImages(){
		
		var contadorImagenes = 0;
		
		for (var key in vectorImagenes){
		
			// poner img src
			var img = new Image();
			img.src = vectorImagenes[key];
			
			vectorObjetoImagenes.push(img);
			
			img.onload = function(){
				
				if (contadorImagenes < 2 ){
					
					contadorImagenes++
					
				}// End if
				
				
			}// End function	
			
			img.onerror = function(){
				
				console.log('Ha habido un error y el contador esta en: '+contadorImagenes);
				
			}// End function
		
		}// End for
		
		
	}
	
		
	function crearCircumferencia(){
		
		// var
		var contador  = 0;
		var miObjeto  = 0;
		var radioPeke = 10;
		var radioGran = 5;
		var textPosY  = 20;
		var textPosX  = 5;
		var adjRatio  = 0;
		var oppRatio  = 0;
		var alpha     = 0;
		
		//Circumference Line
		context1.beginPath();
		context1.arc(margenX,margenY,radioCaracteristicas,0, -80 * Math.PI / 180 , true);
		context1.fillStyle = '#000000';
	    context1.lineWidth = 2;
	    context1.strokeStyle = '#9a6876';
	    context1.stroke();
	    context1.save();
		
		for (var i=0; i < vectorObjetoCaracteristicas.length; i++){
			
		//if (contadorGrados < 2){
			
			vectorObjetoCaracteristicas[i].grados = vectorObjetoCaracteristicas[i].grados - 1;
			
			if (vectorObjetoCaracteristicas[i].grados < 0){
				
				vectorObjetoCaracteristicas[i].grados = 360 + vectorObjetoCaracteristicas[i].grados;
			
			}
			   
			miObjeto = vectorObjetoCaracteristicas[i];
			
			adjRatio = margenX + radioCaracteristicas * Math.cos(vectorObjetoCaracteristicas[i].grados * (Math.PI/180)); // CAH
			oppRatio = margenY + radioCaracteristicas * Math.sin(-vectorObjetoCaracteristicas[i].grados *(Math.PI/180)); // SOH
			
			if (vectorObjetoCaracteristicas[i].grados < 36 ){
		    	
				radioGran = 20;
				radioPeke = 12;
				textPosX  = 50;
				textPosY  = 0;
				
			}else{	
				
				radioGran = 10;
				radioPeke = 2;
				textPosX  = 25;
				textPosY  = 0;
		    }
			
			if (vectorObjetoCaracteristicas[i].grados > 108 ){
				   
				console.log('Entra: '+vectorObjetoCaracteristicas[i].grados+' i: '+i);
				alpha = 0;
				    	
			}else{
					
				alpha = 1;
				
				// Circle big
				context.beginPath();
				context.arc(adjRatio,oppRatio,radioGran,0, 2 * Math.PI, true);
				context.fillStyle = '#000000';
			    context.fill();
			    context.lineWidth = 3;
			    context.strokeStyle = '#9a6876';
			    context.stroke();
			    context.save();
			    // Circle small
				context.beginPath();
				context.arc(adjRatio,oppRatio,radioPeke,0, 2 * Math.PI, true);
				context.fillStyle = '#9a6876';
			    context.fill();
			    context.lineWidth = 5;
			    context.stroke();
			    context.save();
			    // Text
			    context.font="20px Arial";
			    context.fillStyle='#9a6876';
			    context.fillText(vectorObjetoCaracteristicas[i].nombre+' '+i,adjRatio+textPosX,oppRatio+textPosY);
			    context.save();
				
			}
			
			
		    
		    //context.globalAlpha = alpha
		    
		    console.log('grados: '+vectorObjetoCaracteristicas[i].grados+'i: '+i+' alpha: '+alpha);
		    
		//}
		    
		}// End for
		
		
		
		/*
		if (contadorGrados + 1 > 360){
			
			contadorGrados = contadorGrados - 360;
			
			
		}
		*/
		
		contadorGrados++;
		
	    /*
	    context.moveTo(200,200);
	    context.arc(200,200,200,0,45);
	    context.lineTo(cx,cy);
	    context.strokeStyle = '#9a6876';
	    context.stroke(); // or cont
	    */
	    
		/*
		var img1 		= new Image();
		var img2 		= new Image();
		var radius 		= 690/2;
	    var startAngle  = 330 * Math.PI / 180;
	    var endAngle 	= Math.PI;
	    var startAngle2 = 200 * Math.PI / 180;
	    var endAngle2   = Math.PI;
	    var adjRatio 	= 0; // CAH
		var oppRatio 	= 0; // SOH
	    
		img1.src = vectorImagenes[0];
		img2.src = vectorImagenes[1];
		
		context.drawImage(img1,- (618/2 +50) , stageHeight - 494,618,494);
        context.drawImage(img2, stageWidth - (618/2 - 50), stageHeight - 494,618,494);
        
        context.beginPath();
	    context.arc(-40, stageHeight - 200, radius, startAngle, endAngle, true);
	    context.lineWidth = 2;
	    
	    // line color
	    context.strokeStyle = '#9a6876';
	    context.stroke();
	   
	    context.beginPath();
	    context.arc(stageWidth, stageHeight - 200, radius, startAngle2, endAngle2, true);
	    context.lineWidth = 2;
	    
	    context.moveTo(stageWidth,stageHeight - 370);
	    context.lineTo(0,stageHeight - 370);
	    
	    context.beginPath();
	    
	    for (var i=0;i<360;i++){
	    	
	    	// Ejex X e Y
			adjRatio = radius * Math.cos(0 * (Math.PI/180)); // CAH
			oppRatio = radius * Math.sin(0 *(Math.PI/180)); // SOH
	    	
			context.arc(adjRatio, oppRatio, radius, 0, i, true);
			
	    }
	    
	    context.lineWidth = 2;
	    
	 // line color
	    context.strokeStyle = '#9a6876';
	    context.stroke();
	    */
	    
	}
	
	function moverCircumferencia(){
		
		// var
		var contador  = 0;
		var miObjeto  = 0;
		var radioPeke = 10;
		var radioGran = 5;
		var textPosY  = 20;
		var textPosX  = 5;
		var adjRatio  = 0;
		var oppRatio  = 0;
		var alpha     = 1;
		
		//Circumference Line
		context.beginPath();
		context.arc(margenX,margenY,radioCaracteristicas,0, -80 * Math.PI / 180 , true);
		context.fillStyle = '#000000';
	    context.lineWidth = 3;
	    context.strokeStyle = '#9a6876';
	    context.stroke();
				
		
		for (var i=0; i < 4; i++){
			
			//vectorObjetoCaracteristicas[i].grados = vectorObjetoCaracteristicas[i].grados + 1;
			
			if (vectorObjetoCaracteristicas[i].grados > 360){
				
				vectorObjetoCaracteristicas[i].grados = vectorObjetoCaracteristicas[i].grados - 360;
			
			}
			
			
			miObjeto = vectorObjetoCaracteristicas[i];
			
			adjRatio = margenX + radioCaracteristicas * Math.cos(vectorObjetoCaracteristicas[i].grados * (Math.PI/180)); // CAH
			oppRatio = margenY + radioCaracteristicas * Math.sin(-vectorObjetoCaracteristicas[i].grados *(Math.PI/180)); // SOH
			
			if (i == idCaracteristica){
		    	
				radioGran = 20;
				radioPeke = 12;
				textPosX  = 50;
				textPosY  = 0;
				
			}else{	
				
				radioGran = 10;
				radioPeke = 2;
				textPosX  = 25;
				textPosY  = 0;
		    }
			
			// Circle big
			context.beginPath();
			context.arc(adjRatio,oppRatio,radioGran,0, 2 * Math.PI, true);
			context.fillStyle = '#000000';
		    context.fill();
		    context.lineWidth = 3;
		    context.strokeStyle = '#9a6876';
		    context.stroke();
		    // Circle small
			context.beginPath();
			context.arc(adjRatio,oppRatio,radioPeke,0, 2 * Math.PI, true);
			context.fillStyle = '#9a6876';
		    context.fill();
		    context.lineWidth = 5;
		    //context.strokeStyle = '#9a6876';
		    context.stroke();
		    // Text
		    
		    context.font="20px Arial";
		    context.fillStyle='#9a6876';
		    context.fillText(vectorObjetoCaracteristicas[i].nombre,adjRatio+textPosX,oppRatio+textPosY);
		    context.save();
			
			
		}// End for
		
		
		if (contadorGrados + 1 > 360){
			
			contadorGrados = contadorGrados - 360;
			
			
		}
		
		contadorGrados++;
		
	}
	
	function ponerEstado(){
		
		crearCircumferencia();
		
		/*
		if (estadoAplicacion == 'inicial'){
		
			ampliarCircumferencia();
			
		}else if (estadoAplicacion == 'rotando') {	
			
			resetearValores();
			resetearTimer();
			idPinchado		 = -1;
			moverCircumferencia(); // draw	
				
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
		*/
		
	}

	
	function animate(){
		
		if (!finalizarAnim){
			
			miInterval     = requestAnimationFrame(animate);
			context.clearRect(0, 0, canvas.width, canvas.height);
			ponerEstado();
						
		} // End if
		
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