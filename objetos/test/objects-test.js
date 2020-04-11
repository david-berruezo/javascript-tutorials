/*
 * Tipos de objetos
 */

var persona_literal = {
    nombre: "David",
    apellido:"Berruezo",
    ano:"23/11/1978"
}

var valor_propiedad = 'nombre';
var persona_literal_concatenando_valor = {
    [valor_propiedad]:"David",
    apellido:"Berruezo",
    ano:"23/11/1978"
}

var persona_object      = new Object();
persona_object.nombre   = "David";
persona_object.apellido = "Berruezo";
persona_object.ano      = "23/11/1978";

var persona_literal_object = new Object( { nombre: "David",apellido:"Berruezo", ano:"23/11/1978" } );

var Persona_constructor = function(nombre,apellido,ano){
    this.nombre     = nombre,
    this.apellido   = apellido,
    this.ano        = ano
}

var nueva_persona = new Persona_constructor("David","Berruezo","23/11/1978"); 

console.log("------- Objeto literal -------\n");
console.log("nombre: "+persona_literal.nombre);
console.log("apellido: "+persona_literal.apellido);
console.log("ano: "+persona_literal.ano);
console.log("------- End -------\n");

console.log("------- Objeto literal con propiedad -------\n");
console.log("nombre: "+persona_literal_concatenando_valor.nombre);
console.log("apellido: "+persona_literal_concatenando_valor.apellido);
console.log("ano: "+persona_literal_concatenando_valor.ano);
console.log("------- End -------\n");

console.log("------- Persona Object -------\n");
console.log("nombre: "+persona_object.nombre);
console.log("apellido: "+persona_object.apellido);
console.log("ano: "+persona_object.ano);
console.log("------- End -------\n");

console.log("------- Persona Literal Object -------\n");
console.log("nombre: "+persona_literal_object.nombre);
console.log("apellido: "+persona_literal_object.apellido);
console.log("ano: "+persona_literal_object.ano);
console.log("------- End -------\n");

console.log("------- Nueva Persona -------\n");
console.log("nombre: "+nueva_persona.nombre);
console.log("apellido: "+nueva_persona.apellido);
console.log("ano: "+nueva_persona.ano);
console.log("------- End -------\n");