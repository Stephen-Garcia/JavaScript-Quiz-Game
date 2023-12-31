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
  }, ]
  
  let timeLeft = 90;
  let currentQuestion = 0;
  let userScore = {};
  
  const timerSpan = document.querySelector("#timer");
  timerSpan.innerHTML = timeLeft;
  const questionTitle = document.querySelector("#question-title");
  const questionContainer = document.querySelector("#container");
  const result = document.querySelector("#result");
  const containerEl = $("#container");
  
  function displayQuestion(currentQuestion) {
    questionTitle.innerHTML = questions[currentQuestion].question;
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
     questionContainer.children[1].children[i].innerHTML = `${i+1}. ${questions[currentQuestion].options[i]}`;
     questionContainer.children[1].children[i].dataset.answer = false;
     if (i === questions[currentQuestion].answer) {
        questionContainer.children[1].children[i].dataset.answer = true;
      }
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
    timerSpan.innerHTML = timeLeft;
  
    if (timeLeft === 0 || timeLeft < 0 || questions.length === currentQuestion) {
      let qh2 = document.getElementById("question-title");
      let oul = document.getElementById("question-options");
      qh2.remove();
      oul.remove();
      
      clearInterval(intervalId);
      const newTitle = document.createElement('h2');
      newTitle.textContent = "Quiz Over";
      const newText = document.createElement('p');
      newText.textContent = `Your final score is ${timeLeft}.`;
  
      const inputLabel = $('<label>')
        .attr('for', 'Initials')
        .text("Initials: ");
  
      const inputBox = $('<input>')
      .attr('type', 'text')
      .attr('name', 'Initials');
  
      const submitButton = $('<button>')
      .attr('type', 'button')
      .addClass('submit-button')
      .text("Submit");
  
      containerEl.prepend(submitButton);
      containerEl.prepend(inputBox);
      containerEl.prepend(inputLabel);
      containerEl.prepend(newText);
      containerEl.prepend(newTitle);
  
      submitButton.on('click', function () {
        let userInitials = $('input[name=Initials]').val();
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
    window.location.href = 'highscores.html';
  }
  
  displayQuestion(currentQuestion);