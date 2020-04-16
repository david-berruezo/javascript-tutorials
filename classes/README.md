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

