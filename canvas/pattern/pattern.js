// pattern fill (right)
var imageObj 	= new Image();
var canvas 		= document.getElementById('canvas'),
context 		= canvas.getContext('2d');


imageObj.onload = function(){
	
	//var pattern = context.createPattern(imageObj, "repeat");
	//context.fillRect(0,0,canvas.width,canvas.height);
	
	var pat=context.createPattern(imageObj,"repeat");
	context.rect(0,0,200,200);
	context.fillStyle=pat;
	context.fill();
	
};

imageObj.src = "carbon4.jpg";
