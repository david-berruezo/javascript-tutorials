window.onload = function(){
	
	// var
	var anim = new Animation("myCanvas");
	var canvas = anim.getCanvas();
	var context = anim.getContext();
	var linearSpeed = 200; // pixels / second
	
	// Referente al stage
	var stageHeight 	  = window.innerHeight;
	var stageWidth  	  = window.innerWidth;
	
	canvas.width  = stageWidth;
	canvas.height = 400;
	
	var box = {
		x: 0,
		y: canvas.height / 2 - 25,
		width: 100,
		height: 50
	};
	
	anim.setStage(function(){
		
		// update
		var linearDistEachFrame = linearSpeed * this.
		getTimeInterval() / 1000;
		
		if (box.x < canvas.width - box.width) {
			box.x += linearDistEachFrame;
		}else {
			anim.stop();
		}
		
		// clear
		this.clear();
		
		// draw
		context.beginPath();
		context.fillStyle = "blue";
		context.fillRect(box.x, box.y, box.width, box.height);
	
	});
	
	anim.start();

};
	