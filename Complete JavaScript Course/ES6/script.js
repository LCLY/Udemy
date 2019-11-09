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
// function driversLicense(passedTest) {
//     let firstName;
//     const yearOfBirth = 1990;
//     if (passedTest) {
//         firstName = "John";
//         // yearOfBirth = 1990; //cannot change value so have to define early
//     }
//     // console.log(firstName + " " + yearOfBirth);
// }

// driversLicense(true);

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
// let firstName = "john";
// let lastName = "smith";
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

// const n = `${firstName} ${lastName}`;
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

// console.log(ages5);

//ES6 - arrow function
let ages6 = years.map(el => 2016 - el);
// console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
// console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}`;
});

// console.log(ages6);

// ES5
var box5 = {
    color: "green",
    position: 1,
    clickMe: function() {
        var self = this; //fixed
        document.querySelector(".green").addEventListener("click", function() {
            alert(
                "This box number is " +
                    self.position +
                    " the color of the box is " +
                    self.color,
            );

            // alert(
            //     "This box number is " +
            //         this.position +
            //         " the color of the box is " +
            //         this.color,
            // );
            //this will give error of undefined
        });
    },
};
// this will get us undefined values for positon and color because the function inside the addeventlistener
// is a normal function call instead of method call, so it will point to the window/global object

// so to fix it we store this into a variable and use it
// var self = this
// box5.clickMe();

//ES6 - by using arrow function we can avoid the issue easily
const box6 = {
    color: "green",
    position: 1,
    clickMe: function() {
        var self = this; //fixed
        document.querySelector(".green").addEventListener("click", () => {
            alert(
                "This box number is " +
                    this.position +
                    " the color of the box is " +
                    this.color,
            );
        });
    },
};

// box6.clickMe();
//if change the outside function to arrow as well it will return undefined because of arrow functoin
// this becomes lexical and this will be pointing to global in this case causing it to be undefined
// so becareful!!!
// const box66 = {
//     color: "green",
//     position: 1,
//     clickMe: () => {
//         var self = this; //fixed
//         document.querySelector(".green").addEventListener("click", () => {
//             alert(
//                 "This box number is " +
//                     this.position +
//                     " the color of the box is " +
//                     this.color,
//             );
//         });
//     },
// };

// box66.clickMe();

//ES5
// function Person(name) {
//     this.name = name;
// }

// Person.prototype.myFriends5 = function(friends) {
//     var arr = friends.map(
//         function(el) {
//             //* because of the function here this pointing to global again
//             return this.name + " is friends with " + el;
//         }.bind(this), //by doing bind(this), we are getting the this from outside which is now still pointing to John and it creates a new copy of the function but using this as reference
//     );
//     console.log(arr);
// };

// var friends = ["Bob", "jane", "mark"];
// new Person("John").myFriends5(friends); //* this would not print John because of this refering to global again

// // ES6
// Person.prototype.myFriends6 = function(friends) {
//     var arr = friends.map(el => `${this.name} is friends with ${el}`);
//     console.log(arr);
// };
// new Person("Mike").myFriends6(friends);

/* ========== Destructuring ========== */
// ES5
// var john = ["John", 26];
// var name = john[0];
// var age = john[1];

// ES6
const [name, age] = ["John", 26]; //this is called destructure
// each value will be stored in name and age respectively
// console.log(name, age);

const obj = {
    firstName: "John",
    lastName: "Smith",
};
// since the obj is constructed using {}, we also use {} to destruct
// they (the destructure keys) have to match the property name
const { firstName, lastName } = obj;

// console.log(firstName, lastName);

const { firstName: a, lastName: b } = obj;
// console.log(a, b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
const [age2, retirement] = calcAgeRetirement(1990);
// console.log(age2, retirement);

// arrays
// const boxes = document.querySelectorAll(".box"); //return node list
//do slice to copy into a new array

// ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(cur) {
//     cur.style.backgroundColor = "dodgerblue";
// });

// ES6
// const boxesArr6 = Array.from(boxes);
// Array.from(boxes).forEach(cur => (cur.style.backgroundColor = "dodgerblue"));

// ES5
// for (var j = 0; j < boxesArr5.length; j++) {
//     //boxesArr5 is array of element node list
//     if (boxesArr5[j].className === "box blue") {
//         continue;
//     }
//     boxesArr5[j].textContent = "I changed to blue";
// }

// ES6 - nice way to loop through array
// for (const cur of boxesArr6) {
//     if (cur.className.includes("blue")) {
//         continue;
//     }
//     cur.textContent = "I changed to blue";
// }

// ES5
var ages = [12, 17, 8, 21, 14, 11];

// map returns a new array
var full = ages.map(function(cur) {
    return cur >= 18;
});
// console.log(full);
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);

// ES6 - findIndex, find
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18));

/* ========== spread operator ========== */
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1);

// now we will pass in array instead of 4 different values
// ES5

var ages = [18, 30, 12, 21, 30];
// apply receives array, it calls function that the apply method is used on by using the elements
// of the array as the arguments
var sum2 = addFourAges.apply(null, ages);
// console.log(sum2);

// ES6
// spread operator expands array into its element
// or to obtain a list of parameters from an array.
const sum3 = addFourAges(...ages); //here its the same as writing 18,30,12,21
// console.log(...ages);
// console.log(sum3);

const familySmith = ["John", "Jane", "Mark"];
const familyMiller = ["Mary", "Bob", "Ann"];
const bigFamily = [...familySmith, ...familyMiller];
// console.log(bigFamily);

// can also be used on node list
const h = document.querySelector("h1");
const boxes = document.querySelectorAll(".box");
const all = [h, ...boxes]; //boxes is node list!
Array.from(all).forEach(cur => (cur.style.color = "purple")); //use from to convert them into array then apply forEach

/* ========== rest parameters ========== */
// ES5
// function isFullAge5() {
//     // arguments is special var
//     // console.log(arguments);
//     // arguments is not array so we have to transform it to array
//     var argsArr = Array.prototype.slice.call(arguments);
//     argsArr.forEach(function(cur) {
//         // console.log(2019 - cur >= 18);
//     });
// }
// // even if there are different number of arguments, it still works
// isFullAge5(1990, 2001, 1965);
// isFullAge5(1990, 2001, 1965, 2016, 1987);

// // ES6
// // ...years will transform the arguments into an array and pass them into the function
// function isfullAge6(...years) {
//     // console.log(years); //this is array
//     years.forEach(cur => console.log(2019 - cur >= 18));
// }

// isfullAge6(1900, 2020, 1995, 1969);

// now if we have an argument in the function itself,
// then we will have to add one more argument when calling the function
// ----> isFullAge5(21, 1990, 2001, 1965)

// adding argument
function isFullAge5(limit) {
    // console.log(arguments);
    // so basically what we do here is we cut the first element out and copy the rest of the array
    var argsArr = Array.prototype.slice.call(arguments, 1);
    argsArr.forEach(function(cur) {
        console.log(2019 - cur >= limit);
    });
}
// because of the new argument, we have to add one more step of creating a new array with new elements
// but ES6, we just add the argument into the function param and add the spread operator
isFullAge5(10, 1990, 2001, 1965);

// ES6 - adding argument

function isfullAge6(limit, ...years) {
    years.forEach(cur => {
        console.log(years);
        console.log(2019 - cur >= limit);
    });
}

isfullAge6(16, 1900, 2020, 1995, 1969);
