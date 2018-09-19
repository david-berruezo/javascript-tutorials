function Gear(config){
	
	this.x 				= config.x;
	this.y 				= config.y;
	this.outerRadius 	= config.outerRadius;
	this.innerRadius 	= config.innerRadius;
	this.holeRadius 	= config.holeRadius;
	this.numTeeth 		= config.numTeeth;
	this.theta 			= config.theta;
	this.thetaSpeed 	= config.thetaSpeed;
	this.lightColor 	= config.lightColor;
	this.darkColor 		= config.darkColor;
	this.clockwise	 	= config.clockwise;
	this.midRadius 		= config.outerRadius - 10;
	
	console.log('Entra aqui');

}

Gear.prototype.draw = function(context){
	
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.theta);
	context.beginPath();
	context.lineJoin = "bevel";
	
	var numPoints = this.numTeeth * 2;
	
	for (var n = 0; n < numPoints; n++) {
		
		var radius = null;
		
		if (n % 2 == 0) {
			
			radius = this.outerRadius;
		
		}else{
			
			radius = this.innerRadius;
		}
		
		var theta = ((Math.PI * 2) / numPoints) * (n + 1);
		var x = (radius * Math.sin(theta));
		var y = (radius * Math.cos(theta));
		
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

