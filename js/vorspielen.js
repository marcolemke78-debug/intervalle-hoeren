/**
 * Vorspielen: Papa wählt Startton, Intervall und Richtung und spielt es Leonie vor.
 * Der Startton ist immer der ERSTE Ton: aufwärts geht es von ihm nach oben,
 * abwärts von ihm nach unten, zusammen ist er der untere Ton.
 * Was gespielt wurde, steht zugeklappt unten (damit Leonie es nicht sofort sieht).
 */
const Vorspielen = {
  // Starttöne c' bis h' (MIDI 60–71)
  NOTES: ["c'", "cis'", "d'", "es'", "e'", "f'", "fis'", "g'", "as'", "a'", "b'", "h'"],
  start: 60,
  semis: 7,
  last: null,

  // MIDI-Nummer → Notenname mit Oktavstrich (c = 48, c' = 60, c'' = 72)
  name(midi) {
    const n = this.NOTES[((midi % 12) + 12) % 12].replace("'", '');
    const oct = Math.floor(midi / 12) - 4; // 0 = kleine Oktave, 1 = eingestrichen …
    return oct <= 0 ? n : n + "'".repeat(oct);
  },

  play(dir) {
    const s = this.semis;
    // Ton.play erwartet immer den unteren Ton als Basis
    const base = dir === 'down' ? this.start - s : this.start;
    Ton.play(base, s, dir);
    const a = this.name(this.start), b = this.name(dir === 'down' ? this.start - s : this.start + s);
    const pfeil = dir === 'together' ? ' + ' : ' → ';
    this.last = INTERVALS[s].fein + ' ' + (dir === 'down' ? 'abwärts' : dir === 'together' ? 'zusammen' : 'aufwärts')
      + ' (' + a + pfeil + b + ')';
    const out = document.getElementById('vs-last');
    if (out) out.textContent = this.last;
  },

  render(container) {
    const el = (tag, cls, html) => {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (html !== undefined) e.innerHTML = html;
      return e;
    };
    // Knopfgruppe, in der immer genau einer gewählt ist
    const group = (title, items, isSel, onPick) => {
      container.appendChild(el('h2', 'vs-title', title));
      const box = el('div', 'vs-grid');
      items.forEach(([val, label]) => {
        const b = el('button', 'mc-option vs-opt' + (isSel(val) ? ' vs-sel' : ''), label);
        b.addEventListener('click', () => {
          onPick(val);
          box.querySelectorAll('.vs-opt').forEach(x => x.classList.remove('vs-sel'));
          b.classList.add('vs-sel');
        });
        box.appendChild(b);
      });
      container.appendChild(box);
    };

    container.innerHTML = '';
    container.appendChild(el('h1', '', 'Vorspielen'));
    container.appendChild(el('p', '', 'Startton und Intervall wählen, dann die Richtung antippen. '
      + 'Wer zuhört, sagt, was er gehört hat.'));

    group('1. Startton', this.NOTES.map((n, i) => [60 + i, n]), v => v === this.start, v => { this.start = v; });
    group('2. Intervall', Object.keys(INTERVALS).map(Number).map(s => [s, INTERVALS[s].fein]),
      v => v === this.semis, v => { this.semis = v; });

    container.appendChild(el('h2', 'vs-title', '3. Abspielen'));
    const ctrl = el('div', 'listening-controls');
    [['up', '▶ aufwärts'], ['down', '▶ abwärts'], ['together', '♫ zusammen']].forEach(([d, label]) => {
      const b = el('button', 'listening-play-btn', label);
      b.addEventListener('click', () => this.play(d));
      ctrl.appendChild(b);
    });
    container.appendChild(ctrl);

    const det = el('details', 'listening-transcript');
    det.appendChild(el('summary', '', 'Was zuletzt gespielt wurde (Lösung)'));
    const p = el('p', 'listening-transcript-text', this.last || 'noch nichts');
    p.id = 'vs-last';
    det.appendChild(p);
    container.appendChild(det);
  }
};
