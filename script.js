var questions = [{
    question: "His Dark Materials: What is Dust?",
    answers: ["1. Fine particles of solid matter", "2. Elementary particles associated with consciousness", "3. Particles that humans are made out of", "4. Paricles that are attracted to sin"],
    correctAnswer: "2. Elementary particles associated with consciousness",
}, 
    {
    question: "The Lord of the Rings: How many rings of power are there?",
    answers: ["1. One", "2. Nine", "3. Twenty", "4. Twenty-One"],
    correctAnswer: "3. Twenty",
}, 
    {
    question: "Star Wars: How fast can the Millennium Falcon make the Kessel Run?",
    answers: ["1. Less than twelve parsecs", "2. Less than nineteen parsecs", "3. Exactly twenty-two parsecs", "4. The Kessel Run can not be accessed by Resistance Scum"],
    correctAnswer: "1. Less than twelve parsecs",
}, 
    {
    question: "Marvel: What do the Avengers eat after the Battle of New York?",
    answers: ["1. Falafel", "2. Spaghetti", "3. Pizza", "4. Shawarma"],
    correctAnswer: "4. Shawarma",
}, 
    {
    question: "Harry Potter: The fifth Harry Potter title reads: Harry Potter and the Order of the ________.",
    answers: ["1. Bees", "2. Snake", "3. Pheonix", "4. Half-Blood Prince"],
    correctAnswer: "3. Pheonix"
}
];
var blockContainer = document.getElementById("blockContainer");
var timeEl = document.getElementById("time");
var hsEl = document.getElementById("viewHs");
var currentQ = 0;
secondsLeft = 60;

// Calls first page function immediately
startPage();

// Start page function
function startPage() {
    // Creating the variables for each element on the Start Page
    var quizTitle = document.createElement("h1");
    var quizExp = document.createElement("p");
    var startBtn = document.createElement("button");

    // Putting content into those elements
    quizTitle.textContent = "Fantasy Worlds Quiz";
    quizExp.textContent = "Come one, come all! Test your knowledge on Eric's favorite fantasy worlds! 60 seconds on the clock! 5 seconds will be deducted with each wrong answer! Good luck...";
    startBtn.textContent = "Start Quiz";
    
    // Appending those children to their parent
    blockContainer.appendChild(quizTitle);
    blockContainer.appendChild(quizExp);
    blockContainer.appendChild(startBtn);
    
    // Start button starts the question function and timer
    startBtn.addEventListener("click", questionBlock);
    startBtn.addEventListener("click", setTime);
}

// Timer function taken from class activity with minor changes
function setTime() {
    
    // Sets interval and starts the countdown (per 1000ms)
    var timerInterval = setInterval(function () {
        secondsLeft--;

        // Adding content to timer at top right of page
        timeEl.textContent = "Time: " + secondsLeft;

        // If we are on the 6th element (doesn't exist) of the questions array then it will stop the time and start the initials page function
        if (currentQ === 5) {
            clearInterval(timerInterval);
            initialsPage();
        }
    }, 1000);
}

// This function cycles through the questions erasing the questions before
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
                secondsLeft -= 5;
            }

            setTimeout(function () {
                blockContainer.appendChild(hr);
                blockContainer.appendChild(ansResp);
            }, 0);

            setTimeout(function () {
                blockContainer.removeChild(hr);
                blockContainer.removeChild(ansResp);
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
    var allDone = document.createElement("h1");
    var finScore = document.createElement("p");

    // !!!! THESE BOTH NEED TO ME IN A FUCKING FORM
    var submitBtn = document.createElement("button");
    var initialsInput = document.createElement("input");

    initialsInput.setAttribute("type", "text");
    allDone.textContent = "All done!";
    finScore.textContent = "Your score was " + secondsLeft + "!";
    submitBtn.textContent = "Submit";

    blockContainer.appendChild(allDone);
    blockContainer.appendChild(finScore);
    blockContainer.appendChild(submitBtn);
    blockContainer.appendChild(initialsInput);

    localStorage.setItem("Score", secondsLeft);
    localStorage.setItem("initials", initialsInput.value);
    submitBtn.addEventListener("click", highscorePage);
}

function highscorePage(event) {
    blockContainer.innerHTML = "";
    var hsHead = document.createElement("h1");
    var hsList = document.createElement("ol");
    var initialsAndScore = document.createElement("li");
    var goBack = document.createElement("button");
    var clearHS = document.createElement("button");

    hsHead.textContent = "Highscores";
    clearHS.textContent = "Clear HighScores";
    goBack.textContent = "Restart";
    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("Score");
    initialsAndScore.textContent = initials + "-" + score;

    blockContainer.appendChild(hsHead);
    blockContainer.appendChild(hsList);
    hsList.appendChild(initialsAndScore);
    blockContainer.appendChild(clearHS);
    blockContainer.appendChild(goBack);
    
    clearHS.onclick = function (event) {
        hsList.textContent = "";
    }
    goBack.addEventListener("click", startPage);

}