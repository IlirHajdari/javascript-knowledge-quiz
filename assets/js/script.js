// Quiz Global Variables
var textEl = document.querySelector("#question-title");
var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var scoreResults = document.querySelector("#score-results");
var viewHighScore = document.querySelector(".high-score");
var countdownTimer;
var questionCount = 0;
var storeScore = [];

// The different buttons of the quiz
var startButtonEl = document.querySelector("#start-quiz");
var aButtonEl = document.querySelector("#a");
var bButtonEl = document.querySelector("#b");
var cButtonEl = document.querySelector("#c");
var dButtonEl = document.querySelector("#d");
var submitButtonEl = document.querySelector("#submit");
var buttonEl = document.querySelector(".answers");
var returnButtonEl = document.querySelector("#return");
var clearButtonEl = document.querySelector("#clear");

// User input. Allows user to input initials
var initialsEl = document.querySelector("#initials");

// The different sections of the quiz
var introSection = document.querySelector(".intro-section");
var questionSection = document.querySelector(".question-section");
var highscoreSection = document.querySelector(".high-score-section");
var dashboardSection = document.querySelector(".dashboard-section");

//Question Array that is displayed to the user throughout the quiz
const questionArr = [
  {
    text: "Which of the following is used to declare a variable in JavaScript?",
    a: "1. var",
    b: "2. let",
    c: "3. const",
    d: "4. All of the above",
    answer: "4. All of the above",
  },
  {
    text: "What does the '===' operator do in JavaScript?",
    a: "1. Assigns a value",
    b: "2. Compares values and types",
    c: "3. Compares values only",
    d: "4. Concatenates strings",
    answer: "2. Compares values and types",
  },
  {
    text: "How do you create a function in JavaScript?",
    a: "1. function myFunction(){}",
    b: "2. createFunction myFunction(){}",
    c: "3. definFunction myFunction(){}",
    d: "4. makeFunction myFunction(){}",
    answer: "1. function myFunction(){}",
  },
  {
    text: "How can you add an event listener to an element?",
    a: "1. element.addEventListener('click',function(){});",
    b: "2. element.onClick(function(){});",
    c: "3. element.on('click',function(){});",
    d: "4. element.addEvent('click',function(){});",
    answer: "1. element.addEventListener('click',function(){});",
  },
  {
    text: "Which method is used to remove an element from the beginning of an array?",
    a: "1. pop()",
    b: "2. unshift()",
    c: "3. shift()",
    d: "4. slice()",
    answer: "3. shift()",
  },
];

// Timer
var timeLeft = 75;
var countdown = function () {
  countdownTimer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      document.getElementById("timer").innerHTML = "Finished";
    } else {
      document.getElementById("timer").innerHTML = "Time: " + timeLeft;
    }
    timeLeft -= 1;
  }, 1000);
};

// Initial quiz section
var displayNextQuestion = function () {
  if (questionCount < questionArr.length) {
    answersEl.textContent = "";
    var question = document.createElement("div");

    question.setAttribute("id", "question-div");
    console.log(questionCount);

    var text = questionArr[questionCount].text;
    textEl.textContent = text;
    var a = questionArr[questionCount].a;
    aButtonEl.textContent = a;
    var b = questionArr[questionCount].b;
    bButtonEl.textContent = b;
    var c = questionArr[questionCount].c;
    cButtonEl.textContent = c;
    var d = questionArr[questionCount].d;
    dButtonEl.textContent = d;
    console.log(text);
  }
};

// if-else to allow the user to click on the buttons for different questions/answers
[aButtonEl, bButtonEl, cButtonEl, dButtonEl].forEach(function (button) {
  button.addEventListener("click", function (event) {
    console.log(event.target.textContent, questionArr[questionCount].answer);

    if (event.target.textContent === questionArr[questionCount].answer) {
      answersEl.textContent = "Correct";
    } else {
      answersEl.textContent = "Wrong!";
      timeLeft = timeLeft - 10;
    }
    questionCount++;

    if (questionCount < questionArr.length) {
      setTimeout(displayNextQuestion, 500);
    } else {
      questionSection.classList.add("display");
      document.getElementById("final-score").textContent =
        "Final score: " + timeLeft;
      highscoreSection.classList.remove("display");
      console.log("stop");
      clearInterval(countdownTimer);
    }
  });
});

// Function to display score to user at the end of the quiz
var displayScore = function () {
  var initialInput = JSON.parse(localStorage.getItem("initialInput"));
  if (initialInput) {
    storeScore = initialInput;
    scoreResults.textContent = "";
    for (i = 0; i < storeScore.length; i++) {
      var li = document.createElement("li");
      li.textContent = storeScore[i];
      scoreResults.appendChild(li);
    }
  }
};
displayScore();

// Start button, allows user to start the quiz
startButtonEl.addEventListener("click", function () {
  countdown();
  questionSection.classList.remove("display");
  introSection.classList.add("display");
  displayNextQuestion();
});

// Submit button, allows users to submit initials and score at the end of the test
submitButtonEl.addEventListener("click", function () {
  storeScore.push(
    initialsEl.value + " - " + timerEl.textContent.replace("Time:", "")
  );
  localStorage.setItem("initialInput", JSON.stringify(storeScore));
  highscoreSection.classList.add("display");
  dashboardSection.classList.remove("display");
  displayScore();
});

// View highscore link, allows users to click and view scores
viewHighScore.addEventListener("click", function () {
  introSection.classList.add("display");
  dashboardSection.classList.remove("display");
});

// Return button, resets the timer and the questionCount and returns user to beginning screen
returnButtonEl.addEventListener("click", function () {
  // Reset the timer
  timeLeft = 75;
  timerEl.textContent = "Time: 75";
  questionCount = 0;
  introSection.classList.remove("display");
  dashboardSection.classList.add("display");
  highscoreSection.classList.add("display");
  questionSection.classList.add("display");
  answersEl.textContent = "";
});

// Clear button, clears the users scores
clearButtonEl.addEventListener("click", function () {
  localStorage.removeItem("initialInput");
  scoreResults.innerHTML = "";
});
