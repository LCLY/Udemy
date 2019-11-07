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
// console.log(age);
// console.log(obj.city);

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
            // console.log(name + ", can you design");
        };
    } else if (job === "teacher") {
        return function(name) {
            // console.log(name + " what you teach");
        };
    } else {
        return function(name) {
            // console.log(name + " what you do");
        };
    }
}

var teacherQuestion = interviewQuestion("teacher");
var designerQuestion = interviewQuestion("designer");
teacherQuestion("John");
designerQuestion("JOhn");

// another way to do is
interviewQuestion("teacher")("Mark");

/* ========== Immediately Invoke function expression ========== */
function game() {
    var score = Math.random() * 10;
    // console.log(score >= 5);
}
game();
// this is IIFE
(function() {
    var score = Math.random() * 10;
    // console.log(score >= 5);
})();
// this can provide data privacy, it is its own little world/scope

(function(goodLuck) {
    var score = Math.random() * 10;
    // console.log(score >= 5 - goodLuck);
})(5);

/* ========== Closures ========== */
function retirement(retirementAge) {
    var a = " years left until retirement.";
    return function(yearOfBirth) {
        var age = 2019 - yearOfBirth;
        // console.log(retirementAge - age + a);
    };
}

var retirementUS = retirement(66);
retirementUS(1990);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990);
retirement(66)(1990); //this is basically same as the 2 lines above

// with closure
function interviewQuestionClosure(job) {
    return function(name) {
        if (job === "designer") {
            console.log(name + ", can you design");
        } else if (job === "teacher") {
            console.log(name + " what you teach");
        } else {
            console.log(name + " what you do");
        }
    };
}

// interviewQuestionClosure("teacher")("John");

/* ========== Bind, call and apply ========== */
var john = {
    name: "john",
    age: 26,
    job: "teacher",
    presentation: function(style, timeOfDay) {
        if (style === "formal") {
            console.log(
                "Good " +
                    timeOfDay +
                    ", Ladies and gentleman! I'm " +
                    this.name +
                    ", I'm a " +
                    this.job +
                    " and I'm " +
                    this.age +
                    " years old.",
            );
        } else if (style === "friendly") {
            console.log(
                "Whatsup I'm " +
                    this.name +
                    ", I'm a " +
                    this.job +
                    " and I'm " +
                    this.age +
                    " years old. Have a nice " +
                    timeOfDay +
                    ".",
            );
        }
    },
};

var emily = {
    name: "Emily",
    age: 35,
    job: "designer",
};

// john.presentation("formal", "morning");

//method borrowing, by using call, 'this' will refer to emily (set the this method)
// john.presentation.call(emily, "friendly", "afternoon");

// apply accepts array
// john.presentation.apply(emily, ["friendly", "afternoon"]); //this will not work because the method doesnt expect array

// bind is similar to call, we can set this var explicitly,
// it doesnt immediately call the function, instead it generates a copy of the function so we can store it somewhere
var johnFriendly = john.presentation.bind(john, "friendly");
// johnFriendly("morning");
// johnFriendly("night");
// johnFriendly("afternoon");
//this is call carrying -  technique which we create a function based on another function with some preset params

var emilyFormal = john.presentation.bind(emily, "formal");
// emilyFormal("morning");

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

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20)); //el is passed in from arrayCalc
// console.log(ages);
// console.log(fullJapan);

// want to add argument to callback then can use bind
