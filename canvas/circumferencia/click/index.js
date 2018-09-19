	/*
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			return window.setTimeout(callback, 1000/60);
		});
	}else{
		
		console.log('Hay request');
	}
	*/
		
	function Cuadrado (radio,grados,grados2,top,left,nueva){
		this.radio  = radio;
		this.grados = grados;
		this.grados2 = grados2;
		this.top	= top;
		this.left   = left;
		this.nueva  = nueva;
	}
	
	function CuadradoMovimiento (radio,grados,top,left,nueva){
		this.radio  = radio;
		this.grados = grados;
		this.top	= top;
		this.left   = left;
		this.nueva  = nueva;
	}
	
	
$(document).ready(function(){
	// var
	var stageHeight 	  = window.screen.height;
	var stageWidth  	  = window.screen.width;
	var radio 			  = 0;
	var radioGrande		  = 0;
	var radioEnano		  = 50;
	var contadorGrados    = 0;
	var contadorGrados1   = 0;
	var contadorRadio	  = 0;
	var contadorRadio     = 0;
	var contadorVueltas   = 0;
	var contadorSegundos  = 0;
	var miInterval  	  = 0;
	var numero			  = 0;
	var contadorInterval  = 0;
	var fps 			  = 100000;
	var mouseX			  = 0;
	var mouseY			  = 0;
	var primera     	  = 0;
	var margenHeight	  = 200;
	var vectorObjetos 			= new Array();
	var vectorObjetosMovimiento = new Array();
	var nCuadros 		  = 10;
	var nCuadros2         = 10;
	var grados			  = 360 / nCuadros;
	var grados1           = 360 / nCuadros2;
	var graditos		  = 0;
	var selectId		  = 0;
	var diferenciaGrados  = 0;
	var finalizarAnim	  = false;
	var idSeleccionado    = 0;
	var width			  = 0;
	var height			  = 0;
	
	
	// Llamamos a las funciones
	configuration();
	keepAnglesInObject();
	eventsStartAndStop();
	throwMouseMoveEvent();
	//throwRadiusLittle();
	
	
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
	}
	
	// Set up Application
	function configuration(){
		// Calculate Radius
		radioGrande = (stageHeight - margenHeight * 2) / 2;
		radio		= radioGrande;
		//console.log('radioGrande'+radioGrande);
		$('#contenedorCuadros').css('width',radioGrande*2);
		$('#contenedorCuadros').css('height',radioGrande*2);
		/*
		$('#contenedorCuadros').css('width',stageWidth);
		$('#contenedorCuadros').css('height',200);
		*/
		$('#contenedorCuadros').css('left',stageWidth/2 - radioGrande / 2);
		$('#contenedorCuadros').css('top',stageHeight/2 - radioGrande / 2);
	}
	
	
	// Save angles in a object
	function keepAnglesInObject(){
		var contadorGrados2 = 0;
		$('.cuadro').each(function(index){
			var adjRatio = radioGrande * Math.cos(contadorGrados*(Math.PI/180)); // CAH
			var oppRatio = radioGrande * Math.sin(contadorGrados*(Math.PI/180)); // SOH
			//console.log('top: '+oppRatio+' left: '+adjRatio+' degree'+contadorGrados+' index: '+index);
			var objeto1 = new Cuadrado(200,contadorGrados,contadorGrados2,oppRatio,adjRatio,0);
			vectorObjetos.push(objeto1);
			$(this).mouseover(function(){
				 selectId = index;
				 //TweenLite.to($(this), .3, {scaleX:1.5,scaleY:1.5, ease:Expo.easeOut});
				 /*
				  $(this).css('WebkitTransform', 'rotate(' + vectorObjetos[index].grados * 1.5 + 'deg)');
				  $(this).css('-ms-transform', 'rotate(' + vectorObjetos[index].grados * 1.5 + 'deg)');
				  $(this).css('transform', 'rotate(' + vectorObjetos[index].grados * 1.5 + 'deg)');
				  */	
			});
			$(this).mouseout(function(){
				 selectId = -1;
				  //TweenLite.to($(this), .3, {scaleX:1,scaleY:1, ease:Expo.easeOut});
				  /*
				  $(this).css('WebkitTransform', 'rotate(' + vectorObjetos[index].grados*1.5 + 'deg)');
				  $(this).css('-ms-transform', 'rotate(' + vectorObjetos[index].grados*1.5 + 'deg)');
				  $(this).css('transform', 'rotate(' + vectorObjetos[index].grados*1.5 + 'deg)');
				  */	
			});
			$(this).click(function(event){
				event.preventDefault();
				//console.log('grados: '+vectorObjetos[index].grados+' index:'+index);
				//window.cancelAnimationFrame(miInterval);
				diferenciaGrados = 360 - vectorObjetos[index].grados;
				//miInterval = requestAnimationFrame(irAlGrado);
				//contadorGrados = 0;
				//finalizarAnim = false;
				idSeleccionado = index;
				
			});
			contadorGrados = 360 / nCuadros * (index+1);
			contadorGrados2 = 360 / nCuadros2 * (index+1)
		});
		
		
		//contadorGrados = 0;
		
	}
	
	function irAlGrado(event){
		if (!finalizarAnim){
			if (contadorGrados < diferenciaGrados){
				$('.cuadro').each(function(index){
					if (vectorObjetos[index].grados + 1 >= 360){
						vectorObjetos[index].grados = vectorObjetos[index].grados + 1 - 360;
					}else{
						vectorObjetos[index].grados += 1;
					}
					var adjRatio = radioGrande * Math.cos(vectorObjetos[index].grados*(Math.PI/180)); // CAH
					var oppRatio = radioGrande * Math.sin(vectorObjetos[index].grados*(Math.PI/180)); // SOH
					
					$(this).css('WebkitTransform', 'rotate(' + vectorObjetos[index].grados + 'deg)');
					$(this).css('-ms-transform', 'rotate(' + vectorObjetos[index].grados + 'deg)');
					$(this).css('transform', 'rotate(' + vectorObjetos[index].grados + 'deg)');
					
					
					if (index == idSeleccionado){
						
						var adjRatio = radioGrande * Math.cos(vectorObjetos[index].grados*(Math.PI/180)); // CAH
						var oppRatio = radioGrande * Math.sin(vectorObjetos[index].grados*(Math.PI/180)); // SOH
						
						$(this).css('WebkitTransform', 'rotate(' + vectorObjetos[index].grados + 'deg)');
						$(this).css('-ms-transform', 'rotate(' + vectorObjetos[index].grados + 'deg)');
						$(this).css('transform', 'rotate(' + vectorObjetos[index].grados + 'deg)');
						
						
						var tramos = diferenciaGrados / 50;
						var resultado = 50 + contadorGrados * 50 / diferenciaGrados;
						$(this).css('backgroundSize',resultado + '%');
					}
					$(this).css('top',oppRatio+'px');
					$(this).css('left',adjRatio+'px');
				});
				contadorGrados = contadorGrados + 1;
			}else{
				contadorGrados = 0;
				finalizarAnim = true;
			}
			miInterval = requestAnimationFrame(irAlGrado);
		}
	}
	
	// Parar y Empezar
	function eventsStartAndStop(){
		$('#parar,#start').click(function(event){
			if (event.target.id == 'parar'){
				window.cancelAnimationFrame(miInterval);
			}else if(event.target.id == 'start'){
				//var startTime = date.now();
				miInterval = requestAnimationFrame(draw);
			}
		});
	}
	
	function pruebasFunciones(){
		
		// Tipos de funciones
		
		(function(){})();

		(function(window, document, undefined){
			
			window.close();
			//console.log('Hola');
			
		})(window,window.document,'pepe')
		
	}
	
	function throwMouseMoveEvent(){
		
		window.addEventListener('mousemove',captureMouse,true);
		
	}
	
	function throwRadiusLittle(){
		
		var myVar = setInterval(function(){ radiusLittle() }, 10);
		
	}
	
	function radiusLittle(){
		
		//console.log('Hola');
		
		if (contadorSegundos > 5){
		
			if (contadorRadio < 100){
				
				$('.cuadro').each(function(index){
					
					var adjRatio = contadorRadio * Math.cos(contadorGrados*(Math.PI/180)); // CAH
					var oppRatio = contadorRadio * Math.sin(contadorGrados*(Math.PI/180)); // SOH
					
					$(this).css('WebkitTransform', 'rotate(' + contadorGrados + 'deg)');
					$(this).css('-ms-transform', 'rotate(' + contadorGrados + 'deg)');
					$(this).css('transform', 'rotate(' + contadorGrados + 'deg)');
						
					
					$(this).css('top',oppRatio+'px');
					$(this).css('left',adjRatio+'px');
					
					contadorGrados += 360 / nCuadros;
					
					
					
				});
				
				contadorRadio++;
				
			}else{	
				
				var myVar = setTimeout(throwRadiusLittle, 1);
				
			}
			
			contadorSegundos++;
			
		}
		
		contadorSegundos++;
		
	}
	
	function moverIzquierda(){
		
		
		
	}
	
	//Capture Mouse
	function captureMouse(event){
		
		mouseX = event.pageX;
		mouseY = event.pageY;
		
	}
	
	// Cancel Mouse
	function cancelAnimationFrame(){
		
		//console.log('------------- Valores '+contadorVueltas+' ------------');
		window.cancelAnimationFrame(miInterval);
		
	}
	
	//console.log('left'+$('#contenedorCuadros').css('left'));
	//console.log('right'+$('#contenedorCuadros').css('top'));
	
	//console.log('-----------------------------------');
	
	function draw(){
		
		if (contadorInterval < .5){
			
			$('.cuadro').each(function(index){
				
						var distX = mouseX - parseInt($('#contenedorCuadros').css('left'));
						var distY = mouseY - parseInt($('#contenedorCuadros').css('top'));
						var dist  = Math.sqrt(distX * distX + distY * distY);
						
						if(Math.abs(distY) > 115 && radioGrande > radio){
							
							contadorGrados = 0;
							
							
						}else if (Math.abs(distY) > 0 && Math.abs(distY) < 115 && radioGrande < radio * 2){
								
							$(this).css('backgroundSize', '50%');
							
								if (contadorVueltas < 1000){
								
									var adjRatio = radioGrande * Math.cos(vectorObjetos[index].grados2*(Math.PI/180)); // CAH
									var oppRatio = (radioGrande) * Math.sin(vectorObjetos[index].grados2*(Math.PI/180)); // SOH	
									
									if (index == idSeleccionado){
										
										$(this).css('backgroundSize', '100%');
										
										var adjRatio = (radioGrande - 22) * Math.cos(vectorObjetos[index].grados2*(Math.PI/180)); // CAH
										var oppRatio = (radioGrande-22) * Math.sin(vectorObjetos[index].grados2*(Math.PI/180)); // SOH
										
										//console.log('width: '+$(this).width());
										//console.log('height: '+$(this).height());
										
										if (vectorObjetos[index].grados2*(Math.PI/180) <= 90){
										
											var adjRatio = (radioGrande - 22) * Math.cos(vectorObjetos[index].grados2*(Math.PI/180)); // CAH
											
											
										}else if(vectorObjetos[index].grados2*(Math.PI/180) > 90 && vectorObjetos[index].grados2*(Math.PI/180) <= 180){
											
											var adjRatio = (radioGrande-44) * Math.cos(vectorObjetos[index].grados2*(Math.PI/180)); // CAH
											//var oppRatio = (radioGrande-20) * Math.sin(vectorObjetos[index].grados2*(Math.PI/180)); // SOH
											
										}
										
											
									
									
										
									}
									
									var misGrados= vectorObjetos[index].grados2;
								
								}else{
								
									var adjRatio = radioGrande * Math.cos(vectorObjetos[index].grados*(Math.PI/180)); // CAH
									var oppRatio = radioGrande * Math.sin(vectorObjetos[index].grados*(Math.PI/180)); // SOH	
									var misGrados= vectorObjetos[index].grados;
									
								}
							
								$(this).css('WebkitTransform', 'rotate(' + misGrados + 'deg)');
								$(this).css('-ms-transform', 'rotate(' + misGrados + 'deg)');
								$(this).css('transform', 'rotate(' + misGrados + 'deg)');
								
									
								$(this).css('top',oppRatio+'px');
								$(this).css('left',adjRatio+'px');
								
								var miAngulo = saberAngulo(oppRatio,adjRatio);
								
								if (index == 0){
									
									//console.log('angulo?: '+temp3+' Pitagoras: '+pitagoras+' posX: '+anguloX+' posY: '+anguloY+' otros grados: '+radianes+' radio grande: '+radioGrande+'Contenedor left: '+$('#contenedorCuadros').css('left')+'Contenedor top: '+$('#contenedorCuadros').css('top') +' this top: '+$(this).css('top') +' this left: '+$(this).css('left') + ' grados:'+vectorObjetos[index].grados);
									
								}
								
								if (vectorObjetos[index].grados + 2 >= 360){
									
									vectorObjetos[index].grados = vectorObjetos[index].grados + 2 - 360 ;
									vectorObjetos[index].grados2 = vectorObjetos[index].grados2 + 2 - 360 ;
									
									contadorVueltas = contadorVueltas + 1;
									
								}else{
									
									vectorObjetos[index].grados += 2;
									vectorObjetos[index].grados2 += 2;
									
								}
								
										
						}
						
											
					if (index == 0){
						
						//console.log('mouseY: '+mouseY+'mouseX: '+mouseX+'contenedoCuadros top:'+$('#contenedorCuadros').css('top')+'contenedoCuadros left:'+$('#contenedorCuadros').css('left')+'top: '+oppRatio+' left: '+adjRatio+' vectorGrados: '+vectorObjetos[index].grados+' index: '+index+' gradosTotal: '+graditos+' contador: '+contadorGrados+' contadorInterval: '+contadorInterval+'dist: '+dist+' distX: '+distX+' distY: '+distY);
					}
					
					
				
			});
		
			
		}
		
		miInterval = requestAnimationFrame(draw);
		
		
	}

	
	// Utilizamos funci�n Atan para devolver el angulo en funci�n de la posicion Y e X
	function saberAngulo(y,x){
		
		var radianes = Math.atan2( y, x );
		var graditos = Math.round(radianes * 180 / Math.PI);
		
		return graditos;
		
	}
	
	
});






function devolverGrados(vectorGrados){
	
	//var tr		 = elemento.css('-webkit-transform') || elemento.css('transform') || elemento.css('-o-transform') || elemento.css('-moz-transform');
	var vector	 = new Array();
	var values 	 = vectorGrados.split('(')[1],
	values 	 	 = values.split(')')[0],
	values 	 	 = values.split(',');	
	
	var a = values[0]; // 0.866025
	var b = values[1]; // 0.5
	var c = values[2]; // -0.5
	var d = values[3]; // 0.866025
	
	var angleA  = Math.round(Math.asin(a) * (180/Math.PI));
	var angleB  = Math.round(Math.asin(b) * (180/Math.PI));
	var angleC  = Math.round(Math.asin(c) * (180/Math.PI));
	var angleD  = Math.round(Math.asin(d) * (180/Math.PI));
	
	vector[0]	= angleA;
	vector[1]	= angleB;
	vector[2]	= angleC;
	vector[3]	= angleD;
	
	//var angle2 = getGrades(b);
	//console.log('angleA: '+angleA+'angleB: '+angleB+'angleC: '+angleC,'angleD: '+angleD);
	
	//console.log(values);
	
	return (vector[1]);
	
}

function seno(grade){
	
	var radians = Math.sin(grade * Math.PI / 180)
	
	return radians;
	
}

function coseno(grade){
	
	var radians = Math.cos(grade * Math.PI / 180)
	
	return radians;
	
}

function arcoseno(seno){
	
	var grados = Math.asin(seno);
	
	return grados;
}

function arcocoseno(coseno){
	
	var grados = Math.acos(coseno);
	
	return grados;
}

function getRadians(degrees){
	
	var radians = degrees * Math.PI / 180
	return (radians);
	
}

function getGrades(radians){
	
	var degrees = radians * 180 / Math.PI
	return (degrees);
	
}

