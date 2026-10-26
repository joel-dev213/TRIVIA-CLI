// Summative Lab: Trivia CLI Game
// Author: Student Developer
// Description: A web development trivia quiz for the terminal.

const readline = require("readline");

// Set up readline so we can read what the user types.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// The quiz questions are stored in an array of objects.
// correctAnswer is the number of the correct option.
const questions = [
    {
        question: "Which company originally developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        correctAnswer: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Styled Sections",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<href>", "<a>", "<url>"],
        correctAnswer: 3
    },
    {
        question: "Which array method adds one or more elements to the end of an array?",
        options: [".pop()", ".shift()", ".push()", ".slice()"],
        correctAnswer: 3
    },
    {
        question: "Which operator checks equality without performing type conversion?",
        options: ["==", "===", "=", "!="],
        correctAnswer: 2
    },
    {
        question: "What does API stand for?",
        options: [
            "Applied Program Integration",
            "Application Programming Interface",
            "Automated Process Input",
            "Advanced Programming Internet"
        ],
        correctAnswer: 2
    }
];

const TIME_LIMIT = 15000; // 15 seconds per question

let score = 0;
let currentQuestion = 0;
let results = [];
let timerId = null;
let waitingForAnswer = false;
let gameOver = false;

// Show the title and instructions at the start.
function showWelcome() {
    console.log("========================================");
    console.log("       WEB DEVELOPMENT TRIVIA QUIZ      ");
    console.log("========================================");
    console.log("There are " + questions.length + " questions.");
    console.log("You get 15 seconds for each question.");
    console.log("Type the number of your answer and press Enter.");
    console.log("");
}

// Start the game.
function startGame() {
    showWelcome();
    askQuestion();
}

// Display the current question and start its timer.
function askQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestion];

    console.log("Question " + (currentQuestion + 1) + " of " + questions.length);
    console.log(question.question);

    // Loop through the options and print them with numbers.
    question.options.forEach(function (option, index) {
        console.log("  " + (index + 1) + ". " + option);
    });

    waitingForAnswer = true;

    // If the user does not answer in time, move on to the next question.
    clearTimeout(timerId);
    timerId = setTimeout(timeUp, TIME_LIMIT);

    rl.setPrompt("Your answer (1-" + question.options.length + "): ");
    rl.prompt();
}

// This runs when the timer reaches zero.
function timeUp() {
    if (!waitingForAnswer || gameOver) {
        return;
    }

    const question = questions[currentQuestion];
    waitingForAnswer = false;

    console.log("");
    console.log("Time's up!");
    console.log("The correct answer was " + question.correctAnswer + ". " +
        question.options[question.correctAnswer - 1]);

    results.push({
        question: question.question,
        userAnswer: "No answer (timed out)",
        correctAnswer: question.correctAnswer + ". " +
            question.options[question.correctAnswer - 1]
    });

    currentQuestion = currentQuestion + 1;
    askQuestion();
}

// This function runs every time the user presses Enter.
function handleAnswer(input) {
    if (!waitingForAnswer || gameOver) {
        return;
    }

    const question = questions[currentQuestion];
    const answer = parseInt(input.trim(), 10);

    // Make sure the input is a valid option number.
    if (isNaN(answer) || answer < 1 || answer > question.options.length) {
        console.log("Invalid input. Please enter a number between 1 and " +
            question.options.length + ".");
        rl.prompt();
        return;
    }

    waitingForAnswer = false;
    clearTimeout(timerId);

    // Compare the user's answer to the correct answer.
    if (answer === question.correctAnswer) {
        console.log("Correct!");
        score = score + 1;
    } else {
        console.log("Incorrect. The correct answer was " + question.correctAnswer + ". " +
            question.options[question.correctAnswer - 1]);
    }

    results.push({
        question: question.question,
        userAnswer: answer + ". " + question.options[answer - 1],
        correctAnswer: question.correctAnswer + ". " +
            question.options[question.correctAnswer - 1]
    });

    currentQuestion = currentQuestion + 1;
    askQuestion();
}

// Show the final score, feedback, and a review of each answer.
function endGame() {
    gameOver = true;
    waitingForAnswer = false;
    clearTimeout(timerId);
    rl.close();

    const percentage = Math.round((score / questions.length) * 100);
    let feedback = "";

    if (percentage === 100) {
        feedback = "Perfect score! Great job!";
    } else if (percentage >= 70) {
        feedback = "Nice work! You know your stuff.";
    } else if (percentage >= 50) {
        feedback = "Good effort. Keep practicing!";
    } else {
        feedback = "Keep studying and try again!";
    }

    console.log("");
    console.log("========================================");
    console.log("              QUIZ COMPLETED             ");
    console.log("========================================");
    console.log("Final score: " + score + " out of " + questions.length);
    console.log("Percentage: " + percentage + "%");
    console.log("Feedback: " + feedback);

    console.log("");
    console.log("Answer review:");

    results.forEach(function (result, index) {
        console.log("");
        console.log((index + 1) + ". " + result.question);
        console.log("   Your answer: " + result.userAnswer);
        console.log("   Correct answer: " + result.correctAnswer);
    });

    console.log("");
    console.log("Thanks for playing!");
}

// Listen for the user's input.
rl.on("line", handleAnswer);

// Stop the timer if the program is closed early.
rl.on("close", function () {
    if (!gameOver) {
        gameOver = true;
        clearTimeout(timerId);
        console.log("");
        console.log("Quiz ended early. Goodbye!");
    }
});

// Start the quiz.
startGame();
