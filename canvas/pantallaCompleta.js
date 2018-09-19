$(document).ready(function(){
	var stageWidth  = window.innerWidth;
	var stageHeight = window.innerHeight;
	var canvas 		= document.getElementById('canvas');
	var context 	= canvas.getContext('2d');
	canvas.width	= stageWidth;
	canvas.height   = stageHeight;
	$(window).resize(resizeCanvas);
	function resizeCanvas() {
		$(canvas).attr("width", $(window).get(0).innerWidth);
		$(canvas).attr("height", $(window).get(0).innerHeight);
		$(canvas).css('width','100%');
		$(canvas).css('height','100%');
		context.fillRect(0, 0, canvas.width, canvas.height);
	};
	resizeCanvas();
});