$(document).ready(function(){
	
	
	var canvas = $("#canvas");
	var context = canvas.get(0).getContext("2d");
		
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	var playAnimation = true;
	var startButton = $("#startAnimation");
	var stopButton = $("#stopAnimation");
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
		this.reverseX = false;
		this.reverseY = false;
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
				
				if (tmpShape.x < 0) {
				
					tmpShape.reverseX = false;
				
				} else if (tmpShape.x + tmpShape.width > canvasWidth) {
				
					tmpShape.reverseX = true;
				
				};
				
				if (tmpShape.y < 0) {
				
					tmpShape.reverseY = false;
				
				} else if (tmpShape.y + tmpShape.height > canvasHeight) {
				
					tmpShape.reverseY = true;
				};
				
				if (!tmpShape.reverseX) {
					
					tmpShape.x += 2;
				
				} else {
				
					tmpShape.x -= 2;
				
				};
				
				if (!tmpShape.reverseY) {
					
					tmpShape.y += 2;
			
				} else {
				
					tmpShape.y -= 2;
				
				};
				
				context.fillStyle="#FFffff";
				context.fillRect(tmpShape.x, tmpShape.y, tmpShape.width,tmpShape.height);
			};
			
			if (playAnimation) {
				setTimeout(animate, 33);
			};
			
			//console.log("entra");
			
			
	};
	
		
	//animate();
	
	

});