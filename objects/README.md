# JavaScript Objects

## Overview

We'll introduce, define, and work with objects. 

## Introduction 

When we run across a word that we don't know, we often consult a dictionary. A dictionary is, at its core, a list of words; below each word is a definition or set of definitions. If we know the word that we're looking for, we can just look it up in the dictionary and get all its information.

To offer another example, imagine a planner. The planner has a list of dates, and each date has a list of times; at each time, there's an event (or not). The planner gives us a way of _associating_ what's happening with the time when it happens. If we look up a given time, we will see what (if anything) is happening then.

In programming, structures like dictionaries are called "associative data structures": they contain pairs of keys (words in our dictionary analogy) and values (definitions in our dictionary analogy).

In JavaScript, the barebones associative data structure is called an _object_. That means that in an object, you can look something up by its _key_ and get back its _value_ — just like in a dictionary. In fact, you might hear some people refer to objects as "dictionaries." We're going to call them "objects" because they're instances of JavaScript's capital-O `Object`.

## Creating Objects

You can create an object in several different ways, with the literal syntax and with the `Object` _constructor_. A **constructor** does just what its name implies: it constructs objects (in this case, `Object` objects). Be sure to follow along in your console.

Literal Syntax:

var persona_literal = {
    nombre: "David",
    apellido:"Berruezo",
    ano:"23/11/1978"
}

Object Constructor:
```js
var persona_object      = new Object();
persona_object.nombre   = "David";
persona_object.apellido = "Berruezo";
persona_object.ano      = "23/11/1978";;
```
You can also initialize an object with key-value pairs when you create it:
```js
var persona_literal_object = new Object( { nombre: "David",apellido:"Berruezo", ano:"23/11/1978" } );
```
Access to object  properties by 3 way<br>
1.- First way
```js
persona_object.nombre;
```
2.- Second way
```js
persona_object["nombre"];
```
3.- Third way
```js
var variable = "nombre";
persona[variable];
```
Create a methods

Show all object properties and object methods
```js
for(var propiedad in persona_object){
    console.log("propiedad: "+propiedad);
    console.log("valor: "+persona_object[propiedad]);
}
```

## Suggestion to create a clean object and comment it

```js

/**
* My JavaScript application
*
* @module myapp
*/

var MYAPP = {};

/**
* A math utility
* @namespace MYAPP
* @class math_stuff
*/

MYAPP.math_stuff = {
    
   /**
    * Sums two numbers
    * @method sum
    * @param {Number} a First number
    * @param {Number} b The second number
    * @return {Number} The sum of the two inputs
    */
    
    sum: function (a, b) {
        return a + b;
    },
    
   /**
    * Multiplies two numbers
    *
    * @method multi
    * @param {Number} a First number
    * @param {Number} b The second number
    * @return {Number} The two inputs multiplied
    */

    multi: function (a, b) {
        return a * b;
    }
};


/**
* Constructs Person objects
* @class Person
* @constructor
* @namespace MYAPP
* @param {String} first First name
* @param {String} last Last name
*/
MYAPP.Person = function (first, last) {
    
   /**
    * Name of the person
    * @property first_name
    * @type String
    */
    this.first_name = first;
    
   /**
    * Last (family) name of the person
    * @property last_name
    * @type String
    */
    this.last_name = last;
};

/**
* Returns the name of the person object
*
* @method getName
* @return {String} The name of the person
*/

MYAPP.Person.prototype.getName = function () {
    return this.first_name + ' ' + this.last_name;
};
```

## Object Literal

When you think about objects in JavaScript, simply think about hash tables of keyvalue
pairs (similar to what are called “associative arrays” in other languages). The
values can be primitives or other objects; in both cases they are called properties. The
values can also be functions, in which case they are called methods.

The custom objects you create in JavaScript (in other words, the user-defined native
objects) are mutable at any time. Many of the properties of the built-in native objects
are also mutable. You can start with a blank object and add functionality to it as you
go. The object literal notation is ideal for this type of on-demand object creation.


```js
// start with an empty object
var dog = {};
// add one property
dog.name = "Benji";

// now add a method
dog.getName = function () {
    return dog.name;
};
```

In the preceding example, you begin with a clean slate—a blank object. Then you add
a property and a method to it. At any time in the life of the program you can:
• Change the values of properties and methods, for example:

```js
dog.getName = function () {
    // redefine the method to return
    // a hardcoded value
    return "Fido";
};
```

• Remove properties/methods completely:

```js
delete dog.name;
```

• Add more properties and methods:

```js
dog.say = function () {
    return "Woof!";
};
dog.fleas = true;
```

Here’s an example showing two equivalent ways to create two identical objects:

```js
// one way -- using a literal
var car = {goes: "far"};
// another way -- using a built-in constructor
// warning: this is an antipattern
var car = new Object();
car.goes = "far";
```

Object Constructor Catch

Following are a few examples of passing a number, a string, and a boolean value to new Object(); 
the result is that you get objects created with a different constructor:

```js
// Warning: antipatterns ahead
// an empty object
var o = new Object();
console.log(o.constructor === Object); // true

// a number object
var o = new Object(1);
console.log(o.constructor === Number); // true
console.log(o.toFixed(2)); // "1.00"

// a string object
var o = new Object("I am a string");
console.log(o.constructor === String); // true

// normal objects don't have a substring()
// method but string objects do
console.log(typeof o.substring); // "function"

// a boolean object
var o = new Object(true);
console.log(o.constructor === Boolean); // true
```

Custom constructor functions

```js
var Person = function (name) {
    this.name = name;
    this.say = function () {
        return "I am " + this.name;
    };
};
```

It’s as if something like this happens behind the scenes:

```js
var Person = function (name) {
    // create a new object
    // using the object literal
    // var this = {};
    // add properties and methods
    this.name = name;
    
    this.say = function () {
        return "I am " + this.name;
    };
    // return this;
};
```

The better option is to add the method to the prototype of Person:

```js
Person.prototype.say = function () {
    return "I am " + this.name;
};
```

Constructor’s Return Values

```js
var Objectmaker = function () {
    // this `name` property will be ignored
    // because the constructor
    // decides to return another object instead
    this.name = "This is it";
    
    // creating and returning a new object
    var that = {};
    that.name = "And that's that";
    return that;
};

// test
var o = new Objectmaker();
console.log(o.name); // "And that's that"
```

Patterns for Enforcing new

As mentioned already, constructors are still just functions but invoked with new. What
happens if you forget new when you invoke a constructor? This is not going to cause
syntax or runtime errors but might lead to logical errors and unexpected behavior.
That’s because when you forget new, this inside the constructor will point to the global
object. (In browsers this will point to window.)


When your constructor has something like this.member and you invoke the constructor
without new, you’re actually creating a new property of the global object called
member and accessible through window.member or simply member. This behavior is highly
undesirable, because you know you should always strive for keeping the global namespace
clean.

```js
// constructor
function Waffle() {
    this.tastes = "yummy";
}

// a new object
var good_morning = new Waffle();
console.log(typeof good_morning); // "object"
console.log(good_morning.tastes); // "yummy"

// antipattern:
// forgotten `new`
var good_morning = Waffle();
console.log(typeof good_morning); // "undefined"
console.log(window.tastes); // "yummy"
```

Using that

```js
function Waffle() {
  var that = {};
  that.tastes = "yummy";
  return that;
}
```




