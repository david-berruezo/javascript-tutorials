# String a primitive data types in JavaScript

## Finding a String in a String

The indexOf() method returns the index of (the position of) the first occurrence of a specified text in a string:

```js
var str = "Please locate where 'locate' occurs!";
var pos = str.indexOf("locate");
```

The lastIndexOf() method returns the index of the last occurrence of a specified text in a string:

```js
var str = "Please locate where 'locate' occurs!";
var pos = str.lastIndexOf("locate");
```

## The slice() Method

slice() extracts a part of a string and returns the extracted part in a new string.
The method takes 2 parameters: the start position, and the end position (end not included).
This example slices out a portion of a string from position 7 to position 12 (13-1):


```js
var str = "Apple, Banana, Kiwi";
var res = str.slice(7, 13);
```
If a parameter is negative, the position is counted from the end of the string.
This example slices out a portion of a string from position -12 to position -6:

```js
var str = "Apple, Banana, Kiwi";
var res = str.slice(-12, -6);
```

## The substring() Method

```js
var str = "Apple, Banana, Kiwi";
var res = str.substring(7, 13);
```

## Searching for a String in a String

```js
var str = "Please locate where 'locate' occurs!";
var pos = str.search("locate");
```

## Extracting String Parts
### There are 3 methods for extracting a part of a string:

```js
slice(start, end)
substring(start, end)
substr(start, length)
```


## Extracting a List from a String

## Problem

You have a string with several sentences, one of which includes a list of items. The list
begins with a colon (:) and ends with a period (.), and each item is separated by a comma.
You want to extract just the list.

Before:

```js
This is a list of items: cherries, limes, oranges, apples.
```

After:

```js
['cherries','limes','oranges','apples']
```

## Solution

The solution requires two actions: extract out the string containing the list of items, and
then convert this string into a list.

Use String’s indexOf() to locate the colon, and then use it again to find the first period
following the colon. With these two locations, extract the string using String’s sub
string():

```js
var sentence = 'This is one sentence. This is a sentence with a list of items:' +
'cherries, oranges, apples, bananas. That was the list of items.';

var start = sentence.indexOf(':');
var end = sentence.indexOf('.',start+1);
var listStr = sentence.substring(start+1, end);
var fruits = listStr.split(',');
console.log(fruits); // ['cherries', ' oranges', ' apples', ' bananas']
fruits.forEach(function(element,index,array){
    array[index] = element.trim();
});
```

If we wish delete blank space with a regular expression

```js
var sentence = 'This is one sentence. This is a sentence with a list of items:' +
'cherries, oranges, apples, bananas. That was the list of items.';

var start = sentence.indexOf(':');
var end = sentence.indexOf('.',start+1);
var listStr = sentence.substring(start+1, end);
var fruits = listStr.split(',');
console.log(fruits); // ['cherries', ' oranges', ' apples', ' bananas']

```







