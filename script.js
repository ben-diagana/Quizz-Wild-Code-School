// import questions
import { questions } from './questions.js'

// Dom elements
const btnValid = document.querySelector('#btn-validation');
const btnReset = document.querySelector('#btn-reset');
const divScore = document.querySelector('#score-container');
const questionsContainer = document.querySelector('#questions-container');

// variables
let score = 0;

// functions

function setScore() {
    // iterate through each question
    questions.forEach(question => {
        // creates object div matching question id
        const questionDiv = document.getElementById(question.id);
        // creates radioBtn array for the question
        const answerBtns = questionDiv.querySelectorAll('input');
        // iterate through button and checks if it matches correct answer
        // if so, increments score
        answerBtns.forEach(answerBtn => {
            if (answerBtn.checked && answerBtn.value == question.correctAnswer) {
                score++
            }
        })
    })
}


function displayResult() {
    //creates h3
    const paragraphe = document.createElement("h3")
        // add content to h3
    paragraphe.textContent = "Votre score est de " + score
        //add h3 to div score
    divScore.appendChild(paragraphe);
}


// adds background color to question div (blue if correct answer / red if wrong answer)
function displayCorrectAnswer() {
    questions.forEach(question => {
        const questionDiv = document.getElementById(question.id)
        questionDiv.querySelectorAll('input').forEach(input => {
            if (input.checked) {
                if (input.value == question.correctAnswer) {
                    questionDiv.classList.add('bg-success')
                } else {
                    questionDiv.classList.add('bg-danger')
                }
            }
        })
    })
}

function showReset() {
    btnReset.classList.remove('d-none')
    btnValid.classList.add('d-none')
}

function showValid() {
    btnReset.classList.add('d-none')
    btnValid.classList.remove('d-none')
}


function handleClick() {
    setScore()
    displayResult()
    displayCorrectAnswer()
    showReset()
}


function resetAnswers() {
    // initialise le score
    score = 0
        //vide la div score
    const paragraphe = divScore.querySelector('h3')
    divScore.removeChild(paragraphe)
        //initialise les radio buttons
    const checkBoxes = document.querySelectorAll('input')
    checkBoxes.forEach(cb => {
            cb.checked = false
        })
        //initialise les background div
    questions.forEach(question => {
        const questionDiv = document.getElementById(question.id)
        questionDiv.classList.remove('bg-success')
        questionDiv.classList.remove('bg-danger')
            // show valid btn / hide rest btn
        showValid()
    })
}

//interactions
btnValid.addEventListener('click', handleClick)
btnReset.addEventListener('click', resetAnswers)


// creation dom elements
// iterates through each question
questions.forEach(question => {
    // creates a div for a question
    const questionDiv = document.createElement('div')
        //gives the div an id coressponding to the question id
    questionDiv.id = question.id
        //adds styling class to the div
    questionDiv.classList.add('mb-3')
        // creates a h5 for question sentence
    const questionH5 = document.createElement('h5')
        // adds question sentence to h5
    questionH5.textContent = question.question
        // places h5 into question div
    questionDiv.appendChild(questionH5)
        // places question div into questions container
    questionsContainer.appendChild(questionDiv)

    // iterates through each answer for the question
    question.answers.forEach(answer => {
        // creates a div
        let answerDiv = document.createElement('div')
            // creates an input
        let answerRadioButton = document.createElement('input')
            // add type RADIO to input
        answerRadioButton.setAttribute('type', 'radio');
        // adds name to input (corresponding to question id)
        answerRadioButton.setAttribute('name', question.id);
        // adds a value to input (corresponding to answer index)
        answerRadioButton.setAttribute('value', question.answers.indexOf(answer));
        // adds styling class
        answerRadioButton.classList.add('mx-2');
        // creates a label for the input
        let answerLabel = document.createElement('label');
        // adds answer sentence to the label
        answerLabel.textContent = answer
            // adds styling class
        answerDiv.classList.add('d-inline')
        answerDiv.classList.add('px-3')
            // places input into answer div
        answerDiv.appendChild(answerRadioButton)
            // places label into answer div
        answerDiv.appendChild(answerLabel)
            // places answer div into question div
        questionDiv.appendChild(answerDiv)
    })
})