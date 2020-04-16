# JavaScript Arrays

## Overview

The JavaScript Array class is a global object that is used in the construction of arrays; which are high-level, list-like objects.

## Create An array

```js
let fruits = ['Apple', 'Banana']

console.log(fruits.length)
// 2
```
or old time

```js
var empty = [];
var numbers = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
];
empty[1] // undefined
numbers[1] // 'one'
empty.length // 0
numbers.length // 10
```

Loop over an Array with callback

```js
fruits.forEach(function(item, index, array) {
  console.log(item, index)
})
// Apple 0
// Banana 1
```

Add to the end of an Array

```js
let newLength = fruits.push('Orange')
// ["Apple", "Banana", "Orange"]
```




