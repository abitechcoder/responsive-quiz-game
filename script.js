const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const previousBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreBoard = document.getElementById('score');
var numScore = 0; 

const questionsRepo = [
    {
        question: "Who invented JavaScript?",
        answers: {
          a: "Douglas Crockford",
          b: "Sheryl Sandberg",
          c: "Brendan Eich",
          d: "Adeosun Abiola"
        },
        correctAnswer: "c"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm",
          d: "JVM"
        },
        correctAnswer: "c"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "RequireJS",
          d: "ESLint"
        },
        correctAnswer: "d"
    },
    {
        "question": "What is a search engine?",
        "answers": {
            "a": "Machine for searching passengers in a train",
            "b": "Machine for repairing computers",
            "c": "A computer program that searches for and gets information from the internet",
            "d": "A programming Language"
        },
        correctAnswer: "c"
    },
    {
        "question": "The website address of google is?",
        "answers": {
            "a": "www.google.uk",
            "b": "www.google.org",
            "c": "www.google.ng",
            "d": "www.google.com"
        },
        correctAnswer: "d"
    },
    {
        "question": "To surf on the internet also means________?",
        "answers": {
            "a": "Browse",
            "b": "Copy",
            "c": "Wait",
            "d": "Save"
        },
        correctAnswer: "a"
    },
    {
        "question": "To load a search engine, type it on the____.",
        "answers": {
            "a": "Toolbar",
            "b": "Menu bar",
            "c": "Scroll bar",
            "d": "Address bar"
        },
        correctAnswer: "d"
    },
    {
        "question": "The following are search engines except______.",
        "answers": {
            "a": "Google",
            "b": "Bing",
            "c": "ColdJobs.com",
            "d": "Yahoo"
        },
        correctAnswer: "c"
    }
];

function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // loop through the array of questions
    questionsRepo.forEach((currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];
        
        for(letter in currentQuestion["answers"]){
            answers.push(
                `<label>
                 <input type="radio" name="question${questionNumber}" onclick="check(this)" value="${letter}">
                 ( ${letter} ) : ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // add together the question and its answers to the output
        output.push(
            `<div class="slide fade">
                <div class="question">${questionNumber+1}.)  ${currentQuestion.question} </div>
                <div class="answers">${answers.join("")}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join("");
    
}

// Next / Previous Controls
function plusSlides(n) {
    showSlides(slideIndex += n)
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('slide');
    if(n == slides.length){
        //next button should be disabled
        nextBtn.disabled = true;
        nextBtn.style.backgroundColor = "black";
        nextBtn.style.color= "black";
        submitButton.style.display = "block";
    }else{
        nextBtn.disabled = false;
        nextBtn.style.backgroundColor = "darkviolet";
        nextBtn.style.color= "white";
        submitButton.style.display = "none";
    }
    if (n == 1){
        //previous button should be disabled
        previousBtn.disabled = true;
        previousBtn.style.backgroundColor = "black";
        previousBtn.style.color= "black";
    }else{
        previousBtn.disabled = false;
        previousBtn.style.backgroundColor = "darkviolet";
        previousBtn.style.color= "white";
    }

    for(i=0; i<slides.length; i++){
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "block";
}

function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    questionsRepo.forEach((currentQuestion, questionNumber) => {
        //find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        let correctAnswer = currentQuestion.correctAnswer;

        if(userAnswer === correctAnswer) {
            numCorrect++;
        }
        // Show number of correct answers out of total
        resultsContainer.innerHTML = `<h1 class="center">Thanks For your time!!!</h1>
        <h1 style="margin-bottom:0px">You Scored:</h1>
        <p class="center resPar"><span class="resParBig">${numCorrect}</span> out of ${questionsRepo.length}</p>`;
        
    });
}

function check(element) {
    let questionNumber = slideIndex - 1;
    const userAnswer = element.value;
    const correctAnswer = questionsRepo[questionNumber].correctAnswer;
    // const label = element.parentElement;
    // console.log(label.parentElement)
    if(userAnswer === correctAnswer) {
        element.parentElement.classList.add("correct");
        numScore += 1;
        scoreBoard.innerHTML = `Score: ${numScore}`
    }else {
        element.parentElement.classList.add("wrong");
    }
    // disableAnswers(`question${questionNumber}`);
    
}

// function disableAnswers(classname) {
//     const answers = quizContainer.querySelectorAll(classname);
//     answers.forEach((answer) => {
//         console.log(answer)
//     });
// }


buildQuiz();

var slideIndex = 1;
showSlides(slideIndex);

submitButton.addEventListener("click", showResults);

