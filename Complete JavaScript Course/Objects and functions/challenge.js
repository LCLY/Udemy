// var gamePlaying = false;
// var Question = function(question, answer, correctAnswer) {
//     this.question = question;
//     this.answer = answer;
//     this.correctAnswer = correctAnswer;
//     this.displayQuestion = function() {
//         gamePlaying = true;
//         console.log(this.question);
//         if (gamePlaying) {
//             for (var i = 0; i < this.answer.length; i++) {
//                 console.log(i + ": " + this.answer[i]);
//             }
//             var answer = prompt("Type in your answer");
//             checkCorrectAnswer(answer, this.correctAnswer);
//         }
//     };
// };

// function checkCorrectAnswer(answer, correctAnswer) {
//     if (parseInt(answer) === correctAnswer) {
//         console.log("correct!");
//         nextRandomQuestion();
//     } else if (answer === "exit") {
//         gamePlaying = false;
//     } else {
//         console.log("incorrect");
//         nextRandomQuestion();
//     }
// }

// function nextRandomQuestion() {
//     questions[Math.floor(Math.random() * questions.length)].displayQuestion();
// }

// var question1 = new Question(
//     "Is Javascript the coolest programming language in the world",
//     ["yes", "no"],
//     0,
// );

// var question2 = new Question("Are you excited", ["yes", "no"], 0);
// var question3 = new Question("Is Javascript hard", ["yes", "no"], 1);

// var questions = [question1, question2, question3];
// questions[Math.floor(Math.random() * questions.length)].displayQuestion();

/* ========== solution ========== */
// include the whole block of code into the II
// (function() {
//     function Question(question, answers, correct) {
//         this.question = question;
//         this.answers = answers;
//         this.correct = correct;
//     }

//     Question.prototype.displayQuestion = function() {
//         console.log(this.question); //this will point to respective q
//         for (var i = 0; i < this.answers.length; i++) {
//             console.log(i + ": " + this.answers[i]);
//         }
//     };

//     Question.prototype.checkAnswer = function(ans) {
//         if (ans === this.correct) {
//             console.log("correct answer");
//         } else {
//             console.log("Wrong asnwer. Try again");
//         }
//     };

//     var q1 = new Question("Is js coolest", ["Yes", "No"], 0);
//     var q2 = new Question(
//         "name of this course's instructor",
//         ["John", "Michael", "jonas"],
//         2,
//     );
//     var q3 = new Question(
//         "What best describe coding",
//         ["Boring", "Hard", "Fun", "tedious"],
//         2,
//     );

//     var questions = [q1, q2, q3];
//     var n = Math.floor(Math.random() * questions.length);
//     questions[n].displayQuestion();
//     var answer = parseInt(prompt("Please select the correct answer"));
//     questions[n].checkAnswer(answer);
// })();

(function() {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question); //this will point to respective q
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ": " + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function(ans, callback) {
        var sc;
        if (ans === this.correct) {
            console.log("correct answer");
            sc = callback(true);
        } else {
            console.log("Wrong asnwer. Try again");
            sc = callback(false);
        }
        this.displayScore(sc);
    };

    Question.prototype.displayScore = function(score) {
        console.log("Your current score is: " + score);
        console.log("------------------------------------");
    };

    var q1 = new Question("Is js coolest", ["Yes", "No"], 0);
    var q2 = new Question(
        "name of this course's instructor",
        ["John", "Michael", "jonas"],
        2,
    );
    var q3 = new Question(
        "What best describe coding",
        ["Boring", "Hard", "Fun", "tedious"],
        2,
    );
    var questions = [q1, q2, q3];

    function score() {
        var score = 0;
        return function(correct) {
            if (correct) {
                score++;
            }
            return score;
        };
    }

    var keepScore = score();

    function nextQuestion() {
        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();
        var answer = prompt("Please select the correct answer");

        if (answer !== "exit") {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();
})();
