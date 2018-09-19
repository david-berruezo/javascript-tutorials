	
  window.onload = function() {
	  
	// variables
	var url 	= 'http://www.davidberruezo.com/foto1.jpg';
	var objeto  =   document.getElementById('myAnchor');
	var loading = document.getElementById('loading');  
	
	loading.style.display = 'none';
	
	objeto.addEventListener('click',cargarImagen)
	
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
		
		var miImagen = document.getElementById('imagen');
		image.src = url;
		imagen.src = image.src;
	
	}  
	  
	
	
	
	/*
	loading.style.display = 'none';
	objeto.addEventListener('click',llamadaFuncion());
	*/
	
	/*
	function myFunction() {
	    
		var objeto = document.getElementById('myAnchor');
		objeto.addEventListener('click',llamadaFuncion());
		document.getElementById("myAnchor").href = "http://www.cnn.com/";
	    document.getElementById("demo").innerHTML = "The link above now goes to www.cnn.com.";
	}
	*/
	
    function llamadaFuncion(event){
    	
    	//console.log('prueba');
    	getText(url,funcionCargada);
    	
    }
    

	function getText(url, callback) {

		var request = new XMLHttpRequest(); // Create new request
		request.open("GET", url); // Specify URL to fetch

		loading.style.display = "block";	
		
		request.onreadystatechange = function() { // Define event listener

			//If the request is compete and was successful
			if (request.readyState === 4 && request.status === 200) {
				var type = request.getResponseHeader("Content-Type");
				if (type.match(/^text/)) // Make sure response is text
					callback(request.responseText); // Pass it to callback
				}
			};

			request.send(null); // Send the request now

	}
	
	function funcionCargada(object){
		
		
		var imagen = document.getElementById('imagen');
		imagen.src = object;
		console.log('Imagen cargada');
		
		
	}
	
	/*
	function loadXMLDoc(){
	
		var xmlhttp;
		
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		
			xmlhttp=new XMLHttpRequest();
		
		}else{// code for IE6, IE5
		  
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		
		}xmlhttp.onreadystatechange=function(){
		
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    
			  document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
		    }
		}
		
		xmlhttp.open("GET","ajax_info.txt",true);
		xmlhttp.send();
	
	}
	*/
	
	
 }
  
	