$(document).ready(function() {
	// Referente al stage
	var stageHeight 	  = 200;
	var stageWidth  	  = window.innerWidth;
	var nMenu  		      = 8;
	var margin			  = 10;
	var totalMargin       = 10 * (nMenu-1) ; 
	var tamWidthMinim     = 50;
	var tamWidthMinim     = 50;
	var tamWidthNormal    = (stageWidth - totalMargin) / nMenu; 
	var tamWidthMaxim     = stageWidth - (totalMargin + (nMenu-1) * tamWidthMinim);
	var mouse   		  = captureMouse(document.getElementById('contenedor'));
	var idSeleccionado	  = -1;
	var miInterval 		  = 0;
	console.log('tamWidthNormal: '+tamWidthNormal+' tamWidthMaxim: '+tamWidthMaxim);
	crearMenu();
	lanzarPararAnimacion(1,escucharMouse);
	function lanzarPararAnimacion(lanzarParar,funcion){
		if (lanzarParar == 1){
			miInterval     = requestAnimationFrame(funcion);
		}else{
			window.cancelAnimationFrame(miInterval);
			//resetearValores();
		}// End if
	}// End function
	
	
	function crearMenu(){
		var cuadro = '<div class="cuadro"></div>';
		var object = 0;
		var posX   = 0;
		for (var i = 0; i < nMenu; i++){
			$('#contenedor').append(cuadro);
			object = $('.cuadro')[i];
			$(object).attr('id',i);
			$(object).css('width',tamWidthNormal+'px');
			posX = i * tamWidthNormal + i * margin;
			$(object).css('left',posX +'px');
			$(object).mouseover(function(event){
				event.preventDefault();
				detectarBoton(event);	
			});
			$(object).mouseout(function(event){
				event.preventDefault();
				detectarBoton(event);	
			});
		}// End for
	}
	
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
	})()}; // End function


		  
	function escucharMouse (){
		// detectarBoton();
		mover();
		miInterval     = requestAnimationFrame(escucharMouse);
	}// End function
	
	function detectarBoton(event){
		if (event.type == 'mouseover'){
			idSeleccionado = event.target.id;
		}else if (event.type == 'mouseout'){
			idSeleccionado = -1;
		}
		console.log('idSeleccionado: '+idSeleccionado);
	}
	
	function mover(){
		var objeto 	    = 0;
		var posX   		= 0;
		var posXNormal  = 0;
		if (idSeleccionado != -1){
			for (var i=0; i < nMenu; i++){
				posXNormal  = i * tamWidthNormal + i * margin;
				objeto = $('.cuadro')[i];
				if (idSeleccionado == 0 && idSeleccionado != i){
					posXNormal = tamWidthMaxim + 10 * i + 50 * (i - 1);
					TweenLite.to($(objeto), 1, {width:tamWidthMinim,left:posXNormal,ease:Expo.easeOut});
				}else if(idSeleccionado == 0 && idSeleccionado == i){
					TweenLite.to($(objeto), 1, {width:tamWidthMaxim,ease:Expo.easeOut});
				}else if(idSeleccionado > 0 && idSeleccionado < nMenu - 1 && idSeleccionado != i && i < idSeleccionado){
					posXNormal = i * margin + i * tamWidthMinim ;
					TweenLite.to($(objeto), 1, {width:tamWidthMinim,left:posXNormal+'px',ease:Expo.easeOut});
				}else if (idSeleccionado > 0 && idSeleccionado < nMenu - 1 && idSeleccionado != i && i > idSeleccionado){
					posXNormal = tamWidthMaxim + i * margin + (i-1) * (tamWidthMinim) ;
					TweenLite.to($(objeto), 1, {width:tamWidthMinim,left:posXNormal+'px',ease:Expo.easeOut});
				}else if(idSeleccionado > 0 && idSeleccionado < nMenu - 1 && i == idSeleccionado){
					posXNormal = i * margin + i * tamWidthMinim;
					TweenLite.to($(objeto), 1, {width:tamWidthMaxim,left:posXNormal+'px',ease:Expo.easeOut});
				}else if(idSeleccionado == nMenu - 1 && idSeleccionado != i ){
					posXNormal = margin * i + tamWidthMinim * i;
					TweenLite.to($(objeto), 1, {width:tamWidthMinim,left:posXNormal+'px',ease:Expo.easeOut});
				}else if(idSeleccionado == nMenu - 1 && idSeleccionado == i ){
					posXNormal = margin * i + tamWidthMinim * i;
					TweenLite.to($(objeto), 1, {width:tamWidthMaxim,left:posXNormal+'px',ease:Expo.easeOut});
				}
				console.log('Entra entrada');
			}// End for
		}else{
			for (var i=0;i<nMenu;i++){
				posXNormal  = i * tamWidthNormal + i * margin;
				objeto = $('.cuadro')[i];
				TweenLite.to($(objeto), 1, {width:tamWidthNormal,left:posXNormal+'px',ease:Expo.easeOut});
				console.log('Entra salida');
			}
		}
	}
});

/* ************************************************* Listado de funciones ************************************************ */
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
	
