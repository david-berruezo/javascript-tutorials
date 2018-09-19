var Objeto;

window.onload = function(){
    Objeto = new Objeto();
    Objeto.pintar();
};

/*
function Graph(config) {
    // user defined properties
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = '#aaa';
    this.font = '8pt Calibri';
    this.tickSize = 20;

    // relationships
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minX) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;

    // draw x and y axis
    this.drawXAxis();
    this.drawYAxis();
}

Graph.prototype.drawXAxis = function() {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.lineTo(this.canvas.width, this.centerY);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    var xPosIncrement = this.unitsPerTick * this.unitX;
    var xPos, unit;
    context.font = this.font;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // draw left tick marks
    xPos = this.centerX - xPosIncrement;
    unit = -1 * this.unitsPerTick;
    while(xPos > 0) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit -= this.unitsPerTick;
        xPos = Math.round(xPos - xPosIncrement);
    }

    // draw right tick marks
    xPos = this.centerX + xPosIncrement;
    unit = this.unitsPerTick;
    while(xPos < this.canvas.width) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit += this.unitsPerTick;
        xPos = Math.round(xPos + xPosIncrement);
    }
    context.restore();
};

Graph.prototype.drawYAxis = function() {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.canvas.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    var yPosIncrement = this.unitsPerTick * this.unitY;
    var yPos, unit;
    context.font = this.font;
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    // draw top tick marks
    yPos = this.centerY - yPosIncrement;
    unit = this.unitsPerTick;
    while(yPos > 0) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit += this.unitsPerTick;
        yPos = Math.round(yPos - yPosIncrement);
    }

    // draw bottom tick marks
    yPos = this.centerY + yPosIncrement;
    unit = -1 * this.unitsPerTick;
    while(yPos < this.canvas.height) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit -= this.unitsPerTick;
        yPos = Math.round(yPos + yPosIncrement);
    }
    context.restore();
};

Graph.prototype.drawEquation = function(equation, color, thickness) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();

    context.beginPath();
    context.moveTo(this.minX, equation(this.minX));

    for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
};
*/

/*
Graph.prototype.transformContext = function() {
    var context = this.context;
    this.context.translate(this.centerX, this.centerY);
    context.scale(this.scaleX, -this.scaleY);
};
*/

/*
var myGraph = new Graph({
    canvasId: 'myCanvas',
    minX: -10,
    minY: -10,
    maxX: 10,
    maxY: 10,
    unitsPerTick: 1
});

myGraph.drawEquation(function(x) {
    return 5 * Math.sin(x);
}, 'green', 3);

myGraph.drawEquation(function(x) {
    return x * x;
}, 'blue', 3);

myGraph.drawEquation(function(x) {
    return 1 * x;
}, 'red', 3);
*/

function Objeto(){
    // var
    this.stage_width     = window.innerWidth;
    this.stage_height    = window.innerHeight;
    this.canvas          = document.getElementById("myCanvas");
    this.canvas.width    = this.stage_width+"px";
    this.canvas.height   = this.stage_height+"px";
    this.canvas.setAttribute("width",this.stage_width+"px");
    this.canvas.setAttribute("height",this.stage_height+"px");
    this.ctx             = this.canvas.getContext('2d');
}

Objeto.prototype.pintar = function(){

    for ( i = 0; i < this.stage_width; i += 1 ) {
        // Recta de prueba
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(0, this.stage_height);
        this.ctx.lineTo(this.stage_width, 0);
        this.ctx.globalAlpha=0.5;// opacity at 0.5
        this.ctx.stroke();
        this.ctx.save();
        // Ejes X e Y
        // X
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(0, this.stage_height/2);
        this.ctx.lineTo(this.stage_width, this.stage_height/2);
        this.ctx.globalAlpha=0.5;// opacity at 0.5
        this.ctx.stroke();
        this.ctx.save();
        // Y
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(10, this.stage_height);
        this.ctx.globalAlpha=0.5;// opacity at 0.5
        this.ctx.stroke();
        this.ctx.save();
        // Linias grandes
        if (i % 40 == 0){
            // vertical
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.stage_height);
            this.ctx.stroke();
            // horizontal
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.stage_width, i);
            this.ctx.globalAlpha=1;// opacity at 0.5
            this.ctx.stroke();
        }
        // Linias pekes
        if (i % 10 == 0){
            // vertical
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.stage_height);
            this.ctx.stroke();
            // horizontal
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.stage_width, i);
            this.ctx.globalAlpha=1;// opacity at 0.5
            this.ctx.stroke();
        }
    }
    this.ctx.save();
}

Objeto.prototype.limpiar = function(){
    this.ctx.clearRect(0,0,this.stage_width,this.stage_height);
    this.stage_width     = window.innerWidth;
    this.stage_height    = window.innerHeight;
    this.canvas.width    = this.stage_width+"px";
    this.canvas.height   = this.stage_height+"px";
    this.canvas.setAttribute("width",this.stage_width+"px");
    this.canvas.setAttribute("height",this.stage_height+"px");
    Objeto.pintar();
}

window.onresize = function(){
    Objeto.limpiar();
}