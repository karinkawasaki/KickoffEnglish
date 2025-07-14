document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // サッカー用語データ
  const wordData = [
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


  // HTMLに動的にカードを追加
  const container = document.getElementById("card-container");

  wordData.forEach((word, index) => {
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
    container.appendChild(card);

    // ScrollTriggerでカードを一枚ずつフェード表示
    ScrollTrigger.create({
      trigger: container,
      start: `${index * 100}vh top`,
      end: `${(index + 1) * 100}vh top`,
      scrub: true,
      onEnter: () => {
        card.style.opacity = 1;
        card.style.zIndex = 10 + index;
      },
      onLeaveBack: () => {
        card.style.opacity = 0;
        card.style.zIndex = 1;
      }
    });
  });

  // 全体をpinする
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: `${wordData.length * 100}vh`,
    pin: true,
    scrub: true
  });
});

