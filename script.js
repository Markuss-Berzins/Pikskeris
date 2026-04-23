/***********************
 * VISU ATTĒLU SARAKSTS
 ***********************/
const ALL_QUESTIONS = [
  { image: "images/q01.png", phishing: true,  explanation: "Steidzams teksts un draudi." },
  { image: "images/q02.png", phishing: false, explanation: "Parasts informatīvs paziņojums." },
  { image: "images/q03.png", phishing: true,  explanation: "Prasa ievadīt vai apstiprināt datus." },
  { image: "images/q04.png", phishing: false, explanation: "Nav saišu vai piespiedu darbību." },
  { image: "images/q05.png", phishing: true,  explanation: "Aicina veikt maksājumu." },
  { image: "images/q06.png", phishing: true,  explanation: "Nepazīstams sūtītājs." },
  { image: "images/q07.png", phishing: false, explanation: "Iekšējs paziņojums bez steigas." },
  { image: "images/q08.png", phishing: true,  explanation: "SMS ar saiti vai maksājumu." },
  { image: "images/q09.png", phishing: false, explanation: "Publiska informācija." },
  { image: "images/q10.png", phishing: true,  explanation: "Viltus dizains un spiediens." },

  /* ↑ pievieno līdz 30+ */
];

/***********************
 * RANDOM 10 JAUTĀJUMI
 ***********************/
function pickRandom(all, count) {
  return [...all].sort(() => Math.random() - 0.5).slice(0, count);
}

const questions = pickRandom(ALL_QUESTIONS, 10);
let current = 0;
let score = 0;

/***********************
 * RĀDA JAUTĀJUMU
 ***********************/
function showQuestion() {
  const q = questions[current];

  document.getElementById("questionImage").src = "../" + q.image;
  document.getElementById("counter").innerText =
    `Jautājums ${current + 1} no ${questions.length}`;

  document.getElementById("progressBar").style.width =
    (current / questions.length) * 100 + "%";
}

/***********************
 * ATBILDE
 ***********************/
function answer(choice) {
  const q = questions[current];
  const feedback = document.getElementById("feedback");

  document.getElementById("btnPhish").disabled = true;
  document.getElementById("btnSafe").disabled = true;

  if (choice === q.phishing) {
    score++;
    feedback.innerText = "✅ Pareizi. " + q.explanation;
    feedback.style.color = "#22c55e";
  } else {
    feedback.innerText = "❌ Nepareizi. " + q.explanation;
    feedback.style.color = "#ef4444";
  }

  document.getElementById("nextBtn").style.display = "inline-block";
}

/***********************
 * NĀKAMAIS JAUTĀJUMS
 ***********************/
function nextQuestion() {
  document.getElementById("btnPhish").disabled = false;
  document.getElementById("btnSafe").disabled = false;
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("feedback").innerText = "";

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

/***********************
 * REZULTĀTS (tikai punkti)
 ***********************/
function showResult() {
  document.body.innerHTML = `
    <div class="container">
      <h2>Tests pabeigts</h2>
      <p><strong>${score}</strong> no ${questions.length}</p>
      <a class="btn" href="../">Atgriezties</a>
    </div>
  `;
}

showQuestion();
