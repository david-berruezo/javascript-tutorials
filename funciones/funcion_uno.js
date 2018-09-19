/*
 * Funciones para cargar una pagina
 *
 */

;(function(window) {
   console.log("cargado");
});

window.onload = function(){
    console.log("Preparados");
}

/*
 *
 */

var sayHello = function(){
   console.log("Hola")
}

window.sayHello();

console.log(window);
window.console.log("Hola que tal");

var message = 'Soy la variable message';
window.console.log(window.message);

