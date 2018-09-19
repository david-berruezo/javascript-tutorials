/**
 * Created by David on 01/05/2016.
 */
/**
 A JavaScript implementation of the gif found here: http://gif.flrn.nl/post/115418736082
 */

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var rad = function(deg) {
    return (deg * (Math.PI / 180));
};

var pointOnCircle = function(x, y, radius, point) {
    var xr = (x + (radius * Math.cos(rad(point))));
    var yr = (y + (radius * Math.sin(rad(point))));

    return {
        x: xr,
        y: yr
    };
};

Math.Tau = (Math.PI * 2);

var DOT_RADIUS = 4;
var DottedRotatingRing = function(ctx, x, y, radius, dots, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.style = color;
    this.speed = speed;
    this.offset = 0;
    this.ctx = ctx;
    this.dots = dots;
};

DottedRotatingRing.prototype.step = function() {
    this.offset = ((this.offset + this.speed) % 360);
};

DottedRotatingRing.prototype.render = function() {
    this.ctx.fillStyle = this.style;
    var points = [];
    var step = (360 / this.dots);
    for (var i = 0; i < this.dots; i++) {
        var point = pointOnCircle(this.x, this.y, this.radius, this.offset + (i * step));
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, DOT_RADIUS, 0, Math.Tau, false);
        this.ctx.fill();
        this.ctx.closePath();
    }
};

var colors = ['#1674bc', '#00a496', '#82c640', '#f6b62e', '#ee5b35', '#eb225f', '#c22286', '#612e8d'];
var cbDots = [4, 8, 12, 16, 20, 24, 28, 32];
var initialRadius = 15;
var spacingRadius = 15;
var initialSpeed = 5;
var speedStep = 0.5;
$(function() {
    var canvas = document.getElementById('animation');
    var context = canvas.getContext('2d');
    var cx = 200;
    var cy = 200;
    var rings = [];
    var radius = initialRadius;
    var speed = initialSpeed;
    for (var i in cbDots) {
        rings.push(new DottedRotatingRing(context, cx, cy, radius, cbDots[i], colors[i], speed));
        radius += spacingRadius;
        speed -= speedStep;
    }

    // animate those rings!!
    var anim = function anim() {
        requestAnimFrame(anim);

        context.clearRect(0, 0, 400, 400);
        for (var i in rings) rings[i].step(); // step all before render all ;)
        for (var i in rings) rings[i].render();
    };
    anim();
});