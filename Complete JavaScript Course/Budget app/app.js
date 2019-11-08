/* ========== budget controller ========== */
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // using the prototype chain
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = (this.value / totalIncome) * 100;
        } else {
            this.percentage = -1;
        }
    };

    //return the percentage
    Expense.prototype.getPercentage = function() {
        return this.percentage;
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

        //we nede to know what is the type and the id
        deleteItem: function(type, id) {
            var ids, index;
            // ids = [1 2 4 6 8]
            // we want the index of the id, say id 6, then we get the index which is 3
            // map returns a brand new array
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            //so basically here we are retrieving the array (inc/exp),
            // map them out and return their ids in a new array

            index = ids.indexOf(id); //this will equal 3

            // delete item from array
            if (index !== -1) {
                data.allItems[type].splice(index, 1); //at number 3 remove 1 item
            }
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

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(curr) {
                curr.calcPercentage(data.totals.inc); //need to pass in total income
            });
        },

        //since we want the result so we should use map because map returns a new array
        getPercentages: function() {
            //loop all the exp items, and create a new array and fill it with each percentage
            var allPercentages = data.allItems.exp.map(function(curr) {
                return curr.getPercentage();
            });
            //return the whole array
            return allPercentages;
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
        container: ".container",
        expensesPercLabel: ".item__percentage",
    };

    // set it to private function
    var formatNumber = function(num, type) {
        var numSplit, int, dec, sign;
        /*  + or - before number
            2 decimal points
            comma separating thousands
            e.g. 2310.4567 -> + 2,310.46
        */
        num = Math.abs(num);
        num = num.toFixed(2); //set decimal point
        numSplit = num.split(".");
        int = numSplit[0];
        console.log(int);
        if (int.length > 3) {
            int =
                int.substr(0, int.length - 3) +
                "," +
                int.substr(int.length - 3, 3); //substr(start position, read how many element)
        }
        dec = numSplit[1];

        // type === "exp" ? (sign = "-") : (sign = "+");
        // return type + " " + int + dec;
        //better way to do it
        return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
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
                    '<div class="item clearfix" id="inc-%id%"> ' +
                    '<div class="item__description">%description%</div> ' +
                    '<div class="right clearfix"> ' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__delete"> <button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div> </div> </div>';
            } else if (type === "exp") {
                element = DOMstrings.expensesContainer;
                html =
                    '<div class="item clearfix" id="exp-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div>' +
                    '<div class="item__percentage">21%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i>' +
                    "</button></div></div></div>";
            }
            // Replace the palceholder text with some actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

            // INsert HTML to the DOM
            // it will be insert as child of the container
            document
                .querySelector(element)
                .insertAdjacentHTML("beforeend", newHtml);
        },

        deleteListItem: function(selectorID) {
            // selectorID = income-0 etc
            // right now we are getting the parent node and delete the child
            // DOM API - https://blog.garstasio.com/you-dont-need-jquery/dom-manipulation/
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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
            var type;
            obj.budget > 0 ? (type = "inc") : (type = "exp");
            document.querySelector(
                DOMstrings.budgetLabel,
            ).textContent = formatNumber(obj.budget, type);
            document.querySelector(
                DOMstrings.incomeLabel,
            ).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(
                DOMstrings.expensesLabel,
            ).textContent = formatNumber(obj.totalExp, "exp");

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    "---";
            }
        },

        displayPercentages: function(percentages) {
            //receive array
            var fields = document.querySelectorAll(
                DOMstrings.expensesPercLabel,
            ); //return a node list
            // just like before since node list does not have the forEach method,
            // we can apply slice and use call to make it into an array

            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i); //list[i], i is the current,index in nodeListForEach
                    //now we can access current and index because we pass it into the callback
                }
            };
            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "---";
                }
            });
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

        // implementing event delegation, because the item does not exist yet
        // container is the parent of the button
        document
            .querySelector(DOM.container)
            .addEventListener("click", ctrlDeleteItem);
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

    var updatePercentages = function() {
        // percentages changes when items are added or removed
        //1. Calculate percentages
        budgetCtrl.calculatePercentages();
        //2. read from budget controller
        var percentages = budgetCtrl.getPercentages();
        // console.log(percentages);
        //3. update the ui with the new percentages
        UICtrl.displayPercentages(percentages);
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

        //6. calculate the update percentages
        updatePercentages();
    };

    var ctrlDeleteItem = function(event) {
        // we need the event to know our target element
        // console.log(event.target);
        //if we are clicking on a child element but we want the parent we can do
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //this is hardcoded not so good but it will do
        if (itemID) {
            //classnames: inc-1, exp-1
            splitID = itemID.split("-"); //return array with splitted elements ["inc", "1"]
            type = splitID[0];
            ID = parseInt(splitID[1]); //*its passing in string here, so we use parseInt to solve

            //1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID); //*since its string, ID cannot be used to compare
            //2. delete the item from the UI
            UICtrl.deleteListItem(itemID); //itemID will be income-0 etc
            //3. update and show the new budget
            updateBudget();
            //4. update percentage
            updatePercentages();
        }
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
