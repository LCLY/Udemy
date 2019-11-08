/* ========== budget controller ========== */
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },

        budget: 0,
        percentage: -1,
    };

    var calculateTotal = function(type) {
        var sum = 0;
        // add callback func to forEach
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            //[1 2 3 4 5] next ID = 6
            //if something got removed
            //[1 2 4 6 8] next ID = 9
            //ID = Last ID + 1

            // Create new Id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                //what happen here is we get the array of certain type,
                //accessing the last element, get id and then + 1
            } else {
                ID = 0;
            }

            //create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            //push into array
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round(
                    (data.totals.exp / data.totals.inc) * 100,
                );
            } else {
                data.percentage = -1;
            }
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
        },
        testing: function() {
            console.log(data);
        },
    };
})();

// Immediately Invoke Function Expression
/* ========== UI controller ========== */
var UIController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
    };
    return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will getting either income or expenses
                description: document.querySelector(DOMstrings.inputDescription)
                    .value,
                value: parseFloat(
                    document.querySelector(DOMstrings.inputValue).value,
                ),
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html =
                    '<div class="item clearfix" id="income-%id%"> ' +
                    '<div class="item__description">%description%</div> ' +
                    '<div class="right clearfix"> ' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__delete"> <button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div> </div> </div>';
            } else if (type === "exp") {
                element = DOMstrings.expensesContainer;
                html =
                    '<div class="item clearfix" id="expense-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div>' +
                    '<div class="item__percentage">21%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i>' +
                    "</button></div></div></div>";
            }
            // Replace the palceholder text with some actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);

            // INsert HTML to the DOM
            // it will be insert as child of the container
            document
                .querySelector(element)
                .insertAdjacentHTML("beforeend", newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(
                DOMstrings.inputDescription + ", " + DOMstrings.inputValue,
            ); //it returns a list but we need array so we can use slice to convert it

            // fields.slice() will not work
            // so we can do array prototype and refer to fields
            fieldsArr = Array.prototype.slice.call(fields); //convert list to an array

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent =
                obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent =
                obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent =
                obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    "---";
            }
        },

        //now this is a public method for other controller to obtain the DOM strings
        getDOMstrings: function() {
            return DOMstrings;
        },
    };
})();

/* ========== controller ========== */
var controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document
            .querySelector(DOM.inputBtn)
            .addEventListener("click", ctrlAddItem); //we can make it a callback function here

        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                //which is for older browser
                ctrlAddItem();
            }
        });
    };
    var updateBudget = function() {
        //1. calculate the budget
        budgetCtrl.calculateBudget();

        //2. return the budget object
        var budget = budgetCtrl.getBudget();

        //3. display the budget
        // console.log(budget);
        UICtrl.displayBudget(budget);
    };

    //to not repeat yourself
    var ctrlAddItem = function() {
        var input, newItem;
        //1. Get the filled input data
        input = UICtrl.getinput();

        //should also check and prevent creating
        if (
            input.description !== "" &&
            input.value !== "" &&
            !isNaN(input.value) &&
            input.value > 0
        ) {
            //2. Add item to the budget controller
            newItem = budgetCtrl.addItem(
                input.type,
                input.description,
                input.value,
            );

            //3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);
        }

        //4. Clear the input field
        UICtrl.clearFields();

        //5. Calculate and update budget
        updateBudget();
    };

    return {
        init: function() {
            // initialization
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1, //because no percentage at first
            });
            setupEventListeners();
        },
    };
})(budgetController, UIController);

controller.init();
