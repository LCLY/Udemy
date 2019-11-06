///////////////////////////////////////
// Lecture: Hoisting

//this will work because the function is
// added to the global execution context in the variable object before execution
//so when executing it's already there

// functions
calculateAge(1500);

function calculateAge(year) {
    // console.log(2019 - year);
}

//this will give error because its not function declaration, its function expression
//retirement(1990);
var retirement = function(year) {
    console.log(65 - (2016 - year));
};

retirement(1990);

// variables
console.log(age); //this will show undefined because hoisting will assigned undefine to it
var age = 23; //this is assigned to global execution context

function foo() {
    var age = 65;
    console.log(age); //this is assigned to foo execution context
}
foo();
console.log(age);
//so in the end it will print 65 then 23

///////////////////////////////////////
// Lecture: Scoping

// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword
