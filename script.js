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
  const questionImage = document.getElementById("question-image");

  let currentQuestionIndex = 0;
  let userResponses = []; // Stores index for MCQs or text for text questions
  let score = 0; // Score based only on MCQs

  // Question set: 20 MCQs and 1 text-based question.
  // Each question includes an "image" property with its GitHub raw URL.
  const questions = [
    {
      question: "Which of these sensors is NOT on the Microbit?",
      type: "mcq",
      image: "https://raw=true.github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_1_Heat_Sound_Lightning.png",
      answers: ["Heat sensor", "Sound sensor", "Lightning sensor"],
      correctIndex: 2
    },
    {
      question: "What does the Microbit use to show pictures and numbers?",
      type: "mcq",
      image: "https://raw.githubusercontent.com/GlennMalcolm/MicrobitQuiz/refs/heads/main/Question_2_Microbit_LED.webp",
      answers: ["A screen", "LED lights", "A speaker"],
      correctIndex: 1
    },
    {
      question: "How do you turn the Microbit on when it’s not connected to a computer?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_3_Micro_Bit_Battery.jpg?raw=true",
      answers: ["Use a battery pack", "Press the A button", "Shake it"],
      correctIndex: 0
    },
    {
      question: "What does the Microbit use to know when you press a button?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_4_Input_Sensor.png?raw=true",
      answers: ["An input sensor", "A camera", "The LED grid"],
      correctIndex: 0
    },
    {
      question: "How does the Microbit know when it is tilted?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_5_Accelerometer.png?raw=true",
      answers: ["It has a tilt sensor (accelerometer)", "It has wheels", "It has a camera"],
      correctIndex: 0
    },
    {
      question: "What is the name of the coding tool we use to program the Microbit?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_6_MakeCode_tool.png?raw=true",
      answers: ["PowerPoint", "MakeCode", "Photoshop"],
      correctIndex: 1
    },
    {
      question: "What does an 'if' block do in coding?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_7_If_block.png?raw=true",
      answers: ["It makes a choice", "It makes the Microbit sleep", "It makes the Microbit talk"],
      correctIndex: 0
    },
    {
      question: "What happens if we don’t give the Microbit any code?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_8_No_code.png?raw=true",
      answers: ["It does nothing", "It makes a random decision", "It turns itself off"],
      correctIndex: 0
    },
    {
      question: "What kind of coding blocks make something repeat over and over?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_9_Makecode_loop.png?raw=true",
      answers: ["A loop", "A button", "A battery"],
      correctIndex: 0
    },
    {
      question: "What happens when we use 'if button A is pressed'?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_10_Makecode_A_Button.jpg?raw=true",
      answers: ["The Microbit does something when button A is pressed", "It presses the button itself", "It makes the Microbit shake"],
      correctIndex: 0
    },
    {
      question: "How does the Microbit know when it’s moving?",
      type: "mcq",
      image: "https://raw.githubusercontent.com/GlennMalcolm/MicrobitQuiz/refs/heads/main/Question_11_Microbit_Accelerometer.webp",
      answers: ["It has an accelerometer", "It listens for footsteps", "It watches with a camera"],
      correctIndex: 0
    },
    {
      question: "Which part of the Microbit helps it sense temperature?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_12_Makecode_temperature_sensor.png?raw=true",
      answers: ["The buttons", "The LED grid", "The temperature sensor"],
      correctIndex: 2
    },
    {
      question: "What happens when we shake the Microbit?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_13_Makecode_Shake.png?raw=true",
      answers: ["It can react, like showing an animation or rolling a dice", "It makes a sound", "It turns off"],
      correctIndex: 0
    },
    {
      question: "Which of these is NOT something the Microbit can sense?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_14_Makecode_Light.png?raw=true",
      answers: ["Light", "Smell", "Motion"],
      correctIndex: 1
    },
    {
      question: "Which of these is an output of the Microbit?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_15_More_Bit_Battery.png?raw=true",
      answers: ["LED lights", "The A button", "The battery"],
      correctIndex: 0
    },
    {
      question: "How can we make the Microbit play music?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_16_More_Bit_Buzzer.webp?raw=true",
      answers: ["Connect a speaker or buzzer and use code", "Press both buttons together", "Shake it"],
      correctIndex: 0
    },
    {
      question: "What do we use to light up parts of the Microbit?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_17_Makecode_connections.jpg?raw=true",
      answers: ["The battery pack", "LED grid and coding", "The buttons"],
      correctIndex: 1
    },
    {
      question: "What should you do if your Microbit doesn’t work?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_18_Makecode_Debugging.png?raw=true",
      answers: ["Check the battery, code, and connections", "Shake it harder", "Buy a new one"],
      correctIndex: 0
    },
    {
      question: "Why do we test our Microbit code before using it?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_19_Makecode_Testing.png?raw=true",
      answers: ["To see if it explodes", "To check if it works correctly", "To make it faster"],
      correctIndex: 1
    },
    {
      question: "If your Microbit doesn’t react when you press a button, what could be wrong?",
      type: "mcq",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/Question_20_Makecode_Missing_Code.png?raw=true",
      answers: ["The code might be missing something", "The Microbit is scared", "The battery is too full"],
      correctIndex: 0
    },
    // Question 21: Text-based question
    {
      question: "Question 21: Please describe your experience with the quiz and any suggestions you have.",
      type: "text",
      image: "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/default.png?raw=true"
    }
  ];

  // Pre-fill responses array with nulls for each question.
  userResponses = new Array(questions.length).fill(null);

  // Update running score (only MCQ questions count)
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

  // Load the current question (MCQ or text-based) and update the image.
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      showFinalCard();
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    questionBox.textContent = currentQuestion.question;

    // Update the image based on the current question.
    if (currentQuestion.image) {
      questionImage.src = currentQuestion.image;
    } else {
      questionImage.src = "https://github.com/GlennMalcolm/MicrobitQuiz/blob/main/default.png?raw=true";
    }

    // Clear previous answer content.
    answersContainer.innerHTML = "";

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
      // Create a textarea for text-based input.
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

    // Show or hide the Back button.
    backBtn.style.display = (currentQuestionIndex === 0) ? "none" : "inline-block";
  }

  // Show final card with final score (MCQs only).
  function showFinalCard() {
    gameContainer.classList.add("hidden");
    finalCard.classList.remove("hidden");
    updateScore();
    finalScoreBox.textContent = `${score} / ${questions.filter(q => q.type !== "text").length}`;
    submitResults();
  }

  // Submit results (including questions) to your Apps Script endpoint.
  function submitResults() {
    const playerName = sessionStorage.getItem("playerName");
    const playerClass = sessionStorage.getItem("playerClass");
    const playerGender = sessionStorage.getItem("playerGender");
    const birthMonth = sessionStorage.getItem("birth-month");
    const dataToSend = {
      playerName: playerName,
      playerClass: playerClass,
      playerGender: playerGender,
      birthMonth: birthMonth,
      score: score,
      userResponses: userResponses,
      questions: questions
    };

    fetch("https://script.google.com/macros/s/yourAppsScriptID/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
    .then(() => console.log("Data sent successfully"))
    .catch(error => console.error("Error sending data:", error));
  }

  // Login form submission.
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = document.getElementById("name").value;
    const playerClass = document.getElementById("class").value;
    const playerGender = document.querySelector('input[name="gender"]:checked').value;
    const birthMonth = document.getElementById("birth-month").value;
    sessionStorage.setItem("playerName", playerName);
    sessionStorage.setItem("playerClass", playerClass);
    sessionStorage.setItem("playerGender", playerGender);
    sessionStorage.setItem("birth-month", birthMonth);
    loginCard.style.display = "none";
    gameContainer.classList.remove("hidden");
    loadQuestion();
  });

  // Next button: update score (for MCQs) then load next question.
  nextBtn.addEventListener("click", () => {
    if (questions[currentQuestionIndex].type !== "text") {
      updateScore();
    }
    currentQuestionIndex++;
    loadQuestion();
  });

  // Back button: go to previous question.
  backBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  });
});
