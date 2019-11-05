var firstname = "John";
// console.log(firstname);

var assignSomething = "yes";
// console.log(assignSomething);

var job;
// console.log(job); //this will be undefined

job = "Yes";
// console.log(job); // now it will be fined

//var 3 = 3; //error because you can only declare a var with _ $ or letters

// variable mutation and type coercion
var firstName = "john";
var age = 28;

// Type coercion
// console.log(firstName + " " + age); // this will output a string of john 28

var job, isMarried;
job = "teacher";
isMarried = false;
// console.log(firstName + age + job + isMarried);

// variable mutation
age = "twenty eight";
job = "driver";

// alert(age + job);

// var lastName = prompt("What is the last name?");
// console.log(firstname + " " + lastName);

// basic operators
var year, yearJohn, yearMark;
now = 2018;
ageJohn = 28;
ageMark = 33;

yearJohn = now - ageJohn;
yearMark = now - ageMark;
console.log(yearJohn);

console.log(now + 2);
console.log(now * 2);
console.log(now / 10);

// logical operators
var johnOlder = ageJohn > ageMark;
console.log(johnOlder);
console.log(typeof johnOlder);
console.log(typeof x);
