//Flag section

var flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions")) || [];
var markedList = document.querySelector(".marked-question ul");
var flagButton = document.querySelector(".flag-btn i");

function updateFlagIcon() {
    if (flaggedQuestions.includes(currentIndex)) {
        flagButton.classList.add("flagged", "fa-solid");
        flagButton.classList.remove("fa-regular");
    } else {
        flagButton.classList.remove("flagged", "fa-solid");
        flagButton.classList.add("fa-regular");
    }
}

function renderFlagList() {
    markedList.innerHTML = "";
    flaggedQuestions.forEach(index => {
        var li = document.createElement("li");
        li.textContent = "Q" + (index + 1);
        li.setAttribute("data-index", index);
        li.addEventListener("click", function () {
            currentIndex = index;
            localStorage.setItem("currentIndex", currentIndex); 
            displayQuestion(currentIndex);
            updateFlagIcon();
        });
        markedList.appendChild(li);
    });
}

flagButton.addEventListener("click", function () {
    var flagIndex = flaggedQuestions.indexOf(currentIndex);
    if (flagIndex === -1) {
        flaggedQuestions.push(currentIndex);
    } else {
        flaggedQuestions.splice(flagIndex, 1);
    }

    localStorage.setItem("flaggedQuestions", JSON.stringify(flaggedQuestions));

    renderFlagList();
    updateFlagIcon();
});


//Timer section

var totalTime = 15 * 60;

function setTimer() {
    var timerDisplay = document.getElementById("timer");

    var savedTime = localStorage.getItem("remainingTime");
    if (savedTime !== null) {
        totalTime = parseInt(savedTime);
    }

    var countdown = setInterval(function () {
        var minutes = Math.floor(totalTime / 60);
        var seconds = totalTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        localStorage.setItem("remainingTime", totalTime);

        totalTime--;

        if (totalTime < 0) {
            clearInterval(countdown);
            localStorage.removeItem("remainingTime"); 
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    var theRightAnswer = userAnswers.filter(a => a.correct).length;

    localStorage.setItem("quizScore", theRightAnswer);
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem("timeUp", "yes");
}


//Question section

var questions = [
  {
    question: "What does LAN stand for?",
    answers: [
      { text: "Large Area Network", isCorrect: false },
      { text: "Light Access Node", isCorrect: false },
      { text: "Local Area Network", isCorrect: true },
      { text: "Limited Area Network", isCorrect: false }
    ],
  },
  {
    question: "Which device is used to connect multiple computers in a LAN?",
    answers: [
      { text: "Switch", isCorrect: true },
      { text: "Router", isCorrect: false },
      { text: "Repeater", isCorrect: false },
      { text: "Firewall", isCorrect: false }
    ],
  },
  {
    question: "What is the main purpose of a router?",
    answers: [
      { text: "To connect devices in the same network", isCorrect: false },
      { text: "To store data", isCorrect: false },
      { text: "To connect different networks", isCorrect: true },
      { text: "To filter viruses", isCorrect: false }
    ],
  },
  {
    question: "Which protocol is used to send emails?",
    answers: [
      { text: "HTTP", isCorrect: false },
      { text: "SMTP", isCorrect: true },
      { text: "FTP", isCorrect: false },
      { text: "SNMP", isCorrect: false }
    ],
  },
  {
    question: "What is the default port number for HTTP?",
    answers: [
      { text: "25", isCorrect: false },
      { text: "443", isCorrect: false },
      { text: "21", isCorrect: false },
      { text: "80", isCorrect: true }
    ],
  },
  {
    question: "Which layer of the OSI model does IP belong to?",
    answers: [
      { text: "Network layer", isCorrect: true },
      { text: "Transport layer", isCorrect: false },
      { text: "Data link layer", isCorrect: false },
      { text: "Physical layer", isCorrect: false }
    ],
  },
  {
    question: "What does DNS do in a network?",
    answers: [
      { text: "Translates IP addresses to domain names", isCorrect: false },
      { text: "Encrypts web traffic", isCorrect: false },
      { text: "Translates domain names to IP addresses", isCorrect: true },
      { text: "Manages emails", isCorrect: false }
    ],
  },
  {
    question: "Which protocol is secure version of HTTP?",
    answers: [
      { text: "SHTTP", isCorrect: false },
      { text: "SSL", isCorrect: false },
      { text: "SSH", isCorrect: false },
      { text: "HTTPS", isCorrect: true }
    ],
  },
  {
    question: "What is the function of a firewall?",
    answers: [
      { text: "To store website data", isCorrect: false },
      { text: "To assign IP addresses", isCorrect: false },
      { text: "To block unauthorized access", isCorrect: true },
      { text: "To compress data", isCorrect: false }
    ],
  },
  {
    question: "Which layer of the OSI model ensures reliable data transfer?",
    answers: [
      { text: "Transport layer", isCorrect: true },
      { text: "Network layer", isCorrect: false },
      { text: "Session layer", isCorrect: false },
      { text: "Presentation layer", isCorrect: false }
    ],
  }
];

var remainingQuestions = [...questions];

var userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];

var currentIndex = 0;
var savedIndex = localStorage.getItem("currentIndex");
if (savedIndex !== null) {
    currentIndex = parseInt(savedIndex);
}


function displayQuestion(currentIndex) {
    var questionObj = questions[currentIndex];
    document.querySelector(".question").textContent = (currentIndex+1) + ". "+questionObj.question; 

    var answersDisplay = document.querySelector(".answers ul");
    answersDisplay.innerHTML = "";

    questionObj.answers.forEach(answer => {
        var li = document.createElement("li");
        li.textContent = answer.text;


        //answer still selected after refresh
        var saved = userAnswers.find(a => a.question === questionObj.question);
        if (saved && saved.selected === answer.text) {
            li.classList.add("selected");
        }

        li.addEventListener("click", function () {
            document.querySelectorAll(".answers li").forEach(el => el.classList.remove("selected"));
            li.classList.add("selected");

            var existing = userAnswers.find(a => a.question === questionObj.question);
            if (existing) {
                existing.selected = answer.text;
                existing.correct = answer.isCorrect;
            } else {
                userAnswers.push({
                    question: questionObj.question,
                    selected: answer.text,
                    correct: answer.isCorrect
                });
            }

            localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        });

        answersDisplay.appendChild(li);
    });

    updateFlagIcon();
}


//Navigation Buttons

document.getElementById("nextBtn").addEventListener("click", function () {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        localStorage.setItem("currentIndex", currentIndex); 
        displayQuestion(currentIndex);
    }

    if (currentIndex === questions.length - 1) {
        document.getElementById("submitBtn").style.display = "block";
    }
});

document.getElementById("prevBtn").addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        localStorage.setItem("currentIndex", currentIndex); 
        displayQuestion(currentIndex);
    }

    if (currentIndex < questions.length - 1) {
        document.getElementById("submitBtn").style.display = "none";
    }
});

document.getElementById("submitBtn").addEventListener("click", function () {
    var theRightAnswer = userAnswers.filter(a => a.correct).length;

    localStorage.setItem("quizScore", theRightAnswer);
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem("timeUp", "no");
});


//On Load

window.onload = function () {
    setTimer();
    renderFlagList();
    displayQuestion(currentIndex);
};
