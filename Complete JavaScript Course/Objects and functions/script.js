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
