window.onload = function(){
	
	// var
	var anim    = new Animation('canvas');
	var canvas  = anim.getCanvas();
	var context = anim.getContext();
	var gears   = [];
	
	
	// add blue gear
	gears.push(new Gear({
		x: 270,
		y: 105,
		outerRadius: 90,
		innerRadius: 50,
		holeRadius: 10,
		numTeeth: 24,
		theta: 0,
		thetaSpeed: 1 / 1000,
		lightColor: "#B1CCFF",
		darkColor: "#3959CC",
		clockwise: false
	
	
	}));
	
	// add red gear
	gears.push(new Gear({
		
		x: 372,
		y: 190,
		outerRadius: 50,
		innerRadius: 15,
		holeRadius: 10,
		numTeeth: 12,
		theta: 0.14,
		thetaSpeed: 2 / 1000,
		lightColor: "#FF9E9D",
		darkColor: "#AD0825",
		clockwise: true
	
	}));
	
	// add orange gear
	gears.push(new Gear({
		
		x: 422,
		y: 142,
		outerRadius: 28,
		innerRadius: 5,
		holeRadius: 7,
		numTeeth: 6,
		theta: 0.35,
		thetaSpeed: 4 / 1000,
		lightColor: "#FFDD87",
		darkColor: "#D25D00",
		clockwise: false
	
	}));
	
	anim.setStage(function(){
		
		// update
		for (var i = 0; i < gears.length; i++) {
			
			var gear = gears[i];
			var thetaIncrement = gear.thetaSpeed * this.
			getTimeInterval();
			gear.theta += gear.clockwise ? thetaIncrement: -1 * thetaIncrement;
		
		}
		
		// clear
		this.clear();
		
		// draw
		for (var i = 0; i < gears.length; i++) {
			gears[i].draw(context);
		}
		
		
		
	});
	
	anim.start();
	
	
};