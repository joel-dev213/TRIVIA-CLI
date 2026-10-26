# TRIVIA CLI WEB DEVELOPMENT

A simple command-line trivia quiz built with Node.js. The user answers six web development questions by typing the number of their chosen answer. The quiz keeps score, has a time limit for each question, and shows a review at the end.

## Features

- Six multiple-choice questions
- 15-second timer for each question
- Input validation for answers
- Automatic score tracking
- Final percentage and feedback message
- Answer review showing the user's answer and the correct answer


## Project Structure

```text
CLI/
└── index.js   # Contains the questions and all quiz logic
```

## Questions Structure

The questions are stored in the `questions` array near the top of `index.js`. Each question has:

- `question` – the question text
- `options` – an array of possible answers
- `correctAnswer` – the number of the correct option, starting at 1

## How to Play

1. Read the question and its options that you are provided for.
2. Type the number of your answer and press Enter.
3. Answer before the 15-second timer runs out.
4. After the last question, check your final score and answer review The questions that you never score right.

Valid answers are numbers from 1 to 4. If the user enters something invalid, the quiz asks again without moving to the next question.


## Requirements

- Node.js installed on your computer
- No extra packages are needed to work with  the CLI

## How to Run

Open a terminal in this folder and run:

```bash
node index.js
```
