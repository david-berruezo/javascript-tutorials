// 8.1 Promise.all() con map
const urls = [
    "https://api.ejemplo1.com",
    "https://api.ejemplo2.com",
    "https://api.ejemplo3.com"
  ];
  
  async function procesarURLs() {
    try {
      const promesas = urls.map(async (url, indice) => {
        console.log(`Procesando URL ${indice + 1}: ${url}`);
        
        // Simular petición HTTP
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ url, datos: `Datos de ${url}`, indice });
          }, Math.random() * 2000);
        });
      });
      
      const resultados = await Promise.all(promesas);
      console.log("Todos los resultados:", resultados);
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  procesarURLs();