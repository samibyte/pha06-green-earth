# Green Earth - Assignment 6

## 1 What is the difference between var, let, and const?

The differences between var, let, and const in JavaScript relate to scope, reassignment, and re-declaration.

Var is function-scoped, can be reassigned and redeclared, and is hoisted
Let is block-scoped and can be reassigned but not redeclared
Const is same as let but can not be reassigned or redeclared

It's best to use Let and Const, and avoid Var

## 2 What is the difference between map(), forEach(), and filter()?

These are array methods that are used for iterating over array elements.

forEach() is used, to execute a provided function once for each array element. It's return value is undefined.

map() is used, to transform each element in an array and create a new array containing the results of calling a provided function on every element.

filter() to create a new array containing only the elements from the original array that satisfy a provided testing function. It returns true for those elements.

## 3 What are arrow functions in ES6?

Arrow functions allows a shorter syntax for function expressions.
It enables various techniques such anonymous or callback function.

## 4. How does destructuring assignment work in ES6?

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into individual values. It's done by square brackets on the left hand side of the assignment
Variables are assigned based on their position within the array.

## 5. Explain template literals in ES6. How are they different from string concatenation?

Template literals uses backticks. It's a new a to define strings. It allows to embed expression using the ${expression} syntax. It also enables multi lines without needing escape charecters line \n for line break.
It improves readability as well.
