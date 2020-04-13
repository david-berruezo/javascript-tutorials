# Primitive data types in JavaScript

## Overview
There are exactly five primitive data types in JavaScript: string, number, boolean, null,
and undefined. Only the string, number, and boolean data types have complementary
constructor objects. The actual representation of strings, floating-point numbers, integers,
and booleans are literals:

```js
var str1 = "this is a simple string"; // the quoted string is the literal
var num1 = 1.45; // the value of 1.45 is the literal
var answer = true; // the values of true and false are boolean literals
```

We can create primitive boolean, string, and number variables either by using a literal
representation or using the object without using the new operator:

```js
var str1 = String("this is a simple string"); // primitive string
var num1 = Number(1.45); // primitive number
var bool1 = Boolean(true); // primitive boolean
```

To deliberately instantiate an object, use the new operator:

```js
var str2 = new String("this is a simple string"); // String object instance
var num2 = new Number(1.45); // Number object instance
var bool2 = new Boolean(true); // primitive boolean
```

You can quickly tell the difference between a primitive and an object instance when you
compare an object instance to a literal value using strict equality. For example, running
the following code in a browser:

```js
var str1 = String("string");
var num1 = Number(1.45);
var bool1 = Boolean(true);

if (str1 === "string") {
    console.log('equal');
}

if (num1 === 1.45) {
    console.log('equal');
}

if (bool1 === true) {
    console.log('equal');
}

var str2 = new String("string");
var num2 = new Number(1.45);
var bool2 = new Boolean(true);

if (str2 === "string") {
    console.log('equal');
} else {
    console.log('not equal');
}

if (num2 === 1.45) {
    console.log('equal');
} else {
    console.log('not equal');
}

if (bool2 === true) {
    console.log('equal');
} else {
    console.log('not equal');
}
```

Results in the following print outs to the console:

```js
equal
equal
equal
not equal
not equal
not equal
```

The primitive variables (those not created with new) are strictly equal to the literals,
while the object instances are not. Why are the primitive variables strictly equal to the
literals? Because primitives are compared by value, and values are literals.

For the most part, JavaScript developers don’t directly create object instances for the
three primitive data types. Developers just want a number, boolean, or string variable
to act like a number, boolean, or string, rather than an object; we don’t need the enhanced
functionality of the object. More importantly, when developers use strict equality or type
checking in the code, they want a variable to match their expectations of data type, rather
than be defined as “object”:

```js
var num1 = 1.45;
var num2 = new Number(1.45);
console.log(typeof num1); // prints out number
console.log(typeof num2); // prints out object
```

