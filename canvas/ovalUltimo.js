$(document).ready(function(){
	
	// Stage
	var canvas 		= document.getElementById('canvas');
	var context 	= canvas.getContext('2d');
	var stageWidth  = window.innerWidth();
	var stageHeight = window.innerHeight();
	
	// Referente al ovalo
	var radioX = 300,
	var radioY = 100,
	var margenX = 500,
	var margenY = 300,
	var contadorGrados = 0,
	var adjRatio = 0,
	var oppRatio = 0,
	var scale	 = 1,
	var alpha	 = 1,
	
	
	// Referente a la aplicacion
	var idPinchado = 0,
	var estadoAplicacion = 'inicial',
	var idSeleccionado = 0,
	var diferenciaGrados = 0,
	
	// Vectores Proyectos y Fotos
	var vectorProyectos = new Array(),
	var vectorObjetoFotos = new Array(),
	var vectorObjetos = new Array(),
	
	// Events
	var events  = new Events("canvas"),
	var message = "";
	
	
	function configuration(){
		
		//events.listen();
		
		// Tamañano del stage
		canvas.width  = stageWidth;
		canvas.height = 600;
		
		// Capturar Mouse y eventos click
		//mouse = captureMouse(canvas);
		canvas.addEventListener('click',clickGrade,true);
		
	}
	
	
	// Llenamos objeto Proyectos con imagenes y detalle de nuestro proyecto
	function llenarObjetoProyectos(){
		
		var miProyecto = '';
		
		// eCommerce
		miProyecto = new objetoProyecto(1,'eCommerce Barcelona 360','http://www.ecommercebarcelona360.com');
		miProyecto.imagenesListado[0]= 'http://localhost/javascript/ecommerce/img/ecommerce/imagenesListado/1.jpg';
		miProyecto.imagenesListado[1]= 'http://localhost/javascript/ecommerce/img/ecommerce/imagenesListado/2.jpg';
		miProyecto.imagenesListado[2]= 'http://localhost/javascript/ecommerce/img/ecommerce/imagenesListado/3.jpg';
		miProyecto.imagenesListado[3]= 'http://localhost/javascript/ecommerce/img/ecommerce/imagenesListado/4.jpg';
		miProyecto.imagenesListado[4]= 'http://localhost/javascript/ecommerce/img/ecommerce/imagenesListado/5.jpg';
		miProyecto.imagenesListado[5]= 'http://localhost/javascript/ecommerce/img/ecommerce/imagenesListado/6.jpg';
		
			
		miProyecto.imagenesCabecera[0]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado1.jpg';
		miProyecto.imagenesCabecera[1]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado2.jpg';
		miProyecto.imagenesCabecera[2]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado3.jpg';
		miProyecto.imagenesCabecera[3]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado4.jpg';
		miProyecto.imagenesCabecera[4]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado5.jpg';
		miProyecto.imagenesCabecera[5]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado6.jpg';
		miProyecto.imagenesCabecera[6]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado7.jpg';
		miProyecto.imagenesCabecera[7]= 'http://localhost/javascript/ecommerce/img/ecommerce/cabecera/listado8.jpg';
		
		
		vectorProyectos.push(miProyecto);
		
		
	}
	
	function guardarAngulos(){
		
		for (var i=0; i < 8; i++){
			
			contadorGrados = i * (360 / 8);
			
			adjRatio = margenX + radioX * Math.cos(contadorGrados*(Math.PI/180)); // CAH
			oppRatio = margenY + radioY * Math.sin(contadorGrados*(Math.PI/180)); // SOH
				
			vectorObjetos.push(new Cuadrado({
				x: adjRatio,
				y: oppRatio,
				scale: 1,
				radio: radio,
				angle: contadorGrados,
				z: i
			}));
			
			console.log('grados: '+contadorGrados + 'i: '+i);
			
		}
		
		contadorGrados = 0;
		
	}	
	
		
	function clickGrade(){
		
		if (vectorObjetos[idSeleccionado].angle > 90){
			
			diferenciaGrados = 360 - vectorObjetos[idSeleccionado].angle + 90;
		
			
		}else{
			
			diferenciaGrados = 90 - vectorObjetos[idSeleccionado].angle;
			
		}
		
		console.log('pinchado: '+idSeleccionado+'diferencia grados: '+diferenciaGrados);
		
		//finalizarEventos = true;
		idPinchado       = idSeleccionado;
		estadoAplicacion = 'seleccionado';
		idSeleccionado   = -1;
		contadorGrados   = 0;
		//console.log('diferenciaGrados: '+diferenciaGrados+' idSeleccionado: '+idSeleccionado);
	
		
	}// End function
	
	
	function calcularAngulos(){
		
		
		
	}
	
	
	function circumferencia(){
		
		var mouseEncima = false;
		var detectado   = false;
	
		for (var i = 0; i < vectorObjetos.length; i++ ){
			
			/*
			mouseEncima = detectarMouse(i);
			
			if (mouseEncima == true){
				
				detectado  = true;
				//sumarGrados(vectorObjetos[i]);
				
			}
			*/
			
			adjRatio = margenX + radioX * Math.cos(vectorObjetos[i].angle*(Math.PI/180)); // CAH
			oppRatio = margenY + radioY * Math.sin(vectorObjetos[i].angle*(Math.PI/180)); // SOH
			
		
			if (Math.sin(vectorObjetos[i].angle*(Math.PI/180)) >= 0 && Math.sin(vectorObjetos[i].angle*(Math.PI/180)) <= 180 ){
				
				scale = 1 + Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180)));
				alpha = 1 + Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180)));
				
			}else{
				
				scale = 1 - Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180))) / 2;
				alpha = 1 - Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180))) / 2;
				
				
			}
			
			// canvas
			context.save();
			context.translate(adjRatio,oppRatio);
			//context.rotate(vectorObjetos[i].angle * Math.PI/180);
			context.scale(scale,scale);
			context.globalAlpha = alpha;
			context.fillStyle = '#000000';
			context.fillRect(-80/2, -40/2, 80, 40);
			context.lineWidth = 1;
			context.strokeStyle = "#333333"; // line color
			
			events.setStage(function(){
				
				this.beginRegion();
				
				// draw rectangular region for image
				context.beginPath();
				context.rect(adjRatio, oppRatio, 80, 40);
				context.closePath();
				
				this.addRegionEventListener("mouseover", function(){
					message = 'Imagen '+i+ 'mouseover';
				});
				
				this.addRegionEventListener("mouseout", function(){
					//message = 'Imagen '+i+ 'mouseout';
				});
				
				this.addRegionEventListener("mousedown", function(){
					//message = 'Imagen '+i+ 'mousedown';
				});
				
				this.addRegionEventListener("mouseup", function(){
					//message = 'Imagen '+i+ 'mouseup';
				});
				
				
				
				var img = new Image();
				img.src	= vectorObjetoFotos[i].src;
				//img.width  = 80;
				//img.height = 40;
				
				context.drawImage(img,-80/2,-40/2,80,40);
				
				this.closeRegion();
				
				//vectorObjetoFotos.sort(zSort);
				context.beginPath();
				context.rect(-80/2,-40/2,80,40);
				
				// Vertical
				context.lineWidth = 1;
				context.moveTo(-40, 40);
				context.lineTo(-40, 20);
				
				// Horizontal
				context.moveTo(10, 40);
				context.lineTo(-40, 40);
				
				// Text
				context.font = "6pt Arial";
				context.fillStyle = "#333333";
				context.fillText("Front End", 20, 42);
				context.stroke();
				
				context.restore();

			
			});
			
			
		}
		
		
		
		if (detectado == false){
			
			sumarGrados();
			
		}
		
		
	}

	
	
	
});