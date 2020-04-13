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
var otra_persona  = new Persona_constructor("Loli","Bernad","23/11/1978");

persona_literal.devolver_persona = function(){
    return this.nombre+" "+this.apellido+" "+this.ano   
}

console.log("------- Mostrar propiedades y metodos -------\n");
for(var propiedad in persona_object){
    console.log("propiedad: "+propiedad);
    console.log("valor: "+persona_object[propiedad]);
}
console.log("------- End -------\n");

// añadimos propiedades al prototipo del objeto
//persona_literal.prototype.ciudad;
//persona_literal.prototype.ciudad = "Barcelona";

// añadimos propiedades al prototipo del objeto
Persona_constructor.prototype.ciudad;
Persona_constructor.prototype.get_persona = function(){
    return this.nombre + " " + this.apellido + " " + this.ano;
}

nueva_persona.ciudad = "Barcelona";
otra_persona.ciudad = "Madrid";

console.log("nueva persona ciudad: "+nueva_persona.ciudad);
console.log("otra persona ciudad: "+otra_persona.ciudad);

console.log("nueva persona get_persona metodo: "+nueva_persona.get_persona());
console.log("otra persona get_persona metodo: "+otra_persona.get_persona());

// objetos
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

var prueba = new Array();
console.log("que tipo es array: "+typeof prueba);

window.onload = function(){
    crear_div();
}

function crear_div(){
    var contenedor = document.createElement("div"); 
    contenedor.style.width  = "100px";
    contenedor.style.height = "100px";
    contenedor.style.top = "10px";
    contenedor.style.backgroundColor = "#ccc";
    document.body.appendChild(contenedor);

    contenedor.onclick = apretar;
    /*
    contenedor.onclick = function(){
        console.log("apretado");
    }
    */
    function apretar(){
        console.log("apretado");
    }
}


