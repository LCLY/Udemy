/* ========== budget controller ========== */
var budgetController = (function() {})();

// Immediately Invoke Function Expression
/* ========== UI controller ========== */
var UIController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
    };
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will getting either income or expenses
                description: document.querySelector(DOMstrings.inputDescription)
                    .value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        //now this is a public method for other controller to obtain the DOM strings
        getDOMstrings: function() {
            return DOMstrings;
        },
    };
})();

/* ========== controller ========== */
var controller = (function(budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();
    //to not repeat yourself
    var ctrlAddItem = function() {
        //1. Get the filled input data
        var input = UICtrl.getinput();
        console.log(input);

        //2. Add item to the budget controller
        //3. Add the new item to the UI
        //4. calculate the budget
        //5. display the budget
    };
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem); //we can make it a callback function here

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            //which is for older browser
            ctrlAddItem();
        }
    });
})(budgetController, UIController);
