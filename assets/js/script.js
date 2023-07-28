const quizContainer = document.querySelector(".quiz-container");
const timerElement = document.querySelector(".timer");
const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const resultElement = document.getElementById("result");
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const highScoresList = document.getElementById("highscores-list");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");

const questions = [
  {
    question: "Which famous space telescope has provided incredible images of distant galaxies and nebulae?",
    options: ["Keplar", "Hubble", "James Webb", "Chandra X-ray"],
    correctAnswer: "Hubble",
  },
  {
    question: "What is the name of the first artificial satellite launched into space?",
    options: ["Sputnik1", "Explorer1", "Vanguard1", "Telstar1"],
    correctAnswer: "Sputnik1",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Venus", "Saturn", "Jupiter", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    question: "What is the phenomenon that occurs when a star collapses under its own gravity, leading to an incredibly dense object with high gravitational pull?",
    options: ["Supernova", "White Dwarf", "Black Hole", "Neutron Star"],
    correctAnswer: "Black Hole",
  },
  {
    question: "Which of these planets is known as the Red Planet due to its reddish appearance?",
    options: ["Venus", "Mercury", "Jupiter", "Mars"],
    correctAnswer: "Mars",
  },
];


document.getElementById("start-btn").addEventListener("click", startQuiz);


function startQuiz() {
  quizContainer.style.display = "block";
  document.querySelector(".intro-container").style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}


function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  if (timeLeft <= 0) {
    endQuiz();
  }
}


function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option");
    optionButton.dataset.option = index + 1;
    optionButton.addEventListener("click", checkAnswer);
    optionsContainer.appendChild(optionButton);
  });
}


function checkAnswer(event) {
  const selectedOption = event.target;
  const selectedAnswer = questions[currentQuestionIndex].options[selectedOption.dataset.option - 1];

  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Wrong!";
    timeLeft -= 10;
  }

  currentQuestionIndex++;
  setTimeout(() => {
    resultElement.textContent = "";
    showQuestion();
  }, 1000);
}


function endQuiz() {
  clearInterval(timerInterval);

  quizContainer.style.display = "none";
  initialsForm.style.display = "block";

  initialsForm.addEventListener("submit", saveScore);
}


function saveScore(event) {
  event.preventDefault();

  const initials = initialsInput.value.trim().toUpperCase();

  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }

  const scoreData = {
    initials: initials,
    score: timeLeft,
  };

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(scoreData);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.href = "highscores.html";
}


function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScoresList.innerHTML = "";

  if (highScores.length === 0) {
    const noScoresItem = document.createElement("li");
    noScoresItem.textContent = "No high scores yet.";
    highScoresList.appendChild(noScoresItem);
  } else {
    highScores.forEach((scoreData) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${scoreData.initials} - ${scoreData.score}`;
      highScoresList.appendChild(listItem);
    });
  }
}


if (document.title === "Quiz Game") {
  displayHighScores();
} else if (document.title === "High Scores") {
  displayHighScores();
} else {
  document.getElementById("start-btn").style.display = "block";
}