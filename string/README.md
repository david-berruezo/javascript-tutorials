
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







