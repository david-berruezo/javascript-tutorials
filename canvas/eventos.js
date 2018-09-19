var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
// Propiedades
var radio  		= canvas.width / 2;
var startX 		= canvas.width / 2;
var startY 		= canvas.height / 2;
var startAngle  = 0;
var endAngle    = 2 * Math.PI;
context.beginPath();
context.arc(startX, startY,radio, startAngle, endAngle, false);
context.stroke();

/*
canvas.onmousedown = function (e) {
// React to the mouse down event
	alert("Pepe");
};

canvas.onmousemove = function (e) {
	var loc = windowToCanvas(canvas, e.clientX, e.clientY);
	console.log(loc);
}

canvas.onclick = function(e){
	alert("Apretado");
}
*/

canvas.onclick = function() {
    alert("Hola");
}

canvas.addEventListener("click",function(){
    alert("Apretado");
},false);

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width), y: y - bbox.top * (canvas.height / bbox.height)};
}