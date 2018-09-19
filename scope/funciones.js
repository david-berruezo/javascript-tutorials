/**
 * Created by david on 24/11/17.
 */
var variable1 = "valor por defecto";
function funcion1() {
    var variable1 = "David";
    variable2 = "Berruezo";
}

function funcion2() {
    console.log("variable1: "+variable1);
    console.log("variable2: "+variable2);
    console.log("variable1: "+this.variable1);
}

function principal(){
    var variable3 = "principal";
    anidada();
    function anidada(){
        console.log("variable3 principal: "+variable3);
    }
}


window.onload = function(){
    console.log("pagina cargada");
    funcion1();
    funcion2();
    principal();
}