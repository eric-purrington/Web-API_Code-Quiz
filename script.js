var questions = [{
    question: "I am a question?",
    answers: ["1. I am wrong", "2. I am right", "3. I am wrong", "4. I am right"],
    correctAnswer: "2. I am right",
}, 
    {
    question: "I am a question?",
    answers: ["1. I am wrong", "2. I am wrong", "3. I am right", "4. I am wrong"],
    correctAnswer: "3. I am right",
}, 
    {
    question: "I am a question?",
    answers: ["1. I am right", "2. I am wrong", "3. I am wrong", "4. I am wrong"],
    correctAnswer: "1. I am right",
}, 
    {
    question: "I am a question?",
    answers: ["1. I am wrong", "2. I am wrong", "3. I am wrong", "4. I am right"],
    correctAnswer: "4. I am right",
}, 
    {
    question: "I am a question?",
    answers: ["1. I am right", "2. I am wrong", "3. I am wrong", "4. I am wrong"],
    correctAnswer: "1. I am right"
}
];
var checker = document.getElementById("checker");
var blockContainer = document.getElementById("blockContainer");
var startBtn = document.createElement("button");
var currentQ = 0;


startPage();

function startPage() {
    var quizTitle = document.createElement("h1");
    var quizExp = document.createElement("p");
    quizTitle.textContent = "Code Quiz Challenge";
    quizExp.textContent = "I explain the quiz.";
    startBtn.textContent = "Start Quiz";
    blockContainer.appendChild(quizTitle);
    blockContainer.appendChild(quizExp);
    blockContainer.appendChild(startBtn);
    startBtn.addEventListener("click", questionBlock);
}

function questionBlock(event) {
    blockContainer.innerHTML = "";
    var question = document.createElement("h2");
    var ansBtns = [document.createElement("button"),
                   document.createElement("button"),
                   document.createElement("button"),
                   document.createElement("button")];

    question.textContent = questions[currentQ].question;
    blockContainer.appendChild(question);

    for (i = 0; i < 4; i++) {
        ansBtns[i].textContent = questions[currentQ].answers[i];
        blockContainer.appendChild(ansBtns[i]);
        ansBtns[i].onclick = function ansCheck(event) {
            var hr = document.createElement("hr");
            var ansResp = document.createElement("h3");
            if (this.textContent == questions[currentQ].correctAnswer) {
                ansResp.textContent = "Correct!";
                currentQ++;
            } else {
                ansResp.textContent = "Wrong!";
                currentQ++;
            }

            setTimeout(function(){ checker.appendChild(hr);
                checker.appendChild(ansResp);
            }, 0);

            setTimeout(function(){ checker.textContent = "";
            }, 1000);

            if (currentQ == 5) {
                initialsPage();
            } else {
                questionBlock();
            }
        }
    }
}

function initialsPage() {
    blockContainer.innerHTML = "";
    // stoptimer
    var allDone = document.createElement("h1");
    var finScore = document.createElement("p");
    var submitBtn = document.createElement("button");
    var initialsInput = document.createElement("form");
    allDone.textContent = "All done!";
    finScore.textContent = "Your score was " + time + "!";
    submitBtn.textContent = "Submit";
    blockContainer.appendChild(allDone);
    blockContainer.appendChild(finScore);
    blockContainer.appendChild(submitBtn);
    blockContainer.appendChild(initialsInput);
    submitBtn.addEventListener("click", highscorePage);
}

function highscorePage(event) {
    blockContainer.innerHTML = "";
    var hsHead = document.createElement("h1");
    var hsList = document.createElement("ol");
    var initials = document.createElement("li");
    var goBack = document.createElement("button");
    var clearHS = document.createElement("button");

    clearHS.onclick = function (event) {
        hsList.textContent = "";
    }
    goBack.addEventListener("click", startPage);

}