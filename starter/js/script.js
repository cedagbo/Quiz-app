/*Define variables*/
var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#start");
var introPage = document.querySelector("#intro-page");

var questionPage = document.querySelector("#question-page");
var askQuestion = document.querySelector("#ask-question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer-btn1");
var answerBtn2 = document.querySelector("#answer-btn2");
var answerBtn3 = document.querySelector("#answer-btn3");
var answerBtn4 = document.querySelector("#answer-btn4");

var checkLine = document.querySelector("#check-line");
var scoreBoard = document.querySelector("#submit-page");
var finalScore = document.querySelector("#final-score");
var userInitial = document.querySelector("#initial");

var submitBtn = document.querySelector("#submit_btn");
var highScorePage = document.querySelector("#highscore-page");
var scoreRecord = document.querySelector("#score-record");
var scoreCheck = document.querySelector("#score-check");
var finish = document.querySelector("#finish");

var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");

// Define questions
var questionSource = [
  {
    question: "Commonly used data types Do Not Include:",
    choices: ["1. strings", "2. boolean", "3. alert", "4. numbers"],
    answer: "3",
  },
  {
    question: "The condition in an if/else statement is enclosed with _____",
    choices: [
      "1. quoted",
      "2. curly-brackets",
      "3. parenthesis",
      "4. square brackets",
    ],
    answer: "3",
  },
  {
    question: "Arrays in JavaScript can be used to store _____",
    choices: [
      "1. number and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quoted", "4. parenthesis"],
    answer: "3",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4",
  },
];

//Initialise timeLeft variable regarding the user input

var timeLeft = document.getElementById("timer");

var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

//Define the countdown function that prompts the user input
function countdown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeLeft.textContent = "Time left: " + secondsLeft + " s";

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeLeft.textContent = "Time is up!";
      // if time is up, show on score board content instead of "all done!"
      finish.textContent = "Time is up!";
      gameOver();
    } else if (questionCount >= questionSource.length + 1) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

// Click the start button to launch the quiz
function startQuiz() {
  introPage.style.display = "none";
  questionPage.style.display = "block";
  questionNumber = 0;
  countdown();
  showQuestion(questionNumber);
}
// Let us introduce the questions to the user
function showQuestion(n) {
  askQuestion.textContent = questionSource[n].question;
  answerBtn1.textContent = questionSource[n].choices[0];
  answerBtn2.textContent = questionSource[n].choices[1];
  answerBtn3.textContent = questionSource[n].choices[2];
  answerBtn4.textContent = questionSource[n].choices[3];
  questionNumber = n;
}

// Inform the user if his answer is correct or wrong
function checkAnswer(event) {
  event.preventDefault();
  //make it display
  checkLine.style.display = "block";
  setTimeout(function () {
    checkLine.style.display = "none";
  }, 1000);

  // Answer checking
  if (questionSource[questionNumber].answer == event.target.value) {
    checkLine.textContent = "Correct!";
    totalScore = totalScore + 1;
  } else {
    secondsLeft = secondsLeft - 10;
    checkLine.textContent =
      "Wrong! The correct answer is " +
      questionSource[questionNumber].answer +
      " .";
  }
  //THEN I am presented with another question
  if (questionNumber < questionSource.length - 1) {
    // call showQuestions to bring in next question when any reactBtn is clicked
    showQuestion(questionNumber + 1);
  } else {
    gameOver();
  }
  questionCount++;
}
//WHEN all questions are answered or the timer reaches 0, Game is over
function gameOver() {
  questionPage.style.display = "none";
  scoreBoard.style.display = "block";
  console.log(scoreBoard);
  // show final score
  finalScore.textContent = "Your final score is :" + totalScore;
  // clearInterval(timerInterval);
  timeLeft.style.display = "none";
}

// get current score and initials from the local storage
function getScore() {
  var currentList = localStorage.getItem("ScoreList");
  if (currentList !== null) {
    freshList = JSON.parse(currentList);
    return freshList;
  } else {
    freshList = [];
  }
  return freshList;
}

// Let us define renderScore function to the score board
function renderScore() {
  scoreRecord.innerHTML = "";
  scoreRecord.style.display = "block";
  var highScores = sort();
  // Slice the high score array to only show the top five high scores.
  var topFive = highScores.slice(0, 5);
  for (var i = 0; i < topFive.length; i++) {
    var item = topFive[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
  }
}

// sort score and ranking the highscore list
function sort() {
  var unsortedList = getScore();
  if (getScore == null) {
    return;
  } else {
    unsortedList.sort(function (a, b) {
      return b.score - a.score;
    });
    return unsortedList;
  }
}

// push new score and initial to the local storage
function addItem(n) {
  var addedList = getScore();
  addedList.push(n);
  localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

function saveScore() {
  var scoreItem = {
    user: userInitial.value,
    score: totalScore,
  };
  addItem(scoreItem);
  renderScore();
}

// Add event listeners
startBtn.addEventListener("click", startQuiz);

//Click any choices button, go to the next question
reactButtons.forEach(function (click) {
  click.addEventListener("click", checkAnswer);
});

//Save details and go to next page
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  scoreBoard.style.display = "none";
  introPage.style.display = "none";
  highScorePage.style.display = "block";
  questionPage.style.display = "none";
  saveScore();
});

// Check high scores list
scoreCheck.addEventListener("click", function (event) {
  event.preventDefault();
  scoreBoard.style.display = "none";
  introPage.style.display = "none";
  highScorePage.style.display = "block";
  questionPage.style.display = "none";
  renderScore();
});

//Allow the user to go back to the main page
backBtn.addEventListener("click", function (event) {
  event.preventDefault();
  scoreBoard.style.display = "none";
  introPage.style.display = "block";
  highScorePage.style.display = "none";
  questionPage.style.display = "none";
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  renderScore();
});
