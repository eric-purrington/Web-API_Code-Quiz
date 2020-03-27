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

// Grabbing elements from the html 
var blockContainer = document.getElementById("blockContainer");
var timeEl = document.getElementById("time");
var hsEl = document.getElementById("viewHs");
hsEl.addEventListener("click", highscorePage);

// Setting current question to the first one, setting time to 60, and creating a global initials string to be pulled from multiple functions
var currentQ = 0;
var secondsLeft = 60;

var initialsAndScores = [];
var initialsArray = [];
var scoresArray = [];

// Calls first page function immediately
startPage();

// Start page function
function startPage() {
    // Clears blockContainer incase user comes from highscore page
    blockContainer.innerHTML = "";

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
    // Make time start at 60 with every restart
    secondsLeft = 60;

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
    // Clear previous blockContainer children
    blockContainer.innerHTML = "";

    // Create question and an empty array for the answer buttons
    var question = document.createElement("h2");
    var ansBtns = [];

    // Writing out current question and appending the element
    question.textContent = questions[currentQ].question;
    blockContainer.appendChild(question);

    // Adding ids to h2 per question to style
    if (currentQ == 0) {
        question.setAttribute("id", "HDM");
    } else if (currentQ == 1) {
        question.setAttribute("id", "LOTR");
    } else if (currentQ == 2) {
        question.setAttribute("id", "StarWars");
    } else if (currentQ == 3) {
        question.setAttribute("id", "Marvel");
    } else if (currentQ == 4) {
        question.setAttribute("id", "HP");
    }

    // For loop to cycle through ansBtns, writing what each answer is and appending them as well as listening for a click 
    for (i = 0; i < 4; i++) {
        ansBtns[i] = document.createElement("button");
        ansBtns[i].textContent = questions[currentQ].answers[i];
        blockContainer.appendChild(ansBtns[i]);

        // Function that compares what the user chose and what the correct answer is
        ansBtns[i].onclick = function ansCheck(event) {

            // Create the line and answer response ie correct/wrong
            var hr = document.createElement("hr");
            var ansResp = document.createElement("h3");

            // Comparison and counts up on current question index
            if (this.textContent == questions[currentQ].correctAnswer) {
                ansResp.textContent = "Correct!";
                currentQ++;
            } else {
                ansResp.textContent = "Wrong!";
                currentQ++;
                secondsLeft -= 5;
            }

            // Function that appends the line and response
            setTimeout(function () {
                blockContainer.appendChild(hr);
                blockContainer.appendChild(ansResp);
            }, 0);

            // Function that deletes the line and response after one second
            setTimeout(function () {
                hr.parentNode.removeChild(hr);
                ansResp.parentNode.removeChild(ansResp);
            }, 1000);

            // Tests whether to restart questionBlock or go to initialsPage
            if (currentQ == 5) {
                initialsPage();
            } else {
                questionBlock();
            }
        }
    }
}

// Function that initializes initials page
function initialsPage() {
    // Clear previous blockContainer children
    blockContainer.innerHTML = "";

    // Creating variables for each element that needs appending
    var allDone = document.createElement("h1");
    var finScore = document.createElement("p");
    var initialsInput = document.createElement("input");
    var initialsLabel = document.createElement("label");
    var submitBtn = document.createElement("button");
    initialsLabel.setAttribute("for", "initialsInput");

    // Giving some body to those elements
    allDone.textContent = "All done!";
    finScore.textContent = "Your score was " + secondsLeft + "!";
    submitBtn.textContent = "Submit";
    initialsLabel.textContent = "Enter your initials:";
 
    // Putting those elements into the blockContainer
    blockContainer.appendChild(allDone);
    blockContainer.appendChild(finScore);
    blockContainer.appendChild(initialsLabel);
    blockContainer.appendChild(initialsInput);
    blockContainer.appendChild(submitBtn);

    // Submit button is clicked the initials and score are put into their arrays
    submitBtn.onclick = function saveInitials(event) {
        initialsArray.push(initialsInput.value);
        scoresArray.push(secondsLeft);
        for (i = 0; i < initialsArray.length; i++) {
            initialsAndScores.push({ initials: initialsArray[i], score: scoresArray[i] });
            if (i > 0) {
                initialsAndScores.sort(function (a, b) {
                    return b.score - a.score;
                });
            }
        }
        initialsAndScores = JSON.stringify(initialsAndScores);
        localStorage.setItem("initialsAndScores", initialsAndScores);
    }

    // Submit button also starts the highscorePage function after saving initials and score
    submitBtn.addEventListener("click", highscorePage);
}

// Function that runs the highscore page
function highscorePage(event) {
    // Event delegation
    event.preventDefault();

    // Clear previous blockContainer children
    blockContainer.innerHTML = "";

    // Creating variables for each element that needs appending
    var hsHead = document.createElement("h1");
    var hsList = document.createElement("ol");
    var goBack = document.createElement("button");
    var clearHS = document.createElement("button");
    var storedInitialsAndScores = JSON.parse(localStorage.getItem("initialsAndScores"))
    var li = [];

    // Putting some context into those elements
    hsHead.textContent = "Highscores";
    clearHS.textContent = "Clear HighScores";
    goBack.textContent = "Restart";

    // Creates list of ordered highscores from storage and appends each one
    for (i = 0; i < storedInitialsAndScores.length; i++){
        li[i] = document.createElement("li");
        li[i].textContent = i + 1 + ". " + storedInitialsAndScores[i].initials + ": " + storedInitialsAndScores[i].score;
        hsList.appendChild(li[i]);
    }

    // Appending the rest of the elements
    blockContainer.appendChild(hsHead);
    blockContainer.appendChild(hsList);
    blockContainer.appendChild(clearHS);
    blockContainer.appendChild(goBack);

    // Function that clears the arrays, strings, and content of highscores
    clearHS.onclick = function (event) {
        hsList.textContent = "";
        // initialsAndScores = [];
        // initialsArray = [];
        // scoresArray = [];
    }

    // Function that sends the user back to the starts, zeros the current question and empties the initials and scores array so more can be added
    goBack.onclick = function (event) {
        currentQ = 0;
        initialsAndScores = [];
        startPage();
    }
}