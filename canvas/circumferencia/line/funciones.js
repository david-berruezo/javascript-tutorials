// variables
var canvas       = document.getElementById('canvas'),
context          = canvas.getContext('2d'),
stageHeight      = "";
stageWidth       = "";
radio            = 250;
adjRatio         = ""
oppRatio         = ""
points           = [],
fl               = 250,
vpX              = canvas.width / 2,
vpY              = canvas.height / 2,
angleX           = 0,
angleY           = 0,
angleZ           = 0,
contador_cuadros = 0;
contadorAngulos  = 0;

// Object
function Point3d (x, y, z) {
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
    this.z = (z === undefined) ? 0 : z;
    this.fl = 250;
    this.vpX = 0;
    this.vpY = 0;
    this.cX = 0;
    this.cY = 0;
    this.cZ = 0;
}

Point3d.prototype.setVanishingPoint = function (vpX, vpY) {
    this.vpX = vpX;
    this.vpY = vpY;
};

Point3d.prototype.setCenter = function (cX, cY, cZ) {
    this.cX = cX;
    this.cY = cY;
    this.cZ = cZ;
};

Point3d.prototype.rotateX = function (angleX) {
    y1 = this.y * Math.cos(angleX) - this.z * Math.sin(angleX),
    z1 = this.z * Math.cos(angleX) + this.y * Math.sin(angleX);
    this.y = y1;
    this.z = z1;
};

Point3d.prototype.rotateY = function (angleY) {
    x1 = this.x * Math.cos(angleY) - this.z * Math.sin(angleY),
    z1 = this.z * Math.cos(angleY) + this.x * Math.sin(angleY);
    this.x = x1;
    this.z = z1;
};

Point3d.prototype.rotateZ = function (angleZ) {
    x1 = this.x * Math.cos(angleZ) - this.y * Math.sin(angleZ),
    y1 = this.y * Math.cos(angleZ) + this.x * Math.sin(angleZ);
    this.x = x1;
    this.y = y1;
};

Point3d.prototype.getScreenX = function () {
    var scale = this.fl / (this.fl + this.z + this.cZ);
    return this.vpX + (this.cX + this.x) * scale;
};

Point3d.prototype.getScreenY = function () {
    var scale = this.fl / (this.fl + this.z + this.cZ);
    return this.vpY + (this.cY + this.y) * scale;
};

/*
$(document).ready(function(){
    console.log("estamos ready");
    c            = document.getElementById("canvas");
    ctx          = c.getContext("2d");
    stageHeight  = window.screen.height;
    stageWidth   = window.screen.width;
    crear_circulo();
    function crear_circulo(){
        for (var i=0;i,360;i++){
             if (i%10 == 0){
                 adjRatio = radio * Math.cos(i*(Math.PI/180)); // CAH
                 oppRatio = radio * Math.sin(i*(Math.PI/180)); // SOH
                 ctx.beginPath();
                 ctx.moveTo(0,0);
                 ctx.lineTo(adjRatio,oppRatio);
                 ctx.stroke();
             }
        }
    }
});
*/

window.onload = function () {
    for (var i=0;i,360;i++){
        if (i%10 == 0){
            adjRatio                 = radio * Math.cos(i*(Math.PI/180)); // CAH
            oppRatio                 = radio * Math.sin(i*(Math.PI/180)); // SOH
            points[contador_cuadros] = new Point3d(adjRatio, oppRatio, 100);
            /*
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(adjRatio,oppRatio);
            ctx.stroke();
            */
            contador_cuadros++;
        }
    }

    function crear_linias(){
        for (var i=0;i,360;i++){
            if (i%10 == 0){
                adjRatio = radio * Math.cos(i*(Math.PI/180)); // CAH
                oppRatio = radio * Math.sin(i*(Math.PI/180)); // SOH
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(adjRatio,oppRatio);
                ctx.stroke();
            }
        }
    }

    function move (point) {
        point.rotateX(angleX);
        point.rotateY(angleY);
        point.rotateZ(angleZ);
    }

    (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        var valor = Math.PI;
        if (contadorAngulos < valor){
            angleX = 0;
            angleZ = 0;
            angleY = 0.01;
            contadorAngulos = contadorAngulos + angleY;
        }else{
            angleX = 0;
            angleY = 0;
            angleZ = 0;
        }
        points.forEach(move);
        crearLinias();
        console.log("punto 0 x: "+points[0].getScreenX()+" punto 0 y: "+points[0].getScreenY());
    }());
}