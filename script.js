//we must first declare DOM elements in index.html as variables in this .js file
var startQuiz = document.getElementById("startQuiz");
var counter = document.getElementById("counter");
var questionNumber = document.getElementById("questionNumber");
var questionText = document.getElementById("questionText");
var answer1 = document.getElementById("answer1");
var answer1Button = document.getElementById("answer1Button");
var answer2 = document.getElementById("answer2");
var answer2Button = document.getElementById("answer2Button");
var answer3 = document.getElementById("answer3");
var answer3Button = document.getElementById("answer3Button");
var user1 = document.getElementById("user1");
var user2 = document.getElementById("user2");
var user3 = document.getElementById("user3");
var user4 = document.getElementById("user4");
var user5 = document.getElementById("user5");
var highScoreForm = document.getElementById("highScoreForm");
var userInitials = document.getElementById("userInitials");
var submitInitials = document.getElementById("submitInitials");
//questions, some the same as example
var questions = {
  1: {
    //declares question as the first one, value will change as user goes through quiz
    heading: "Question 1",
    //the question itself
    text: "Commonly used data types DO NOT include: ",
    //answers the user can choose from
    answers: ["String", "Boolean", "Shea"],
    //correct answer for each specific function is stored in the corresponding question object
    correctAnswer: 2,
  },
  2: {
    heading: "Question 2",
    text: "Who made Javascript?: ",
    answers: ["Steve Jobs", "Brendan Eich", "Bill Gates"],
    correctAnswer: 1,
  },
  3: {
    heading: "Question 3",
    text: "Arrays in Javascript can be used to store: ",
    answers: ["Other arrays", "Strings", "All of the above"],
    correctAnswer: 2,
  },
  4: {
    heading: "Question 4",
    text: "The condition in an if/else statements are enclosed with: ",
    answers: ["Parentheses", "Commas", "Hashtags"],
    correctAnswer: 0,
  },
  5: {
    heading: "Question 5",
    text: "String values must be ecnlosed with: ",
    answers: ["Exclamation marks", "Quotes", "Question marks"],
    correctAnswer: 1,
  },
  6: {
    heading: "Question 6",
    text: "var is used to: ",
    answers: ["Declare variable", "store id", "start function"],
    correctAnswer: 0,
  },
  7: {
    heading: "Question 7",
    text: "A method is: ",
    answers: ["A boolean value", "A string", "A function inside an object"],
    correctAnswer: 2,
  },
  8: {
    heading: "Question 8",
    text: "When was Javascript created?: ",
    answers: ["1995", "2007", "2001"],
    correctAnswer: 0,
  },
  9: {
    heading: "Question 9",
    text: "Which of the following is used to request data from an API?: ",
    answers: ["Jquery", "JSON", "Bootstrap"],
    correctAnswer: 1,
  },
  10: {
    heading: "Question 10",
    text: "Are Javascript and Java related?: ",
    answers: ["Yes", "No", "Maybe"],
    correctAnswer: 1,
  },
};
//console.log(questions);
//variables to be used in quiz function
//mainly variables to keep track of scores and time left of timer
var currentQuestion = 1;
var timer = 0;
var tmpTimer = 0;
var initials = "";
var answerSelected = 0;
var atEnd = 0;
var score = 0;
var newScorePosition = 0;
var highScores = [];
var tmpScores = localStorage.getItem("scores");

startQuiz.addEventListener("click", function () {
  // Hide the high score input form, reset variables, and display the first question.
  highScoreForm.setAttribute("class", "d-none");
  userInitials.value = "";
  // start the quiz
  active = 1;
  currentQuestion = 1;
  tmpTimer = 0;
  initials = "";
  answerSelected = 0;
  atEnd = 0;
  timer = 1000;
  displayQuestion(currentQuestion);
  // Start timer
  var timerInterval = setInterval(function () {
    if (atEnd === 0) {
      // have yet to finish the quiz, so timer continues to count down
      timer -= 1;
      counter.textContent = timer;
    } else {
      // Once user reaches the end, reset time and display time left
      active = 0;
      clearInterval(timerInterval);
      counter.textContent = tmpTimer;
    }
    if (timer <= 0 && atEnd === 0) {
      // Timer is done, game over, reset. need to finish questions
      clearInterval(timerInterval);
      timer = 0;
      counter.textContent = timer;
      active = 0;
      alert("Game Over! You ran out of time.");
      return;
    }
  }, 1000);
});
//creating event listeners for each button
answer1Button.addEventListener("click", function () {
  checkAnswer(currentQuestion, 0);
});

answer2Button.addEventListener("click", function () {
  checkAnswer(currentQuestion, 1);
});

answer3Button.addEventListener("click", function () {
  checkAnswer(currentQuestion, 2);
});

function displayQuestion(number) {
  // Change the heading and text
  questionNumber.innerHTML = questions[number].heading;
  questionText.innerHTML = questions[number].text;
  // Change the text for each corresponding answer
  answer1.childNodes[1].textContent = " " + questions[number].answers[0];
  answer2.childNodes[1].textContent = " " + questions[number].answers[1];
  answer3.childNodes[1].textContent = " " + questions[number].answers[2];
}

function checkAnswer(passCurrentQuestion, answerNumber) {
  // First must make sure the quiz/game is active
  if (active) {
    var questionAnswer = questions[passCurrentQuestion].correctAnswer;
    if (answerNumber === questionAnswer) {
      // Correct answer, move to the next question
      currentQuestion += 1;
      alert("Correct! Click OK or press Enter to continue.");
    } else {
      // Incorrect answer, subtract 50 from the clock and go to the next question
      alert(
        "Incorrect! 50 seconds will be deducted.  Click OK or press Enter to continue."
      );
      timer -= 50;
      currentQuestion += 1;
    }
    if (currentQuestion <= 10) {
      // Haven't reached the end, so display the next question.
      displayQuestion(currentQuestion);
    } else {
      // End of questions
      atEnd = 1;
      endSequence();
    }
  }
}
//stores high school for each user
function displayHighScores() {
  user1.textContent = highScores[0] + ": " + highScores[1];
  user2.textContent = highScores[2] + ": " + highScores[3];
  user3.textContent = highScores[4] + ": " + highScores[5];
  user4.textContent = highScores[6] + ": " + highScores[7];
  user5.textContent = highScores[8] + ": " + highScores[9];
}

if (tmpScores === null) {
  for (i = 0; i < 10; i += 2) {
    //if no high score available, "TBD" will be shown
    highScores[i] = "TBD";
    highScores[i + 1] = 0;
  }
  // This was first time, so save new array of TBD,0 to local storage
  localStorage.setItem("scores", JSON.stringify(highScores));
} else {
  // High scores already existed in local storage, so read into program variable
  highScores = JSON.parse(tmpScores);
}

// Now display high scores on screen
displayHighScores();
function endSequence() {
  // Deactivate game
  active = 0;
  // Capture timer value at end
  tmpTimer = timer;
  counter.textContent = tmpTimer;
  score = tmpTimer;
  alert("Complete! Your score was " + score);
  // Check to see if score is a high score
  for (i = 0; i < 10; i += 2) {
    if (score > highScores[i + 1]) {
      alert("You have a high score! Enter your initials below.");
      newScorePosition = i;
      highScoreForm.setAttribute("class", "d-block");
      break;
    }
  }
}
submitInitials.addEventListener("click", function (event) {
  event.preventDefault();
  // Add user to high scores array at proper position
  highScores.splice(newScorePosition, 0, userInitials.value, score);
  // Now there are 6 users in the array, so remove the last one
  highScores.splice(10, 2);
  // Now rebuild the high scores table
  displayHighScores();
  // And save the high scores to local storage
  localStorage.setItem("scores", JSON.stringify(highScores));
  // Hide the form again for entering initials
  highScoreForm.setAttribute("class", "d-none");
});
