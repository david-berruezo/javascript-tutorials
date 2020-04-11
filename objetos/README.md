# JavaScript Objects

## Overview

In this lesson, we'll introduce, define, and work with objects. 

## Introduction 

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
Access to object  properties by 3 way
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

