function Vacation(destination, length) {

    this.destination = destination
    this.length = length
}

Vacation.prototype.print = function() {
    console.log(this.destination + " | " + this.length + " days")
}

var maui = new Vacation("Maui", 7);
maui.print(); // Maui | 7


class Vacation_two {
    constructor(destination, length) {
        this.destination = destination
        this.length = length
    }
    print() {
        console.log(`${this.destination} will take ${this.length} days.`)
    }
}


const trip = new Vacation_two("Santiago, Chile", 7);
console.log(trip.print()); // Chile will take 7 days.

class Expedition extends Vacation_two {
    constructor(destination, length, gear) {
        super(destination, length)
        this.gear = gear
    }
    print() {
        super.print()
        console.log(`Bring your ${this.gear.join(" and your ")}`)
    }
}

const trip_two = new Expedition("Mt. Whitney", 3, ["sunglasses", "prayer flags", "camera"])
trip_two.print()

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}



class Rectangle_two {
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
  
const square = new Rectangle_two(10, 10);
console.log(square.area); // 100



class Cat { 
    constructor(name) {
      this.name = name;
    }
    
    speak() {
      console.log(`${this.name} makes a noise.`);
    }
  }
  
  class Lion extends Cat {
    speak() {
      super.speak();
      console.log(`${this.name} roars.`);
    }
  }
  
  let l = new Lion('Fuzzy');
  l.speak(); 
  // Fuzzy makes a noise.
  // Fuzzy roars.