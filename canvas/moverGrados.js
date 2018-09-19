$(document).ready(function(){
	// var
	var anim = new Animation("myCanvas");
	var canvas = anim.getCanvas();
	var context = anim.getContext();
	var linearSpeed = 200; // pixels / second
	// Referente al stage
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	// Al objeto
	var radio 			  = 150;
	var maxRadio		  = 0;
	var minRadio 		  = 0;
	var contadorGrados    = 0;
	var grados			  = 0;
	var diferenciaGrados  = 0;
	var ncuadros		  = 10;
	var countOfColors 	  = 8;
	var escalado   		  = 1;
	var alpha			  = 1;
	var idEscalado 		  = 0;	
	var opciones		  = 1;
	var margenY	  		  = 200;
	var margenX	  	  	  = 400;
	var cuadros			  = new Array();
	var adjRatio		  = 0;
	var oppRatio		  = 0;
	var dx				  = 0;
	var dy				  = 0;
	var dist			  = 0;
	canvas.width  = stageWidth;
	canvas.height = 400;
	//configuration();
	//crearCircumferencia();
	anim.setStage(function(){
		// update
		// clear
		this.clear();
		// draw
		crearCircumferencia();
		/*
		if (contadorGrados < 10){
			
			var linearSpeed = 100; // pixels / second
			var linearDistEachFrame = linearSpeed * this.getTimeInterval() / 1000;
			var tiempo = this.getTimeInterval() / 1000;
			console.log('tiempo: '+tiempo);
		}
		contadorGrados++;
		*/
		/*
		if (tiempo < 60){
			crearCircumferencia();
			
		}
		*/
		// End draw
	});
	
	function configuration(){
		// canvas
		canvas.width  = stageWidth;
		canvas.height = 400;
		// Radio
		maxRadio = (canvas.height / 2) - (20 + margenY * 2);
		minRadio = maxRadio - 100;
		margenX  = maxRadio + 50;
		margenY  = maxRadio + 50;
		// Mouse
		//canvas.addEventListener('click',clickGrade,true);
	}
	
	function crearCircumferencia(){
		for (var i = 0; i < 36; i++ ){
			grados   = (360 / 36) * i;
			grados = grados + contadorGrados;
			if (grados > 360){
				grados = grados - 360;
			}
			adjRatio = margenX + radio * Math.cos(grados*(Math.PI/180)); // CAH
			oppRatio = margenY - radio * Math.sin(grados*(Math.PI/180)); // SOH
			dx = margenX - adjRatio;
			dy = margenY - oppRatio;
			var angle = Math.atan2(dy,dx) * 180 / Math.PI;
			Math.sqrt(dx * dx , dy * dy);
			console.log('angle: '+angle+' dx: '+dx+' dy: '+dy);
			// canvas
			context.save();
			context.translate(adjRatio,oppRatio);
			context.rotate(-grados * Math.PI/180);
			context.fillStyle='0x000000';
			context.fillRect(-20/2, -20/2, 20, 20);
			context.restore();
		}
		contadorGrados++;
	}
	anim.start();
});