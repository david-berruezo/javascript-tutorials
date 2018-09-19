var canvas  = "";
var context = "";

window.onload = function(){

	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');
	
	/*
	var image = new Image();
		image.src = "01.jpg";
		$(image).load(function() {
		context.drawImage(image, 0, 0, 800, 356, 0, 0, 500, 500);
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var pixels = imageData.data;
		context.clearRect(0, 0, canvas.width, canvas.height);
		var numTileRows = 20;
		var numTileCols = 20;
		var tileWidth = imageData.width/numTileCols;
		var tileHeight = imageData.height/numTileRows;
	for (var r = 0; r < numTileRows; r++) {
		
		for (var c = 0; c < numTileCols; c++) {
		
			var x = (c*tileWidth)+(tileWidth/2);
			var y = (r*tileHeight)+(tileHeight/2);
			var pos = (Math.floor(y)*(imageData.width*4))+(Math.floor(x)*4);
			
			var red = pixels[pos];
			var green = pixels[pos+1];
			var blue = pixels[pos+2];
			context.fillStyle = "rgb("+red+", "+green+", "+blue+")";
			//context.fillRect(x-(tileWidth/2), y-(tileHeight/2), tileWidth, tileHeight);
			
			context.beginPath();
			context.arc(x, y, tileWidth/2, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
			
			
		};
	};
	
	});
	*/
};
	
