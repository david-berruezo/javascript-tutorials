window.onload=function(){
	
	// Carga de imagenes método normal
	
	// Blob
	var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) || (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) || window.createObjectURL;
	var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) || window.revokeObjectURL;
	
	// variables
	var url 	= 'http://www.davidberruezo.com/foto1.jpg';
	var objeto  =  document.getElementById('myAnchor');
	var objeto2 = document.getElementById('myAnchor2');
	var loading = document.getElementById('loading');  
	loading.style.display = 'none';
	
	console.log('Pagina cargada');
	
	// Carga método tradicional
	objeto.addEventListener('click',cargarImagen);
	
	// Carga método ajax con parametros
	objeto2.addEventListener('click',function(){
		
		console.log('click');
		cargarImagenAjax(url,funcionCargada);
		
	},false);
	
	// Ejemplo 1 carga
	function cargarImagen(){
		
		loading.style.display = 'block';
		
		var image = new Image();
		image.onload = function(){ // always fires the event.
		    // ...
			loading.style.display = 'none';
		};
		
		// handle failure
		image.onerror = function(){

		};
		
		image.src = url;
		var contenedor = document.getElementById('contenedorImagen');
		contenedor.appendChild(image);
		
		
	}
	
	// Ejemplo 2 carga Ajax
	function cargarImagenAjax(url, callback) {

		loading.style.display = 'block';
		
		console.log('Hola');
		
		var request = new XMLHttpRequest(); // Create new request
		request.open("GET", url); // Specify URL to fetch
		request.responseType = "blob"
		
		loading.style.display = "block";	
		
		request.onload = function() { // onload is easier than onreadystatechange
			
			var miImagen = document.getElementById('imagen');
			miImagen.src = getBlobURL(url);
			//img.src = ;
			
			/*
			var bb = new BlobBuilder();
			// Append a string to the blob, and mark the end of the string with a NUL char
			bb.append("This blob contains this text and 10 big-endian 32-bit signed ints.");
			bb.append("\0"); // NUL-terminate the string to mark its end
			// Store some data into an ArrayBuffer
			var ab = new ArrayBuffer(4*10);
			var dv = new DataView(ab);
			for(var i = 0; i < 10; i++) dv.setInt32(i*4,i);
			
				// Append the ArrayBuffer to the Blob
				bb.append(ab);
				// Now get the blob from the builder, specifying a made-up MIME type
				var blob = bb.getBlob("x-optional/mime-type-here");
			
			*/
			//callback(request.response); // Pass the blob to our callback
		
		} // Note .response, not .responseText
		
		request.send(null);
		
		/*
		request.onreadystatechange = function() { // Define event listener

			//If the request is compete and was successful
			if (request.readyState === 4 && request.status === 200) {
				var type = request.getResponseHeader("Content-Type");
				if (type.match(/^text/)) // Make sure response is text
					callback(request.responseText); // Pass it to callback
				}
			};

			request.send(null); // Send the request now
		*/

	}
	
	function cargarImagenAjax2(url,callback){
		
		var oReq = new XMLHttpRequest();
		oReq.open("GET", url, true);
		oReq.responseType = "arraybuffer";

		oReq.onload = function (oEvent) {
		  var arrayBuffer = oReq.response; // Note: not oReq.responseText
		  if (arrayBuffer) {
		    var byteArray = new Uint8Array(arrayBuffer);
		    for (var i = 0; i < byteArray.byteLength; i++) {
		      // do something with each byte in the array
		    }
		  }
		};

		oReq.send(null);
		
	}
	
	
	function funcionCargada(object){
		
		
		var miImagen = document.getElementById('imagen');
		miImagen.src = object;
		
		/*
		imagen.src = image.src;
		*/
		console.log('imagen puesta');
		
		
	}
	
	
}