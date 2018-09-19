/**
 * Created by David on 25/03/2016.
 */
$(document).ready(function(){
    var ctx = $("canvas").get(0).getContext("2d");

    var point = function(x, y, z) {
        return {
            x: x,
            y: y,
            z: z
        };
    };

    // Proyectar cubo
    var project = function(p) {
        return {
            x: p.x + p.z,
            y: p.y - p.z,
            z: p.z
        };
    };

    var a = -100,b=100;
    //var a = 50, b = 100, c = 0, d = 200, e = 250, f = 50;
    /*
    -100,-100,-100,
    -100,-100,100,
    -100,100,-100,
    -100,100,100,
    100,-100,-100,
    100,-100,100,
    100,100,-100,
    100,100,100
    */

    /*
    var points = [
        point(a, b, c),
        point(d, b, c),
        point(d, e, c),
        point(a, e, c),

        point(a, b, f),
        point(d, b, f),
        point(d, e, f),
        point(a, e, f)
    ].map(project);
    */

    var points = [
        point(a, a, a),
        point(a, a, b),
        point(a, b, a),
        point(a, b, b),
        point(b, a, a),
        point(b, b, a),
        point(b, b, b),
    ];

    var lines = [
        [0, 1], [1, 2], [2, 3], [3, 0],  // bottom plane lines
        [4, 5], [5, 6], [6, 7], [7, 4],  // top plane lines
        [0, 4], [1, 5], [2, 6], [3, 7]   // vertical lines
    ];

    var focal = 350;
    var contador = 0.01;
    var distZ =  350;

    function projection(p, focal)
    {
        // Keep the original Z
        return [focal * p[0] / p[2], focal * p[1] / p[2], p[2]];
    }
    function rotateX(p, a)
    {
        var d = Math.sqrt(p[2] * p[2] + p[1] * p[1]),na = Math.atan2(p[1], p[2]) + a;
        return [p[0], d * Math.sin(na), d * Math.cos(na)];
    }
    function rotateY(p, a)
    {
        var d = Math.sqrt(p[2] * p[2] + p[0] * p[0]), na = Math.atan2(p[2], p[0]) + a;
        return [d * Math.cos(na), p[1], d * Math.sin(na)];
    }

    function loop()
    {
        requestAnimationFrame(loop);
        ctx.clearRect(ctx.width , ctx.height, ctx.width, ctx.height);

        /*
        for(i=0;i<points.length;i++){
           var vector = new Array(points[i].x , points[i].y , points[i].z);
           //console.log("Vector: "+vector);
           var p = rotateX(rotateY(vector, contador), contador);
            //console.log("points primero: "+p);
           p[2] += distZ;
            p = projection(p, focal);
            //console.log("p: "+p);
            points[i].x = p[0];
            points[i].y = p[1];
            points[i].z = p[2];
            //points[i] = p;
            //console.log("points1: "+p);
        }
        */

        lines.forEach(function(pair) {
            var p = points[ pair[0] ];
            var q = points[ pair[1] ];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
        });
        ctx.stroke();
        ctx.restore();
        ctx.save();
        //console.log("Hola");
        contador = contador + 0.001;
    }
    requestAnimationFrame(loop);
});


