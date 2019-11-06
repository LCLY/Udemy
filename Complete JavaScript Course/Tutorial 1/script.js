var firstname = "John";
// console.log(firstname);

var assignSomething = "yes";
// console.log(assignSomething);

var job;
// console.log(job); //this will be undefined

job = "Yes";
// console.log(job); // now it will be fined

//var 3 = 3; //error because you can only declare a var with _ $ or letters

/* ========== variable mutation and type coercion ========== */
var firstName = "john";
var age = 28;

/* ========== Type coercion =========== */
// console.log(firstName + " " + age); // this will output a string of john 28

var job, isMarried;
job = "teacher";
isMarried = false;
// console.log(firstName + age + job + isMarried);

/* ========== Variable mutation =========== */
age = "twenty eight";
job = "driver";

// alert(age + job);

// var lastName = prompt("What is the last name?");
// console.log(firstname + " " + lastName);

/* ========== Math operators =========== */
var year, yearJohn, yearMark;
now = 2018;
ageJohn = 28;
ageMark = 33;

yearJohn = now - ageJohn;
yearMark = now - ageMark;
// console.log(yearJohn);

// console.log(now + 2);
// console.log(now * 2);
// console.log(now / 10);

/* ========== logical operators =========== */
var johnOlder = ageJohn > ageMark;
// console.log(johnOlder);

/* ========== type operators =========== */
// console.log(typeof johnOlder);
// console.log(typeof x);

/* ========== Operator precedence (which operator executed first) =========== */
var now = 2018;
var yearJohn = 1989;
var fullAge = 18;

/* ========== multiple operators =========== */
var isFullAge = now - yearJohn >= fullAge;
// console.log(isFullAge);

/* ========== Grouping (basically parenthesis) =========== */
var ageJohn = now - yearJohn;
var agemark = 35;
var average = (ageJohn + agemark) / 2;
// console.log(average);

/* ========== Mulitple assignment =========== */
var x, y;
x = (3 + 5) * 4 - 6;
// if want to assign both x and y at the same time can do
// according to precedence table, assignment is right to left, so it will assign y first then x
x = y = (3 + 5) * 4 - 6;

/* ========== More operators =========== */
x = x * 2;
x *= 2;

var markMass = 50;
var markHeight = 1.7;
var johnMass = 70;
var johnHeight = 1.8;
var markBMI = markMass / markHeight ** 2;
var johnBMI = johnMass / johnHeight ** 2;
var markHigher = markBMI > johnBMI;
// console.log("Is Mark BMI higher than John", markHigher);

/* ========== Ternary operators =========== */
var firstName = "John";
var age = 22;
// age >= 18
//     ? console.log(firstname + "drinks beer")
//     : console.log(firstname + "drink juice");

/* ==========  Truthy and Falsy values and equality operators =========== */
// falsy values: undefined, null, 0, '', Nan
var height;
if (height) {
    // defined
} else {
    // undefined
}

/* ========== Equality operators =========== */
height = 23;

if (height == "23") {
    // true
    // the == operator does type coercion
}

if (height === "23") {
    // false
    // strict equality operator
}

// expression vs statement
x = 7; //this is expression
if (x == 7) {
    //this is statment
    // console.log("yes");
}

/* ========== Array ========== */
// to declare array
var names = ["john", "david"];
var age = new Array(15, 20, 18);

// it can also contain different data types
var john = ["john", 1990, false];
john.push("yes"); //adding element to the end of the array
// console.log(john);
john.unshift("Mr."); //adding element to the start of the array
// console.log(john);
john.pop(); //remove the last element of the array
// console.log(john);
john.shift(); //remove the first element of the array
// console.log(john);
// console.log(john.indexOf(1990));
// console.log(john.indexOf("a")); // would return -1 because it doesnt exist

// so if want to check if something doesnt exist in the array can do
var isDesigner =
    john.indexOf("designer") === -1 ? "he is not a designer" : "he is designer";

// Coding challenge 3
function tipCalculator(bill) {
    var percentage;
    if (bill < 50) {
        percentage = 0.2;
    } else if (bill >= 50 && bill < 200) {
        percentage = 0.15;
    } else {
        percentage = 0.1;
    }
    return percentage * bill;
}

var bills = [10, 200, 300];
var tips = [
    tipCalculator(bills[0]),
    tipCalculator(bills[1]),
    tipCalculator(bills[2]),
];

var total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];

console.log(tips, total);
