<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Ajax</title>

<script>


	//Issue an HTTP GET request for the contents of the specified URL.
	//When the response arrives successfully, verify that it is plain text
	//and if so, pass it to the specified callback function
	
	function getText(url, callback) {

		var request = new XMLHttpRequest(); // Create new request

		request.open("GET", url); // Specify URL to fetch

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


	function objetus(file) {
	
		xmlhttp=false;
		this.AjaxFailedAlert = "Su navegador no soporta las funcionalidades de este sitio y podria experimentarlo de forma diferente a la que fue pensada. Por favor habilite javascript en su navegador para verlo normalmente.\n";
		this.requestFile = file;
		this.encodeURIString = true;
		this.execute = false;
	
		if (window.XMLHttpRequest) {
	
			this.xmlhttp = new XMLHttpRequest();
	
			if (this.xmlhttp.overrideMimeType) {
	
				this.xmlhttp.overrideMimeType('text/xml');
	
			}

		} else if (window.ActiveXObject) { // IE

			try {

				this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");

			}catch (e) {

				try {

					this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

				} catch (e) {

					this.xmlhttp = null;

				}

		}

		if (!this.xmlhttp && typeof XMLHttpRequest!='undefined') {

			this.xmlhttp = new XMLHttpRequest();

			if (!this.xmlhttp){

				this.failed = true;

			}

		}

	}

	return this.xmlhttp ;

}

	function recibeid(_pagina,valorget,valorpost,capa){

		ajax = objetus(_pagina);

		if(valorpost!=""){

			ajax.open("POST", _pagina+"?"+valorget+"&tiempo="+new Date().getTime(),true);

		} else {

			ajax.open("GET", _pagina+"?"+valorget+"&tiempo="+new Date().getTime(),true);

		}

		ajax.onreadystatechange=function() {

			if (ajax.readyState==1){

				document.getElementById(capa).innerHTML = "<img src='loadingcircle.gif' align='center'> Aguarde por favor...";

			}

			if (ajax.readyState==4) {

				if(ajax.status==200)

					{document.getElementById(capa).innerHTML = ajax.responseText;}

				else if(ajax.status==404)

				{

					capa.innerHTML = "La direccion no existe";

			}else{

				capa.innerHTML = "Error: ".ajax.status;

			}

		}

	}

	if(valorpost!=""){
	
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		ajax.send(valorpost);

	} else {

		ajax.send(null);

	}

}

</script>
</head>
<body>

</body>
</html>
