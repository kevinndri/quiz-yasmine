const questions = [
  {
    question: "Où s'est passé notre tout premier rendez-vous ?",
    options: ["A la djibi", "Au parc", "Dans un bar", "Au restaurant"],
    answer: 2, 
    image: "image/photo1.jpg"
  },
  {
    question: "Quelle est la personne la plus résiliente de ton entourage ?",
    options: ["yasmine", "cheick", "safi", "madoussou"],
    answer: 1,
    image: "image/photo2.jpg"
  },
  {
    question: "Quelle est la date exacte de notre rencontre ?",
    options: ["18 avril", "7 septembre", "25 septembre", "2 mai"],
    answer: 3,
    image: "image/photo3.jpg"
  },
  {
    question: "Qui a les plus balaise yeux de la maison ?",
    options: ["madoussou", "safi", "roxane", "samira"],
    answer: 1,
    image: "image/photo4.jpg"
  },
  {
    question: "C'est l'anniversaire de qui aujourd'hui ?",
    options: ["la plus tetu", "la plus enceinte", "la plus sexy", "la plus belle"],
    answer: 1,
    image: "image/video_2.mp4"
  }
];

let currentQuestionIndex = 0;

const startCard = document.getElementById("start-card");
const quizCard = document.getElementById("quiz-card");
const finalCard = document.getElementById("final-card");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const rewardContainer = document.getElementById("reward-container");
const rewardImage = document.getElementById("reward-image");
const rewardVideo = document.getElementById("reward-video");
const rewardVideoSource = document.getElementById("reward-video-source");
const bgMusic = document.getElementById("bg-music");

// Fonction appelée quand elle clique sur "Commencer le Quiz"
function startQuiz() {
  // 1. Lancer la musique immédiatement sur le clic
  if (bgMusic) {
    bgMusic.play().catch(e => console.log("Erreur lecture audio :", e));
  }
  
  // 2. Basculer l'affichage
  startCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  
  // 3. Charger la première question
  loadQuestion();
}

function loadQuestion() {
  rewardContainer.classList.add("hidden");
  if (rewardImage) rewardImage.classList.add("hidden");
  if (rewardVideo) {
    rewardVideo.classList.add("hidden");
    rewardVideo.pause();
  }
  
  optionsContainer.innerHTML = "";

  const currentQ = questions[currentQuestionIndex];
  questionText.textContent = `Question ${currentQuestionIndex + 1} : ${currentQ.question}`;

  currentQ.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const currentQ = questions[currentQuestionIndex];

  if (selectedIndex === currentQ.answer) {
    optionsContainer.innerHTML = "";

    if (currentQ.image.endsWith(".mp4")) {
      if (rewardVideoSource && rewardVideo) {
        rewardVideoSource.src = currentQ.image;
        rewardVideo.load();
        rewardVideo.classList.remove("hidden");
      }
    } else {
      if (rewardImage) {
        rewardImage.src = currentQ.image;
        rewardImage.classList.remove("hidden");
      }
    }

    rewardContainer.classList.remove("hidden");
  } else {
    alert("genre toi tu connais pas quoi yf 😉❤️");
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalScreen();
  }
}

function showFinalScreen() {
  quizCard.classList.add("hidden");
  finalCard.classList.remove("hidden");

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}
