# Big Notation

## Overview

We will to cover the famouus big-O notation and the NP-Completeness theory and also take a look at how we can have some fun
with algorithms and boost our knowledge to improve our programming and problem-solving skills.

## Understanding big-O notation
How do we measure the efficiency of an algorithm ? We usually use resources such as CPU (time) usage, memory usage, disk usage, and
network usage. When talking about big-O notation, we usually consider CPU (time) usage 

## O(1)

Consider the following function:

```js
function increment(num){
    return ++num;
}
```
If we try to execute the increment(1) function, we will have an execution time equal to x. If we try to execute the increment function again with a different parameter
(let's say num is 2), the execution time will also be x. The parameter does not matter; the performance of the function increment will be the same. For this reason, we 
can say the preceding function has a complexity of 0(1) (wich is constant). 

## O(n)

Now, let's use the sequential search algorithm as an example:

```js
function sequentialSearch(array,item){
    for (var i=0;i<array.length;i++;){
        if (item == array[i]){
            return i;
        }
    }
    return -1;
}
```

Let's modify the algorithmti calculate the cost as follows:

```js
function sequentialSearch(array,item){
    var cost = 0;
    for (var i=0;i<array.length;i++;){
        cost ++;
        if (item == array[i]){
            return i;
        }
    }
    console.log('cost for sequentialSearch with input size '+array.length+' is '+cost);
    return -1;
}
```

Result will be 1,2,3,4...10...1000 depends of "cost" then notation will be O(n)

## O(n^2)

For the O(n^2) example, let's use the bubble sort algorithm

```js
function swap(array,index1,index2){
    var aux = array[index1]; 
    array[index1] = array[index2];
    array[index2] = aux;
}

function bubbleSort(array){
   var length = array.length;
   var cost = 0;
   for(var i=0;i<length;i++){
       cost++
       for (var j=0;j<length-1;j++){
           cost++;
           if (array[j] > array[j+1]){
               swap(array,j,j+1);
           }
        }
    } 
}
```

If we execute bubbleSort for an array with size 10, the cost will be 100 (10^2). If we execute bubbleSort for 
an array with size 100, the cost will be 10.000 (100^2). Note that the execution will take even longer every time
we increase the input size.