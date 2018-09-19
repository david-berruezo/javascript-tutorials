$(document).ready(function(){

});

/*
* Game controller
*
* The controller is responsible for instantiating
* the view and the model, initializing the game,
* controlling the game state, and managing keyboard events
*/
function Controller(canvasId){

	// Stage
	this.canvas 	 = document.getElementById('canvas');
	this.context 	 = canvas.getContext('2d');
	this.stageWidth  = window.innerWidth();
	this.stageHeight = window.innerHeight();
	
	// Referente al ovalo
	this.radioX   = 300,
	this.radioY   = 100,
	this.margenX  = 500,
	this.margenY  = 300,
	this.contadorGrados = 0,
	this.adjRatio = 0,
	this.oppRatio = 0,
	this.scale	  = 1,
	this.alpha	  = 1,
	this.diferenciaGrados  = 0,
	
	// Referente a la aplicacion
	this.idPinchado 	   = 0,
	this.state 			   = 0,
	this.idSeleccionado    = 0,
	this.vectorProyectos   = new Array(),
	this.vectorObjetoFotos = new Array(),
	this.vectorObjetos 	   = new Array(),
	this.vectorFotosApplication = new Array(),
	
	// Objeto Events
	this.events  = new Events(canvas),
	this.message = "";
	
	// Objeto Animación
	this.anim  = new Animation(canvas);
	
	this.states = {
			
		INIT: "INIT",
		SELECCIONADO: "PANIMAGE",
		DETALLE: "DETALLE",
		
	}
	
	this.state = this.states.INIT;
	
	
	
	
}

Controller.prototype.saveImagesApplication = function (){
	
	
	
}

Controller.prototype.loadImagesApplication = function(){
	
	
	
}

