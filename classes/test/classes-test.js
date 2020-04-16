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