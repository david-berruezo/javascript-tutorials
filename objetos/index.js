// 2.1 Object.keys() + forEach/map
const persona = { nombre: "Juan", edad: 30, ciudad: "Madrid" };

let prueba = Object.keys(persona);
console.log("prueba: "+prueba);

Object.keys(persona).forEach((clave, indice, vector) => {
  console.log(`Clave ${indice}: ${clave} = ${persona[clave]}`);
  console.log(vector);
});

// Transformar claves
const clavesEnMayusculas = Object.keys(persona).map(clave => clave.toUpperCase());
console.log(clavesEnMayusculas); // ["NOMBRE", "EDAD", "CIUDAD"]

// 2.2 Object.entries()
const configuracion = { tema: "oscuro", idioma: "es", notificaciones: true };

Object.entries(configuracion).forEach(([clave, valor], indice) => {
  console.log(`Entrada ${indice}: ${clave} = ${valor}`);
  
  // Modificar valores
  if (typeof valor === "string") {
    configuracion[clave] = valor.toUpperCase();
  }
});

console.log(configuracion);

// 2.3 Object.values()
const puntuaciones = { matematicas: 85, ciencias: 92, historia: 78 };

const promedio = Object.values(puntuaciones).reduce((suma, puntuacion, indice, array) => {
  console.log(`Procesando puntuación ${indice + 1}: ${puntuacion}`);
  return suma + puntuacion;
}, 0) / Object.values(puntuaciones).length;

console.log(`Promedio: ${promedio}`);

// 2.4 Object.fromEntries()


// 7.1 Función helper para procesar objetos
function procesarObjeto(obj, callback) {
    const resultado = {};
    for (const [clave, valor] of Object.entries(obj)) {
      const { nuevaClave, nuevoValor } = callback(clave, valor, obj);
      resultado[nuevaClave || clave] = nuevoValor !== undefined ? nuevoValor : valor;
    }
    
    return resultado;
}
  
const usuario = { firstName: "Juan", lastName: "Pérez", age: 30 };
  
const usuarioTransformado = procesarObjeto(usuario, (clave, valor, objeto) => {
    console.log(`Procesando ${clave}: ${valor}`);
    // Cambiar nombres de claves
    const mapeoClaves = {
      firstName: "nombre",
      lastName: "apellido",
      age: "edad"
    };
    return {
      nuevaClave: mapeoClaves[clave] || clave,
      nuevoValor: typeof valor === "string" ? valor.toUpperCase() : valor
    };
});
  
console.log(usuarioTransformado);
// { nombre: "JUAN", apellido: "PÉREZ", edad: 30 }
