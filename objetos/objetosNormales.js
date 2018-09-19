/*
 * Creación de objeto Simple
 * con variables públicas
 * accesibles desde fuera del
 * objeto
 */
function Tune (song, artist) {
    this.title = song;
    this.artist = artist;
    this.concat=function() {
        return this.title + "-" + this.artist;
    }
    this.getTitle = function() {
        return "Title is: " +this.title;
    }
    this.getArtist = function() {
        return "Artist is: " +this.artist;
    }
}

/*
 * Creación de objeto Simple
 * con variables privadas
 * no accesibles desde fuera del
 * objeto
 */
function Cancion(song,artist) {
    var title = song;
    var artist = artist;
    this.concat = function() {
        return title + " - " + artist;
    }
    this.getTitle = function() {
        return "Title is: " +title;
    }
    this.getArtist = function() {
        return "Artist is: " +artist;
    }
}

/*
 * Creación de un objeto con Setter
 * Getter para devolver e insertar datos
 * al objeto
 */
function Tema() {
    var title      = "";
    var artist     = "";
    this.nCanciones = 0;

    this.__defineGetter__("getArtist", function(){
        return artist;
    });

    this.__defineGetter__("getTitle", function(){
        return title;
    });

    this.__defineSetter__("artist", function(val){
        artist = val;
    });

    this.__defineSetter__("setTitle", function(val){
        this.nCanciones = val;
        //title = val;
    });

    this.concat = function() {
        return title + " - " + artist;
    }
}


/*
 * Creación de un objeto
 * y un objeto heredado con el
 * método apply
 */

function Book (title, author) {
    var title      = title;
    var author     = author;
    this.getTitle  = function() {
        return "Title: " + title;
    }
    this.getAuthor = function() {
        return "Author: " + author;
    }
}

function TechBook (title, author, category) {
    var category     = category;
    this.getCategory = function () {
        return "Technical Category: " + category;
    }

    Book.apply(this, arguments);

    this.getBook = function () {
        return this.getTitle() + " " + author + " " + this.getCategory();
    }
}


/*
 * Creación de un objeto
 * y un objeto heredado con el
 * método apply
 */

function oldObject(param1) {
    this.param1 = param1;
    this.getParam = function () {
        return this.param1;
    }
}


function newObject(param1,param2) {
    this.param2    = param2;
    this.getParam2 = function() {
        return this.param2;
    }

    oldObject.apply(this,arguments);

    this.getAllParameters=function() {
        return this.getParam() + " " + this.getParam2();
    }
}

/*
 * Creacion de otro objeto con llaves
 */
var customer = {
  name: "Tom Smith",
  speak: function(){
      return "My name is "+this.name;
  },
  address:{
      street:'123 Main St',
      city:'Pittsburgh',
      state:'PA'
  }
};


// Carga la pagina y creamos una arrray de objetos
window.onload=function() {
    // Llamado a objeto 1
    // propiedades públicas
    var happySong = new Array();
    happySong[0]  = new Tune("Putting on the Ritz", "Ella Fitzgerald");
    console.log("Concat: "+happySong[0].concat());
    console.log("Title: "+happySong[0].title);
    console.log("Get Title: "+happySong[0].getTitle());
    // Prototype pruebas
    var cancion = new Tune("Mi carro", "Manolo Escobar");
    console.log("La propiedad title es: "+Tune.prototype.title);
    Tune.prototype.crear_cancion = function(){
        console.log("Canción creada");
    }
    cancion.crear_cancion();
    console.log("La canción es: "+cancion.__proto__);
    // Llamado a objeto 2
    // propiedades privadas accedemos desde métodos
    var happySongs1 = new Array();
    happySongs1[0]  = new Cancion("Putting on the Ritz", "Ella Fitzgerald");
    console.log("Title Canción: "+happySongs1[0].getTitle());
    console.log("Artist Canción: "+happySongs1[0].getArtist());
    try {
        // error
        console.log("Titulo: "+happySongs1[0].title);
    } catch(e) {
        console.log("Error: "+e);
    }
    console.log("Titulo + Artista: "+happySongs1[0].concat());

    // Creación nueva propieadad objeto 1
    // y creación varias propieades objeto 1
    Object.defineProperty(happySong[0], "numberSongs",{
        value: "12",
        writable: false,
        enumerable: true,
        configurable: true
    });

    Object.defineProperties(happySong[0], {
        "single": {
            value: true,
            writable: true,
            enumerable: true,
        },
        "duation": {
            value: "1h",
            writable: false
        }
    });

    happySong[0].single = false;
    console.log(happySong[0]);
    // Llamada al objeto
    // Book y heredado de TechBook
    // chain the object constructors
    TechBook.prototype = new Book();
    // get all values
    var newBook = new TechBook("The JavaScript Cookbook","Shelley Powers", "Programming");
    console.log("getBook()"+newBook.getBook());
    // now, individually
    console.log("getTitile() "+newBook.getTitle());
    console.log("getAuthor() "+newBook.getAuthor());
    console.log("getCategory() "+newBook.getCategory());
    // Llamada al objeto
    // oldObject y heredado de newObject
    newObject.prototype = new oldObject();
    var obj                 = new newObject("valor 1","valor 2");
    console.log("parametros: "+obj.getAllParameters());

    try {
        // DOM test, WebKit bites the dust on this one
        var img = new Image();
        // add new property and descriptor
        Object.defineProperty(img, "geolatitude", {
            get: function() { return geolatitude; },
            set: function(val) { geolatitude = val;},
            enumerable: true,
            configurable: true});
        // test configurable and enumerable attrs
        var props = "Image has ";
        for (var prop in img) {
            props+=prop + " ";
        }
        console.log(props);
    } catch(e) {
        alert(e);
    }



    try {
        // now we lose IE8
        // chain the object constructors
        TechBook.prototype = new Book();
        // add new property and property descriptor
        Object.defineProperty(TechBook, "experience", {
            get: function () { return category; },
            set: function (value) { category = value; },
            enumerable: false,
            configurable: true});
        // get property descriptor and print
        var val = Object.getOwnPropertyDescriptor(TechBook,"experience");
        console.log(JSON.stringify(val));
        // test configurable and enumerable
        props = "TechBook has ";
        for (var prop in TechBook) {
            props+=prop + " ";
        }
        console.log(props);
        Object.defineProperty(TechBook, "experience", {
            enumerable: true});
        props = "TechBook now has ";
        for (var prop in TechBook) {
            props+=prop + " ";
        }
        console.log(props);
        // create TechBook instance
        var newBook = new TechBook("The JavaScript Cookbook","Shelley Powers", "Programming");
        // test new setter
        newBook.experience="intermediate";
        // test data descriptor
        Object.defineProperty(newBook, "publisher", {
            value: "O'Reilly",
            writable: false,
            enumerable: true,
            configurable: true});
        // test writable
        newBook.publisher="Some Other";
        console.log(newBook.publisher);

    } catch(e) {
        alert(e);
    }

    // Llamo al ultimo objeto
    document.write(customer.speak());

}