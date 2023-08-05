const questions = [{
    question: 'Which is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn', 'Neptune'],
    answer: 2,
  }, {
    question: 'What is the largest moon in our solar system?',
    options: ['Europa', 'Titan', 'Ganymede', 'Enceladus', 'Triton'],
    answer: 2,
  }, {
    question: 'Which galaxy is the nearest neighbor to our Milky Way galaxy?',
    options: ['Andromeda', 'Triangulum', 'Pinwheel', 'Whirlpool', 'Sombrero'],
    answer: 0,
  }, {
    question: 'Which famous spacecraft was launched in 1977 and became the first human-made object to reach interstellar space?',
    options: ['Voyager1', 'Pioneer10', 'New Horizons', 'Cassini-Huygens', 'Juno'],
    answer: 0,
  }, {
    question: 'What is the phenomenon that occurs when a massive star reaches the end of its life and undergoes a tremendous explosion, briefly outshining an entire galaxy?',
    options: ['Supernova', 'Black Hole', 'Neutron Star', 'Quasar', 'Pulsar'],
    answer: 0,
  }];
  
  let timeLeft = 90;
  let currentQuestion = 0;
  let userScore = {};
  
  const timerSpan = document.querySelector("#timer");
  timerSpan.innerHTML = `Time Left: ${timeLeft}s`;
  
  const questionTitle = document.querySelector("#question");
  const questionContainer = document.querySelector("#question-options");
  const result = document.querySelector("#result");
  const containerEl = document.querySelector(".quiz-container");
  
  function displayQuestion(currentQuestion) {
    questionTitle.innerHTML = questions[currentQuestion].question;
    const options = questions[currentQuestion].options;
  
    for (let i = 0; i < options.length; i++) {
      const optionElement = questionContainer.children[i];
      optionElement.innerHTML = `${i + 1}. ${options[i]}`;
      optionElement.dataset.answer = i === questions[currentQuestion].answer;
    }
  }
  
  const answersEl = $("#question-options");
  answersEl.on('click', '.option', function (event) {
    playQuiz(event);
  });
  
  function playQuiz(event) {
    if (event.target.dataset.answer === "true") {
        result.innerHTML = "Correct!";
    } else {
        result.innerHTML = "Wrong!";
        timeLeft = timeLeft - 10;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    } else {
        countDown();
    }
}

  function countDown() {
    timeLeft--;
    timerSpan.innerHTML = `Time Left: ${timeLeft}s`;
  
    if (timeLeft <= 0 || currentQuestion === questions.length) {
      const newTitle = document.createElement('h2');
      newTitle.textContent = "Quiz Over";
      const newText = document.createElement('p');
      newText.textContent = `Your final score is ${timeLeft}.`;
  
      const inputLabel = document.createElement('label');
      inputLabel.setAttribute('for', 'Initials');
      inputLabel.textContent = "Initials: ";
  
      const inputBox = document.createElement('input');
      inputBox.setAttribute('type', 'text');
      inputBox.setAttribute('name', 'Initials');
  
      const submitButton = document.createElement('button');
      submitButton.setAttribute('type', 'button');
      submitButton.classList.add('submit-button');
      submitButton.textContent = "Submit";
  
      containerEl.prepend(submitButton);
      containerEl.prepend(inputBox);
      containerEl.prepend(inputLabel);
      containerEl.prepend(newText);
      containerEl.prepend(newTitle);
  
      submitButton.addEventListener('click', function () {
        let userInitials = document.querySelector('input[name=Initials]').value;
        userScore = {
          'initials': userInitials,
          'score': timeLeft
        };
        submitScore();
      });
    }
  }
  
  let intervalId = setInterval(countDown, 1000);
  
  function submitScore() {
    let highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(userScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = 'hs.html';
  }
  
  displayQuestion(currentQuestion);