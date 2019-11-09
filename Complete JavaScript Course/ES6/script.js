/* ========== Let and const ========== */

// ES5
var name5 = "Jane Smith";
var ages5 = 23;
name5 = "Jane Miller";
// console.log(name5);

// ES6
const name6 = "Jane Smith"; //var is immutable
let age6 = 23;
// name6 = "Jane Miller";
// console.log(name6);

// ES5
// function driversLicense(passedTest) {
//     if (passedTest) {
//         var firstName = "John";
//         var yearOfBirth = 1990;
//     }
//     console.log(firstName + " " + yearOfBirth);
// }

// driversLicense(true);

// ES6
// function driversLicense(passedTest) {
//     if (passedTest) {
//         let firstName = "John";
//         const yearOfBirth = 1990;
//     }
//     console.log(firstName + " " + yearOfBirth);
// }

//if we want to access let outside of block we can define it outside of block
function driversLicense(passedTest) {
    let firstName;
    const yearOfBirth = 1990;
    if (passedTest) {
        firstName = "John";
        // yearOfBirth = 1990; //cannot change value so have to define early
    }
    // console.log(firstName + " " + yearOfBirth);
}

driversLicense(true);

// two of these is are different
let i = 23;
for (let i = 0; i < 5; i++) {
    // console.log(i);
}
//0 1 2 3 4
// console.log(i);
//23

// two of these is are different
// because they are not block scope, j will be overwritten
var j = 23;
for (var j = 0; j < 5; j++) {
    // console.log(j);
}
//0 1 2 3 4
// console.log(j);
//5

// ES6 Blocks and IIFEs
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b); //will be undefined because let and const are block scope
// console.log(c); //c will return because its not block scope

// ES5 IIFE
(function() {
    const a = 1;
    let b = 2;
})();

// console.log(a + b);

/* ========== Strings  ========== */
let firstName = "john";
let lastName = "smith";
const yearOfBirth = 1990;
function calcAge(year) {
    return 2016 - year;
}

// ES5
// console.log(
//     "This is " +
//         firstName +
//         " " +
//         lastName +
//         ". He was born in " +
//         yearOfBirth +
//         ". Today, he is " +
//         calcAge(yearOfBirth) +
//         " years old",
// );

//ES6 - template literals
// console.log(
// `This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(
//     yearOfBirth,
// )} years old.`,
// );

const n = `${firstName} ${lastName}`;
// console.log(n.startsWith("j")); //case sensitive 'john' - true
// console.log(n.endsWith("th")); //'smith' - true
// console.log(n.includes(" ")); //includes space or not - true
// console.log(n.includes("oh")); //includes oh -> "j*oh*n"- true
// console.log(`${firstName} `.repeat(5)); //repeat john 5 times with a space at the end

/* ========== Arrow function ========== */
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el, index) {
    return 2016 - el;
});

console.log(ages5);

//ES6 - arrow function
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}`;
});

console.log(ages6);
