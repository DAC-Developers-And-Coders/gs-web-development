const slides = document.querySelectorAll(".card-objective-item");

let index = 0;


const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const chooseBtn = document.getElementById("choose-btn");
const newsLink = document.querySelectorAll("#news-link");
const themeSelect = document.getElementById('theme-select');
import questions from "./questions.js"
const questionTitle = document.getElementById("title-question");
const questionAnswer = document.getElementById("answer-question-btn");
const questionNext = document.getElementById("next-question-btn");
let currentQuestionIndex = 0;
let score = 0;

function applyTheme(theme) {
    const root = document.documentElement;
    
    root.classList.remove('theme-light', 'theme-alt');
    
    if (theme === 'light') root.classList.add('theme-light');
    if (theme === 'alt')   root.classList.add('theme-alt');
    
    localStorage.setItem('theme', theme);
}

themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
});

const savedTheme = localStorage.getItem('theme') || 'default';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

const showSlide = (nextIndex) => {
    slides[index].classList.remove("active");
    index = nextIndex;

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add("active");
}

const chooseSlide = () => {
    const chosenFeature = prompt(
        `Escolha uma etapa de 1 até ${slides.length}`
    );

    if (chosenFeature !== null) {
        const slideIndex = parseInt(chosenFeature);

        if (!isNaN(slideIndex) && slideIndex >= 1 && slideIndex <= slides.length) {
            showSlide(slideIndex - 1);
        } else {
            alert("Valor inválido");
        }
    }
}

const newsClick = (event) => {
    event.preventDefault();
    alert("Você será direcionado para o site da notícia")
    window.open(event.currentTarget.href, "_blank");
}

showSlide(index);

nextBtn.addEventListener("click", () => {
    showSlide(index + 1);
});

prevBtn.addEventListener("click", () => {
    showSlide(index - 1);
});

chooseBtn.addEventListener("click", () => {
    chooseSlide();
});

newsLink.forEach((link) => {
    link.addEventListener("click", newsClick);
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionNext.innerHTML = "Próximo";
    showQuestion();
}

function resetState() {
   questionNext.style.display = "none";
    while (questionAnswer.firstChild) {
        questionAnswer.removeChild(questionAnswer.firstChild)
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionTitle.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answers) => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.dataset.id = answers.id;
        button.classList.add("option-question-btn")
        button.addEventListener("click", selectAnswer)
        questionAnswer.appendChild(button);
    })
}

function selectAnswer(event) {
    const answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(questionAnswer.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.id == correctAnswer.id) {
        button.classList.add("correct");
        }
    });
    questionNext.style.display = "block";
}

function showScore() {
    resetState();

}

function handleNextButton() {
    currentQuestionIndex++;
     if (currentQuestionIndex < questions.length) {
        showQuestion();
     } else {
        showScore();
        questionTitle.innerHTML = `Você acertou ${score} de ${questions.length}!`;
     }
}

questionNext.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz;
    }
});
startQuiz();