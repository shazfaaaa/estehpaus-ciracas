  const quizData = [
    {
      question: "Lagi pengen minum Es Teh Paus buat suasana apa nih?",
      a: "Lagi haus banget di tengah hari yang panas, butuh yang segar-segar!",
      b: "Pengen self-reward atau traktir diri sendiri, maunya yang spesial dan memanjakan.",
      c: "Butuh yang manis dan bikin mood jadi ceria lagi.",
      d: "Tertarik coba sesuatu yang baru, unik, dan beda dari biasanya."
    },
    {
      question: "Kamu tim rasa yang seperti apa?",
      a: "Tim teh original yang ringan dan otentik.",
      b: "Tim buah-buahan yang asam manis menyegarkan.",
      c: "Tim creamy dan susu, yang lembut dan kaya rasa.",
      d: "Tim rasa yang tebal, kompleks, dan ada sentuhan gurihnya."
    },
    {
      question: "Seberapa manis dan kaya rasa minuman yang kamu inginkan?",
      a: "Manisnya pas, yang penting bisa hilangin dahaga.",
      b: "Manis segar dari sari buah.",
      c: "Pokoknya harus terasa seperti 'dessert dalam gelas', super nikmat!",
      d: "Suka perpaduan rasa manis dan gurih yang seimbang."
    },
    {
      question: "Bayangkan minuman sempurnamu, apa elemen utamanya?",
      a: "Kesegaran murni dari teh dan buah asli.",
      b: "Perpaduan antara lembutnya susu dengan manisnya buah.",
      c: "Rasa manis pekat dari cokelat, kue, atau taro.",
      d: "Sensasi unik dari gurihnya keju yang bertemu rasa manis."
    }
  ];

  const score = {
    tea: 0,
    milk: 0,
    milkyFruit: 0,
    cheese: 0
  };

  const questionEl = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitBtn = document.getElementById("submit");
  const answerEls = document.querySelectorAll(".answer");
  const quizBox = document.getElementById("quiz-box");
  const resultTemplate = document.getElementById("result-template").content;

  let currentQuiz = 0;

  function loadQuiz() {
    deselectAnswers();
    const currentData = quizData[currentQuiz];
    questionEl.innerText = currentData.question;
    a_text.innerText = currentData.a;
    b_text.innerText = currentData.b;
    c_text.innerText = currentData.c;
    d_text.innerText = currentData.d;
  }

  function deselectAnswers() {
    answerEls.forEach(el => (el.checked = false));
  }

  function getSelected() {
    let selected;
    answerEls.forEach(el => {
      if (el.checked) selected = el.value;
    });
    return selected;
  }

  function assignPoints(index, answer) {
    if (index === 0) {
      if (answer === "a") score.tea++;
      if (answer === "b") {
        score.milk++;
        score.cheese++;
      }
      if (answer === "c") score.milkyFruit++;
      if (answer === "d") score.cheese++;
    } else if (index === 1) {
      if (answer === "a") score.tea++;
      if (answer === "b") {
        score.tea++;
        score.milkyFruit++;
      }
      if (answer === "c") {
        score.milk++;
        score.milkyFruit++;
      }
      if (answer === "d") score.cheese++;
    } else if (index === 2) {
      if (answer === "a") score.tea++;
      if (answer === "b") score.milkyFruit++;
      if (answer === "c") score.milk++;
      if (answer === "d") score.cheese++;
    } else if (index === 3) {
      if (answer === "a") score.tea += 2;
      if (answer === "b") score.milkyFruit += 2;
      if (answer === "c") score.milk += 2;
      if (answer === "d") score.cheese += 2;
    }
  }

  submitBtn.addEventListener("click", () => {
    const selected = getSelected();
    if (!selected) return;
    assignPoints(currentQuiz, selected);
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      const max = Math.max(score.tea, score.milk, score.milkyFruit, score.cheese);
      let result = "";
      let img = "#";

if (score.tea === max) {
  result = "Tea Series";
  img = "assets/5_tea.png";
} else if (score.milk === max) {
  result = "Milk Series";
  img = "assets/6_milk.png";
} else if (score.milkyFruit === max) {
  result = "Milky Fruit Series";
  img = "assets/7_milkfruit.png";
} else if (score.cheese === max) {
  result = "Cheese Series";
  img = "assets/8_cheese.png";
}

      const resultClone = resultTemplate.cloneNode(true);
      resultClone.getElementById("result-text").textContent = "";
      resultClone.getElementById("result-image").src = img;

      quizBox.innerHTML = "";
      quizBox.appendChild(resultClone);
    }
  });

  loadQuiz();
