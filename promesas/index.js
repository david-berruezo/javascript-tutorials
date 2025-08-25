// Crear una promesa
const miPromesa = new Promise((resolve, reject) => {
    // Operación asíncrona
    const exito = true;
    //const exito = false;
    if (exito) {
        resolve("Operación exitosa"); // Resuelve la promesa
    } else {
        reject("Algo salió mal"); // Rechaza la promesa
    }
});

// Consumir la promesa
miPromesa
    .then(resultado => console.log(resultado))
    .catch(error => console.log("Error:", error));


// Callback tradicional (del ejemplo anterior)
const buscarUsuarioCallback = (id, callback) => {
    setTimeout(() => {
        if (id < 1) {
            callback(new Error('ID inválido'), null);
        } else {
            callback(null, { id: id, nombre: 'Juan' });
        }
    }, 1000);
};

// Versión con promesas
const buscarUsuarioPromise = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id < 1) {
                reject(new Error('ID inválido'));
            } else {
                resolve({ id: id, nombre: 'Juan' });
            }
        }, 1000);
    });
};

// Uso
buscarUsuarioPromise(5)
    .then(usuario => {
        console.log('Usuario encontrado:', usuario);
    })
    .catch(error => {
        console.log('Error:', error.message);
    });    


const obtenerUsuario = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id: id, nombre: 'Ana', empresaId: 100 });
            } else {
                reject(new Error('ID inválido'));
            }
        }, 500);
    });
};

const obtenerNota = (nota) => {
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            if (nota >= 5){
                resolve({"mensaje":"aprobado","resultado":"ok"});
            }else{
                reject({"mensaje":"suspendido","resultado":"no ok"});
            }
        },1000)
    }); 
};


const obtenerEmpresa = (empresaId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: empresaId, nombre: 'TechCorp', ubicacion: 'Madrid' });
        }, 300);
    });
};

const obtenerProyectos = (empresaId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, nombre: 'Proyecto A' },
                { id: 2, nombre: 'Proyecto B' }
            ]);
        }, 400);
    });
};

obtenerNota(6)
    .then((resultado) => {
        console.log("El resultado ha sido positivo: "+resultado.mensaje+" resultado: "+resultado.resultado);
    })
    .catch((resultado) => {
        console.log("El resultado ha sido negativo: "+resultado.mensaje+" resultado: "+resultado.resultado);
    });

obtenerNota(4)
  .then((resultado) => {
      console.log("El resultado ha sido positivo: "+resultado.mensaje+" resultado: "+resultado.resultado);
  })
  .catch((resultado) => {
      console.log("El resultado ha sido negativo: "+resultado.mensaje+" resultado: "+resultado.resultado);
  });

// Encadenamiento
obtenerUsuario(1)
    .then(usuario => {
        console.log('Usuario:', usuario);
        return obtenerEmpresa(usuario.empresaId);
    })
    .then(empresa => {
        console.log('Empresa:', empresa);
        return obtenerProyectos(empresa.id);
    })
    .then(proyectos => {
        console.log('Proyectos:', proyectos);
    })
    .catch(error => {
        console.log('Error en algún punto:', error.message);
    });    

// Promise.all() - Operaciones en paralelo
const obtenerDatosParalelos = () => {
    const promesa1 = new Promise(resolve => {
        setTimeout(() => resolve('Datos de API 1'), 1000);
    });
    
    const promesa2 = new Promise(resolve => {
        setTimeout(() => resolve('Datos de API 2'), 1500);
    });
    
    const promesa3 = new Promise(resolve => {
        setTimeout(() => resolve('Datos de API 3'), 800);
    });
    
    // Ejecuta todas en paralelo, espera a que todas terminen
    return Promise.all([promesa1, promesa2, promesa3]);
};


obtenerDatosParalelos()
    .then(resultados => {
        console.log('Todos los resultados:', resultados);
        // ['Datos de API 1', 'Datos de API 2', 'Datos de API 3']
    })
    .catch(error => {
        console.log('Error en alguna promesa:', error);
    });    

// Promise.race() - La primera que termine    
const carreraDePromesas = () => {
    const promesaRapida = new Promise(resolve => {
        setTimeout(() => resolve('¡Soy la más rápida!'), 500);
    });
    
    const promesaLenta = new Promise(resolve => {
        setTimeout(() => resolve('Soy lenta...'), 2000);
    });
    
    const promesaMedia = new Promise(resolve => {
        setTimeout(() => resolve('Velocidad media'), 1000);
    });
    
    return Promise.race([promesaRapida, promesaLenta, promesaMedia]);
};

carreraDePromesas()
    .then(ganador => {
        console.log('El ganador es:', ganador); // ¡Soy la más rápida!
    });

// Manejo de errores avanzado
const operacionCompleja = (paso) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (paso === 1) {
                resolve('Paso 1 completado');
            } else if (paso === 2) {
                resolve('Paso 2 completado');
            } else if (paso === 3) {
                reject(new Error('Error en paso 3'));
            } else {
                resolve('Paso desconocido completado');
            }
        }, 500);
    });
};

// Manejo de errores específicos
operacionCompleja(1)
    .then(resultado => {
        console.log(resultado);
        return operacionCompleja(2);
    })
    .then(resultado => {
        console.log(resultado);
        return operacionCompleja(3); // Este fallará
    })
    .then(resultado => {
        console.log(resultado); // No se ejecutará
    })
    .catch(error => {
        console.log('Se capturó el error:', error.message);
        // Podemos continuar la cadena después del catch
        return 'Recuperación exitosa';
    })
    .then(resultado => {
        console.log('Continuamos después del error:', resultado);
    });


    // finally
    const operacionConLimpieza = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const exito = Math.random() > 0.5;
                if (exito) {
                    resolve('Operación exitosa');
                } else {
                    reject(new Error('Operación falló'));
                }
            }, 1000);
        });
    };
    
    operacionConLimpieza()
        .then(resultado => {
            console.log('Éxito:', resultado);
        })
        .catch(error => {
            console.log('Error:', error.message);
        })
        .finally(() => {
            console.log('Limpieza: cerrando conexiones, liberando recursos...');
            // Este bloque SIEMPRE se ejecuta
        });    

// Las mismas promesas, pero con async/await
const procesarDatosAsync = async () => {
    try {
        console.log('Iniciando proceso...');
        
        const usuario = await obtenerUsuario(1);
        console.log('Usuario obtenido:', usuario);
        
        const empresa = await obtenerEmpresa(usuario.empresaId);
        console.log('Empresa obtenida:', empresa);
        
        const proyectos = await obtenerProyectos(empresa.id);
        console.log('Proyectos obtenidos:', proyectos);
        
        return {
            usuario,
            empresa,
            proyectos
        };
        
    } catch (error) {
        console.log('Error durante el proceso:', error.message);
        throw error; // Re-lanza el error si es necesario
    }
};

// Uso de la función async
procesarDatosAsync()
    .then(resultado => {
        console.log('Proceso completado:', resultado);
    })
    .catch(error => {
        console.log('Error final:', error.message);
    });        

    
// Ejemplo práctico: Sistema de autenticación
const autenticarUsuario = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email || !password) {
                reject(new Error('Email y password requeridos'));
                return;
            }
            
            if (email === 'admin@test.com' && password === '123456') {
                resolve({
                    token: 'abc123xyz',
                    usuario: { id: 1, email: email, rol: 'admin' }
                });
            } else {
                reject(new Error('Credenciales inválidas'));
            }
        }, 1000);
    });
};

const obtenerPerfilUsuario = (token) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token === 'abc123xyz') {
                resolve({
                    nombre: 'Admin User',
                    permisos: ['leer', 'escribir', 'eliminar']
                });
            } else {
                reject(new Error('Token inválido'));
            }
        }, 500);
    });
};

// Flujo completo de autenticación
const loginCompleto = async (email, password) => {
    try {
        console.log('Autenticando...');
        const auth = await autenticarUsuario(email, password);
        
        console.log('Obteniendo perfil...');
        const perfil = await obtenerPerfilUsuario(auth.token);
        
        return {
            ...auth.usuario,
            ...perfil,
            token: auth.token
        };
        
    } catch (error) {
        console.log('Error de login:', error.message);
        throw error;
    }
};

// Uso
loginCompleto('admin@test.com', '123456')
    .then(usuario => {
        console.log('Login exitoso:', usuario);
    })
    .catch(error => {
        console.log('Login falló:', error.message);
    });

// async / await
// primero una promesa 
const obtenerSaludo = (numero) => {
    return new Promise((resolve,reject) =>{
        if (numero == 1){
            resolve("Hola");
        }else if(numero == 0){
            reject("Adios");
        }
    });
}

const obtenerSaludoRetrasado = (numero) => {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            if (numero == 1){
                resolve("Hola");
            }else if(numero == 0){
                reject("Adios");
            }
        }),100;
    });
}

let promesa = obtenerSaludo(1);
promesa.then((result) => console.log("valor correcto: "+result));
console.log(promesa);

let promesa_dos = obtenerSaludo(0);
promesa_dos.catch((result) => console.log("valor incorrecto: "+result));
console.log(promesa_dos);

let promesa_retrasado = obtenerSaludoRetrasado(1);
promesa_retrasado.then((result) => console.log("valor correcto retrasado: "+result));
console.log(promesa_retrasado);

let promesa_dos_retrasado = obtenerSaludoRetrasado(0);
promesa_dos_retrasado.catch((result) => console.log("valor incorrecto  retrasado: "+result));
console.log(promesa_dos_retrasado);


// Función normal
function funcionNormal() {
    return "Hola";
}

// primero async

// Función async - SIEMPRE retorna una promesa
async function funcionAsync() {
    return "Hola"; // Automáticamente se envuelve en Promise.resolve()
}

console.log(funcionNormal()); // "Hola"
console.log(funcionAsync());  // Promise { "Hola" }

// Para obtener el valor necesitamos .then() o await
funcionAsync().then(resultado => console.log(resultado)); // "Hola" 

// await
// await SOLO puede usarse dentro de funciones async
async function ejemploBasico() {
    // Simulamos una promesa
    const promesa = new Promise(resolve => {
        setTimeout(() => resolve("Datos obtenidos"), 3000);
    });
    
    // await pausa la ejecución hasta que la promesa se resuelva
    const resultado = await promesa;
    console.log(resultado); // "Datos obtenidos" (después de 1 segundo)
    
    return resultado;
}

ejemploBasico();

// Comparación: Promesas vs Async/Await
// Con promesas tradicionales
function obtenerDatosPromise() {
    return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(user => {
            console.log('Usuario fetch: ', user.name);
            return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        })
        .then(response => response.json())
        .then(posts => {
            console.log('Posts fetch: ', posts.length);
            return posts;
        })
        .catch(error => {
            console.log('Error fetch: ', error);
        });
}

// Con async/await - ¡Mucho más legible!
async function obtenerDatosAsync() {
    try {   
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json();
        console.log('Usuario async fetch: ', user.name);
        
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        const posts = await postsResponse.json();
        console.log('Posts async fetch: ', posts.length);
        
        return posts;
    } catch (error) {
        console.log('Error fetch: ', error);
    }
}

obtenerDatosPromise();
obtenerDatosAsync();

// 4. Manejo de errores con try/catch

// Función que puede fallar
const operacionRiesgosa = (exito) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (exito) {
                resolve("Operación exitosa");
            } else {
                reject(new Error("Algo salió mal"));
            }
        }, 1000);
    });
};

async function manejarErrores() {
    try {
        console.log("Intentando operación...");
        const resultado = await operacionRiesgosa(true);
        console.log("Éxito:", resultado);
        
        // Esta operación fallará
        const fallo = await operacionRiesgosa(false);
        console.log("Esto no se ejecutará");
        
    } catch (error) {
        console.log("Error capturado:", error.message);
    }
    console.log("Función terminada");
}

manejarErrores();

// Simulamos APIs lentas
const consultarAPI1 = () => new Promise(resolve => 
    setTimeout(() => resolve("Datos API 1"), 1000)
);

const consultarAPI2 = () => new Promise(resolve => 
    setTimeout(() => resolve("Datos API 2"), 1500)
);

const consultarAPI3 = () => new Promise(resolve => 
    setTimeout(() => resolve("Datos API 3"), 800)
);

const consultarAPI4 = () => {
    return new Promise((resolve) => {
        resolve("Datos API 4")
    }); 
};

const consultarAPI5 = () => {
    return Promise.resolve("Función promise resolve sin new");
};

const consultarAPI6 = () => {
    return Promise.reject("Función promise reject sin new");
};

let resultado_api5 = consultarAPI5();
console.log(resultado_api5);
resultado_api5.then((resultado) =>{
    console.log("el resultado es: "+resultado);
})
.catch((resultado) =>{
    console.log("el resultado erroneo es: "+resultado);
})

let resultado_api6 = consultarAPI6();
console.log(resultado_api6);
resultado_api6.catch((resultado) =>{
    console.log("el resultado es: "+resultado);
});

// ❌ SECUENCIAL - Toma ~3.3 segundos
async function operacionesSecuenciales() {
    
    console.time("Secuencial");
    
    const resultado1 = await consultarAPI1(); // Espera 1s
    const resultado2 = await consultarAPI2(); // Espera 1.5s más
    const resultado3 = await consultarAPI3(); // Espera 0.8s más
    
    let objeto_promise = consultarAPI4();
    console.log(objeto_promise);
    console.log("llamada directa a funcion: "+consultarAPI4());
    console.log("otra llamada: "+consultarAPI4());
    console.log("resultado1 vale: "+resultado1);
    console.timeEnd("Secuencial");

    return [resultado1, resultado2, resultado3];
}


// ✅ PARALELO - Toma ~1.5 segundos (el más lento)
async function operacionesParalelas() {
    console.time("Paralelo");
    
    // Iniciamos todas las operaciones al mismo tiempo
    const promesa1 = consultarAPI1();
    const promesa2 = consultarAPI2();
    const promesa3 = consultarAPI3();
    
    // Esperamos a que todas terminen
    const resultado1 = await promesa1;
    const resultado2 = await promesa2;
    const resultado3 = await promesa3;
    
    console.timeEnd("Paralelo");
    return [resultado1, resultado2, resultado3];
}

// ✅ PARALELO con Promise.all() - Más elegante
async function operacionesParalelasElegante() {
    console.time("Paralelo elegante");
    
    const resultados = await Promise.all([
        consultarAPI1(),
        consultarAPI2(),
        consultarAPI3()
    ]);
    
    console.timeEnd("Paralelo elegante");
    return resultados;
}

// Prueba las tres versiones
operacionesSecuenciales().then(console.log);
operacionesParalelas().then(console.log);
operacionesParalelasElegante().then(console.log);


// Función async normal
async function funcionAsync() {
    return await Promise.resolve("Función normal");
}

// Arrow function async
const arrowAsync = async () => {
    return await Promise.resolve("Arrow function");
};

// Método async en un objeto
const objeto = {
    async metodoAsync() {
        return await Promise.resolve("Método de objeto");
    }
};

// Método async en una clase
class MiClase {
    async metodoAsync() {
        return await Promise.resolve("Método de clase");
    }
    
    static async metodoEstatico() {
        return await Promise.resolve("Método estático");
    }
}

// Uso
async function probarTodos() {
    console.log(await funcionAsync());
    console.log(await arrowAsync());
    console.log(await objeto.metodoAsync());
    
    const instancia = new MiClase();
    console.log(await instancia.metodoAsync());
    console.log(await MiClase.metodoEstatico());
}

probarTodos();