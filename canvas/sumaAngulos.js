$(document).ready(function(){
	
	// Referente al stage
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	var radio 			  = 150;
	var margenX			  = 200;
	var margenY			  = 200;
	var finalizarAnim     = false;
	var canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	var miInterval		  = 0;
	
	// Objetos
	var vectorObjetos 			= new Array();
	var contadorGrados	  = 0;
	
	canvas.width = stageWidth;
	canvas.height = 600;
	
	keepAnglesInObject();
	animate();
	
	// Save angles in a object
	function keepAnglesInObject(){
		
		var tempGrados    = 0;
		var suplementario = 0;
		var grados 		  = 360 / 36;
		
		radio = 150;
		//grados = 360 / 36;
		
		for (var i=0;i < 36;i++){
			
			var tempGrados = grados * i;
			var adjRatio = margenX + radio * Math.cos(tempGrados*(Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(tempGrados*(Math.PI/180)); // SOH
			var objeto1 = new cuadradoGrande(adjRatio,oppRatio,50,50,tempGrados,radio);
			vectorObjetos.push(objeto1);
				
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
	
	function animate(){
		
		if (!finalizarAnim){
			
			miInterval     = requestAnimationFrame(animate);
			context.clearRect(0, 0, canvas.width, canvas.height);
			crearCircumferencia();
						
		} // End if
		
	}
	
	function moverPositivo(indice){
		
		vectorObjetos[indice].angle = vectorObjetos[indice].angle + 1;
		
		if (vectorObjetos[indice].angle > 360){
			
			vectorObjetos[indice].angle = vectorObjetos[indice].angle - 360;
		
		}
		
		vectorObjetos[indice].x = margenX + radio * Math.cos(vectorObjetos[indice].angle*(Math.PI/180)); // CAH
		vectorObjetos[indice].y = margenY + radio * Math.sin(vectorObjetos[indice].angle*(Math.PI/180)); // SOH
		
		 //console.log('grados: '+vectorObjetos[indice].angle);
		
	}
	
	function moverNegativo(indice){
		
		vectorObjetos[indice].angle = vectorObjetos[indice].angle - 1;
		
		if (vectorObjetos[indice].angle < 0){
			
			vectorObjetos[indice].angle = 360 + vectorObjetos[indice].angle;
		
		}

		vectorObjetos[indice].x = margenX + radio * Math.cos(vectorObjetos[indice].angle*(Math.PI/180)); // CAH
		vectorObjetos[indice].y = margenY + radio * Math.sin(vectorObjetos[indice].angle*(Math.PI/180)); // SOH
		
		
	}
	
	function crearCircumferencia(){
		
		var adjRatio; // CAH
		var oppRatio; // SOH
		
		if (contadorGrados < 1){
			
		for (var i=0; i < 36; i++){
		
			// 
			//moverPositivo(i);
			//moverNegativo(i);
			
			context.beginPath(); // Start the path
			context.moveTo(vectorObjetos[i].x,vectorObjetos[i].y);
			context.lineTo(margenX,margenY);
		    context.strokeStyle = '#9a6876';
		    context.closePath(); // Close the path
		    context.stroke(); // or cont

		    // Triangulo
		    context.beginPath(); // Start the path
			context.moveTo(vectorObjetos[i].x,vectorObjetos[i].y);
			context.lineTo(margenX,margenY);
		    context.strokeStyle = '#9a6876';
		    context.closePath(); // Close the path
		    context.stroke(); // or cont
		    
		    
		    
		}
		
		
		}
		
	}
	
	
})