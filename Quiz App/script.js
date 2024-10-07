const questions = [ 
    {
        question: "Which is the largest animal in the world ?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
        },
        {
            question: "Which is the smallest country in the world ?",
            answers: [
                { text: "Vatican City", correct: true},
                { text: "Bhutan", correct: false},
                { text: "Nepal", correct: false},
                { text: "Shri Lanka", correct: false},
            ]
        },
        {
            question: "Which is the largest deset in the world ?",
            answers: [
                { text: "Kalahari", correct: false},
                { text: "Gobi", correct: false},
                { text: "Sahara", correct: false},
                { text: "Antatrctica", correct: true},
            ]
        },
        {
            question: "Which is the smallest continent in the world ?",
            answers: [
                { text: "Asia", correct: false},
                { text: "Australia", correct: true},
                { text: "Arctic", correct: false},
                { text: "Africa", correct: false},
            ]
        }
];

const queElement = document.getElementById("question");
const ansBtn = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    queElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        ansBtn.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAns);
    });
}

function resetState(){
    nextBtn.style.display  = "none";
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAns(e){
    const selectedBtn  = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    queElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});



startQuiz();