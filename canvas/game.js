$(document).ready(function() {
	
	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// Canvas dimensions
	
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	// Game settings
	var playGame;
	
	var platformX;
	var platformY;
	var platformOuterRadius;
	var platformInnerRadius;
	
	var ui = $("#gameUI");
	var uiIntro = $("#gameIntro");
	var uiStats = $("#gameStats");
	var uiComplete = $("#gameComplete");
	var uiPlay = $("#gamePlay");
	var uiReset = $(".gameReset");
	var uiRemaining = $("#gameRemaining");
	var uiScore = $(".gameScore");
	
	var asteroids;
	
	var player;
	var playerOriginalX;
	var playerOriginalY;
	
	var Asteroid = function(x, y, radius, mass, friction) {
		
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.mass = mass;
		this.friction = friction;
		this.vX = 0;
		this.vY = 0;
		this.player = false;
	};
	
		
	// Reset and start the game
	function startGame() {
		
		platformX = canvasWidth/2;
		platformY = 150;
		platformOuterRadius = 100;
		platformInnerRadius = 75;
		
		uiScore.html("0");
		uiStats.show();
		
		// Set up initial game settings
		playGame = false;
		
		// Start the animation loop
		animate();
			
		asteroids = new Array();
		
		
		var pRadius = 15;
		var pMass = 10;
		var pFriction = 0.97;
		
		playerOriginalX = canvasWidth/2;
		playerOriginalY = canvasHeight-150;
		
		player = new Asteroid(playerOriginalX, playerOriginalY, pRadius, pMass, pFriction);
		player.player = true;
		asteroids.push(player);
		
		var outerRing = 8; // Asteroids around outer ring
		var ringCount = 3; // Number of rings
		var ringSpacing = (platformInnerRadius/(ringCount-1)); // Distance between each ring
		
		for (var r = 0; r < ringCount; r++) {
			
			var currentRing = 0; // Asteroids around current ring
			var angle = 0; // Angle between each asteroid
			var ringRadius = 0;
			
			// Is this the innermost ring?
			if (r == ringCount-1) {
				currentRing = 1;
			} else {
				currentRing = outerRing-(r*3);
				angle = 360/currentRing;
				ringRadius = platformInnerRadius-(ringSpacing*r);
			};
			
			
			for (var a = 0; a < currentRing; a++) {
				
				var x = 0;
				var y = 0;
				
				// Is this the innermost ring?
				if (r == ringCount-1) {
					x = platformX;
					y = platformY;
				} else {
					x = platformX+(ringRadius*Math.cos((angle*a)*(Math.PI/180)));
					y = platformY+(ringRadius*Math.sin((angle*a)*(Math.PI/180)));
				};
				
				var radius = 10;
				var mass = 5;
				var friction = 0.95;
			
				asteroids.push(new Asteroid(x, y, radius, mass, friction));
			};
			
			uiRemaining.html(asteroids.length-1);
			
		};
		
	};
	
	// Initialize the game environment
	function init() {
		
		uiStats.hide();
		uiComplete.hide();
		
		
		uiPlay.click(function(e) {
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});
		
		uiReset.click(function(e) {
			e.preventDefault();
			uiComplete.hide();
			startGame();
		});
	};
	
	// Animation loop that does all the fun stuff
	function animate() {
		
		// Clear
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		if (playGame) {
			// Run the animation loop again in 33 milliseconds
			setTimeout(animate, 33);
		};
		
		context.fillStyle = "rgb(100, 100, 100)";
		context.beginPath();
		context.arc(platformX, platformY, platformOuterRadius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		
		context.fillStyle = "rgb(255, 255, 255)";
		var asteroidsLength = asteroids.length;
		
		for (var i = 0; i < asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];
			for (var j = i+1; j < asteroidsLength; j++) {
				var tmpAsteroidB = asteroids[j];
			};
			context.beginPath();
			context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2,true);
			context.closePath();
			context.fill();
		};
		
	};
	
	init();
	
});