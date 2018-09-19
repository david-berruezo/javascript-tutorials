// Tipo objeto Javascript: Función
// Methods defined internally

function myFunction() {
  console.log(this.name);
}

var objectA = {
  name: "Alice",
  myMethod: myFunction
};

var objectB = {
  name: "Bob",
  myMethod: myFunction
};

objectA.myMethod()
//Imprime "Alice"

objectB.myMethod()
//Imprime "Bob"

console.log(this);

var alice = {
		  nombre: "Alice",
		  
		  
		  cansarse: function() {
			  console.log(this.nombre);
		 },

		 llamarFuncion: function(nombreObjeto,nombreFuncion){
			 
			 //alert(this);
			 nombreFuncion.call(nombreObjeto);
			 
		 },
		 
		 saludar:function(nombreContexto,argumentos){
			 
			 //alert("Hola"+typeof(argumentos));
			 
			 /*
			 if (argumentos === "array"){
				 
				 alert("Hola pepe");
				 
			 }
			 */
			 
			 //alert(argumentos[0]);
			 
			 for (var i=0;i<argumentos.length;i++){
				 
				 console.write(argumentos[i]);
				 
			 }
			 
			 //argumentos.call(nombreContexto);
			 
		 }
	

};


function esperarUnSegundo(callback) {
	  setTimeout(function() {
	    callback();
	  }, 1000);
	}

function callWithAlice() {

	argumentos = ["cansarse",1,2,3,4,5];
	alice.saludar.apply(alice, argumentos);

}
	
callWithAlice("Rob", "Bob");


var myFunction = alice.cansarse;
myFunction.call(alice);
//myFunction = alice.llamarFuncion(alice,cansarse);
//esperarUnSegundo(alice.cansarse);

miArray = [1,2,3,4,5];
//alert(miArray[0]);

var objectCanvas = function(){
		
		this.name    = "",
		this.chapter = "",
		this.tema = "",
		this.sources = {cobraSmallImg: "01.jpg",cobraLargeImg: "02.jpg"},
		
		this.getProperties = function(){
			
			console.log("Nombre: "+this.name+ " Capitulo: "+this.chapter);	
		}
		
		this.setProperties = function(name,chapter){
			
			this.name    = name;
			this.chapter = chapter; 
			
		}
		
		this.callFunction = function(parameters,callback){
			
			// Funcion de ejercicios
			// callback(parameters);
			//callback.apply(callbackObj, [firstName, lastName]);
			
			callback.call(parameters);
			
		},
		
		this.dibujarImagenEnCanvas = function(images){
			
			//context.drawImage(images[0].src,posX,posY);
			//document.getElementById("img1").src = sources[src];
			//drawImages(images[src],0,0);
	
		}
		
		
		loadImages = function(sources){
			
			var loadedImages = 0;
			var numImages = 0;
			var images = {};
			
			// Contar número imagenes
			for (var src in sources){
				numImages++;
			}
			
			// load images
			for (var src in sources) {
				
				images[src] = new Image();
				images[src].onload = function(){
					// call callback function when images
					// have loaded
					if (++loadedImages >= numImages) {
						//dibujarImagenEnCanvas(images);
					}
						
				}
				
				images[src].src = sources[src];
			}
			
			//alert("Hola"+images[src]);
			
		}
		
};

var person = function (){
	
	//alert("Hola persona");
	
	this.edad   = "",
	this.nombre = "",
	
	this.getInfo = function(){
		
		console.log("El nombre es: "+this.nombre+" Edad: "+this.edad);
		//return (this.nombre);
	}
	
	this.setInfo = function(edad,nombre){
		
		this.edad   = edad;
		this.nombre = nombre;
		
		//this.getInfo();
		
	}
	
	this.callFuncion = function(funcion){
		
		callback.call(funcion);
		
		
	}
	
	
	//this.getUserInput = function(callback, callbackObj)  {
	   
	
	
	
}


var menu = function (){
	
	this.idTema 	   = "",
	this.idCapitulo	   = "",
	this.textoTema	   = "",
	this.textoCapitulo = "",
	
	this.setMenu = function(idTema,idCapitulo,textoTema,textoCapitulo){
		
		this.idTema 	   = idTema,
		this.idCapitulo	   = idCapitulo,
		this.textoTema	   = textoTema,
		this.textoCapitulo = textoCapitulo
			
	}
	
};

var Something = function(element){

  this.name = 'Something Good';
  this.handleEvent = function(event) {
    console.log(this.name); // 'Something Good', as this is the Something object
    switch(event.type) {
      case 'click':
        // some code here...
        break;
      case 'dblclick':
        // some code here...
        break;
    }
  };

  // Note that the listeners in this case are this, not this.handleEvent
  element.addEventListener('click', this, false);
  element.addEventListener('dblclick', this, false);

  // You can properly remove the listners
  element.removeEventListener('click', this, false);
  element.removeEventListener('dblclick', this, false);

}


$(function() {
    
	var vectorTitulos   = [];
	var vectorCapitulos = [];
	
	var canvas = $("#canvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	var playAnimation = true;
	var startButton = $("#startAnimation");
	var stopButton = $("#stopAnimation");
	
	
	$( "#accordion" ).accordion();
	var miObjeto = $("#accordion h3")
	
	$("#accordion h3").each(function(index){
		console.log($(this));
			//console.log($(this).attr("id"));
			//console.log($(this).text());
			
			//vectorTitulos.push($(this).text());
	
			var objeto = $(this).next().next().attr("id");
			console.log($(this).next().next().attr("id"));
			
			$(objeto + "li").each(function(index){
				
				//console.log($(this)text());
				
			});
			
			
	});
	
	
	startButton.hide();
	
	startButton.click(function() {
		$(this).hide();
		stopButton.show();
		playAnimation = true;
		animate();
	});
	
	stopButton.click(function() {
		$(this).hide();
		startButton.show();
		playAnimation = false;
	});
	
	var Shape = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radius = Math.random()*30;
		this.angle = 0;
	};
	
	var shapes = new Array();
		
	for (var i = 0; i < 10; i++) {
		var x = Math.random()*250;
		var y = Math.random()*250;
		var width = height = Math.random()*30;
		shapes.push(new Shape(x, y, width, height));
	};
	
	
	function animate() {
		
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		var shapesLength = shapes.length;
		
		for (var i = 0; i < shapesLength; i++) {
		
			var tmpShape = shapes[i];
			
			var x = tmpShape.x+(tmpShape.radius*Math.cos(tmpShape.angle*(Math.PI/180)));
			var y = tmpShape.y+(tmpShape.radius*Math.sin(tmpShape.angle*(Math.PI/180)));
			
			
			tmpShape.angle += 5;
			
			if (tmpShape.angle > 360) {
			
				tmpShape.angle = 0;
			};
			
			context.fillStyle="#FFffff";
			context.fillRect(x, y, tmpShape.width, tmpShape.height);
		};
		if (playAnimation) {
			setTimeout(animate, 33);
		};
	};
		
	animate();
	
	
	/*
	$("#accordion h3").each(function(index){
			
			vectorCapitulos.push($(this).text());
		
	});
	*/
	
});


window.onload = function(){
	
	// Objeto sources
	var sources = {
			cobraSmallImg: "01.jpg",
			cobraLargeImg: "02.jpg"
	};

	
	
	
	/*
	var person1 = new person();
	person1.setInfo("David",36);
	person1.getUserInput(person.getInfo, person);
	*/
	
	//person1.call(getInfo);
	//person1.call(getInfo);
	//person1.getInfo();
	
	
};

