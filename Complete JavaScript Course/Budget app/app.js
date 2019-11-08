var budgetController = (function() {
    var x = 23;
    var add = function(a) {
        return x + a;
    };
    // this way the methods are private
    //people can only usee the publicTest method instead of the add method, they wont have access to it
    return {
        publicTest: function(b) {
            return add(b); //because of closures, this method still have access to the variable in this function even though the outer function already return
        },
    };
})();

// Immediately Invoke Function Expression
var UIController = (function() {})();

var controller = (function(budgetCtrl, UICtrl) {
    var z = budgetCtrl.publicTest(5);
    return {
        anotherPublic: function() {
            console.log(z);
        },
    };
})(budgetController, UIController);
