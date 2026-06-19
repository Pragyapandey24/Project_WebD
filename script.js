const questions = [
{
    question: "What does CPU stand for?",
    answers: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Control Processing Unit"],
    correct: 1
},
{
    question: "Which data structure uses FIFO?",
    answers: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
},
{
    question: "Which language is used for web styling?",
    answers: ["HTML", "Python", "CSS", "C++"],
    correct: 2
},
{
    question: "Which of these is NOT a programming language?",
    answers: ["Python", "Java", "HTML", "C++"],
    correct: 2
},
{
    question: "What is the time complexity of binary search?",
    answers: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1
},
{
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: ["int", "var", "define", "dim"],
    correct: 1
},
{
    question: "Which of the following is a database?",
    answers: ["MySQL", "HTML", "CSS", "Python"],
    correct: 0
},
{
    question: "What does RAM stand for?",
    answers: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Real-time Access Memory"],
    correct: 1
},
{
    question: "Which sorting algorithm is fastest on average?",
    answers: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    correct: 2
},
{
    question: "Which HTML tag is used for JavaScript?",
    answers: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1
},
{
    question: "Which protocol is used for web browsing?",
    answers: ["FTP", "SMTP", "HTTP", "SSH"],
    correct: 2
},
{
    question: "Which of these is an operating system?",
    answers: ["Windows", "Python", "HTML", "MySQL"],
    correct: 0
}
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const progressText = document.getElementById("progressText");

let highScore = localStorage.getItem("highScore") || 0;

function startTimer() {
    timeLeft = 10;
    timerEl.innerText = "⏱️ " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = "⏱️ " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextBtn.style.display = "block";
        }
    }, 1000);
}

function showQuestion() {
    resetState();

    let q = questions[currentQuestion];
    questionEl.innerText = q.question;

    progressText.innerText = `${currentQuestion + 1}/${questions.length}`;
    progressEl.style.width = (currentQuestion / questions.length) * 100 + "%";

    startTimer();

    q.answers.forEach((ans, index) => {
        let btn = document.createElement("button");
        btn.innerText = ans;
        btn.onclick = () => selectAnswer(index);
        answersEl.appendChild(btn);
    });
}

function resetState() {
    clearInterval(timer);
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";
}

function selectAnswer(index) {
    clearInterval(timer);

    let correct = questions[currentQuestion].correct;
    let buttons = answersEl.children;

    for (let i = 0; i < buttons.length; i++) {
        if (i === correct) buttons[i].classList.add("correct");
        else buttons[i].classList.add("wrong");
        buttons[i].disabled = true;
    }

    if (index === correct) score++;

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    questionEl.classList.add("hidden");
    answersEl.classList.add("hidden");
    nextBtn.classList.add("hidden");

    if (score > highScore) {
        localStorage.setItem("highScore", score);
        highScore = score;
    }

    resultEl.classList.remove("hidden");
    resultEl.innerHTML = `
        <h2>🎉 Score: ${score}/${questions.length}</h2>
        <h3>🏆 High Score: ${highScore}</h3>
        <button onclick="location.reload()">Play Again</button>
    `;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

showQuestion();