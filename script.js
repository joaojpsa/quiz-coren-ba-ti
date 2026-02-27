import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAqj8mEnfKY0pgEQY-rnvcFneolyVrYYvw",
  authDomain: "quiz-coren-ba.firebaseapp.com",
  projectId: "quiz-coren-ba",
  storageBucket: "quiz-coren-ba.firebasestorage.app",
  messagingSenderId: "929619546750",
  appId: "1:929619546750:web:c7bdb30ef28a903456fe2f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Navegação por abas (se existir)
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".content-section")
      .forEach((section) => section.classList.remove("active"));
    button.classList.add("active");
    const tabId = button.getAttribute("data-tab");
    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");
  });
});

// Botão Voltar ao Topo
const backToTopButton = document.getElementById("backToTop");
const icon = document.getElementById("icon-seta");

window.addEventListener("scroll", () => {
  if (!backToTopButton || !icon) return;
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("visible");
    icon.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
    icon.classList.remove("visible");
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --- Quiz: uma questão por vez ---
const questions = Array.from(document.querySelectorAll(".quiz-question"));
const prevBtn = document.getElementById("prev-question");
const nextBtn = document.getElementById("next-question");
const checkBtn = document.getElementById("check-answers");
const quizResult = document.getElementById("quiz-result");
const quizControls = document.getElementById("quiz-controls");
const playerForm = document.getElementById("player-form");
const startBtn = document.getElementById("start-quiz");
const playerNameInput = document.getElementById("player-name");
const playerSectorInput = document.getElementById("player-sector");
const playerMsg = document.getElementById("player-msg");
const progressEl = document.getElementById("progress");
const leaderboardDiv = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");
const manualLinkContainer = document.getElementById("manual-link-container");
// A aplicação é 100% estática agora, salva apenas no localStorage
const API_URL = "";
let currentIndex = 0;
let quizStarted = false;
let playerName = "";
let playerSector = "";

function showQuestion(index) {
  if (questions.length === 0) return;
  currentIndex = Math.max(0, Math.min(index, questions.length - 1));
  questions.forEach((q, i) => {
    q.style.display = i === currentIndex ? "block" : "none";
  });
  // Atualiza estado dos botões
  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
    // aplica classe visual quando habilitado
    prevBtn.classList.toggle("btn-enabled", !prevBtn.disabled);
  }
  if (nextBtn) {
    // Próxima só habilitado se a pergunta atual já foi verificada
    const currentAnswered = questions[currentIndex].dataset.answered === "true";
    const disableNext =
      currentIndex === questions.length - 1 || !currentAnswered;
    nextBtn.disabled = disableNext;
    nextBtn.classList.toggle("btn-enabled", !nextBtn.disabled);
  }
  // atualiza progresso
  if (progressEl) {
    progressEl.style.display = quizStarted ? "block" : "none";
    progressEl.textContent = `Pergunta ${currentIndex + 1} de ${questions.length
      }`;
  }
}

// Inicializa exibição
showQuestion(0);

// esconder controles até o usuário iniciar
if (quizControls) quizControls.style.display = "none";
if (progressEl) progressEl.style.display = "none";
if (leaderboardDiv) leaderboardDiv.style.display = "none";

// Seleção de opção (escopo por pergunta)
document.querySelectorAll(".quiz-option").forEach((option) => {
  option.addEventListener("click", () => {
    if (!quizStarted) {
      showPlayerMessage(
        "Por favor, preencha seu nome e setor e clique em Começar antes de responder."
      );
      return;
    }
    const parentQuestion = option.closest(".quiz-question");
    if (!parentQuestion) return;
    parentQuestion
      .querySelectorAll(".quiz-option")
      .forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
  });
});

// Iniciar quiz após preencher nome/setor
function showPlayerMessage(text) {
  if (!playerMsg) {
    alert(text);
    return;
  }
  playerMsg.textContent = text;
  playerMsg.style.display = "block";
  setTimeout(() => {
    playerMsg.style.display = "";
  }, 3500);
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    const name = playerNameInput ? playerNameInput.value.trim() : "";
    const sector = playerSectorInput ? playerSectorInput.value.trim() : "";

    // Validação melhorada
    if (!name || !sector) {
      showPlayerMessage(
        "Por favor, preencha seu nome e setor antes de começar."
      );
      if (playerNameInput && !name) playerNameInput.focus();
      else if (playerSectorInput && !sector) playerSectorInput.focus();
      return;
    }

    // Validação de tamanho máximo (100 caracteres)
    if (name.length > 100 || sector.length > 100) {
      showPlayerMessage(
        "Nome e setor devem ter no máximo 100 caracteres."
      );
      return;
    }

    // Sanitização básica (remover caracteres perigosos)
    const sanitizedName = name.replace(/[<>]/g, '');
    const sanitizedSector = sector.replace(/[<>]/g, '');

    if (sanitizedName !== name || sanitizedSector !== sector) {
      showPlayerMessage(
        "Nome e setor não podem conter os caracteres < ou >."
      );
      return;
    }

    playerName = sanitizedName;
    playerSector = sanitizedSector;
    quizStarted = true;
    // esconder form e mostrar controles
    if (playerForm) playerForm.style.display = "none";
    if (quizControls) quizControls.style.display = "flex";
    if (progressEl) progressEl.style.display = "block";
    if (manualLinkContainer) manualLinkContainer.style.display = "none";
    showQuestion(0);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    showQuestion(currentIndex - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    showQuestion(currentIndex + 1);
  });
}

// Pontuação e verificação por pergunta
let totalScore = 0;
let answeredCount = 0;

if (checkBtn) {
  checkBtn.addEventListener("click", async () => {
    if (!quizStarted) {
      showPlayerMessage(
        "Você precisa começar o quiz antes de verificar respostas."
      );
      return;
    }
    const question = questions[currentIndex];
    if (!question) return;

    // se já verificada, apenas rola para o feedback
    if (question.dataset.answered === "true") {
      const fb = question.querySelector(".feedback");
      if (fb) fb.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const selected = question.querySelector(".quiz-option.selected");
    let feedback = question.querySelector(".feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "feedback";
      question.appendChild(feedback);
    }

    if (!selected) {
      feedback.innerHTML =
        '<p class="warning" role="alert">Por favor, selecione uma opção antes de verificar.</p>';
      feedback.scrollIntoView({ behavior: "smooth" });
      // Focar na primeira opção para acessibilidade
      const firstOption = question.querySelector('.quiz-option');
      if (firstOption) firstOption.focus();
      return;
    }

    const isCorrect = selected.getAttribute("data-correct") === "true";

    if (isCorrect) {
      totalScore++;
      selected.classList.add("correct");
      feedback.innerHTML =
        '<p class="correct-msg">Correto! Você ganhou 1 ponto.</p>';
    } else {
      selected.classList.add("incorrect");
      const correctOpt = question.querySelector(
        '.quiz-option[data-correct="true"]'
      );
      if (correctOpt) {
        const strong = correctOpt.querySelector("strong");
        const letter = strong ? strong.textContent.trim() : "";
        const text = correctOpt.textContent.replace(letter, "").trim();
        feedback.innerHTML = `<p class="incorrect-msg">Errado. A resposta correta é <strong>${letter}</strong> ${text}.</p>`;
      } else {
        feedback.innerHTML = '<p class="incorrect-msg">Errado.</p>';
      }
    }

    // explicação (se existir data-explanation na pergunta)
    let explanation = question.dataset.explanation;
    const source = question.dataset.source || question.dataset.fonte;
    if (explanation) {
      // se o texto iniciar com "Explicação:" (case-insensitive), transforma essa palavra em negrito
      // ex: "Explicação: Texto..." -> "<strong>Explicação:</strong> Texto..."
      const replaced = explanation.replace(
        /^(\s*Explicação:\s*)/i,
        "<strong>Explicação:</strong> "
      );
      feedback.innerHTML += `<div class="explanation">${replaced}`;
      // se tiver fonte (data-source ou data-fonte), adiciona abaixo em itálico e menor
      if (source) {
        // evita duplicar o prefixo Fonte:, adiciona conforme fornecido
        feedback.innerHTML += `<div class="source"><em>${source}</em></div>`;
      }
      feedback.innerHTML += `</div>`;
    } else {
      feedback.innerHTML += `<div class="explanation">Sem explicação. Para adicionar, inclua <code>data-explanation="Sua explicação aqui"</code> na div <code>.quiz-question</code>.</div>`;
    }

    // marca como respondida e evita re-pontuar
    question.dataset.answered = "true";
    answeredCount++;

    // após verificar, habilita o botão Próxima (se não for a última pergunta)
    if (nextBtn) {
      if (currentIndex !== questions.length - 1) {
        nextBtn.disabled = false;
        nextBtn.classList.add("btn-enabled");
      } else {
        // última pergunta: mantém Próxima desabilitada
        nextBtn.disabled = true;
        nextBtn.classList.remove("btn-enabled");
      }
    }

    // trava opções desta pergunta
    question
      .querySelectorAll(".quiz-option")
      .forEach((opt) => opt.classList.add("locked"));

    // se todas respondidas, mostra resultado final e salva no ranking
    if (answeredCount === questions.length) {
      const resultText = document.getElementById("result-text");
      if (resultText && quizResult) {
        resultText.textContent = `Você acertou ${totalScore} de ${questions.length} perguntas.`;
        // mostrar resultado
        quizResult.style.display = "block";
        // salvar entrada no leaderboard
        let savedList = null;
        if (playerName && playerSector) {
          savedList = await saveScoreToLeaderboard(playerName, playerSector, totalScore);
        }

        // renderiza leaderboard do localStorage
        if (savedList && Array.isArray(savedList)) {
          renderLeaderboard(savedList);
        } else {
          renderLeaderboard();
        }
        if (manualLinkContainer) manualLinkContainer.style.display = "block";
        quizResult.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

// Reiniciar quiz
const restartBtn = document.getElementById("restart-quiz");
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    // reset visual e estado
    document
      .querySelectorAll(".quiz-option")
      .forEach((opt) =>
        opt.classList.remove("selected", "correct", "incorrect", "locked")
      );
    document.querySelectorAll(".quiz-question").forEach((q) => {
      delete q.dataset.answered;
      const fb = q.querySelector(".feedback");
      if (fb) fb.remove();
    });
    totalScore = 0;
    answeredCount = 0;
    // esconder resultado e leaderboard, voltar ao formulário
    if (quizResult) quizResult.style.display = "none";
    if (leaderboardDiv) leaderboardDiv.style.display = "none";
    if (quizControls) quizControls.style.display = "none";
    if (playerForm) playerForm.style.display = "flex";
    if (playerNameInput) playerNameInput.value = "";
    if (playerSectorInput) playerSectorInput.value = "";
    if (manualLinkContainer) manualLinkContainer.style.display = "block";
    playerName = "";
    playerSector = "";
    quizStarted = false;
    showQuestion(0);
    if (progressEl) progressEl.style.display = "none";
    document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
  });
}

// --- Leaderboard / Persistência (Firebase + Local Storage Fallback) ---
async function fetchLeaderboard() {
  try {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), orderBy("date", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const serverBoard = [];
    querySnapshot.forEach((doc) => serverBoard.push(doc.data()));
    window.LAST_LEADERBOARD_ERROR = null; // Sucesso
    return serverBoard;
  } catch (e) {
    console.warn("Erro ao buscar do Firebase, usando local:", e);
    window.LAST_LEADERBOARD_ERROR = e.message;
    return getLeaderboard();
  }
}

function getLeaderboard() {
  try {
    const raw = localStorage.getItem("quiz_leaderboard");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Erro ao ler leaderboard:", e);
    return [];
  }
}

async function saveScoreToLeaderboard(name, sector, score) {
  if (!name || !sector) return fetchLeaderboard();
  const entry = {
    name: name.trim(),
    sector: sector.trim(),
    score: Number(score),
    date: new Date().toISOString()
  };

  // 1. Tentar salvar no Firebase
  try {
    await addDoc(collection(db, "leaderboard"), {
      ...entry,
      date: serverTimestamp() // Usa o tempo do servidor Firebase para precisão
    });
    console.log("Score salvo no Firebase!");
  } catch (e) {
    console.error("Erro ao salvar no Firebase, gravando apenas localmente:", e);
  }

  // 2. Sempre mantém uma cópia local para redundância
  const board = getLeaderboard();
  board.push(entry);
  board.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
  try {
    localStorage.setItem("quiz_leaderboard", JSON.stringify(board.slice(0, 10)));
  } catch (e) {
    console.error("Erro ao salvar local:", e);
  }

  // 3. Retorna a lista atualizada (preferencialmente do servidor)
  return fetchLeaderboard();
}

async function renderLeaderboard(list) {
  // Se não passou lista, busca na hora
  const items = list || await fetchLeaderboard();
  if (!leaderboardList || !leaderboardDiv) return;
  console.log('renderLeaderboard called. items:', Array.isArray(items) ? items.length : 'null');
  leaderboardList.innerHTML = "";
  const top = items.slice(0, 10);
  // remove existing header if present to avoid duplicates
  const parent = leaderboardList.parentNode;
  if (parent) {
    const existingHeader = parent.querySelector('.leaderboard-header');
    if (existingHeader) existingHeader.remove();
  }
  // header
  const header = document.createElement('div');
  header.className = 'leaderboard-header';
  const title = document.createElement('div');
  title.className = 'leaderboard-title';
  title.textContent = 'Ranking — Top 10';
  const sub = document.createElement('div');
  sub.className = 'leaderboard-sub';
  sub.textContent = `${top.length} registro${top.length !== 1 ? 's' : ''}`;
  header.appendChild(title);
  header.appendChild(sub);
  // ensure header is shown above the list
  if (parent) parent.insertBefore(header, leaderboardList);

  // if there was an error fetching from server, show message
  try {
    if (window.LAST_LEADERBOARD_ERROR) {
      const errEl = parent.querySelector('.leaderboard-error');
      if (errEl) errEl.remove();
      const err = document.createElement('div');
      err.className = 'leaderboard-error';
      err.textContent = 'Não foi possível carregar o ranking do servidor. Exibindo dados locais.';
      parent.insertBefore(err, header.nextSibling);
      console.warn('Leaderboard error flag:', window.LAST_LEADERBOARD_ERROR);
    } else {
      const oldErr = parent.querySelector('.leaderboard-error');
      if (oldErr) oldErr.remove();
    }
  } catch (e) {
    console.warn('Erro ao processar mensagem de erro do leaderboard', e);
  }

  if (top.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhuma pontuação registrada ainda.';
    leaderboardList.appendChild(li);
  } else {
    top.forEach((entry, idx) => {
      const li = document.createElement('li');
      li.className = 'leaderboard-item';

      const left = document.createElement('div');
      left.className = 'leader-left';
      const rank = document.createElement('div');
      rank.className = 'rank-badge';
      rank.textContent = `#${idx + 1}`;
      if (idx === 0) rank.classList.add('top1');
      else if (idx === 1) rank.classList.add('top2');
      else if (idx === 2) rank.classList.add('top3');

      const meta = document.createElement('div');
      meta.className = 'leader-meta';
      const nameEl = document.createElement('div');
      nameEl.className = 'name';
      nameEl.textContent = entry.name;
      const sectorEl = document.createElement('div');
      sectorEl.className = 'sector';
      sectorEl.textContent = entry.sector || '';
      meta.appendChild(nameEl);
      meta.appendChild(sectorEl);

      left.appendChild(rank);
      left.appendChild(meta);

      const right = document.createElement('div');
      right.className = 'leader-right';
      const score = document.createElement('div');
      score.className = 'score-badge';
      score.textContent = `${entry.score} pts`;
      const date = document.createElement('div');
      date.className = 'leader-date';
      date.textContent = new Date(entry.date).toLocaleString();
      right.appendChild(score);
      right.appendChild(date);

      li.appendChild(left);
      li.appendChild(right);
      leaderboardList.appendChild(li);
    });
  }
  leaderboardDiv.style.display = 'block';
}
