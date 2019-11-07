// var john = {
//     name: "john",
//     yearOfBirth: 1990,
//     job: "teacher",
// };

// var Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// };

// // inheritance using prototype
// Person.prototype.calculateAge = function() {
//     // console.log(2016 - this.yearOfBirth);
// };

// Person.prototype.lastName = "Smith";

// var john = new Person("John", 1990, "teacher");
// var jane = new Person("Jane", 1969, "designer");
// var mark = new Person("mark", 1948, "retired");

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// the property is not in the constructor but we can access it
// console.log(john.lastName, jane.lastName, mark.lastName);

/* ========== Object.create ========== */
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    },
};

var john = Object.create(personProto);
john.name = "john";
john.yearOfBirth = 1998;
john.job = "teacher";

var jane = Object.create(personProto, {
    name: { value: "Jane" },
    yearOfBirth: { value: 1969 },
    job: { value: "designer" },
});

/* ========== Primitives vs objects ========== */
var a = 23;
var b = a;
a = 46;
// console.log(a);
// console.log(b);

var obj1 = {
    name: "john",
    age: 26,
};
var obj2 = obj1;
obj1.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);
// it will show the same age because we are not
// copying the value we are just copying the reference so they are both pointing to the same place now

// Function
var age = 27;
var obj = {
    name: "jonas",
    city: "libson",
};
function change(a, b) {
    a = 30;
    b.city = "san fran";
}

change(age, obj);
console.log(age);
console.log(obj.city);

//passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc(arr, fn) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(fn(arr[i]));
    }
    return result;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - 0.67 * el);
    } else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
// console.log(ages);
// console.log(fullAges);
// console.log(rates);

/* ========== functions return functions ========== */
function interviewQuestion(job) {
    if (job === "designer") {
        return function(name) {
            console.log(name + ", can you design");
        };
    } else if (job === "teacher") {
        return function(name) {
            console.log(name + " what you teach");
        };
    } else {
        return function(name) {
            console.log(name + " what you do");
        };
    }
}

var teacherQuestion = interviewQuestion("teacher");
var designerQuestion = interviewQuestion("designer");
teacherQuestion("John");
designerQuestion("JOhn");

// another way to do is
interviewQuestion("teacher")("Mark");
