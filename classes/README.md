# JavaScript Classes

## Overview

Previously in JavaScript, there were no official classes. Types were defined by functions.
We had to create a function and then define methods on the function object
using the prototype:


```js
function Vacation(destination, length) {

    this.destination = destination
    this.length = length
}

Vacation.prototype.print = function() {
    console.log(this.destination + " | " + this.length + " days")
}

var maui = new Vacation("Maui", 7);
maui.print(); // Maui | 7
```

If you were used to classical object orientation, this probably made you mad.
ES6 introduces class declaration, but JavaScript still works the same way. Functions
are objects, and inheritance is handled through the prototype, but this syntax makes
more sense if you come from classical object orientation:

```js
class Vacation {
    constructor(destination, length) {
        this.destination = destination
        this.length = length
    }
    print() {
        console.log(`${this.destination} will take ${this.length} days.`)
    }
}
```

Once you’ve created the class, you can create a new instance of the class using the new
keyword. Then you can call the custom method on the class:

```js
const trip = new Vacation("Santiago, Chile", 7);
console.log(trip.print()); // Chile will take 7 days.
```

Now that a class object has been created, you can use it as many times as you’d like to
create new vacation instances. Classes can also be extended. When a class is extended,
the subclass inherits the properties and methods of the superclass. These properties
and methods can be manipulated from here, but as a default, all will be inherited.

You can use Vacation as an abstract class to create different types of vacations. For
instance, an Expedition can extend the Vacation class to include gear:

```js
class Expedition extends Vacation {
    constructor(destination, length, gear) {
        super(destination, length)
        this.gear = gear
    }
    print() {
        super.print()
        console.log(`Bring your ${this.gear.join(" and your ")}`)
    }
}

const trip = new Expedition("Mt. Whitney", 3,["sunglasses", "prayer flags", "camera"])
trip.print()

```

Other examples

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

A class expression is another way to define a class. Class expressions can be named or unnamed. The name given to a named class expression is local to the class's body. (it can be retrieved through the class's (not an instance's) name property, though).

```js
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

console.log(Rectangle.name);
// output: "Rectangle2"
```

Prototype methods
```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

Static methods

The static keyword defines a static method for a class. Static methods are called without instantiating their class and cannot be called through a class instance. Static methods are often used to create utility functions for an application.

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.distance; //undefined
p2.distance; //undefined

console.log(Point.distance(p1, p2)); // 7.0710678118654755

```


When a static or prototype method is called without a value for this, the this value will be undefined inside the method. This behavior will be the same even if the "use strict" directive isn't present, because code within the class body's syntactic boundary is always executed in strict mode.

```js

class Animal { 
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // the Animal object
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined

```

If the above is written using traditional function-based syntax, then autoboxing in method calls will happen in non–strict mode based on the initial this value. If the initial value is undefined, this will be set to the global object.

Autoboxing will not happen in strict mode, the this value remains as passed.

```js
function Animal() { }

Animal.prototype.speak = function() {
  return this;
}

Animal.eat = function() {
  return this;
}

let obj = new Animal();
let speak = obj.speak;
speak(); // global object

let eat = Animal.eat;
eat(); // global object
```

Public field declarations

With the JavaScript field declaration syntax, the above example can be written as:




