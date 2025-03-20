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
    let userResponses = []; // track each question’s chosen answer
    let score = 0; // will show partial and final
  
    // Our question set
    const questions = [
      {
        question: "Which of these sensors is NOT on the Microbit?",
        answers: ["Heat sensor", "Sound sensor", "Lightning sensor"],
        correctIndex: 2
      },
      {
        question: "What does the Microbit use to show pictures and numbers?",
        answers: ["A screen", "LED lights", "A speaker"],
        correctIndex: 1
      },
      {
        question: "How do you turn the Microbit on when it’s not connected to a computer?",
        answers: ["Use a battery pack", "Press the A button", "Shake it"],
        correctIndex: 0
      },
      {
        question: "What does the Microbit use to know when you press a button?",
        answers: ["An input sensor", "A camera", "The LED grid"],
        correctIndex: 0
      },
      {
        question: "How does the Microbit know when it is tilted?",
        answers: [
          "It has a tilt sensor (accelerometer)",
          "It has wheels",
          "It has a camera"
        ],
        correctIndex: 0
      },
      {
        question: "What is the name of the coding tool we use to program the Microbit?",
        answers: ["PowerPoint", "MakeCode", "Photoshop"],
        correctIndex: 1
      },
      {
        question: "What does an 'if' block do in coding?",
        answers: [
          "It makes a choice",
          "It makes the Microbit sleep",
          "It makes the Microbit talk"
        ],
        correctIndex: 0
      },
      {
        question: "What happens if we don’t give the Microbit any code?",
        answers: [
          "It does nothing",
          "It makes a random decision",
          "It turns itself off"
        ],
        correctIndex: 0
      },
      {
        question: "What kind of coding blocks make something repeat over and over?",
        answers: ["A loop", "A button", "A battery"],
        correctIndex: 0
      },
      {
        question: "What happens when we use 'if button A is pressed'?",
        answers: [
          "The Microbit does something when button A is pressed",
          "It presses the button itself",
          "It makes the Microbit shake"
        ],
        correctIndex: 0
      },
      {
        question: "How does the Microbit know when it’s moving?",
        answers: [
          "It has an accelerometer",
          "It listens for footsteps",
          "It watches with a camera"
        ],
        correctIndex: 0
      },
      {
        question: "Which part of the Microbit helps it sense temperature?",
        answers: ["The buttons", "The LED grid", "The temperature sensor"],
        correctIndex: 2
      },
      {
        question: "What happens when we shake the Microbit?",
        answers: [
          "It can react, like showing an animation or rolling a dice",
          "It makes a sound",
          "It turns off"
        ],
        correctIndex: 0
      },
      {
        question: "Which of these is NOT something the Microbit can sense?",
        answers: ["Light", "Smell", "Motion"],
        correctIndex: 1
      },
      {
        question: "Which of these is an output of the Microbit?",
        answers: ["LED lights", "The A button", "The battery"],
        correctIndex: 0
      },
      {
        question: "How can we make the Microbit play music?",
        answers: [
          "Connect a speaker or buzzer and use code",
          "Press both buttons together",
          "Shake it"
        ],
        correctIndex: 0
      },
      {
        question: "What do we use to light up parts of the Microbit?",
        answers: [
          "The battery pack",
          "LED grid and coding",
          "The buttons"
        ],
        correctIndex: 1
      },
      {
        question: "What should you do if your Microbit doesn’t work?",
        answers: [
          "Check the battery, code, and connections",
          "Shake it harder",
          "Buy a new one"
        ],
        correctIndex: 0
      },
      {
        question: "Why do we test our Microbit code before using it?",
        answers: [
          "To see if it explodes",
          "To check if it works correctly",
          "To make it faster"
        ],
        correctIndex: 1
      },
      {
        question: "If your Microbit doesn’t react when you press a button, what could be wrong?",
        answers: [
          "The code might be missing something",
          "The Microbit is scared",
          "The battery is too full"
        ],
        correctIndex: 0
      }
    ];
  
    // Pre-fill userResponses with null (no answers chosen yet)
    userResponses = new Array(questions.length).fill(null);
  
    // Update the running score in the middle white box
    function updateScore() {
      let tempScore = 0;
      userResponses.forEach((selectedIndex, questionIdx) => {
        if (selectedIndex === questions[questionIdx].correctIndex) {
          tempScore++;
        }
      });
      score = tempScore; // store it globally
      scoreBox.textContent = `Score: ${score}`;
    }
  
    /* 
     * Render the current question and any previously selected answer. 
     */
    function loadQuestion() {
      // If we have passed the last question, show the final result.
      if (currentQuestionIndex >= questions.length) {
        showFinalCard();
        return;
      }
  
      const currentQuestion = questions[currentQuestionIndex];
      questionBox.textContent = currentQuestion.question;
  
      // Clear old answers
      answersContainer.innerHTML = "";
  
      // Create buttons for each possible answer
      currentQuestion.answers.forEach((answerText, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = answerText;
  
        // If this was previously selected, highlight it
        if (userResponses[currentQuestionIndex] === index) {
          btn.classList.add("selected");
        }
  
        // On click, set this as the selected answer (but do not update score immediately)
        btn.addEventListener("click", () => {
          // Clear selection from any other buttons
          const allAnswerButtons = answersContainer.querySelectorAll(".answer-btn");
          allAnswerButtons.forEach(b => b.classList.remove("selected"));
  
          // Highlight this one
          btn.classList.add("selected");
  
          // Store the selected index
          userResponses[currentQuestionIndex] = index;
        });
  
        answersContainer.appendChild(btn);
      });
  
      // Show or hide the Back button if needed
      backBtn.style.display = (currentQuestionIndex === 0) ? "none" : "inline-block";
    }
  
    /* 
     * Show the final card with the final score, then submit the results.
     */
    function showFinalCard() {
      // Hide the game container
      gameContainer.classList.add("hidden");
  
      // Show the final card
      finalCard.classList.remove("hidden");
  
      // Final score calculation
      updateScore(); // ensures we are up to date
      finalScoreBox.textContent = `${score} / ${questions.length}`;
  
      // Send the results to your Google Sheet
      submitResults();
    }
  
    /* 
     * Function to send quiz results to the Google Apps Script endpoint.
     */
    function submitResults() {
      // Retrieve player details from sessionStorage
      const playerName = sessionStorage.getItem("playerName");
      const playerClass = sessionStorage.getItem("playerClass");
      const playerGender = sessionStorage.getItem("playerGender");
      const birthMonth = sessionStorage.getItem("birthMonth");
  
      // Construct the data object to send
      const dataToSend = {
        playerName: playerName,
        playerClass: playerClass,
        playerGender: playerGender,
        birthMonth: birthMonth,
        score: score,
        userResponses: userResponses
      };
  
      // Send a POST request using fetch to your deployed Apps Script endpoint.
      fetch("https://script.google.com/macros/s/AKfycbwHOU03e5pm1NsTzS-JuBklkNi5Bdn3wEYz6_T4UNFgWFABLaSf5lQMquYPNfACYPFa/exec", {
        method: "POST",
        mode: "no-cors", // use no-cors if you don't need to handle the response
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      })
      .then(() => {
        console.log("Data sent to Google Sheet successfully.");
      })
      .catch(error => {
        console.error("Error sending data to Google Sheet:", error);
      });
    }
  
    /* 
     * Login form submission 
     */
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Retrieve user details
      const playerName = document.getElementById("name").value;
      const playerClass = document.getElementById("class").value;
      const playerGender = document.querySelector('input[name="gender"]:checked').value;
      const birthMonth = document.getElementById("birth-month").value;
  
      // Store them for future use (e.g. sending to the spreadsheet)
      sessionStorage.setItem("playerName", playerName);
      sessionStorage.setItem("playerClass", playerClass);
      sessionStorage.setItem("playerGender", playerGender);
      sessionStorage.setItem("birthMonth", birthMonth);
  
      // Hide login card and show quiz
      loginCard.style.display = "none";
      gameContainer.classList.remove("hidden");
  
      loadQuestion();
    });
  
    /* 
     * Next Button
     */
    nextBtn.addEventListener("click", () => {
      // Update score for the current question before moving on
      updateScore();
  
      // Move to the next question
      currentQuestionIndex++;
      loadQuestion();
    });
  
    /* 
     * Back Button
     */
    backBtn.addEventListener("click", () => {
      // Move to the previous question
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
      }
    });
  });
  
