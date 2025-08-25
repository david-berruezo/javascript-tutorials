const fs = require('fs');

// Ejemplo típico de Node.js
fs.readFile('archivo.txt', 'utf8', (error, data) => {
    if (error) {
        console.log('Error leyendo el archivo:', error.message);
        return;
    }
    console.log('Contenido del archivo:', data);
});


// Simulando busqueda en base de datos
const buscarUsuario = (id, callback) => {
    // Simulamos una operación asíncrona
    setTimeout(() => {
        if (id < 1) {
            // Error: ID inválido
            const error = new Error('ID debe ser mayor que 0');
            callback(error, null);
        } else if (id === 999) {
            // Error: Usuario no encontrado
            const error = new Error('Usuario no encontrado');
            callback(error, null);
        } else {
            // Éxito: devolvemos el usuario
            const usuario = { id: id, nombre: 'Juan', email: 'juan@email.com' };
            callback(null, usuario);
        }
    }, 1000);
};

// Uso con error
buscarUsuario(999, (error, usuario) => {
    if (error) {
        console.log('Error:', error.message);
        return;
    }
    console.log('Usuario encontrado:', usuario);
});

// Uso exitoso
buscarUsuario(5, (error, usuario) => {
    if (error) {
        console.log('Error:', error.message);
        return;
    }
    console.log('Usuario encontrado:', usuario);
});


// Operaion matematica on validacion
const dividir = (a, b, callback) => {
    // Validamos los parámetros
    if (typeof a !== 'number' || typeof b !== 'number') {
        const error = new Error('Los parámetros deben ser números');
        callback(error, null);
        return;
    }
    
    if (b === 0) {
        const error = new Error('No se puede dividir por cero');
        callback(error, null);
        return;
    }
    
    // Operación exitosa
    const resultado = a / b;
    callback(null, resultado);
};

// Probando diferentes casos
dividir(10, 2, (error, resultado) => {
    if (error) {
        console.log('Error:', error.message);
        return;
    }
    console.log('Resultado:', resultado); // 5
});

dividir(10, 0, (error, resultado) => {
    if (error) {
        console.log('Error:', error.message); // No se puede dividir por cero
        return;
    }
    console.log('Resultado:', resultado);
});

// simulando una peticion http
const hacerPeticion = (url, callback) => {
    // Simulamos latencia de red
    setTimeout(() => {
        if (!url || url === '') {
            const error = new Error('URL es requerida');
            callback(error, null);
            return;
        }
        
        if (url.includes('404')) {
            const error = new Error('Página no encontrada');
            callback(error, null);
            return;
        }
        
        // Éxito
        const respuesta = {
            status: 200,
            data: { mensaje: 'Petición exitosa', url: url }
        };
        callback(null, respuesta);
    }, 500);
};

hacerPeticion('https://api.ejemplo.com/usuarios', (error, respuesta) => {
    if (error) {
        console.log('Error en la petición:', error.message);
        return;
    }
    console.log('Respuesta exitosa:', respuesta.data);
});


// Callback con múltiples valores de retorno
const obtenerDatosCompletos = (userId, callback) => {
    setTimeout(() => {
        if (!userId) {
            const error = new Error('User ID requerido');
            callback(error, null, null, null);
            return;
        }
        
        // Éxito: múltiples valores
        const usuario = { id: userId, nombre: 'Ana' };
        const perfil = { bio: 'Desarrolladora', edad: 28 };
        const configuracion = { tema: 'oscuro', idioma: 'es' };
        
        callback(null, usuario, perfil, configuracion);
    }, 800);
};

obtenerDatosCompletos(123, (error, usuario, perfil, config) => {
    if (error) {
        console.log('Error:', error.message);
        return;
    }
    console.log('Usuario:', usuario);
    console.log('Perfil:', perfil);
    console.log('Configuración:', config);
});