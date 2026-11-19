/**
 * Ton: Intervalle erzeugen und abspielen (Web Audio, ohne Audiodateien, offline).
 * INTERVALS: alle Intervalle bis zur Oktave mit Halbtönen, Namen und Merkliedern.
 * Exercises.renderIntervalEar: Hörübung "Welches Intervall war das?" (type: 'interval-ear').
 *
 * Aufruf in Erklärungstexten (innerHTML, darum inline onclick):
 *   <button class="play-btn" onclick="Ton.demo(7,'up')">▶ Quinte</button>
 */
const INTERVALS = {
  1:  { klang: 'dissonant', fein: 'kleine Sekunde', grob: 'Sekunde', up: 'Der weiße Hai, Pink Panther', down: 'Für Elise' },
  2:  { klang: 'dissonant', fein: 'große Sekunde', grob: 'Sekunde', up: 'Alle meine Entchen, Happy Birthday', down: 'Yesterday (Beatles)' },
  3:  { klang: 'konsonant', fein: 'kleine Terz', grob: 'Terz', up: 'Smoke on the Water, Greensleeves', down: 'Kuckuck, Kuckuck; Hänschen klein' },
  4:  { klang: 'konsonant', fein: 'große Terz', grob: 'Terz', up: 'When the Saints Go Marching In', down: 'Beethoven 5 (ta-ta-ta-taaa), Swing Low' },
  5:  { klang: 'rein', fein: 'reine Quarte', grob: 'Quarte', up: 'O Tannenbaum, Treulich geführt (Hochzeitsmarsch)', down: 'Eine kleine Nachtmusik' },
  6:  { klang: 'dissonant', fein: 'Tritonus', grob: 'Tritonus', up: 'Die Simpsons', down: '' },
  7:  { klang: 'rein', fein: 'reine Quinte', grob: 'Quinte', up: 'Morgen kommt der Weihnachtsmann, Star Wars', down: 'Familie Feuerstein (Flintstones)' },
  8:  { klang: 'konsonant', fein: 'kleine Sexte', grob: 'Sexte', up: 'The Entertainer (großer Sprung nach dem Auftakt)', down: '' },
  9:  { klang: 'konsonant', fein: 'große Sexte', grob: 'Sexte', up: 'My Bonnie Is Over the Ocean', down: '' },
  10: { klang: 'dissonant', fein: 'kleine Septime', grob: 'Septime', up: 'Star Trek (alte Serie), Somewhere (West Side Story)', down: '' },
  11: { klang: 'dissonant', fein: 'große Septime', grob: 'Septime', up: '', down: '' },
  12: { klang: 'rein', fein: 'Oktave', grob: 'Oktave', up: 'Somewhere Over the Rainbow', down: '' }
};

// Was der Klang bedeutet (für Rückmeldung und Lektion "Zusammenklang")
const KLANG = {
  rein: 'rein: klingt leer und offen, die Töne verschmelzen fast',
  konsonant: 'konsonant: klingt voll, warm und angenehm',
  dissonant: 'dissonant: die Töne reiben sich, es klingt spannend'
};

const Ton = {
  ctx: null,

  // AudioContext erst beim ersten Antippen anlegen (iPad erlaubt Ton nur nach einer Berührung)
  audio() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      // Safari 17+: Ton auch bei stumm geschaltetem iPad abspielen
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* egal */ }
      this.ctx = new AC();
    }
    return this.ctx;
  },

  // Erst abspielen, wenn der Ton wirklich läuft. Safari (iPad) startet ihn beim ersten
  // Antippen verzögert, sofort geplante Töne gingen dann manchmal verloren.
  whenReady(fn) {
    const ctx = this.audio();
    if (!ctx) return;
    if (ctx.state === 'running') { fn(); return; }
    // iOS: auch 'interrupted' nach App-Wechsel. Spätestens nach 300 ms trotzdem spielen,
    // falls resume() hängt, sonst wäre gar nichts zu hören.
    let done = false;
    const go = () => { if (!done) { done = true; fn(); } };
    ctx.resume().then(go, go);
    setTimeout(go, 300);
  },

  // Beim ersten Berühren der Seite den Ton freischalten (kurzer stiller Ton)
  unlock() {
    const ctx = this.audio();
    if (!ctx) return;
    ctx.resume();
    const src = ctx.createBufferSource();
    src.buffer = ctx.createBuffer(1, 1, 22050);
    src.connect(ctx.destination);
    src.start(0);
  },

  freq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); },

  // Ein klavierähnlicher Ton: Grundton + zwei Obertöne, schnell an, langsam aus
  note(midi, start, dur) {
    const ctx = this.audio();
    if (!ctx) return;
    const t0 = ctx.currentTime + start;
    const master = ctx.createGain();
    // schnell an, dann langsam ausklingen (Zeitkonstante = 40 % der Dauer, bleibt gut hörbar)
    master.gain.setValueAtTime(0, t0);
    master.gain.linearRampToValueAtTime(0.35, t0 + 0.02);
    master.gain.setTargetAtTime(0, t0 + 0.02, dur * 0.4);
    master.connect(ctx.destination);
    [[1, 1], [2, 0.35], [3, 0.12]].forEach(([mult, vol]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = this.freq(midi) * mult;
      g.gain.value = vol;
      o.connect(g); g.connect(master);
      o.start(t0); o.stop(t0 + dur * 2);
    });
  },

  // Intervall abspielen: dir 'up' | 'down' | 'together'
  play(base, semis, dir) {
    this.whenReady(() => this.playNow(base, semis, dir));
  },
  playNow(base, semis, dir) {
    if (dir === 'together') {
      this.note(base, 0, 1.6);
      this.note(base + semis, 0, 1.6);
    } else if (dir === 'down') {
      this.note(base + semis, 0, 1.0);
      this.note(base, 0.8, 1.3);
    } else {
      this.note(base, 0, 1.0);
      this.note(base + semis, 0.8, 1.3);
    }
  },

  // Für Knöpfe in den Erklärungen: immer ab c' (MIDI 60)
  demo(semis, dir) { this.play(60, semis, dir || 'up'); },

  // Klaviatur in Lektion 7: Taste antippen = c' und dann diese Taste
  key(semis) { if (semis === 0) this.whenReady(() => this.note(60, 0, 1.2)); else this.play(60, semis, 'up'); },

  // Zufälliger Grundton, damit man nicht nach der Tonhöhe rät
  randomBase(semis, dir) {
    // aufwärts: Start zwischen G (55) und G' (67); abwärts: oberer Ton ungefähr im selben Bereich
    const low = dir === 'down' ? 55 - Math.min(semis, 5) : 55;
    return low + Math.floor(Math.random() * 13);
  }
};

// Erste Berührung irgendwo auf der Seite schaltet den Ton frei
(function () {
  const evs = ['pointerdown', 'touchend', 'keydown'];
  function first() {
    try { Ton.unlock(); } catch (e) { /* egal */ }
    evs.forEach(x => document.removeEventListener(x, first, true));
  }
  evs.forEach(x => document.addEventListener(x, first, true));
})();

/**
 * Kurzformen von Intervallen beim Tippen erlauben (Trainer und Lückentexte):
 * "gr. 3", "gr3", "große 3", "kl. Terz", "r. 5", "rein 4", "gr. Sext", "8" → voller Name.
 * Hängt sich in Exercises._norm ein, das Trainer und Lückentext beide benutzen.
 */
Exercises.intervalShort = function (t) {
  const m = t.match(/^(kleine|kleiner|klein|kl|k|große|großer|groß|grosse|grosser|gross|gr|g|reine|reiner|rein|r)?\.?\s*(\d|sekunde|sek|terz|quarte|quart|qua|quinte|quint|qui|sexte|sext|sex|septime|sept|sep|oktave|okt|okt)\.?$/);
  if (!m) return t;
  const names = { 2: 'sekunde', 3: 'terz', 4: 'quarte', 5: 'quinte', 6: 'sexte', 7: 'septime', 8: 'oktave' };
  let n = m[2];
  if (/^\d$/.test(n)) {
    if (!names[n]) return t;
    n = names[n];
  } else {
    n = { sek: 'sekunde', quart: 'quarte', qua: 'quarte', quint: 'quinte', qui: 'quinte', sext: 'sexte', sex: 'sexte', sept: 'septime', sep: 'septime', okt: 'oktave' }[n] || n;
  }
  const p = m[1] || '';
  const pre = /^k/.test(p) ? 'kleine ' : /^g/.test(p) ? 'große ' : ''  // "reine Quinte" = "Quinte": Quarte, Quinte, Oktave gibt es hier nur rein;
  return pre + n;
};
(function () {
  const baseNorm = Exercises._norm;
  Exercises._norm = function (s) { return Exercises.intervalShort(baseNorm(s)); };
})();

/**
 * Hörübung. Felder:
 *   set        – Liste der Halbtonzahlen, die vorkommen können, z. B. [2, 4, 7, 12]
 *   names      – 'grob' (Sekunde, Terz …), 'fein' (kleine Terz …) oder 'klang' (rein, konsonant, dissonant)
 *   direction  – wie das Intervall zuerst erklingt: 'up' | 'down' | 'together' | 'mixed' (auf oder ab)
 *                Alle drei Formen (tief → hoch, hoch → tief, zusammen) lassen sich immer per Knopf anhören.
 *   rounds     – Anzahl Intervalle pro Runde (Standard 10)
 *   need       – so viele müssen richtig sein (Standard 8)
 *   question   – Text über der Übung
 */
Exercises.renderIntervalEar = function (exercise, container, onComplete, onWrong) {
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };
  const nameKey = exercise.names === 'fein' ? 'fein' : exercise.names === 'klang' ? 'klang' : 'grob';
  const rounds = exercise.rounds || 10;
  const need = exercise.need || 8;

  // Antwortknöpfe: jeder Name nur einmal, nach Größe sortiert
  let answers = [];
  exercise.set.slice().sort((a, b) => a - b).forEach(s => {
    const n = INTERVALS[s][nameKey];
    if (answers.indexOf(n) === -1) answers.push(n);
  });
  if (nameKey === 'klang') answers = ['rein', 'konsonant', 'dissonant'].filter(k => answers.indexOf(k) !== -1);

  const wrapper = el('div', 'exercise-ear');
  wrapper.appendChild(el('p', 'exercise-question', exercise.question
    || 'Hör dir das Intervall an und tippe, welches es ist.'));
  const status = el('div', 'ear-status');
  wrapper.appendChild(status);
  // Drei Arten, dasselbe Intervall zu hören. Der Knopf der Frage-Form ist kräftig blau.
  const controls = el('div', 'listening-controls ear-play');
  const playBtns = {};
  [['up', '▶ tief → hoch'], ['down', '▶ hoch → tief'], ['together', '♫ zusammen']].forEach(([d, label]) => {
    const b = el('button', 'listening-slow-btn', label);
    b.addEventListener('click', () => Ton.play(current.base, current.semis, d));
    playBtns[d] = b;
    controls.appendChild(b);
  });
  wrapper.appendChild(controls);
  const optBox = el('div', 'mc-options ear-options');
  wrapper.appendChild(optBox);
  const feedback = el('div', 'exercise-feedback');
  feedback.style.display = 'none';
  wrapper.appendChild(feedback);
  const nextBtn = el('button', 'exercise-check-btn', 'Nächstes Intervall ▶');
  nextBtn.style.display = 'none';
  wrapper.appendChild(nextBtn);
  container.appendChild(wrapper);

  let round = 0, correct = 0, current = null, answered = false, done = false;

  function pick() {
    let s, dir;
    do {
      s = exercise.set[Math.floor(Math.random() * exercise.set.length)];
      dir = exercise.direction === 'mixed' ? (Math.random() < 0.5 ? 'up' : 'down') : (exercise.direction || 'up');
    } while (current && exercise.set.length > 1 && s === current.semis && Math.random() < 0.7);
    return { semis: s, dir: dir, base: Ton.randomBase(s, dir) };
  }
  function dirText(d) { return d === 'down' ? 'abwärts' : d === 'together' ? 'zusammen' : 'aufwärts'; }
  function song(s, d) {
    const iv = INTERVALS[s];
    if (s === 11) return 'Merkhilfe: klingt wie eine schiefe Oktave.';
    const t = d === 'down' ? iv.down : iv.up;
    return t ? 'Merklied ' + (d === 'down' ? 'abwärts' : 'aufwärts') + ': <em>' + t + '</em>' : '';
  }
  // Klang (und bei der Klang-Übung auch der Name) als Zusatzinfo
  function info(s, d) {
    const iv = INTERVALS[s];
    const what = nameKey === 'klang' ? 'Das Intervall war ' + (s === 6 ? 'ein' : 'eine') + ' <strong>' + iv.fein + '</strong>. ' : '';
    return what + 'Klang ' + KLANG[iv.klang] + '. ' + song(s, d);
  }
  function updateStatus() {
    status.innerHTML = 'Intervall <strong>' + Math.min(answered ? round : round + 1, rounds) + '</strong> von ' + rounds
      + ' · richtig: <strong>' + correct + '</strong> · Ziel: ' + need;
  }

  function startItem(autoplay) {
    current = pick();
    answered = false;
    feedback.style.display = 'none';
    nextBtn.style.display = 'none';
    optBox.innerHTML = '';
    answers.forEach(name => {
      const b = el('button', 'mc-option', name);
      b.addEventListener('click', () => choose(b, name));
      optBox.appendChild(b);
    });
    updateStatus();
    Object.keys(playBtns).forEach(d => {
      playBtns[d].className = d === current.dir ? 'listening-play-btn' : 'listening-slow-btn';
    });
    if (autoplay) Ton.play(current.base, current.semis, current.dir);
  }

  function compareBtn(label, semis, dir) {
    const b = el('button', 'listening-slow-btn ear-compare', label);
    b.addEventListener('click', () => Ton.play(current.base, semis, dir));
    return b;
  }

  function choose(btn, name) {
    if (answered || done) return;
    answered = true;
    const right = INTERVALS[current.semis][nameKey];
    optBox.querySelectorAll('.mc-option').forEach(x => { x.disabled = true; });
    feedback.innerHTML = '';
    if (name === right) {
      correct++;
      btn.classList.add('correct');
      feedback.className = 'exercise-feedback correct';
      feedback.innerHTML = '<p>Richtig: <strong>' + right + '</strong>' + (nameKey === 'klang' ? '' : ' ' + dirText(current.dir)) + '.</p><p>' + info(current.semis, current.dir) + '</p>'
        + '<p class="ear-hint">Tipp: Hör es dir auch in den anderen zwei Formen an.</p>';
    } else {
      btn.classList.add('incorrect');
      optBox.querySelectorAll('.mc-option').forEach(x => { if (x.textContent === right) x.classList.add('correct'); });
      onWrong();
      feedback.className = 'exercise-feedback incorrect';
      feedback.innerHTML = (nameKey === 'klang'
          ? '<p>Richtig wäre <strong>' + right + '</strong>.</p>'
          : '<p>Das war ' + (current.semis === 6 ? 'ein' : 'eine') + ' <strong>' + right + '</strong> ' + dirText(current.dir) + '.</p>')
        + '<p>' + info(current.semis, current.dir) + '</p><p>Hör beide noch einmal und vergleiche:</p>';
      const row = el('div', 'listening-controls');
      row.appendChild(compareBtn('▶ ' + right + ' (richtig)', current.semis, current.dir));
      // passendes Intervall zum getippten Namen suchen (bei grob: das am nächsten liegende)
      const cand = Object.keys(INTERVALS).map(Number).filter(s => INTERVALS[s][nameKey] === name);
      const wrongSemis = cand.sort((a, b) => Math.abs(a - current.semis) - Math.abs(b - current.semis))[0];
      if (wrongSemis) row.appendChild(compareBtn('▶ ' + name + ' (dein Tipp)', wrongSemis, current.dir));
      feedback.appendChild(row);
    }
    feedback.style.display = 'block';
    round++;
    updateStatus();
    if (round >= rounds) finish();
    else nextBtn.style.display = '';
  }

  function finish() {
    status.innerHTML = 'Ergebnis: <strong>' + correct + ' von ' + rounds + '</strong> richtig.';
    const box = el('div', 'ear-result');
    if (correct >= need) {
      done = true;
      box.className = 'ear-result ok';
      box.innerHTML = '✓ Geschafft! Du brauchtest ' + need + ', du hattest ' + correct + '.';
      onComplete();
      const again = el('button', 'listening-slow-btn', 'Noch eine Runde zum Spaß');
      again.addEventListener('click', () => { box.remove(); round = 0; correct = 0; done = false; startItem(true); });
      box.appendChild(document.createElement('br'));
      box.appendChild(again);
    } else {
      box.className = 'ear-result retry';
      box.innerHTML = 'Fast! Du brauchst ' + need + ' von ' + rounds + '. Sing beim Hören leise das Merklied mit, das hilft.<br>';
      const again = el('button', 'exercise-check-btn', 'Neue Runde');
      again.addEventListener('click', () => { box.remove(); round = 0; correct = 0; startItem(true); });
      box.appendChild(again);
    }
    wrapper.appendChild(box);
  }

  nextBtn.addEventListener('click', () => startItem(true));
  startItem(false);
};
