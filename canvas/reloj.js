var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

// Propiedades
var radio  		= canvas.width / 2;
var startX 		= canvas.width / 2;
var startY 		= canvas.height / 2;
var startAngle  = 0;
var endAngle    = 2 * Math.PI;

function CircumferenciaConMargen(margen){
	
	var radio  		= (canvas.width - margen) / 2 ;
	var startX 		= canvas.width / 2;
	var startY 		= canvas.height / 2;
	
	context.beginPath();
	context.arc(startX, startY,radio, startAngle, endAngle, false);
	context.stroke();
	
	
}
	
function CircumferenciaSinMargen(){
	
	context.beginPath();
	context.arc(startX, startY,radio, startAngle, endAngle, false);
	context.stroke();
	
	
}

function CircumferenciaRellenada(margen){
	
	var radio  		= (canvas.width - margen) / 2 ;
	var startX 		= canvas.width / 2;
	var startY 		= canvas.height / 2;
	
	context.beginPath();
	context.arc(startX, startY,radio, startAngle, endAngle, false);
	context.fillStyle="#cccccc";
	context.fill();
		
}

function dibujarPrimerArco(margen){
	
	var radio  		= (canvas.width - margen) / 2 ;
	var startX 		= canvas.width / 2;
	var startY 		= canvas.height / 2;
	
	startAngle      = 0;
	endAngle        = Math.PI / 2; 
	
	context.beginPath();
	context.arc(startX, startY,radio, startAngle, Math.PI /2, false);
	context.fillStyle="#cccccc";
	context.stroke();
	
}

function pintarCircumferencia(margen){
	
	var radio  		= (canvas.width - margen) / 2 ;
	var startX 		= canvas.width / 2;
	var startY 		= canvas.height / 2;
	
	startAngle      = 0;
	
	var simbolos = new Array();
	
	for (i=0;i<360;i++){
		
		context.beginPath();
		context.arc(startX, startY,radio, i-1, i, false);
		context.fillStyle="#cccccc";
		context.stroke();
		
	}
		
}

function pintarCircumferencias(margen){
	
	var radio  		= (canvas.width - margen) / 2 ;
	var startX 		= canvas.width / 2;	var startY 		= canvas.height / 2;

	
	var startX 		= canvas.width / 2;
	var startY 		= canvas.height / 2;
	
	startAngle      = 0;
	endAngle        = Math.PI / 2; 
	
	/*
	for (i=0;i<17;i++){
		
		startX = 0 + Math.cos();
		
		context.beginPath();
		context.arc(startX, startY,radio, i-1, i, false);
		context.fillStyle="#cccccc";
		context.stroke();
		
	}
	*/
	
}

/*
ctx.beginPath();
ctx.moveTo(20,20);           // Create a starting point
ctx.lineTo(100,20);          // Create a horizontal line
ctx.arcTo(150,20,150,70,50); // Create an arc
ctx.lineTo(150,120);         // Continue with vertical line
ctx.stroke();                // Draw it
*/

CircumferenciaConMargen(25);
CircumferenciaSinMargen();
CircumferenciaRellenada(50);
dibujarPrimerArco(60);
pintarCircumferencia(80);
//pintarCircumferencias(100);

/*
var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
FONT_HEIGHT = 15,
MARGIN = 35,
HAND_TRUNCATION = canvas.width / 25,
HOUR_HAND_TRUNCATION = canvas.width / 10,
NUMERAL_SPACING = 20,
RADIUS = canvas.width/2 - MARGIN,
HAND_RADIUS = RADIUS + NUMERAL_SPACING;

console.log("width: "+canvas.width);
console.log("height: "+canvas.height);

// Functions..........................................................
function drawCircle() {
	
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2,RADIUS, 0, Math.PI * 2, true);
	context.stroke();

}

function drawNumerals() {
	
	for (var i=0;i<361;i++){
		
		grado = i/5;
		numeralWidth = context.measureText(i).width;
		context.fillText(i,canvas.width/2 + Math.cos(i)*(HAND_RADIUS) -numeralWidth/2,canvas.height/2 + Math.sin(i)*(HAND_RADIUS) + FONT_HEIGHT/3)
		
	}
	

	
	
	var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
	angle = 0,
	numeralWidth = 0;
	
	numerals.forEach(function(numeral) {
		angle = Math.PI/6 * (numeral-3);
		numeralWidth = context.measureText(numeral).width;
		context.fillText(numeral,canvas.width/2 + Math.cos(angle)*(HAND_RADIUS) -numeralWidth/2,canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3)
	});
	
}	


function drawCenter() {
	
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
	context.fill();
}

function drawHand(loc, isHour) {
	
	var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
		handRadius = isHour ? RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION: RADIUS - HAND_TRUNCATION;
		context.moveTo(canvas.width/2, canvas.height/2);
		context.lineTo(canvas.width/2 + Math.cos(angle)*handRadius,
		canvas.height/2 + Math.sin(angle)*handRadius);
		context.stroke();
}

function drawHands() {
		
		var date = new Date,
		hour = date.getHours();
		hour = hour > 12 ? hour - 12 : hour;
		drawHand(hour*5 + (date.getMinutes()/60)*5, true, 0.5);
		drawHand(date.getMinutes(), false, 0.5);
		drawHand(date.getSeconds(), false, 0.2);
}
	
function drawClock() {
		context.clearRect(0,0,canvas.width,canvas.height);
		drawCircle();
		drawCenter();
		drawHands();
		drawNumerals();
}

	
	
	// Initialization................................................
	context.font = FONT_HEIGHT + 'px Arial';
	loop = setInterval(drawClock, 1000);



var canvas  = document.getElementById('canvas'),
context 	= canvas.getContext('2d');

// Circumferencia
var radio  		= canvas.width / 2 - 50;
var startX 		= canvas.width / 2 - 50;
var startY 		= canvas.height / 2 -50;
var startAngle  = 0;
var endAngle    = Math.PI/2;


context.beginPath();
context.arc(startX,startY,radio,0,endAngle,false);
context.stroke();


context.font="6px Georgia";


// Números
FONT_HEIGHT = 6;

numeros = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];

anguloIncrementar = 360 / numeros.length;


var grados = new Array();


for (var i=0;i<361;i++){
	
	grado = i/5;
	grados[i] = ".";
	context.fillText(grados[i],canvas.width/2 + Math.cos(i)*(radio),canvas.height/2 + Math.sin(i)*(radio),4);
	context.fillText(grado,canvas.width/2 + Math.cos(i)*(radio),canvas.height/2 + Math.sin(i)*(radio),4);
	
}

console.log(grados);
*/











	