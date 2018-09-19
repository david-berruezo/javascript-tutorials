// Capturamos Mouse y devolvemos las coordenadas

var captureMouse = function (element) {
    console.log(element);
    // Propiedades del objeto
    var mouse = {
        x:0,
        y:0,
    }

    // Lanzamos evento del objeto
    element.addEventListener('mousemove',function(event){
        //captureMouse.x = event.pageX;
        //captureMouse.y = event.pageY;
        if (event.pageX || event.pageY) {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        } else {
            mouse.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            mouse.y = event.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
        }
        mouse.x -= element.offsetLeft;
        mouse.y -= element.offsetTop;
    },true);
    return (mouse);
}

// Objeto Proyecto
var objetoProyecto = function(id,nombre,website){

    this.id 	 = id;
    this.nombre  = nombre;
    this.website = website;

    this.imagenesListado = {

        0:'',
        1:'',
        2:'',
        3:'',
        4:'',
        5:'',
        7:'',
        8:'',
        9:'',
        10:'',

    };

    this.imagenesDetalle = {

        0:'',
        1:'',
        2:'',
        3:'',
        4:'',
        5:'',
        7:'',
        8:'',
        9:'',
        10:'',

    }

    this.imagenesCabecera = {

        0:'',
        1:'',
        2:'',
        3:'',
        4:'',
        5:'',
        7:'',
        8:'',
        9:'',
        10:'',

    }


}// End Object

// Cuadrado
var cuadradoGrande = function(x, y, width, height,angle,radius,scaleX,scaleY,alpha,skewX,zpos) {

    this.x 		= x;
    this.y 		= y;
    this.width  = width;
    this.height = height;
    this.angle  = angle;
    this.radius = radius;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.alpha  = alpha;
    this.skewX  = skewX;
    this.zpos   = zpos;

} // End Object

$(document).ready(function(){
		
	// var
	var canvas 			 = document.getElementById('canvas');
	var context 		 = canvas.getContext('2d');
	var mouse 			 = captureMouse(canvas);
	var fl 				 = 250;
	var grados 			 = 0;
	var radio  			 = 250;
	var ncuadros 		 = 8;
	var margenX  		 = canvas.width / 2;
	var margenY  	     = canvas.height / 2;
	var vectorObjetos    = new Array();
	var idSeleccionado   = -1;
	var idPinchado 		 = -1;
	var miInterval 	     = 0;
	var areaSeleccionada = false;
	var adjRatio		 = 0;
	var oppRatio		 = 0;
	var contadorGrados   = 0;
	var diferenciaGrados = 0;
	var estadoAplicacion = 'inicial';
	var vectorProyectos  = new Array();
	var vectorObjetoFotos = new Array();
	
	// Contador tiempo de espera
	var miInterval2 	 = 0;
	var timerActivado 	 = false;
	var contadorTiempo	 = 0;
	
	// Funciones
	configuration();
	loadFotos();

	function configuration(){
		
		//canvas.width  = 800;
		//canvas.height = 800;
		
		margenX  		 = canvas.width / 2;
		margenY  	     = canvas.height / 2;
		
		canvas.addEventListener('click',clickGrade,true);
				
			var miProyecto = '';
			
			//Berruezo,Ellr Motorport,Electro Mec�nico Comercial Salas 2014','Electro Mec�nico Comercial Salas 2015','Cucas Luxyry Properties','eCommerce Barcelona 360','2Automoci�n','Hostal Par�s','Your Spanish Wine'
			
			// Ellr Motorsport
			miProyecto = new objetoProyecto(1,'eCommerce Barcelona 360','http://www.ecommercebarcelona360.com');
			miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/ecommerce/1.jpg';
			miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/ecommerce/2.jpg';
			miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/ecommerce/3.jpg';
			miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/ecommerce/4.jpg';
			miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/ecommerce/5.jpg';
			miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/ecommerce/6.jpg';
			
			vectorProyectos.push(miProyecto);
			
			miProyecto.imagenesCabecera[0]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado1.jpg';
			miProyecto.imagenesCabecera[1]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado2.jpg';
			miProyecto.imagenesCabecera[2]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado3.jpg';
			miProyecto.imagenesCabecera[3]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado4.jpg';
			miProyecto.imagenesCabecera[4]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado5.jpg';
			miProyecto.imagenesCabecera[5]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado6.jpg';
			miProyecto.imagenesCabecera[6]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado7.jpg';
			miProyecto.imagenesCabecera[7]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ecommerce/listado8.jpg';
			
			
			vectorProyectos.push(miProyecto);
		
	}// End function
	
	// Leer vector fotos
	function loadFotos(){
		
		// var
		var url = '';
		var nombre = '';
		var contadorImagenes    = 0;
		var contadorProyecto    = 0;
		
		$('#ajaxLoader').css('display','block');
		
		for (var key in vectorProyectos[0].imagenesCabecera){
			
			if (vectorProyectos[0].imagenesCabecera[key] != ''){
				
				var url = vectorProyectos[0].imagenesCabecera[key];
				var img = new Image();
				img.src = vectorProyectos[0].imagenesCabecera[key];
				img.width = 80;
				img.height = 40;
				
				img.onload = guardarImagen(img,key);
					
				contadorImagenes++;
				
				img.onerror = function(){
					
					console.log('Ha habido un error y el contador esta en: '+contadorImagenes);
					
				}
				
			}	// if
				
			contadorProyecto++;
			
		} // for
		
		
		
	}	
		
	function guardarImagen(imgTemp,contador){
		
		 console.log('Contador: '+contador);
		
		 $('#contenedorImagenes').append('<img src="'+imgTemp.src+'">');

		 if (contador == 7){
			 
			 //window.requestAnimationFrame(dibujar);
			 keepAnglesInObject();
			 draw();
		 }
		 
	}
	
	// Save angles in a object
	function keepAnglesInObject(){
		
		var tempGrados = 0;
		
		grados = 360 / ncuadros;
		
		for (var i=0;i < ncuadros;i++){
			
			tempGrados   = grados * i;
			var adjRatio = margenX + radio * Math.cos(tempGrados*(Math.PI/180)); // CAH
			var oppRatio = margenY + radio * Math.sin(tempGrados*(Math.PI/180)); // SOH
			var objeto1  = new cuadradoGrande(adjRatio,oppRatio,50,50,tempGrados,radio,1,1);
			vectorObjetos.push(objeto1);
					
		}// end for
		
	
	} // end function
	
	
	function clickGrade(){
		
		idPinchado = idSeleccionado;
		
		
		var tempGrados = 0;
		
		if (vectorObjetos[idSeleccionado].angle > 270){
			
			tempGrados = 360 - vectorObjetos[idSeleccionado].angle;
			diferenciaGrados = tempGrados + 270;
			
		}else{
			
			diferenciaGrados = 270 - vectorObjetos[idSeleccionado].angle;
			
		}
		
		console.log('diferenciaGrados: '+diferenciaGrados+' idSeleccionado: '+idSeleccionado+' idPinchado: '+idPinchado+'angle: '+vectorObjetos[idSeleccionado].angle);
		
		//finalizarEventos = true;
		contadorGrados = 0;
		idPinchado = idSeleccionado;
		estadoAplicacion = 'seleccionado';
		idSeleccionado = -1;
		
		
	}// End function
	
	
	
	function irAlGrado(){
		 
		// var
		var finalizarGrado = false;
		var color 		   = '';
		var proporcion     = 0;
		var tamNormal      = 20;
		var margenTemp     = 100;
		var valorY		   = margenTemp;
		
		// Referente a las imagenes
		var colorLetras = '#cccccc';
		var colorBorde	= '#cccccc';
		var tamLinia	= .5;
		var bold		= 'bold';
		
		/*
		if (contadorGrados + 1 > diferenciaGrados){
			
			contadorGrados = diferenciaGrados - contadorGrados;
			finalizarGrado = true;
			
		}else if(contadorGrados + 1 == diferenciaGrados){
			
			finalizarGrado = true;
			
		}else{
			
			contadorGrados = contadorGrados + 1;
			
		}
		*/
		
		contadorGrados++;
		
		if (contadorGrados == diferenciaGrados){
			
			finalizarGrado = true;
			
		}
	
		for (var i=0;i < ncuadros;i++){
				
				context.save(); 
				
				vectorObjetos[i].angle = vectorObjetos[i].angle + 1;
				
				if (vectorObjetos[i].angle > 360){
						
					vectorObjetos[i].angle = vectorObjetos[i].angle - 360;
						
				}
				
				adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
				oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
				
				scaleGrados = Math.abs(vectorObjetos[i].angle - 90);
				
				if (scaleGrados <= 180){
					
					scaleFactor = 1 + scaleGrados / 180;
					alpha 	    = 0 + scaleGrados / 180;
					
				}else{
					
					scaleFactor = 360 / scaleGrados;
					alpha 	    = 1 - 360 / scaleGrados;
					
					if (scaleGrados == 360){
						
						color = '#f70219';
						
					}// End if
					
				}// End if
				
				if (i == idPinchado){
					
					colorLetras = '#333333';
					colorBorde	= '#333333';
					tamLinia	= 1;
					$('#canvas').css('cursor','pointer');
					
				}else{
					
					$('#canvas').css('cursor','default');
					colorLetras = '#cccccc';
					colorBorde	= '#cccccc';
					tamLinia	= .5;
					
					
				}
				
				
				context.globalAlpha = alpha;
				context.translate(adjRatio,valorY);
				context.scale(scaleFactor, scaleFactor);
				//context.fillRect(-80/2, -40/2, 80, 40);
				var texto = 'Angle: '+vectorObjetos[i].angle;
				context.font = 'normal 8px Arial';
				context.fillStyle = colorLetras;
				context.fillText(texto, -80/2,-60/2);
				var tempImg = new Image(); 
				var imgDom  = $('#contenedorImagenes img')[i];
				tempImg.src = $(imgDom).attr('src');
				tempImg.width = 80;
				tempImg.height  = 40;
				context.drawImage(tempImg,-80/2, -40/2,80,40);
				context.strokeStyle = colorBorde;
				context.lineWidth = tamLinia;
				context.strokeRect(-80/2, -40/2,80,40);
					  
				
				context.restore();
				
				
						
		}// End for  
		
		
		if (finalizarGrado === true){
			console.log('contadorGrados: '+contadorGrados);
			//idPinchado = -1;
			contadorGrados = 0;
			diferenciaGrados = 0;
			estadoAplicacion = 'parar';
	  
		}// End if	
		
	 
		
	}// End function

	
	function rotate(){
		
		// var
		var alpha 		= '';
		var scaleFactor = 0;
		var scaleGrados = 0;
		var mouseActive = false;
		var margenTemp  = 100;
		var valorY		= margenTemp;
		
		// Referente a las imagenes
		var colorLetras = '#cccccc';
		var colorBorde	= '#cccccc';
		var tamLinia	= .5;
		var bold		= 'bold';
		
		idSeleccionado = -1;
		
		// Detectamos mouse esta en el area
		if (mouse.x > margenX - radio  && mouse.x < margenX + radio){
			
			if (mouse.y > margenTemp - 40  && mouse.y < margenTemp + 40){
			
				mouseActive = true;
				
			}// End if
			
		
		}// End if
		
		
		for (var i=0;i < ncuadros;i++){
			
			context.save(); 
			
			if (!mouseActive){
				
				vectorObjetos[i].angle = vectorObjetos[i].angle + 1;
				
				if (vectorObjetos[i].angle > 360){
					
					vectorObjetos[i].angle = vectorObjetos[i].angle - 360;
				
				}// End if	
				
			}// End if
			
			
			adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
			oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
			
			if (mouse.x >= adjRatio -40 && mouse.x <= adjRatio + 40){
				
				if (mouse.y >= margenTemp - 40 && mouse.y <= margenTemp+ 40){
				
					if (vectorObjetos[i].angle >= 180 && vectorObjetos[i].angle <= 360){
						
						idSeleccionado = i;
						
					}// End if
				} // End if
					
			}// End if	
			
			
			if (i == idSeleccionado){
				
				colorLetras = '#333333';
				colorBorde	= '#333333';
				tamLinia	= 1;
				$('#canvas').css('cursor','pointer');
				
			}else{
				
				$('#canvas').css('cursor','default');
				colorLetras = '#cccccc';
				colorBorde	= '#cccccc';
				tamLinia	= .5;
				
				
			}
			
			
			fl = vectorObjetos[i].angle / 360;
			scaleGrados = Math.abs(vectorObjetos[i].angle - 90);
			
			if (scaleGrados <= 180){
				
				scaleFactor = 1 + scaleGrados / 180;
				alpha 	    = 0 + scaleGrados / 180;
				
			}else{
				
				scaleFactor = 360 / scaleGrados;
				alpha 	    = 1 - 360 / scaleGrados;
				
			}// End if
				
			
			context.globalAlpha = alpha;
			context.translate(adjRatio,valorY);
			context.scale(scaleFactor, scaleFactor);
			//context.fillRect(-80/2, -40/2, 80, 40);
			var texto = 'Angle: '+vectorObjetos[i].angle;
			context.font = 'normal 8px Arial';
			context.fillStyle = colorLetras;
			context.fillText(texto, -80/2,-60/2);
			var tempImg = new Image(); 
			var imgDom  = $('#contenedorImagenes img')[i];
			tempImg.src = $(imgDom).attr('src');
			tempImg.width = 80;
			tempImg.height  = 40;
			context.drawImage(tempImg,-80/2, -40/2,80,40);
			context.strokeStyle = colorBorde;
			context.lineWidth = tamLinia;
			context.strokeRect(-80/2, -40/2,80,40);
				  
			
			context.restore();
			
		}// End for
		
		
		
	}// End function
	

	function circumferenciaEventos(){
		
		// var
		var alpha 		= '';
		var scaleFactor = 0;
		var scaleGrados = 0;
		var mouseActive = false;
		var margenTemp  = 100;
		var valorY		= margenTemp;
		
		// Referente a las imagenes
		var colorLetras = '#cccccc';
		var colorBorde	= '#cccccc';
		var tamLinia	= .5;
		var bold		= 'bold';
		
		idSeleccionado  = -1;  
		//if (finalizarEventos === false){
			
		for (var i=0;i < ncuadros;i++){
			
			context.save(); 
			
			adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle * (Math.PI/180)); // CAH
			oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle *(Math.PI/180)); // SOH
			
			if (mouse.x >= adjRatio -40 && mouse.x <= adjRatio + 40){
				
				if (mouse.y >= margenTemp - 40 && mouse.y <= margenTemp+ 40){
				
					if (vectorObjetos[i].angle >= 180 && vectorObjetos[i].angle <= 360){
						
						idSeleccionado = i;
						
					}// End if
				} // End if
					
			}// End if	
				
		
			if (i == idPinchado || i == idSeleccionado){
				
				colorLetras = '#333333';
				colorBorde	= '#333333';
				tamLinia	= 1;
				$('#canvas').css('cursor','pointer');
				
			}else{
				
				$('#canvas').css('cursor','default');
				colorLetras = '#cccccc';
				colorBorde	= '#cccccc';
				tamLinia	= .5;
			}
			
			
			fl = vectorObjetos[i].angle / 360;
			scaleGrados = Math.abs(vectorObjetos[i].angle - 90);
			
			if (scaleGrados <= 180){
				
				scaleFactor = 1 + scaleGrados / 180;
				alpha 	    = 0 + scaleGrados / 180;
				
			}else{
				
				scaleFactor = 360 / scaleGrados;
				alpha 	    = 1 - 360 / scaleGrados;
				
			}// End if
				
			
			
			context.globalAlpha = alpha;
			context.translate(adjRatio,valorY);
			context.scale(scaleFactor, scaleFactor);
			//context.fillRect(-80/2, -40/2, 80, 40);
			var texto = 'Angle: '+vectorObjetos[i].angle;
			context.font = 'normal 8px Arial';
			context.fillStyle = colorLetras;
			context.fillText(texto, -80/2,-60/2);
			var tempImg = new Image(); 
			var imgDom  = $('#contenedorImagenes img')[i];
			tempImg.src = $(imgDom).attr('src');
			tempImg.width = 80;
			tempImg.height  = 40;
			context.drawImage(tempImg,-80/2, -40/2,80,40);
			context.strokeStyle = colorBorde;
			context.lineWidth = tamLinia;
			context.strokeRect(-80/2, -40/2,80,40);
				  
			
			context.restore();
			
			
		}// End for
					
		
	}// End function
	
	function draw () {
		
		window.requestAnimationFrame(draw);
		context.clearRect(0, 0, canvas.width, canvas.height);
		evaluarEstado();
		
		
	}// End function
		
	
	function evaluarEstado(){
		
		if (estadoAplicacion == 'inicial'){
			
			rotate();
			
		}else if (estadoAplicacion == 'seleccionado'){
			
			irAlGrado();
			
		}else if (estadoAplicacion == 'parar'){
			
			circumferenciaEventos();
			
			if (!timerActivado){
				
				miInterval2 = setInterval(escucharTiempo,100);
				timerActivado = true;
			}
			
		}// End if
		
		
	}// End function
	
	function escucharTiempo(event){
		
		if (contadorTiempo == 100){
			
			pararTiempo();
			
		}
		
		//console.log('contadorTiempo: '+contadorTiempo);
		contadorTiempo++;
		
	}
	
	function pararTiempo(){
		
		clearInterval(miInterval2);
		contadorTiempo = 0;
		timerActivado  = false;
		idSeleccionado = -1;
		idPinchado 	   = -1;
		estadoAplicacion = 'inicial';
		
	}
	
	
});
	