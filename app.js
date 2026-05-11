/* ═══════════════════════════════════════════════════════
   FlipIQ — app.js
   IndexedDB · Card Flip Logic · Install Prompt · Progress
═══════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────────────
// DECK DATA
// ─────────────────────────────────────────────────────
const DECKS = [
  {
    id: 'javascript',
    title: 'JavaScript',
    subtitle: 'Core concepts & gotchas',
    emoji: '⚡',
    color: '#E8A020',
    cards: [
      {
        q: 'What is a closure?',
        a: 'A function that retains access to variables from its outer scope, even after the outer function has returned.'
      },
      {
        q: 'What does typeof null return?',
        a: '"object" — a well-known JavaScript quirk kept for legacy compatibility. null is not actually an object.'
      },
      {
        q: 'What is event bubbling?',
        a: 'When an event fires on an element, it then propagates upward through the DOM to all ancestor elements.'
      },
      {
        q: 'Difference between == and ===?',
        a: '== compares values with type coercion. === compares value AND type strictly. Always prefer === to avoid surprises.'
      },
      {
        q: 'What is a Promise?',
        a: 'An object representing the eventual completion or failure of an asynchronous operation, with .then() and .catch() handlers.'
      },
      {
        q: 'What does Array.reduce() do?',
        a: 'Executes a reducer callback on each array element, accumulating a single output value — like summing all numbers.'
      },
      {
        q: 'What is hoisting?',
        a: "JavaScript moves var declarations and function declarations to the top of their scope before code runs. let and const are NOT hoisted the same way."
      },
      {
        q: 'Difference between let, const, and var?',
        a: 'var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned after declaration.'
      },
      {
        q: 'What is a callback function?',
        a: 'A function passed as an argument to another function, intended to be called after an operation completes.'
      },
      {
        q: 'What is the JavaScript event loop?',
        a: 'A mechanism that continuously checks the call stack. When empty, it pushes queued tasks (callbacks, microtasks) onto the stack to execute.'
      },
    ]
  },
  {
    id: 'css',
    title: 'CSS',
    subtitle: 'Layouts, specificity & more',
    emoji: '🎨',
    color: '#9B72D0',
    cards: [
      {
        q: 'What is the CSS box model?',
        a: 'Every element is a rectangular box: content → padding → border → margin, from the inside out.'
      },
      {
        q: 'Flexbox vs CSS Grid?',
        a: 'Flexbox is one-dimensional — it handles either a row OR a column. Grid is two-dimensional — it controls both rows AND columns simultaneously.'
      },
      {
        q: 'What is position: absolute?',
        a: 'Removes the element from normal document flow. It is then positioned relative to its nearest ancestor that has a position other than static.'
      },
      {
        q: 'What is CSS specificity?',
        a: 'A scoring system browsers use to decide which CSS rule wins when multiple rules target the same element. IDs beat classes, classes beat tags.'
      },
      {
        q: 'What is a pseudo-element?',
        a: 'Keywords like ::before and ::after that let you style a specific part of an element — or insert decorative content — without extra HTML.'
      },
      {
        q: 'What does z-index control?',
        a: 'The stacking order of positioned elements along the Z (depth) axis. Elements with a higher z-index appear on top of those with lower values.'
      },
      {
        q: 'em vs rem units?',
        a: 'em is relative to the font size of the parent element. rem is relative to the root (html) element font size — much more predictable.'
      },
      {
        q: 'What is a CSS media query?',
        a: 'A rule that applies styles only when certain conditions are met — like screen width, height, or color scheme (prefers-color-scheme: dark).'
      },
      {
        q: 'What does transform: translate() do?',
        a: 'Moves an element along the X and/or Y axes without affecting surrounding elements or the document flow. GPU-accelerated and smooth.'
      },
      {
        q: 'What are CSS custom properties?',
        a: 'Variables declared with -- (e.g. --color: red) and accessed with var(--color). Scoped to the element and inheritable by children.'
      },
    ]
  },
  {
    id: 'pwa',
    title: 'PWA',
    subtitle: 'Progressive Web Apps',
    emoji: '📱',
    color: '#45B08A',
    cards: [
      {
        q: 'What is a Service Worker?',
        a: 'A JavaScript file that runs in a background thread, separate from the web page. It enables offline support, caching, and push notifications.'
      },
      {
        q: 'What is IndexedDB?',
        a: 'A browser-native NoSQL database for storing structured data client-side — including large files and blobs. Async and powerful.'
      },
      {
        q: 'What is a Web App Manifest?',
        a: 'A JSON file (manifest.json) that tells the browser about your app: name, icons, theme color, and display mode — enabling "Add to Home Screen".'
      },
      {
        q: 'What is a Cache-First strategy?',
        a: 'Serve the response from cache immediately. Only hit the network if the resource is not cached. Fastest for static assets.'
      },
      {
        q: 'What is a Network-First strategy?',
        a: 'Always try the network first for fresh data. Fall back to the cached version only if the user is offline or the network is too slow.'
      },
      {
        q: 'What are Core Web Vitals?',
        a: "Google's user-experience metrics: LCP (largest content load time), INP (interaction responsiveness), and CLS (layout stability)."
      },
      {
        q: 'What is the beforeinstallprompt event?',
        a: 'A browser event fired when the PWA install criteria are met. You can call .prompt() on it to show the "Add to Home Screen" dialog at the right moment.'
      },
      {
        q: 'What is Background Sync?',
        a: 'A Service Worker API that defers tasks until the user has a stable connection — perfect for saving offline form submissions or uploads.'
      },
      {
        q: 'What is the app shell model in PWAs?',
        a: 'A pattern where core UI assets are cached aggressively so the app loads instantly, while dynamic content is fetched separately.'
      },
      {
        q: 'Why is HTTPS required for most PWA features?',
        a: 'Powerful APIs like Service Workers require secure contexts to prevent tampering and protect user data and network traffic.'
      },
    ]
  },
  {
    id: 'react',
    title: 'React',
    subtitle: 'Components, hooks & rendering',
    emoji: '⚛️',
    color: '#5F8CFF',
    cards: [
      {
        q: 'What is JSX?',
        a: 'A syntax extension that lets you write HTML-like markup in JavaScript. It is transformed into React element calls at build time.'
      },
      {
        q: 'What does useState do?',
        a: 'Adds local state to a function component and returns [state, setState] for reading and updating that value.'
      },
      {
        q: 'Why are React keys important in lists?',
        a: 'Keys help React identify which items changed, were added, or removed so updates stay efficient and stable.'
      },
      {
        q: 'What is useEffect used for?',
        a: 'Running side effects after render such as data fetching, subscriptions, and syncing with browser APIs.'
      },
      {
        q: 'Props vs state?',
        a: 'Props are read-only inputs from a parent. State is internal, mutable data managed by the component itself.'
      },
      {
        q: 'What is lifting state up?',
        a: 'Moving shared state to the nearest common ancestor so multiple child components can stay in sync.'
      },
      {
        q: 'What is memoization in React?',
        a: 'An optimization technique using tools like React.memo, useMemo, and useCallback to avoid unnecessary recalculation or renders.'
      },
      {
        q: 'What is the virtual DOM?',
        a: 'A lightweight in-memory representation of UI that React diffs against previous versions to update the real DOM efficiently.'
      },
      {
        q: 'What is prop drilling?',
        a: 'Passing data through many nested components via props, even when intermediate components do not use that data directly.'
      },
      {
        q: 'What is a controlled component?',
        a: 'A form element whose value is driven by React state, with updates handled through onChange events.'
      },
    ]
  },
  {
    id: 'git',
    title: 'Git',
    subtitle: 'Commits, branches & collaboration',
    emoji: '🌿',
    color: '#6E79FF',
    cards: [
      {
        q: 'What does git add do?',
        a: 'Stages selected file changes so they are included in the next commit snapshot.'
      },
      {
        q: 'What is the difference between merge and rebase?',
        a: 'Merge preserves branch history with a merge commit. Rebase rewrites commits onto a new base for a linear history.'
      },
      {
        q: 'What is HEAD in Git?',
        a: 'A reference to your current checkout position, usually the latest commit on the current branch.'
      },
      {
        q: 'What does git stash do?',
        a: 'Temporarily stores uncommitted changes so you can switch contexts without creating a commit.'
      },
      {
        q: 'What is a pull request?',
        a: 'A review workflow where proposed branch changes are discussed, checked, and merged into a target branch.'
      },
      {
        q: 'When should you use git cherry-pick?',
        a: 'When you need to apply a specific commit from one branch onto another without merging the whole branch.'
      },
      {
        q: 'What does git reset --soft HEAD~1 do?',
        a: 'Moves HEAD back one commit while keeping changes staged so you can adjust and recommit.'
      },
      {
        q: 'What is fast-forward merge?',
        a: 'A merge where Git simply advances the branch pointer because no divergent history exists.'
      },
      {
        q: 'What does git fetch do?',
        a: 'Downloads commits and refs from a remote without changing your working branch, letting you inspect updates safely.'
      },
      {
        q: 'Why use .gitignore?',
        a: 'It prevents generated files, secrets, and local environment artifacts from being tracked and committed.'
      },
    ]
  }
];

// ─────────────────────────────────────────────────────
// INDEXEDDB WRAPPER
// ─────────────────────────────────────────────────────
class FlipIQDB {
  constructor() {
    this.db = null;
    this.ready = this._init();
  }

  _init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('flipiq-db', 1);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'deckId' });
        }
      };

      req.onsuccess  = (e) => { this.db = e.target.result; resolve(); };
      req.onerror    = ()  => reject(req.error);
    });
  }

  async getProgress(deckId) {
    await this.ready;
    return new Promise((resolve) => {
      const tx  = this.db.transaction('progress', 'readonly');
      const req = tx.objectStore('progress').get(deckId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror   = () => resolve(null);
    });
  }

  async saveProgress(deckId, data) {
    await this.ready;
    return new Promise((resolve) => {
      const tx     = this.db.transaction('progress', 'readwrite');
      const record = { deckId, ...data, lastPlayed: Date.now() };
      const req    = tx.objectStore('progress').put(record);
      req.onsuccess = () => resolve(record);
      req.onerror   = () => resolve(null);
    });
  }

  async getAllProgress() {
    await this.ready;
    return new Promise((resolve) => {
      const tx  = this.db.transaction('progress', 'readonly');
      const req = tx.objectStore('progress').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror   = () => resolve([]);
    });
  }
}

// ─────────────────────────────────────────────────────
// APP STATE
// ─────────────────────────────────────────────────────
const db = new FlipIQDB();

const state = {
  currentDeck:      null,
  currentCardIndex: 0,
  isFlipped:        false,
  correct:          0,
  wrong:            0,
  cardOrder:        [],
};

let deferredPrompt = null;

function getDeckIconMarkup(deck) {
  switch (deck.id) {
    case 'javascript':
      return `
        <div class="deck-emoji deck-icon-wrap" aria-hidden="true">
          <svg class="deck-icon" viewBox="0 0 24 24" fill="none">
            <path d="M13.6 2.5L6.7 13h4.9l-1.2 8.5 7.9-11h-4.8l.9-8z" fill="currentColor"/>
          </svg>
        </div>
      `;
    case 'css':
      return `
        <div class="deck-emoji deck-icon-wrap" aria-hidden="true">
          <svg class="deck-icon" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L5 12l4 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 6l4 6-4 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13 5l-2 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </div>
      `;
    case 'pwa':
      return `
        <div class="deck-emoji deck-icon-wrap" aria-hidden="true">
          <svg class="deck-icon" viewBox="0 0 24 24" fill="none">
            <rect x="7" y="3.5" width="10" height="17" rx="2.2" stroke="currentColor" stroke-width="1.8"/>
            <path d="M10.5 17.3h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M12 7.2v.01" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>
            <path d="M3.6 9a3.7 3.7 0 0 1 5.2 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M2.2 6.9a6.7 6.7 0 0 1 8 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </div>
      `;
    default:
      return `<div class="deck-emoji" aria-hidden="true">${deck.emoji}</div>`;
  }
}

// ─────────────────────────────────────────────────────
// SCREEN MANAGER
// ─────────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
}

// ─────────────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────────────
async function renderHome() {
  const allProgress = await db.getAllProgress();
  const progressMap = {};
  allProgress.forEach(p => { progressMap[p.deckId] = p; });

  const list = document.getElementById('deck-list');
  list.innerHTML = DECKS.map(deck => {
    const prog     = progressMap[deck.id] || null;
    const best     = prog ? prog.bestScore : null;
    const attempts = prog ? prog.totalAttempts : 0;
    const attStr   = attempts > 0
      ? ` · ${attempts} attempt${attempts > 1 ? 's' : ''}`
      : '';

    const scoreHTML = best !== null
      ? `<div class="deck-score">${best}%</div><div class="deck-score-label">best</div>`
      : `<div class="deck-score-empty">New</div>`;

    return `
      <div class="deck-card" style="--deck-color:${deck.color}"
           onclick="startDeck('${deck.id}')"
           role="button" tabindex="0"
           aria-label="Study ${deck.title} deck">
        ${getDeckIconMarkup(deck)}
        <div class="deck-info">
          <div class="deck-title">${deck.title}</div>
          <div class="deck-subtitle">${deck.subtitle}</div>
          <div class="deck-meta">${deck.cards.length} cards${attStr}</div>
        </div>
        <div class="deck-score-wrap">${scoreHTML}</div>
        <div class="deck-arrow">→</div>
      </div>
    `;
  }).join('');

  // Keyboard support for deck cards
  list.querySelectorAll('.deck-card').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') el.click();
    });
  });

  showScreen('home');
}

// ─────────────────────────────────────────────────────
// STUDY SCREEN
// ─────────────────────────────────────────────────────
function startDeck(deckId) {
  const deck = DECKS.find(d => d.id === deckId);
  if (!deck) return;

  // Fisher–Yates shuffle
  const indices = deck.cards.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  state.currentDeck      = deck;
  state.cardOrder        = indices;
  state.currentCardIndex = 0;
  state.isFlipped        = false;
  state.correct          = 0;
  state.wrong            = 0;

  document.getElementById('study-deck-title').textContent = deck.title;
  document.documentElement.style.setProperty('--current-deck-color', deck.color);

  showScreen('study');
  renderCard();
}

function renderCard() {
  const { currentDeck, currentCardIndex, cardOrder } = state;
  const card  = currentDeck.cards[cardOrder[currentCardIndex]];
  const total = cardOrder.length;

  document.getElementById('card-question').textContent = card.q;
  document.getElementById('card-answer').textContent   = card.a;
  document.getElementById('progress-text').textContent = `${currentCardIndex + 1} / ${total}`;
  document.getElementById('progress-bar').style.width  = `${(currentCardIndex / total) * 100}%`;

  // Reset flip
  const flashcard = document.getElementById('flashcard');
  flashcard.classList.remove('flipped');
  state.isFlipped = false;

  // Hide action buttons
  document.getElementById('action-buttons').classList.add('hidden');
  document.querySelector('.tap-hint').style.opacity = '1';

  updateScoreTrack();
}

function flipCard() {
  const flashcard = document.getElementById('flashcard');
  flashcard.classList.toggle('flipped');
  state.isFlipped = !state.isFlipped;

  const actionBtns = document.getElementById('action-buttons');
  const tapHint    = document.querySelector('.tap-hint');

  if (state.isFlipped) {
    actionBtns.classList.remove('hidden');
    tapHint.style.opacity = '0';
  } else {
    actionBtns.classList.add('hidden');
    tapHint.style.opacity = '1';
  }
}

function markCard(isCorrect) {
  if (isCorrect) state.correct++;
  else           state.wrong++;

  updateScoreTrack();

  state.currentCardIndex++;
  if (state.currentCardIndex >= state.cardOrder.length) {
    finishSession();
  } else {
    renderCard();
  }
}

function updateScoreTrack() {
  document.getElementById('score-correct').textContent = `${state.correct} correct`;
  document.getElementById('score-wrong').textContent   = `${state.wrong} wrong`;
}

// ─────────────────────────────────────────────────────
// RESULTS SCREEN
// ─────────────────────────────────────────────────────
async function finishSession() {
  const { correct, wrong, currentDeck } = state;
  const total    = correct + wrong;
  const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Load existing progress and compute new best
  const existing  = await db.getProgress(currentDeck.id);
  const prevBest  = existing ? existing.bestScore : -1;
  const newBest   = Math.max(prevBest, scorePct);
  const attempts  = existing ? existing.totalAttempts + 1 : 1;

  await db.saveProgress(currentDeck.id, {
    bestScore:     newBest,
    lastScore:     scorePct,
    totalAttempts: attempts,
  });

  // Populate results UI
  document.getElementById('results-deck-name').textContent = currentDeck.title;
  document.getElementById('results-score').textContent     = scorePct + '%';
  document.getElementById('stat-correct').textContent      = correct;
  document.getElementById('stat-wrong').textContent        = wrong;
  document.getElementById('stat-total').textContent        = total;
  document.getElementById('results-icon').textContent      =
    scorePct >= 80 ? '🏆' : scorePct >= 60 ? '👍' : '📚';

  // Best score note
  const noteEl = document.getElementById('best-score-note');
  if (scorePct > prevBest && prevBest >= 0) {
    noteEl.textContent   = `🎉 New personal best! (was ${prevBest}%)`;
    noteEl.style.display = 'block';
  } else if (prevBest >= 0) {
    noteEl.textContent   = `Personal best: ${newBest}%`;
    noteEl.style.display = 'block';
  } else {
    noteEl.style.display = 'none';
  }

  showScreen('results');

  // Animate the SVG ring after screen transition
  requestAnimationFrame(() => {
    setTimeout(() => {
      const circumference = 2 * Math.PI * 50; // r=50 → ~314
      const offset = circumference - (scorePct / 100) * circumference;
      const ring = document.getElementById('ring-fill');
      if (ring) ring.style.strokeDashoffset = offset;
    }, 100);
  });
}

// ─────────────────────────────────────────────────────
// INSTALL PROMPT
// ─────────────────────────────────────────────────────
function isStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function isMobileDevice() {
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

function showInstallFallback() {
  if (deferredPrompt || isStandaloneMode() || !isMobileDevice()) return;

  const banner = document.getElementById('install-banner');
  const textEl = banner.querySelector('.install-text span:last-child');
  const btn = document.getElementById('install-btn');
  const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  if (textEl) {
    textEl.textContent = isiOS
      ? 'Install via Safari: Share → Add to Home Screen'
      : 'Install via Chrome menu if prompt does not appear';
  }
  btn.textContent = 'How to install';
  banner.classList.remove('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('install-banner');
  const textEl = banner.querySelector('.install-text span:last-child');
  const btn = document.getElementById('install-btn');
  if (textEl) textEl.textContent = 'Install FlipIQ for offline use';
  btn.textContent = 'Install';
  banner.classList.remove('hidden');
});

window.addEventListener('appinstalled', () => {
  document.getElementById('install-banner').classList.add('hidden');
  deferredPrompt = null;
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === 'accepted') {
      document.getElementById('install-banner').classList.add('hidden');
    }
    return;
  }

  const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const message = isiOS
    ? 'On iPhone, open this site in Safari, tap Share, then "Add to Home Screen".'
    : 'In Chrome, open the browser menu (⋮) and tap "Add to Home screen" or "Install app".';
  alert(message);
});

setTimeout(showInstallFallback, 2500);

// ─────────────────────────────────────────────────────
// OFFLINE INDICATOR
// ─────────────────────────────────────────────────────
function syncOnlineStatus() {
  const badge = document.getElementById('offline-badge');
  navigator.onLine
    ? badge.classList.add('hidden')
    : badge.classList.remove('hidden');
}
window.addEventListener('online',  syncOnlineStatus);
window.addEventListener('offline', syncOnlineStatus);
syncOnlineStatus();

// ─────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────
document.getElementById('flashcard').addEventListener('click', flipCard);
document.getElementById('flashcard').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') flipCard();
});

document.getElementById('btn-right').addEventListener('click', () => markCard(true));
document.getElementById('btn-wrong').addEventListener('click', () => markCard(false));

document.getElementById('back-btn').addEventListener('click', renderHome);
document.getElementById('btn-retry').addEventListener('click', () => startDeck(state.currentDeck.id));
document.getElementById('btn-home').addEventListener('click',  renderHome);

// ─────────────────────────────────────────────────────
// SERVICE WORKER REGISTRATION
// ─────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(reg  => console.log('[FlipIQ] SW registered, scope:', reg.scope))
      .catch(err => console.warn('[FlipIQ] SW registration failed:', err));
  });
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
renderHome();
