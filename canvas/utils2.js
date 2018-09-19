/*
$(document).ready(function(){
	var centrarCanvas = function(){
		console.log('Hola canvas');
	}
});
*/
//var contadorGrados1 = 0;

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


/*
 * Dibujamos una flecha
 */
function Arrow () {
	this.x = 0;
	this.y = 0;
	this.color = "#ffff00";
	this.rotation = 0;
}
Arrow.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.lineWidth = 2;
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(-50, -25);
	context.lineTo(0, -25);
	context.lineTo(0, -50);
	context.lineTo(50, 0);
	context.lineTo(0, 50);
	context.lineTo(0, 25);
	context.lineTo(-50, 25);
	context.lineTo(-50, -25);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
};

	
// Parsea color a numero
parseColor = function (color, toNumber) {
	
	if (toNumber === true) {
	
		if (typeof color === 'number') {
			return (color | 0); //chop off decimal
		}
		
		if (typeof color === 'string' && color[0] === '#') {
			color = color.slice(1);
		}
		
		
		return window.parseInt(color, 16);
		
	} else {
		
		if (typeof color === 'number') {
			//make sure our hexadecimal number is padded out
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		
		}
	
		return color;
	}

} // End function

// Crea un arco iris de colores
function rainbow(numOfSteps, step) {
    
	// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distiguishable vibrant markers in Google Maps and other apps.
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    // Adam Cole, 2011-Sept-14
    
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1, g = f, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = 0, g = 1, b = f; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = f, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

// Gris

function grayscale(src) {
	
	var supportsCanvas = !!document.createElement('canvas').getContext;
	
	if (supportsCanvas) {
		
		var canvas = document.createElement('canvas'), 
		context = canvas.getContext('2d'), 
		imageData, px, length, i = 0, gray, 
		img = new Image();
		
		img.src = src;
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0);
			
		imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		px = imageData.data;
		length = px.length;
		
		for (; i < length; i += 4) {
			gray = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
			px[i] = px[i + 1] = px[i + 2] = gray;
		}
				
		context.putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	} else {
		return src;
	}
}

// Detectar Dispositivo
var detectarDispositivo = function(){
	
	this.info = '';
	
	// Saber si es MOBILE | TABLET | PC
	if (WURFL.is_mobile){
		
		versionMobile = true;		
		this.info = 'mobile';
		
	}else{
		
		versionMobile = false;
		this.info = 'desktop';
		
	}
	
	return this.info;
		
}

/* ***************************************** Listado de objetos ***************************************** */
var Bola = function(){
	this.x = 0;
	this.y = 0;
	this.z = 0;
}

Bola.prototype.draw = function (context) {

	context.save();
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();

	if (this.lineWidth > 0) {
		context.stroke();
	}
	context.restore();


} // Ball method draw

//Objeto Ball
var Ball = function(radius, color) {
	if (radius === undefined) { radius = 1; }
	if (color === undefined) { color = "#ff0000"; }
	this.x = -radius/2;
	this.y = -radius/2;
	this.xpos = 0;
	this.ypos = 0;
	this.zpos = 0;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.radius = radius;
	this.mass = 1;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = color;//parseColor(color);
	this.lineWidth = 1;
	this.visible = true;
	this.index = '';
	this.grade = 0;
	this.grados  = 0;
}// End object


// Cuadrado
var MiCuadrado = function() {

	this.x = 0;
	this.y = 0;
	this.xpos = 0;
	this.ypos = 0;
	this.zpos = 0;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	//this.radius = radius;
	this.mass = 1;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	//this.color = parseColor(color);
	this.lineWidth = 1;
	this.visible = true;
	this.index   = '';
	this.width   = 80;
	this.height  = 40;


} // End Object

MiCuadrado.prototype.setGrade = function(grade){
	this.grade = grade;
}

/*
 * Método para colocar un indice
 */
MiCuadrado.prototype.setIndex = function(index){
	this.index = index;
}


/*
 * Método para colocar un indice
 */
MiCuadrado.prototype.setGrade = function(grade){
	this.grade = grade;
}

Ball.prototype.setGrade = function(grade){
	this.grade = grade;
}

/*
 * Método para colocar un indice
 */
Ball.prototype.setIndex = function(index){
	this.index = index;
}

// Method object draw
Ball.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	var valorSeno   = Math.sin(this.grados*Math.PI/180);
	var valorCoseno = Math.cos(this.grados*Math.PI/180);
	//console.log('valor seno:'+valorSeno);
	if (this.grados <= 180){
		//context.globalAlpha = 0;
	}else{
		//context.globalAlpha = 1;
	}
	//context.save();
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	//context.fillStyle = this.color;
	if (this.index == 0){
		//this.color = '000000';
		context.fillStyle = "#000000"; //red
	}else{
		//this.color = 'cccccc';
		context.fillStyle = "#cccccc"; //red
	}

	context.save();
	context.beginPath();
	context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	context.restore();
	context.closePath();
	context.fill();
	context.lineWidth = 1;
	context.font = "12px Arial";
	context.strokeText(this.grados,30,30);


	if (this.lineWidth > 0) {
		context.stroke();
	}
	context.restore();
} // Ball method draw

Ball.prototype.getBounds = function () {
	return {
		x: this.x - this.radius,
		y: this.y - this.radius,
		width: this.radius * 2,
		height: this.radius * 2
	};
};

MiCuadrado.prototype.draw = function(context){

	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.beginPath();
	context.rect(this.x-40, this.y-20, 80, 40);
	context.fillStyle = 'black';
	context.fill();
	//context.lineWidth = 7;
	context.strokeStyle = 'black';
	context.stroke();
	context.restore();
}

MiCuadrado.prototype.getBounds = function () {
	return {
		x: this.x,
		y: this.y,
		width: this.width,
		height: this.height
	};
};

var Ball2 = function(radius, color) {
		
	this.x = 0;
	this.y = 0;
	this.radius = .5;
	//this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;


}// End object 

Ball2.prototype.draw = function (context) {
	
	 context.save();
	
	 //context.translate(this.x, this.y);
	 
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	
	//context.restore();

}

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

function Arrow () {
	
	this.x = 0;
	this.y = 0;
	this.color = "#ffff00";
	this.rotation = 0;

}

Arrow.prototype.draw = function (context) {
	
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.lineWidth = 2;
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(-50, -25);
	context.lineTo(0, -25);
	context.lineTo(0, -50);
	context.lineTo(50, 0);
	context.lineTo(0, 50);
	context.lineTo(0, 25);
	context.lineTo(-50, 25);
	context.lineTo(-50, -25);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();

	
};


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

//Cuadrado
var fotosCircumferencia = function(x, y, width, height,angle,radius,scaleX,scaleY,imagen) {
	
	this.x 		= x;
	this.y 		= y;
	this.width  = width;
	this.height = height;
	this.angle  = angle;
	this.radius = radius;
	this.scaleX = scaleX;
	this.scaleY = scaleY;
	this.imagen = imagen;
	
} // End Object


function Line (x1, y1, x2, y2) {
	
	this.x 		   = 0;
	this.y 		   = 0;
	this.x1 	   = (x1 === undefined) ? 0 : x1;
	this.y1 	   = (y1 === undefined) ? 0 : y1;
	this.x2 	   = (x2 === undefined) ? 0 : x2;
	this.y2 	   = (y2 === undefined) ? 0 : y2;
	this.rotation  = 0;
	this.scaleX    = 1;
	this.scaleY    = 1;
	this.lineWidth = 1;

}

Line.prototype.draw = function (context) {

	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.beginPath();
	context.moveTo(this.x1, this.y1);
	context.lineTo(this.x2, this.y2);
	context.closePath();
	context.stroke();
	context.restore();

};

Line.prototype.getBounds = function () {
	
	if (this.rotation === 0) {
		
		var minX = Math.min(this.x1, this.x2),
		minY 	 = Math.min(this.y1, this.y2),
		maxX 	 = Math.max(this.x1, this.x2),
		maxY 	 = Math.max(this.y1, this.y2);
	
		return {
			
			x: this.x + minX,
			y: this.y + minY,
			width: maxX - minX,
			height: maxY - minY
		}
		
	} else {
	
		var sin = Math.sin(this.rotation),
		cos 	= Math.cos(this.rotation),
		x1r 	= cos * this.x1 + sin * this.y1,
		x2r 	= cos * this.x2 + sin * this.y2,
		y1r 	= cos * this.y1 + sin * this.x1,
		y2r 	= cos * this.y2 + sin * this.x2;
	
		return {
			x: this.x + Math.min(x1r, x2r),
			y: this.y + Math.min(y1r, y2r),
			width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
			height: Math.max(y1r, y2r) - Math.min(y1r, y2r)
	};
	
}
	

};
