document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginCard = document.getElementById("login-card");
  const gameContainer = document.getElementById("game-container");
  const questionBox = document.getElementById("question-box");
  const answersContainer = document.getElementById("answers");
  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");
  const scoreBox = document.getElementById("score-box");
  const finalCard = document.getElementById("final-card");
  const finalScoreBox = document.getElementById("final-score-box");

  let currentQuestionIndex = 0;
  let userResponses = []; // Stores either the chosen index (for MCQ) or text answer (for text question)
  let score = 0; // Score calculated only from MCQ questions

  // Our question set: 20 MCQ questions followed by 1 text-based question (Question 21)
  const questions = [
    {
      question: "Which of these sensors is NOT on the Microbit?",
      type: "mcq",
      answers: ["Heat sensor", "Sound sensor", "Lightning sensor"],
      correctIndex: 2
    },
    {
      question: "What does the Microbit use to show pictures and numbers?",
      type: "mcq",
      answers: ["A screen", "LED lights", "A speaker"],
      correctIndex: 1
    },
    {
      question: "How do you turn the Microbit on when it’s not connected to a computer?",
      type: "mcq",
      answers: ["Use a battery pack", "Press the A button", "Shake it"],
      correctIndex: 0
    },
    {
      question: "What does the Microbit use to know when you press a button?",
      type: "mcq",
      answers: ["An input sensor", "A camera", "The LED grid"],
      correctIndex: 0
    },
    {
      question: "How does the Microbit know when it is tilted?",
      type: "mcq",
      answers: [
        "It has a tilt sensor (accelerometer)",
        "It has wheels",
        "It has a camera"
      ],
      correctIndex: 0
    },
    {
      question: "What is the name of the coding tool we use to program the Microbit?",
      type: "mcq",
      answers: ["PowerPoint", "MakeCode", "Photoshop"],
      correctIndex: 1
    },
    {
      question: "What does an 'if' block do in coding?",
      type: "mcq",
      answers: [
        "It makes a choice",
        "It makes the Microbit sleep",
        "It makes the Microbit talk"
      ],
      correctIndex: 0
    },
    {
      question: "What happens if we don’t give the Microbit any code?",
      type: "mcq",
      answers: [
        "It does nothing",
        "It makes a random decision",
        "It turns itself off"
      ],
      correctIndex: 0
    },
    {
      question: "What kind of coding blocks make something repeat over and over?",
      type: "mcq",
      answers: ["A loop", "A button", "A battery"],
      correctIndex: 0
    },
    {
      question: "What happens when we use 'if button A is pressed'?",
      type: "mcq",
      answers: [
        "The Microbit does something when button A is pressed",
        "It presses the button itself",
        "It makes the Microbit shake"
      ],
      correctIndex: 0
    },
    {
      question: "How does the Microbit know when it’s moving?",
      type: "mcq",
      answers: [
        "It has an accelerometer",
        "It listens for footsteps",
        "It watches with a camera"
      ],
      correctIndex: 0
    },
    {
      question: "Which part of the Microbit helps it sense temperature?",
      type: "mcq",
      answers: ["The buttons", "The LED grid", "The temperature sensor"],
      correctIndex: 2
    },
    {
      question: "What happens when we shake the Microbit?",
      type: "mcq",
      answers: [
        "It can react, like showing an animation or rolling a dice",
        "It makes a sound",
        "It turns off"
      ],
      correctIndex: 0
    },
    {
      question: "Which of these is NOT something the Microbit can sense?",
      type: "mcq",
      answers: ["Light", "Smell", "Motion"],
      correctIndex: 1
    },
    {
      question: "Which of these is an output of the Microbit?",
      type: "mcq",
      answers: ["LED lights", "The A button", "The battery"],
      correctIndex: 0
    },
    {
      question: "How can we make the Microbit play music?",
      type: "mcq",
      answers: [
        "Connect a speaker or buzzer and use code",
        "Press both buttons together",
        "Shake it"
      ],
      correctIndex: 0
    },
    {
      question: "What do we use to light up parts of the Microbit?",
      type: "mcq",
      answers: [
        "The battery pack",
        "LED grid and coding",
        "The buttons"
      ],
      correctIndex: 1
    },
    {
      question: "What should you do if your Microbit doesn’t work?",
      type: "mcq",
      answers: [
        "Check the battery, code, and connections",
        "Shake it harder",
        "Buy a new one"
      ],
      correctIndex: 0
    },
    {
      question: "Why do we test our Microbit code before using it?",
      type: "mcq",
      answers: [
        "To see if it explodes",
        "To check if it works correctly",
        "To make it faster"
      ],
      correctIndex: 1
    },
    {
      question: "If your Microbit doesn’t react when you press a button, what could be wrong?",
      type: "mcq",
      answers: [
        "The code might be missing something",
        "The Microbit is scared",
        "The battery is too full"
      ],
      correctIndex: 0
    },
    // Question 21: Text-based question
    {
      question: "Question 21: Question 21 explaining the code block on the page.",
      type: "text"
      // No answers or correctIndex since this is open text.
    }
  ];

  // Pre-fill responses array with nulls for each question.
  userResponses = new Array(questions.length).fill(null);

  // Update the running score (only for MCQ questions)
  function updateScore() {
    let tempScore = 0;
    userResponses.forEach((response, idx) => {
      if (questions[idx].type !== "text") {
        if (response === questions[idx].correctIndex) {
          tempScore++;
        }
      }
    });
    score = tempScore;
    scoreBox.textContent = `Score: ${score}`;
  }

  // Load current question (MCQ or text-based)
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      showFinalCard();
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    questionBox.textContent = currentQuestion.question;
    answersContainer.innerHTML = ""; // Clear previous answers

    if (currentQuestion.type === "mcq") {
      currentQuestion.answers.forEach((answerText, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = answerText;
        if (userResponses[currentQuestionIndex] === index) {
          btn.classList.add("selected");
        }
        btn.addEventListener("click", () => {
          const allBtns = answersContainer.querySelectorAll(".answer-btn");
          allBtns.forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          userResponses[currentQuestionIndex] = index;
        });
        answersContainer.appendChild(btn);
      });
    } else if (currentQuestion.type === "text") {
      // Create a textarea for text-based input
      const textarea = document.createElement("textarea");
      textarea.classList.add("text-answer");
      if (userResponses[currentQuestionIndex]) {
        textarea.value = userResponses[currentQuestionIndex];
      }
      textarea.addEventListener("input", () => {
        userResponses[currentQuestionIndex] = textarea.value;
      });
      answersContainer.appendChild(textarea);
    }

    // Show/hide back button appropriately.
    backBtn.style.display = (currentQuestionIndex === 0) ? "none" : "inline-block";
  }

  // Show final card with final score (only MCQ score is shown)
  function showFinalCard() {
    gameContainer.classList.add("hidden");
    finalCard.classList.remove("hidden");
    updateScore();
    // Final score is based on MCQs only.
    finalScoreBox.textContent = `${score} / ${questions.filter(q => q.type !== "text").length}`;
  }

  // Login form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = document.getElementById("name").value;
    const playerClass = document.getElementById("class").value;
    const playerGender = document.querySelector('input[name="gender"]:checked').value;
    const birthMonth = document.getElementById("birth-month").value;
    sessionStorage.setItem("playerName", playerName);
    sessionStorage.setItem("playerClass", playerClass);
    sessionStorage.setItem("playerGender", playerGender);
    sessionStorage.setItem("birthMonth", birthMonth);
    loginCard.style.display = "none";
    gameContainer.classList.remove("hidden");
    loadQuestion();
  });

  // Next button: update score (for MCQs) then load next question
  nextBtn.addEventListener("click", () => {
    if (questions[currentQuestionIndex].type !== "text") {
      updateScore();
    }
    currentQuestionIndex++;
    loadQuestion();
  });

  // Back button: go to previous question
  backBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  });
});
