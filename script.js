// TES QUESTIONS, CHOIX ET IMAGES/VIDÉOS
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

// Récupération des éléments du HTML
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const rewardContainer = document.getElementById("reward-container");
const rewardImage = document.getElementById("reward-image");
const rewardVideo = document.getElementById("reward-video");
const rewardVideoSource = document.getElementById("reward-video-source");
const quizCard = document.getElementById("quiz-card");
const finalCard = document.getElementById("final-card");
const bgMusic = document.getElementById("bg-music");

// Lancement de la musique
function playAudio() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().then(() => {
      // Une fois lancée, on retire les écouteurs pour économiser les ressources
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    }).catch((err) => {
      console.log("Lecture automatique bloquée : attente d'une interaction utilisateur.");
    });
  }
}

// Tentative au chargement puis écouteurs globaux
window.addEventListener("DOMContentLoaded", () => {
  if (bgMusic) {
    bgMusic.volume = 0.5; // Ajuste le volume à 50%
  }
  playAudio();
  document.addEventListener("click", playAudio);
  document.addEventListener("touchstart", playAudio);
});

function loadQuestion() {
  // Masquer les médias et réinitialiser la vidéo
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
    button.onclick = () => {
      playAudio(); // Déclencheur de secours sur le clic du bouton
      checkAnswer(index);
    };
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const currentQ = questions[currentQuestionIndex];

  if (selectedIndex === currentQ.answer) {
    optionsContainer.innerHTML = "";

    // Détection automatique : Vidéo (.mp4) ou Image (.jpg/.png)
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

  // Lancement de la pluie de confettis
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Lancer le jeu au chargement de la page
loadQuestion();
