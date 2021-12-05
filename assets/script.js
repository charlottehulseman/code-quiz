var score = 0;
var questionIndex = 0;
var timerDiv = document.querySelector("#timerDiv");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var createUl = document.createElement("ul");

var questions = [
{
    title: "Which programming language is the most popular for game development?",
    choices: [
    "Ruby",
    "Python",
    "C++",
    "Rocket science"
    ],
    answer: "C++"
    },{
    title: "Which data type represents the two logic values, true and false?",
    choices: [
    "Number",
    "String",
    "010101",
    "Boolean"
    ],
    answer: "Boolean",
    },{
    title: "Which programming language has the highest level of abstraction?",
    choices:[
    "Python",
    "Fortran",
    "Binary code",
    "C"
    ],
    answer: "Python",
    },{
    title: "Which is the correct CSS syntax?",
    choices:[
    "{body;color:black;}",
    "body {color: black;}",
    "body:color=black;",
    "{body:color=black;}"
    ],
    answer: "body {color: black;}",
    },
]

// starts timer upon button click
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timerDiv.textContent = "Time remaining: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                timerDiv.textContent = "Time's up! I win.";
            }
        }, 1000);
    }
    render(questionIndex);
});

// renders questions and answers to page
function render(questionIndex) {
    // Clears answers 
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";
    // For loops for questions
    for (var i = 0; i < questions.length; i++) {
        // only title is consistent
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! Your answer:  " + questions[questionIndex].answer;
           
        } else {
            // deduct time
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Whoops! Correct answer:  " + questions[questionIndex].answer;
        }

    }
    // checks which question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "Thanks for playing! You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// final page
function allDone() {
    questionsDiv.innerHTML = "";
    timerDiv.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);

    
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    // time remaining
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

// creating html elements throughout quiz
var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);

var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

// documents score with initials
createSubmit.addEventListener("click", function () {
    var initials = createInput.value;
    if (initials === null) {
        console.log("No initials entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var allHighScores = localStorage.getItem("allHighScores");
        if (allHighScores === null) {
            allHighScores = [];
        } else {
            allHighScores = JSON.parse(allHighScores);
        }
        allHighScores.push(finalScore);
        var newScore = JSON.stringify(allHighScores);
        localStorage.setItem("allHighScores", newScore);
    
        window.location.replace("./highscores.html");
    }
});

}
