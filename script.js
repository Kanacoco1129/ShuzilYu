// =====================================================
// 夢向 SANEMI 個人網站
// 請把這份內容單獨存成 script.js，不要貼進 index.html 或 style.css
// =====================================================

// ===== 網站文字設定 =====
const site = {
  name: "夢向",
  latinName: "SANEMI",
  motto: "櫛風沐雨，將會成炬",
  role: "實彌 / 雛菊",
  introduction: "其實平平淡淡也沒什麼不好，應該說那才是我們所追求的"
};

// ===== 作品設定：圖片需放在 img 資料夾 =====
const artworks = [
  { title: "一周年紀念日", subtitle: "繪師：醒醒", year: "2026/10/02", category: "紀念", image: "img/一周年.jpg", note: "一周年也請您繼續留在我的身邊吧" },
  { title: "雛菊生日賀圖", subtitle: "繪師：果果", year: "2026/01/24", category: "慶生", image: "img/2026雛菊生日.png", note: "1/24生日的我只希望24小時中你有1小時屬於我" },
  { title: "實彌生日賀圖", subtitle: "繪師：果果", year: "2025/11/29", category: "慶生", image: "img/2025實彌生日圖.png", note: "你說，翩翩起舞的我們會是今晚舞會的焦點嗎？" },
  { title: "女僕日", subtitle: "繪師：巧克咖哩", year: "2026/05/10", category: "節日", image: "img/女僕vs執事.jpg", note: "實彌,你身上有貓咪好可愛" },
  { title: "兒童節", subtitle: "繪師：SH", year: "2026/05/05", category: "節日", image: "img/水手服.png", note: "不准對我擺著學姊的架子" },
  { title: "平安夜的小動物", subtitle: "繪師：小兔", year: "2025/12/24", category: "節日", image: "img/動物化.jpg", note: "希望明年也是平安的一年" },
  { title: "鬼滅學園AU", subtitle: "繪師：果果", year: "2026/04/23", category: "AU", image: "img/鬼滅學園AU.png", note: "除了微積分以外妳腦子都還可以，這是針對我了吧" },
  { title: "聖誕節", subtitle: "繪師：果果", year: "2025/12/25", category: "節日", image: "img/2025聖誕節.png", note: "拜託妳以後還是別進廚房了" },
  { title: "百日", subtitle: "自繪", year: "2026/01/10", category: "節日", image: "img/百日.png", note: "就說了妳接吻時能不能把眼睛閉上" },
  { title: "貓貓日", subtitle: "自繪", year: "2026/02/22", category: "節日", image: "img/2026貓貓日.png", note: "我要工作，你先起來好不好?" },
  { title: "情人節", subtitle: "繪師：星空薄荷茶", year: "2026/02/14", category: "節日", image: "img/情人節.png", note: "唉呀情人情快樂啊這位先生，要當我的情人嗎?" },
  { title: "白色情人節", subtitle: "繪師：小柚", year: "2026/03/14", category: "節日", image: "img/白色情人節.jpg", note: "我說妳一定要這樣嗎?說好只是吃巧克力的吧!" },
  { title: "他的新婚", subtitle: "繪師：ルート", year: "2026/02/23", category: "離別", image: "img/離別.jpg", note: "希望那個人可以給你幸福" },
  { title: "玩雪", subtitle: "繪師：afnk", year: "2025/12/25", category: "日常", image: "img/夢圖轉蛋5.png", note: "就只是下雪而已，需要那麼開心嗎?" },
  { title: "星星墜落", subtitle: "繪師：果果", year: "2026/03/14", category: "節日", image: "img/夢圖轉蛋4.jpg", note: "實彌你看，我可以為你摘下天上的星星喔" }
];

const pageTitles = {
  "首頁": "夢的開始",
  "自我介紹": "關於我的交友",
  "介紹": "自家夢向",
  "圖集": "委託與轉蛋",
  "交友": "兩人簡易劇情介紹",
  "聯絡": "尋找我"
};

let currentPage = "首頁";
let menuOpen = false;

const app = document.getElementById("app");
const nav = document.getElementById("nav");
const mobileMenu = document.getElementById("mobileMenu");
const lightboxRoot = document.getElementById("lightboxRoot");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

document.getElementById("year").textContent = new Date().getFullYear();

// 將多行文字安全地顯示成保留換行的文字區塊
function imageMarkup(path, alt, extraClass = "") {
  return `
    <img class="${extraClass}" src="${path}" alt="${alt}" loading="lazy">
    <div class="image-fallback" hidden>
      <span>夢向</span>
      <small>找不到圖片，請確認檔案是否放在 img 資料夾：<br>${path}</small>
    </div>
  `;
}

function setUpImageFallbacks(root = document) {
  root.querySelectorAll("img").forEach(img => {
    const fallback = img.nextElementSibling;
    const showFallback = () => {
      img.hidden = true;
      if (fallback && fallback.classList.contains("image-fallback")) {
        fallback.hidden = false;
      }
    };
    img.addEventListener("error", showFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) showFallback();
  });
}

function heroMarkup() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="kicker">${site.role} · PERSONAL ARCHIVE</p>
        <p class="hero-index">背景音樂:露米亞　/　${new Date().getFullYear()}</p>
        <h1>${site.name}<br><em>踏雪留跡，我能否也在你心裡留下點痕跡</em></h1>
        <p class="hero-motto">${site.motto}</p>
        <p class="hero-description">${site.introduction}</p>
        <button class="btn-ember" type="button" data-page="圖集">瀏覽圖集　↘</button>
      </div>
      <div class="hero-art">
        <div class="hero-frame">
          ${imageMarkup(artworks[0].image, "一周年紀念日作品")}
          <span class="hero-stamp">夢</span>
        </div>
        <span class="vertical-note">一周年（繪師：醒醒）</span>
      </div>
      <div class="hero-bottom">
        <span>01 — SELECTED WORKS</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  `;
}

function worksMarkup(page) {
  let shown = artworks;
  let heading = "所有作品";

  if (page === "首頁") {
    shown = artworks.slice(0, 3);
    heading = "近期作品";
  } else if (page === "交友") {
    shown = artworks.filter(art => ["原創", "設定", "分岔"].includes(art.category));
    heading = "角色與企劃";
  }

  return `
    <section class="works-section">
      <div class="section-heading">
        <div><p class="kicker">SELECTED ARCHIVE</p><h2>${heading}</h2></div>
        <span class="section-count">${String(shown.length).padStart(2, "0")} <i>WORKS</i></span>
      </div>
      <div class="works-grid">
        ${shown.map((art, i) => `
          <button class="work-card" type="button" data-art="${artworks.indexOf(art)}" aria-label="查看作品：${art.title}">
            <div class="work-image">
              ${imageMarkup(art.image, art.title)}
              <span class="work-number">${String(i + 1).padStart(2, "0")}</span>
              <span class="work-open">↗</span>
            </div>
            <div class="work-meta">
              <div>
                <p class="work-category">${art.category}　/　${art.year}</p>
                <h3>${art.title}</h3>
                <p class="work-subtitle">${art.subtitle}</p>
              </div>
              <span class="work-arrow">↗</span>
            </div>
          </button>
        `).join("")}
      </div>
      ${shown.length === 0 ? '<p class="empty-note">這個分類目前還沒有作品。</p>' : ""}
    </section>
  `;
}

function profileMarkup() {
  const profile = {
    image: "img/大頭塗鴉.jpg",
    imageAlt: "我的個人介紹圖片",
    label: "ABOUT ME / PERSONAL PROFILE",
    title: "交友須知",
    description: `暱稱：嘎啾、雛菊、菜菜
年齡：20以上

構成：週邊（ig）、夢向（噗浪）、日常、手作
認識：可互動＆私訊、不拒同擔嫁（不習慣互捧，自然相處即可）

雷點：太沒禮貌、不尊重別人、外流及貶低他人、嚴重貼臉、強迫跟我聊政治（我尊重每個人立場也不管他人版面會發，但本身不喜歡在興趣圈子聊政治）、有點版權潔癖跟 AI 融圖敏感（不會干涉他人，視情況自己會避開）

涉及的坑：家教、鬼滅、排少、守護甜心、妖尾、我英、暗殺教室、魔奇、彩虹EN、RPG遊戲（比較熟早期的霧雨飄散之森、殺戮的天使、鬼父等等）、Undertale、歐美向恐怖遊戲、SPY×FAMILY……

推角：鬼滅（實彌、匡近）、排少（菅原）、V（Shu）、相反的你和我（平、東）、庫洛魔法使（桃矢）、守護甜心（海里）`,
    note: "左圖繪師：茶鍋"
  };

  return `
    <section class="profile-page">
      <div class="profile-layout">
        <div class="profile-image">${imageMarkup(profile.image, profile.imageAlt)}</div>
        <div class="profile-content">
          <p class="kicker">${profile.label}</p>
          <h2>${profile.title}</h2>
          <div class="profile-divider"></div>
          <p class="profile-description">${profile.description}</p>
          <p class="profile-note">${profile.note}</p>
        </div>
      </div>
    </section>
  `;
}

function aboutMarkup() {
  const sections = [
    {
      image: "img/2026雛菊生日(分岔)1.png",
      title: "夢設：長谷川雛菊",
      description: `身高：155cm
體重：45kg
年齡：24
職業：藥師
動物形象：長尾山雀
備註：為完全代入向`
    },
    {
      image: "img/2026雛菊生日(分岔)2.png",
      title: "夢角：不死川實彌",
      description: `身高：179cm
體重：75kg
年齡：21
職業：鬼殺隊柱級獵鬼人
動物形象：大隻的白貓
出自作品：鬼滅之刃`
    },
    {
      image: "img/時間線.png",
      title: "時間線",
      description: "時間線為自行推敲，可能有判斷錯誤所以與原作有偏差，因此當成我個人私設時間。"
    }
  ];

  return `
    <section class="intro-gallery">
      <div class="intro-pair">
        ${sections.slice(0, 2).map((item, index) => `
          <article class="intro-card">
            <div class="intro-image">${imageMarkup(item.image, item.title)}</div>
            <div class="intro-text">
              <p class="kicker">INTRODUCTION 0${index + 1}</p>
              <h2>${item.title}</h2>
              <p>${item.description}</p>
            </div>
          </article>
        `).join("")}
      </div>
      <article class="intro-feature">
        <div class="intro-feature-image">${imageMarkup(sections[2].image, sections[2].title)}</div>
        <div class="intro-feature-text">
          <p class="kicker">MORE ABOUT THE STORY</p>
          <h2>${sections[2].title}</h2>
          <p>${sections[2].description}</p>
        </div>
      </article>
    </section>
  `;
}

function plotMarkup() {
  const plotSections = [
    {
      label: "01 / RELATIONSHIP",
      title: "相處模式",
      text: `前期：實彌對於雛菊是厭惡、噁心等等一言難盡的情緒交雜，雛菊則是充斥著歉意，同時與實彌盡可能保持距離。

交往後：大部分時候相處冷靜，雙方地位平起平坐，處事公事公辦，雙方都不會因為自己的念想而去強迫或約束對方。`
    },
    {
      label: "02 / ENCOUNTER",
      title: "兩人的相遇",
      text: `雛菊的妹妹原本身體要被一隻穿越至我們世界的鬼給奪舍，但危機時刻雛菊出來擋刀，於是成為了替代品。同時鬼的儀式出了問題，這導致雛菊的軀體跟靈魂都被傳送過去鬼滅世界（但鬼發現軀體無法使用，於是把雛菊的軀體丟在他的老巢），另一邊她的靈魂則被困在實彌身邊。

因詛咒的關係，所以雛菊無法離實彌太遠，日日夜夜只能守在他身邊，且沒有任何人可以看到她，也沒有任何物可以碰到她。唯一能感受到活著的大概只有和實彌拉開一定距離後，那種身體被碎石機輾過般的痛苦。`
    },
    {
      label: "03 / STORY",
      title: "簡易劇情",
      text: `因為香奈惠（實彌過往暗戀對象，原著這方面為粉絲自行解讀；對於各位角色我皆抱持尊重與喜愛，並未針對特定角色）的死亡造成實彌的精神受到傷害，在某次任務時因自殘殺鬼差點搞到自己離世。此時上天開了笑話一樣，讓雛菊可以碰到實彌幫忙緊急治療。雛菊緊急治療且找到人幫忙實彌後，再次變成看不見的樣子。

過了很久，儀式漸漸開始失效，於是在某個夜裡實彌第一次看到雛菊，二話不說拔刀相向。因為是靈魂，所以實彌也根本砍不到，於是隔天不得已兩人去找到主公大人幫忙。尋找幾日後，終於找到了一本關於那隻鬼禁忌的書。

後續即是兩人培養感情，途中奪回雛菊的身軀（解除距離限制詛咒）。因為雛菊無法接受自己像是香奈惠的替代品一樣，所以感情掙扎了很久。反而是實彌先直視自己的感情，但發現雛菊會一直躲著自己讓他很不爽。不過也沒辦法，兩人都被任務跟工作填滿生活，根本沒多少時間見面。

轉機是某次雛菊夢到實彌跟香奈惠開心的生活在一起，才面對自己的感情。即使其他時空跟別人在一起也沒關係，但至少在這裡要自己爭取給對方幸福的機會。於是向實彌告白。

一段時間後，無限城的最終戰開始了，實彌失去了弟弟，倖存者內疚伴隨著他後半段的人生。即使如此，雛菊還是試圖給他帶來幸福。即便她知道開紋戰士只能活到25歲，在求婚前也認真想結婚真的合適嗎？但最終比起想那麼多，有時衝動才是最能表達出內心所渴求的，所以雛菊還是求婚了。

但求婚的這個決定讓世界本設定好的命運劇本崩塌。即便穿越過去本就不合劇本的走向，但雛菊從來沒有實際改變過什麼事情，就連跟實彌交往也只是微不足道的事情罷了。整個鬼滅的世界還是按照原本的劇本進行，但雛菊的這個求婚行為會造成實彌沒有跟其他女子結婚且產下後代，於是世界決定修正（消除）這個問題人物（雛菊）。

直到實彌再次看不見且被消除掉與雛菊的所有記憶後，夢設到最後還是死死的以靈魂型態撐在實彌旁邊，直到變成了厲鬼一樣沒有了自我意識。

等看到實彌結婚的那天，雛菊才真正意義上的灰飛煙滅了。雛菊唯一後悔的只有自己做出的戒指永遠在櫃子裡，無法送到他的手裡。`
    },
    {
      label: "04 / DIARY",
      title: "雛菊生前的日記",
      text: `實彌23歲時曾意外看到雛菊的手帳內容，不是他原本熟悉的那本淡藍色的，而是一本純白色的。

XX/8/23
我貌似消失了一段時間，不精準的計算大概是三天，身體的狀態又變成了剛過來的靈魂型態，但不同的是我很清楚的知道這次應該是我的身體真的慢慢在消失了，如果跟當初推測的一樣我應該是被這個世界排斥吧，但沒想到會是用這種像是被胃囊消化的模式。

值得慶幸的是那三天我彷彿已經不曾留下任何痕跡，沒有人記得我，實彌也是那樣的，但他久違跟天元去吃了拉麵笑得很開心，他也收到了炭治郎的信，表情看起來很欣慰那兩兄妹能好好的生活，太好了即使我不在你也可以露出這種笑容，那就是最好的。

在23號早上我又恢復了，感覺身體沒什麼異常，這種感覺真是微妙，實彌像是沒發生過任何事一樣跟我聊天，前幾天的事情，還是別讓他知道吧。`
    }
  ];

  return `
    <section class="plot-section">
      ${plotSections.map(item => `
        <article class="plot-block">
          <p class="kicker">${item.label}</p>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function contactMarkup() {
  const socialLinks = [
    ["Pixiv", "https://www.pixiv.net/"],
    ["X / Twitter", "https://x.com/"],
    ["Instagram", "https://www.instagram.com/"],
    ["Plurk", "https://www.plurk.com/"]
  ];

  return `
    <section class="contact-section">
      <p class="kicker">SAY HELLO</p>
      <h2>其他聯絡方式<br><em>不一定都有在長期使用</em></h2>
      <p>以下連結還沒更新，點進去找不到我是正常的。</p>
      <div class="social-list">
        ${socialLinks.map(([label, url]) => `
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            <span>${label}</span><span>↗</span>
          </a>
        `).join("")}
      </div>
      <p class="small-note">※ 請在 script.js 的 contactMarkup() 修改成自己的社群連結。</p>
    </section>
  `;
}

function pageMarkup(page) {
  if (page === "首頁") return heroMarkup() + worksMarkup("首頁");

  const pageInfo = {
    "自我介紹": { intro: "交友上的一些注意事項", content: profileMarkup() },
    "介紹": { intro: "關於我家的兩人", content: aboutMarkup() },
    "圖集": { intro: "放一些自家的圖", content: worksMarkup("圖集") },
    "交友": { intro: "簡單對我家夢向有更多的了解", content: plotMarkup() },
    "聯絡": { intro: "可能可以找到我的地方（只是有可能很常消失）", content: contactMarkup() }
  };

  const info = pageInfo[page];
  if (!info) return '<section class="page-heading"><h1>找不到頁面</h1></section>';

  return `
    <section class="page-heading">
      <p class="kicker">${site.latinName} / PORTFOLIO</p>
      <h1>${pageTitles[page]}</h1>
      <p>${info.intro}</p>
    </section>
    ${info.content}
  `;
}

function closeMobileMenu() {
  menuOpen = false;
  nav.classList.remove("open");
  mobileMenu.textContent = "☰ 選單";
  mobileMenu.setAttribute("aria-expanded", "false");
}

function render() {
  app.innerHTML = pageMarkup(currentPage);

  document.querySelectorAll("[data-page]").forEach(button => {
    button.onclick = () => {
      const targetPage = button.dataset.page;
      if (!Object.prototype.hasOwnProperty.call(pageTitles, targetPage)) return;

      currentPage = targetPage;
      closeMobileMenu();

      document.querySelectorAll(".nav-link").forEach(link => {
        const active = link.dataset.page === currentPage;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });

      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });

  document.querySelectorAll("[data-art]").forEach(button => {
    button.onclick = () => openArt(Number(button.dataset.art));
  });

  setUpImageFallbacks(app);
}

function openArt(index) {
  const art = artworks[index];
  if (!art) return;

  lightboxRoot.innerHTML = `
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="${art.title}">
      <button class="lightbox-close" id="closeLightbox" type="button">關閉 ✕</button>
      <div class="lightbox-panel" id="lightboxPanel">
        ${imageMarkup(art.image, art.title)}
        <p class="kicker">${art.category} / ${art.year}</p>
        <h2>${art.title}</h2>
        <p>${art.note}</p>
        <small>圖片路徑：${art.image}</small>
      </div>
    </div>
  `;

  setUpImageFallbacks(lightboxRoot);
  document.getElementById("lightbox").addEventListener("click", closeArt);
  document.getElementById("lightboxPanel").addEventListener("click", event => event.stopPropagation());
  document.getElementById("closeLightbox").addEventListener("click", closeArt);
  document.addEventListener("keydown", handleEscape);
  document.getElementById("closeLightbox").focus();
}

function handleEscape(event) {
  if (event.key === "Escape") closeArt();
}

function closeArt() {
  lightboxRoot.innerHTML = "";
  document.removeEventListener("keydown", handleEscape);
}

mobileMenu.addEventListener("click", () => {
  menuOpen = !menuOpen;
  nav.classList.toggle("open", menuOpen);
  mobileMenu.textContent = menuOpen ? "✕ 關閉" : "☰ 選單";
  mobileMenu.setAttribute("aria-expanded", String(menuOpen));
});

// ===== 背景音樂：只保留這一份控制程式 =====
if (bgMusic && musicToggle) {
  bgMusic.volume = 0.3;

  musicToggle.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicToggle.textContent = "♫ 暫停音樂";
        musicToggle.setAttribute("aria-pressed", "true");
      } catch (error) {
        console.error("音樂播放失敗：", error);
        musicToggle.textContent = "播放失敗，請檢查音檔";
        musicToggle.setAttribute("aria-pressed", "false");
      }
    } else {
      bgMusic.pause();
      musicToggle.textContent = "♫ 播放音樂";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  });

  bgMusic.addEventListener("pause", () => {
    if (bgMusic.ended) return;
    musicToggle.textContent = "♫ 播放音樂";
    musicToggle.setAttribute("aria-pressed", "false");
  });

  bgMusic.addEventListener("play", () => {
    musicToggle.textContent = "♫ 暫停音樂";
    musicToggle.setAttribute("aria-pressed", "true");
  });

  bgMusic.addEventListener("error", () => {
    musicToggle.textContent = "找不到音樂檔";
    musicToggle.setAttribute("aria-pressed", "false");
  });
}

render();
