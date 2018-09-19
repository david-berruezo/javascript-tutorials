var contadorGrados1 = 0;

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


/* Object that contains our utility functions.
 * Attached to the window object which acts as the global namespace.
 */
window.utils = {};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
window.utils.captureMouse = function (element) {
    console.log("Hola");
	var mouse = {x: 0, y: 0, event: null},
        body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    element.addEventListener('mousemove', function (event) {
        var x, y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + body_scrollLeft + element_scrollLeft;
            y = event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        mouse.x = x;
        mouse.y = y;
        mouse.event = event;
    }, false);

    return mouse;
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
window.utils.containsPoint = function (rect, x, y) {
    return !(x < rect.x ||
        x > rect.x + rect.width ||
        y < rect.y ||
        y > rect.y + rect.height);
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
//Objeto Ball
var Ball = function(radius, color) {
	if (radius === undefined) {
		radius = 40;
	}
	if (color === undefined) {
		color = "#ff0000";
	}
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;
}// End object

// Method object
Ball.prototype.draw = function (context) {
		context.save();
		context.translate(this.x, this.y);
		context.scale(this.scaleX, this.scaleY);
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

var Ball2 = function(radius, color) {
	this.x = 0;
	this.y = 0;
	this.radius = .5;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = parseColor(color);
	this.lineWidth = 1;
}// End object

Ball2.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	context.restore();
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

cuadradoGrande.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.width * 2,
        height: this.height * 2
    };
};



/*
cuadradoGrande.prototype.draw(context){
	context.save();
	context.translate(this.x, this.y);
	context.beginPath();
	context.arc(0,0,1,0,360);
	context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
	context.restore();
}
*/



// Objeto Imagenes web aplicaciones
var imagenesApplicacion = function(){
	
	this.imgApplicacion = {
			
			0: '',
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
			6: '',
			7: '',
			8: '',
			9: '',
		   10: '',	
			
	} // Objeto Application
	
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

var triangle = function (x1,y1,x2,y2,x3,y3){
	
	
	
}

var caracteristicas = function(grados,x,y,scale,nombre,valor){
	
	
	this.grados = grados;
	this.x 		= x;
	this.y 		= y;
	this.scale	= scale
	this.nombre = nombre;
	this.valor  = valor;
	
	
}

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

function Cuadrado(config){
	
	this.x 				= config.x;
	this.y 				= config.y;
	this.angle			= config.angle;
	this.radioX			= config.radioX;
	this.radioY			= config.radioY;
	this.z				= config.z;
	this.width			= config.width;
	this.height			= config.height;
	this.rotation		= config.rotation;
	this.imagen			= config.imagen;
	this.margenX		= config.margenX;
	this.margenY		= config.margenY;
	this.scaleX			= config.scaleX;
	this.scaleY			= config.scaleY;
	this.alpha			= config.alpha;
	
}

Cuadrado.prototype.draw = function (context){
	
	var adjRatio = 0;
	var oppRatio = 0;
	var scale    = 0;
	var alpha    = 0;
	var sin 	 = Math.sin( this.angle*(Math.PI/180) );
	var cos		 = Math.cos(this.angle*(Math.PI/180));
	
	adjRatio = this.margenX + this.radioX * cos; // CAH
	oppRatio = this.margenY + this.radioY * sin; // SOH
	
	if (sin >= 0 && sin <= 180 ){
		
		scale = 1 + Math.abs(sin);
		alpha = 1 + Math.abs(sin);
		
	}else{
		
		scale = 1 - Math.abs(sin) / 2;
		alpha = 1 - Math.abs(sin) / 2;
		
		
	}
	
	this.scaleX = scale;
	this.scaleY = scale;
	this.alpha  = alpha;
	this.x		= adjRatio;
	this.y		= oppRatio;
	
	// Guardamos context
	context.save();
	context.translate(adjRatio, oppRatio);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.globalAlpha = alpha;
	// Dibujamos Objetos
	// Dibujamos cuadro
	context.fillStyle = '#000000';
	context.fillRect(-81/2, -41/2, 81, 41);
	context.lineWidth = 1;
	context.strokeStyle = "#333333"; // line color
	// Dibujamos imagen
	context.drawImage(this.img,-80/2,-40/2,80,40);
	
	/*
	context.beginPath();
				
	// Vertical
	context.lineWidth = 1;
	context.moveTo(-40, 40);
	context.lineTo(-40, 20);
				
	// Horizontal
	context.moveTo(10, 40);
	context.lineTo(-40, 40);
	*/	
				
	// Text
	context.font = "6pt Arial";
	context.fillStyle = "#333333";
	context.fillText("Front End", -20, 42);
	context.stroke();
	
	// Restauramos context
	context.restore();
	
}

Cuadrado.prototype.getBounds = function () {
	return {
		x: this.x - 40,
		y: this.y - 20,
		width: 80,
		height: 40
	}
}

Cuadrado.prototype.containsPoint = function (rect, x, y) {
	return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
};


/*
cuadrado.prototype.draw(context){
	
	
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.angle);
	context.beginPath();
	
	for (var n = 0; n < numCuadros; n++) {
		
		var x = (radius * Math.sin(theta));
		var y = (radius * Math.cos(theta));
		
		var radius = null;
		
		if (n % 2 == 0) {
			
			radius = this.outerRadius;
		
		}else{
			
			radius = this.innerRadius;
		}
		
		var theta = ((Math.PI * 2) / numPoints) * (n + 1);
		
		
		if (n == 0) {
			context.moveTo(x, y);
		
		} else {
			context.lineTo(x, y);
		}
	
	}
	
	context.closePath();
	
	context.lineWidth = 5;
	context.strokeStyle = this.darkColor;
	context.stroke();
	
	context.beginPath();
	context.arc(0, 0, this.midRadius, 0, 2 * Math.PI,false);
	var grd = context.createLinearGradient(-1 * this.outerRadius / 2, -1 * this.outerRadius / 2, this.outerRadius / 2,this.outerRadius / 2);
	grd.addColorStop(0, this.lightColor);
	grd.addColorStop(1, this.darkColor);
	context.fillStyle = grd;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = this.darkColor;
	context.stroke();
	
	context.beginPath();
	context.arc(0, 0, this.holeRadius, 0, 2 * Math.PI,false);
	context.fillStyle = "white";
	context.fill();
	context.strokeStyle = this.darkColor;
	context.stroke();
	
	context.restore();
	
	
	console.log('Entra aqui');
	
	
};
*/


