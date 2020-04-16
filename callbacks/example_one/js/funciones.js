// variables
var allUsers = [];

// Iniciamos JavaScript tradicional
window.onload = function(){
    // Qué es un callback ?
    // El parámetro de la función 'forEach' no es un valor o una variable, sino una function.
    // Cuando una función se pasa por parámetro a otra función se llama 'callback'
    var vector = ["uno","dos",,"tres"];
    vector.forEach(function(element,index){
        console.log("El indice es: "+index);
        console.log("El elemento es: "+element);
    });
};

// Una funcion de logueo genérica
function logStuff(data){
    if ('string' == typeof data) return console.log(data)
    if ('object' == typeof data){
        for (var key in data){
            console.log(key+' '+data[key]);
        }
    }
}

// Una función que recibe dos parámetros: el primero son datos para el vector y el segundo es un callback
function get_input(input,callback){
     allUsers.push(input);   
     callback(input);
}

get_input( {user:'david',speciality:'JavaScript'} ,logStuff );

// Iniciamos JavaScript con jQuery
$(function(){
    // Qué es un callback ?
    // El parámetro de la función 'click' no es un valor o una variable, sino una function.
    // Cuando una función se pasa por parámetro a otra función se llama 'callback'
    $('#button_1').click(function(){
        console.log('Esto es una callback');
    });
    
})