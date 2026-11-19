/**
 * Daten des Lernprogramms "Intervalle hören" (keine Klassenarbeit, darum date: '').
 *   MODULES – Überschriften der Lektionsgruppen
 *   LESSONS – Lektionsliste (IDs nie nachträglich ändern, sonst ist der Lernstand weg)
 * Inhalte: js/lessons-intervalle.js · Karten für den Trainer: js/cards.js
 */
const KA = {
  id: 'intervalle-hoeren-2627',
  subject: 'Musik',
  looseInput: true,
  title: 'Intervalle hören',
  date: '',
  topics: [
    { title: 'Grob bestimmen: aufwärts', lessons: [1, 2, 3, 4] },
    { title: 'Zusammenklang: rein, konsonant, dissonant', lessons: [11] },
    { title: 'Grob bestimmen: abwärts und gemischt', lessons: [5, 6] },
    { title: 'Fein bestimmen: klein, groß, rein', lessons: [7, 8, 9] },
    { title: 'Fein bestimmen: alles gemischt', lessons: [10] },
    { title: 'Merklieder', trainer: true }
  ],
  links: [
    { label: 'Liedanfänge zum Ausdrucken (1 Seite)', href: 'pdf/liedanfaenge.html' }
  ]
};

const MODULES = { m1: 'Stufe 1: Grob bestimmen', m2: 'Stufe 2: Fein bestimmen' };

const LESSONS = [
  { id: 1, title: 'Was ist ein Intervall?', module: 'm1' },
  { id: 11, title: 'Zusammenklang: rein, konsonant, dissonant', module: 'm1' },
  { id: 2, title: 'Sekunde, Terz, Quinte, Oktave', module: 'm1' },
  { id: 3, title: 'Quarte oder Quinte?', module: 'm1' },
  { id: 4, title: 'Sexte und Septime', module: 'm1' },
  { id: 5, title: 'Abwärts hören', module: 'm1' },
  { id: 6, title: 'Grob gemischt: auf und ab', module: 'm1' },
  { id: 7, title: 'Klein oder groß? Halbtöne zählen', module: 'm2' },
  { id: 8, title: 'Quarte, Tritonus, Quinte', module: 'm2' },
  { id: 9, title: 'Sexten und Septimen fein', module: 'm2' },
  { id: 10, title: 'Alles fein: auf und ab', module: 'm2' }
];
