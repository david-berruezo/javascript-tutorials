$(document).ready(function(){
	
	
	// Referente a la circumferencia
	var radio 			  = 300;
	var minRadio 		  = 0;
	var contadorGrados    = 0;
	var margenY	  		  = 200;
	var margenX	  	  	  = 400;
	var diferenciaGrados  = 0;
	var ncuadros		  = 10;
	var escalado   		  = 1;
	var alpha			  = 1;
	var idEscalado 		  = 0;	
	var opciones		  = 1;
	var adjRatio 		  = 0; // CAH
	var oppRatio 		  = 0;
	
	// Referente a la posicion del mouse y al radio de la circumferencia
	var mouse			  = 0;
	
	// Referente a como guardamos los cuadrados
	var vectorObjetos 			= new Array();
	var vectorProyectos			= new Array();
	var vectorObjetoFotos		= new Array();		
	
	// Referente a como clicamos un objeto
	var finalizarAnim	  = false;
	var finalizarEventos  = false;
	var idSeleccionado    = -1;
	var idPinchado		  = -1;
	var estadoAplicacion  = 'inicial';
	
	// Referente al objeto Animación
	var anim = new Animation("canvas");
	var canvas = anim.getCanvas();
	var context = anim.getContext();
	var linearSpeed = 200; // pixels / second
	
	// Referente al stage
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	
		
	// Funciones
	configuration();
	llenarObjetoProyectos();
	leerProyectos();
	guardarAngulos();
	cargarFotos();
	
	// Flujo de la animación
	anim.setStage(function(){
		
		// update
	
		// clear
		this.clear();
		
		// draw
		circumferencia();

	});
	
	function configuration(){
		
		// Tamañano del stage
		canvas.width  = stageWidth;
		canvas.height = 400;
		
		// Capturar Mouse y eventos click
		mouse = captureMouse(canvas);
		canvas.addEventListener('click',clickGrade,true);
		
	}
	
	// Llenamos objeto Proyectos con imagenes y detalle de nuestro proyecto
	function llenarObjetoProyectos(){
		
		var miProyecto = '';
		
		//Berruezo,Ellr Motorport,Electro Mecánico Comercial Salas 2014','Electro Mecánico Comercial Salas 2015','Cucas Luxyry Properties','eCommerce Barcelona 360','2Automoción','Hostal París','Your Spanish Wine'
		
		// Ellr Motorsport
		/*
		miProyecto = new objetoProyecto(0,'Ellr Motorsport','http://www.ellrmotorsport.net');
		
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/ellrmotorsport/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/ellrmotorsport/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/ellrmotorsport/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/ellrmotorsport/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/ellrmotorsport/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/ellrmotorsport/6.jpg';
		
		miProyecto.imagenesCabecera[0]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/1.jpg';
		miProyecto.imagenesCabecera[1]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/2.jpg';
		miProyecto.imagenesCabecera[2]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/3.jpg';
		miProyecto.imagenesCabecera[3]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/4.jpg';
		miProyecto.imagenesCabecera[4]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/5.jpg';
		miProyecto.imagenesCabecera[5]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/6.jpg';
		miProyecto.imagenesCabecera[6]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/7.jpg';
		miProyecto.imagenesCabecera[7]= 'http://www.ecommercebarcelona360.com/imagenesCabecera/ellrmotorsport/8.jpg';
		
		
		vectorProyectos.push(miProyecto);
		*/
		
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
		
		
		/*
		// Cucas
		miProyecto = new objetoProyecto(2,'Cucas Luxry Properties','http://www.cucasluxuryproperties.net');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/cucas/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/cucas/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/cucas/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/cucas/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/cucas/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/cucas/6.jpg';
		
		vectorProyectos.push(miProyecto);
		
		// Cemsalas 2014
		miProyecto = new objetoProyecto(3,'Comercial electrom&eacute;canica Salas','http://www.cemsalas2014.net');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2014/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2014/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2014/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2014/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2014/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2014/6.jpg';
		
		vectorProyectos.push(miProyecto);
	
		// Cemsalas 2015
		miProyecto = new objetoProyecto(4,'Comercial electrom&eacute;canica Salas','http://www.cemsalas2015.net');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2015/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2015/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2015/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2015/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2015/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/cemsalas2015/6.jpg';
		
		vectorProyectos.push(miProyecto);
		
		
		// Berruezo
		miProyecto = new objetoProyecto(5,'Berruezo','http://www.berruezomoda.com');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/berruezo/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/berruezo/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/berruezo/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/berruezo/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/berruezo/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/berruezo/6.jpg';
		
		vectorProyectos.push(miProyecto);
		*/
		
		/*
		// Dosa
		miProyecto = new objetoProyecto(6,'2Automoci&oacute;n','http://www.2automocion.com');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/dosa/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/dosa/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/dosa/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/dosa/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/dosa/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/dosa/6.jpg';
		
		vectorProyectos.push(miProyecto);
			
		
		// Hostal Paris
		miProyecto = new objetoProyecto(7,'Hostal Paris Bcn','http://www.hostalparisbcn.com');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/hostalparisbcn/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/hostalparisbcn/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/hostalparisbcn/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/hostalparisbcn/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/hostalparisbcn/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/hostalparisbcn/6.jpg';
		
		vectorProyectos.push(miProyecto);
		
		
		// Your Spanish Wine
		miProyecto = new objetoProyecto(8,'Hostal Paris Bcn','http://www.hostalparisbcn.com');
		miProyecto.imagenesListado[0]= 'http://www.ecommercebarcelona360.com/imagenesListado/yourspanishwine/1.jpg';
		miProyecto.imagenesListado[1]= 'http://www.ecommercebarcelona360.com/imagenesListado/yourspanishwine/2.jpg';
		miProyecto.imagenesListado[2]= 'http://www.ecommercebarcelona360.com/imagenesListado/yourspanishwine/3.jpg';
		miProyecto.imagenesListado[3]= 'http://www.ecommercebarcelona360.com/imagenesListado/yourspanishwine/4.jpg';
		miProyecto.imagenesListado[4]= 'http://www.ecommercebarcelona360.com/imagenesListado/yourspanishwine/5.jpg';
		miProyecto.imagenesListado[5]= 'http://www.ecommercebarcelona360.com/imagenesListado/yourspanishwine/6.jpg';
		
		vectorProyectos.push(miProyecto);
		*/
		
	}
	
	function leerProyectos(){
		
		console.log('El total del vector proyectos es: '+vectorProyectos.length);
		
		for (var i=0;i<vectorProyectos.length;i++){
			
			console.log('hola'+vectorProyectos[i].id);
		
			for (var key in vectorProyectos[i].imagenesListado){
				
				console.log('salida: '+vectorProyectos[i].imagenesListado[key]);
				
			}
			
			
		}
		
		
	}// End function
	
	// Leer vector fotos
	function cargarFotos(){
		
		// var
		var url = '';
		var nombre = '';
		var contadorImagenes    = 0;
		var contadorProyecto    = 0;
		
		//$('#ajaxLoader').css('display','block');
		
		for (var key in vectorProyectos[0].imagenesCabecera){
			
			if (vectorProyectos[0].imagenesCabecera[key] != ''){
				
				var url = vectorProyectos[0].imagenesCabecera[key];
				var img = new Image();
				img.src = vectorProyectos[0].imagenesCabecera[key];
				img.width = 80;
				img.height = 40;
				
				vectorObjetoFotos.push(img);
				
				//console.log('La url del objeto es: '+vectorProyectos[idSeleccionado].imagenesListado[key]);
				
				img.onload = function(){
					
											
				}// End function	
				
				//console.log('La url es: '+img.src);
				
				contadorImagenes++;
				
				if (contadorImagenes >= 8 ){
					
					/*
					console.log('Acaba de cargar las fotos: '+contadorImagenes);
					$('#ajaxLoader').css('display','none');
					desplazaPaloDebajoDeFotos();
					crearEventosFotos();
					evaluarSeccion();
					eventThrowMouse('start');
					*/
				
					//keepAnglesInObject();
					//draw();
					anim.start();
					
				}
				
				img.onerror = function(){
					
					//console.log('Ha habido un error y el contador esta en: '+contadorImagenes);
					
				}
				
			}	// if
				
			contadorProyecto++;
			
		} // for
		
		
		//console.log('objeto Fotos: '+vectorObjetoFotos);
		
		
	}		
	
	function guardarAngulos(){
		
		for (var i=0; i < 8; i++){
			
			contadorGrados = i * (360 / 8);
			
			adjRatio = margenX + radio * Math.cos(contadorGrados*(Math.PI/180)); // CAH
			oppRatio = margenY + radio * Math.sin(contadorGrados*(Math.PI/180)); // SOH
				
			vectorObjetos.push(new Cuadrado({
				x: adjRatio,
				y: oppRatio,
				scale: 1,
				radio: radio,
				angle: contadorGrados,
				z: i
			}));
			
			console.log('grados: '+contadorGrados);
			
		}
		
		contadorGrados = 0;
		
	}
	
	function zSort (a, b) {
		
		return (b -  a);
	
	}
	
	
	function clickGrade(){
		
		if (vectorObjetos[idSeleccionado].angle > 135){
			
			diferenciaGrados = 360 - vectorObjetos[idSeleccionado].angle + 135;
		
			
		}else{
			
			diferenciaGrados = 135 - vectorObjetos[idSeleccionado].angle;
			
		}
		
		console.log('pinchado: '+idSeleccionado+'diferencia grados: '+diferenciaGrados);
		
		//finalizarEventos = true;
		idPinchado       = idSeleccionado;
		estadoAplicacion = 'seleccionado';
		idSeleccionado   = -1;
		contadorGrados   = 0;
		//console.log('diferenciaGrados: '+diferenciaGrados+' idSeleccionado: '+idSeleccionado);
	
		
	}// End function
	
	function circumferencia(){
		
		var mouseEncima = false;
		var detectado   = false;
		
		for (var i = 0; i < vectorObjetos.length; i++ ){
			
			mouseEncima = detectarMouse(i);
			
			if (mouseEncima == true){
				
				detectado  = true;
				//sumarGrados(vectorObjetos[i]);
				
			}
			
			adjRatio = margenX + radio * Math.cos(vectorObjetos[i].angle*(Math.PI/180)); // CAH
			oppRatio = margenY + radio * Math.sin(vectorObjetos[i].angle*(Math.PI/180)); // SOH
			
			if (Math.sin(vectorObjetos[i].angle*(Math.PI/180)) >= 0 && Math.sin(vectorObjetos[i].angle*(Math.PI/180)) <= 180 ){
				
				scale = 1 + Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180)));
				alpha = 1 + Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180)));
				
			}else{
				
				scale = 1 - Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180))) / 2;
				alpha = 1 - Math.abs(Math.sin(vectorObjetos[i].angle*(Math.PI/180))) / 2;
				
				
			}
			
			// canvas
			context.save();
			context.translate(adjRatio,margenY);
			//context.rotate(grados * Math.PI/180);
			context.scale(scale,scale);
			context.beginPath();
			context.globalAlpha = alpha;
			context.fillStyle = '#000000';
			//context.fillRect(-40/2, -20/2, 80, 40);
			context.lineWidth = 1;
			context.strokeStyle = "#cccccc"; // line color
			
			var img = new Image();
			img	= vectorObjetoFotos[i];
			img.width  = 80;
			img.height = 40;
			context.drawImage(img,-40,-20,80,40);
			//vectorObjetoFotos.sort(zSort);
			context.rect(-40,-20,80,40);
			context.stroke();
			context.restore();

			
		}
		
		if (detectado == false){
			
			sumarGrados();
			
		}
		
		
	}
	
	function detectarMouse(i){
		
		var seleccionado = false;
		
		// Seleccionar
		if (mouse.x >= adjRatio - 40 && mouse.x <= adjRatio + 40){
			
			if (mouse.y >= margenY - 40 <= margenY + 40){
				
				idSeleccionado = i;
				$('#canvas').css('cursor','pointer');
				seleccionado = true;
				
			}else{
				
				$('#canvas').css('cursor','default');
				
			}	
		
		}else{
			
			$('#canvas').css('cursor','default');
			
		}		
		
		
		return seleccionado;
		
	}
	
	function sumarGrados(){
		
		var estado = 'corriendo';
		
		for (var i = 0; i < vectorObjetos.length; i++ ){
			
			if (estadoAplicacion == 'seleccionado'){
				
				if (diferenciaGrados > contadorGrados){
					
					vectorObjetos[i].angle = vectorObjetos[i].angle + 1;
				
				}else{
					
					estado = 'parado';
					
				}
				
			}else{
				
				vectorObjetos[i].angle = vectorObjetos[i].angle + 1;
				
			}
			
			
			if (vectorObjetos[i].angle > 360 ){
				
				vectorObjetos[i].angle = vectorObjetos[i].angle - 360; 
				
			}
			
		}
		
		if (estado == 'corriendo'){
			
			contadorGrados++;
			
		}
		
		
		
	}
	
	
	
	
	
	
	
})
	