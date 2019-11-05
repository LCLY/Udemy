var firstname = "John";
console.log(firstname);

var assignSomething = "yes";
console.log(assignSomething);

var job;
console.log(job); //this will be undefined

job = "Yes";
console.log(job); // now it will be fined

//var 3 = 3; //error because you can only declare a var with _ $ or letters

// variable mutation and type coercion
var firstName = "john";
var age = 28;

// Type coercion
console.log(firstName + " " + age); // this will output a string of john 28

var job, isMarried;
job = "teacher";
isMarried = false;
console.log(firstName + age + job + isMarried);
