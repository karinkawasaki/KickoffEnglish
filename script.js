//main title
window.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll(".word");
  const masterTl = gsap.timeline();

  words.forEach((word) => {
    const text = word.getAttribute("data-text");
    word.innerHTML = ""; // 初期化

    const chars = text.split("");

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.classList.add("char");

      const rect = document.createElement("span");
      rect.classList.add("rect");

      const label = document.createElement("span");
      label.classList.add("label");
      label.textContent = char;

      span.appendChild(rect);
      span.appendChild(label);
      word.appendChild(span);
    });

    const tl = gsap.timeline();

    word.querySelectorAll(".char").forEach((char, i) => {
      const rect = char.querySelector(".rect");
      const label = char.querySelector(".label");

      tl.to(rect, {
        xPercent: 120, // ←画面外まで確実に
        duration: 0.6,
        ease: "expo.out",
      }, i * 0.06);

      tl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.out",
      }, i * 0.06 + 0.4); // ←rect が移動してから表示
    });

    masterTl.add(tl, 0);
  });
});



//phrase
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // サッカー用語データ
  const sideScrollItem = [
    {
      phrase: "The 12th Man",
      translation: "12人目の選手（サポーター）",
      sentence: "The fans were like the 12th man on the pitch.",
      sentenceJP: "ファンはまるで12人目の選手のようだった。"
    },
    {
      phrase: "Back of the Net",
      translation: "ゴールネット（得点）",
      sentence: "He hit the back of the net with a powerful shot.",
      sentenceJP: "彼は強烈なシュートでゴールを決めた。"
    },
    {
      phrase: "Clean sheet",
      translation: "無失点",
      sentence: "The goalkeeper kept a clean sheet today.",
      sentenceJP: "今日ゴールキーパーは無失点に抑えた。"
    },
    {
      phrase: "Park the Bus",
      translation: "守備的に構える",
      sentence: "The opposing team is strong in possession, so our team chose to park the bus.",
      sentenceJP: "相手チームはポゼッションに優れているため、うちのチームは守備的な戦術を選択した。"
    },
    {
      phrase: "Nutmeg",
      translation: "股抜き",
      sentence: "He nutmegged the defender and passed the ball.",
      sentenceJP: "彼は相手の股を抜いてボールをパスした。"
    },
    {
      phrase: "Equalizer",
      translation: "同点ゴール",
      sentence: "The striker scored an equalizer in the last minute.",
      sentenceJP: "ストライカーが終了間際に同点ゴールを決めた。"
    },
    {
      phrase: "Under pressure",
      translation: "プレッシャーを受けている",
      sentence: "The team was under pressure in the second half.",
      sentenceJP: "チームは後半にプレッシャーを受けていた。"
    },
    {
      phrase: "Injury blow",
      translation: "負傷による打撃",
      sentence: "The team suffered an injury blow before the match.",
      sentenceJP: "チームは試合前に負傷による打撃を受けた。"
    },
    {
      phrase: "Playmaker",
      translation: "司令塔",
      sentence: "The playmaker controlled the game brilliantly.",
      sentenceJP: "司令塔は見事に試合をコントロールした。"
    },
    {
      phrase: "Promotion",
      translation: "昇格",
      sentence: "The club celebrated promotion to the Premier League.",
      sentenceJP: "クラブはプレミアリーグへの昇格を祝った。"
    },
    {
      phrase: "Relegation zone",
      translation: "降格圏",
      sentence: "They are fighting to escape the relegation zone.",
      sentenceJP: "彼らは降格圏からの脱出を目指して戦っている。"
    },
    {
      phrase: "Transfer window",
      translation: "移籍市場",
      sentence: "The transfer window opens in January.",
      sentenceJP: "移籍市場は1月に開く。"
    },
    {
      phrase: "Derby match",
      translation: "ダービーマッチ",
      sentence: "The derby match was intense from start to finish.",
      sentenceJP: "ダービーマッチは最初から最後まで激しかった。"
    }
  ];

  
  const listEl = document.querySelector('.side-scroll-list');

  sideScrollItem.forEach(word => {
    const card = document.createElement("div");
    card.className = "word-card";

    const highlightedSentence = word.sentence.replace(
      new RegExp(word.phrase, "gi"),
      `<span class="highlight">${word.phrase}</span>`
    );

    card.innerHTML = `
      <h2>${word.phrase}</h2>
      <p class="translation">${word.translation}</p>
      <p class="sentence">"${highlightedSentence}"</p>
      <p class="sentenceJP">${word.sentenceJP}</p>
    `;
    listEl.appendChild(card);

  card.addEventListener("mouseenter", () => {

    
    gsap.to(card, {
      
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  });


  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  });
  });

  gsap.to(".side-scroll-list", {
    x: () => -(listEl.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: ".side-scroll",
      start: "center center",
      end: () => `+=${listEl.scrollWidth - window.innerWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });

  // --- クイズ ---
  const quizData = [...sideScrollItem];
  const startBtn = document.getElementById("start-btn");
  const quizContainer = document.getElementById("quiz-container");
  const resultText = document.getElementById("quiz-result");
  let currentQuestion = 0;
  let score = 0;
  let quizSet = [];

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    startBtn.style.display = "none";
    resultText.textContent = "";
    quizContainer.innerHTML = "";
    quizContainer.style.display = "block";
    score = 0;
    currentQuestion = 0;
    quizSet = generateQuiz(quizData, 5);
    showQuestion();
  });

  function generateQuiz(data, num = 5) {
    const shuffled = data.sort(() => Math.random() - 0.5).slice(0, num);
    return shuffled.map(q => {
      const wrongChoices = data
        .filter(item => item.translation !== q.translation)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...wrongChoices.map(x => x.translation), q.translation]
        .sort(() => Math.random() - 0.5);
      return { ...q, options };
    });
  }

  function showQuestion() {
    const q = quizSet[currentQuestion];
    quizContainer.innerHTML = `
      <h3>Q${currentQuestion + 1}: What does "<span class="highlight">${q.phrase}</span>" mean?</h3>
      <div class="quiz-options">
        ${q.options.map(opt => `<button class="quiz-option">${opt}</button>`).join("")}
      </div>
    `;

    const optionButtons = document.querySelectorAll(".quiz-option");

    let answered = false; // 2回以上押せない

    optionButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        if (btn.textContent === q.translation) {
          score++;
          btn.style.backgroundColor = "#32cd32"; // 正解
        } else {
          btn.style.backgroundColor = "#ff2400"; // 不正解
        }

        // 他のボタンは押せなくして色も薄くする
        optionButtons.forEach(b => {
          b.disabled = true;
          if (b !== btn) b.style.opacity = "0.5";
        });

        setTimeout(() => {
          currentQuestion++;
          if (currentQuestion < quizSet.length) {
            showQuestion();
          } else {
            showResult();
          }
        }, 800);
      });
    });
  }

  function showResult() {
    quizContainer.style.display = "none";
    resultText.textContent = `Your Score: ${score} / ${quizSet.length}`;
    startBtn.textContent = "RESTART";
    startBtn.style.display = "inline-block";
  }
});


