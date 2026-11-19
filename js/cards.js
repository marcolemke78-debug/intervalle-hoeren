/**
 * Trainer "Merklieder": Lied sehen, Intervall tippen.
 * IDs nie ändern (Lernstand hängt daran). Groß/klein und "reine" davor prüft die Engine
 * nicht selbst, darum stehen Kurzformen in accept.
 */
const CARDS = {
  title: 'Merklieder-Trainer',
  speak: null,
  reverse: false,
  mode: 'type',
  typePlaceholder: 'Intervall tippen, z. B. gr. 3 oder große Terz',
  items: [
    { id: 'l01', front: 'Alle meine Entchen (aufwärts)', back: 'große Sekunde', accept: ['gr. Sekunde', 'grosse Sekunde'] },
    { id: 'l02', front: 'When the Saints Go Marching In (aufwärts)', back: 'große Terz', accept: ['gr. Terz', 'grosse Terz'] },
    { id: 'l03', front: 'O Tannenbaum (aufwärts)', back: 'reine Quarte', accept: ['Quarte'] },
    { id: 'l04', front: 'Morgen kommt der Weihnachtsmann (aufwärts)', back: 'reine Quinte', accept: ['Quinte'] },
    { id: 'l05', front: 'Somewhere Over the Rainbow (aufwärts)', back: 'Oktave', accept: ['reine Oktave'] },
    { id: 'l06', front: 'Kuckuck, Kuckuck, ruft\'s aus dem Wald (abwärts)', back: 'kleine Terz', accept: ['kl. Terz'] },
    { id: 'l07', front: 'Eine kleine Nachtmusik (abwärts)', back: 'reine Quarte', accept: ['Quarte'] },
    { id: 'l08', front: 'Yesterday (abwärts)', back: 'große Sekunde', accept: ['gr. Sekunde', 'grosse Sekunde'] },
    { id: 'l09', front: 'Der weiße Hai (aufwärts)', back: 'kleine Sekunde', accept: ['kl. Sekunde', 'Halbton'] },
    { id: 'l10', front: 'Smoke on the Water (aufwärts)', back: 'kleine Terz', accept: ['kl. Terz'] },
    { id: 'l11', front: 'Die Simpsons (aufwärts)', back: 'Tritonus', accept: ['übermäßige Quarte', 'verminderte Quinte'] },
    { id: 'l12', front: 'Star Wars, Hauptthema (aufwärts)', back: 'reine Quinte', accept: ['Quinte'] },
    { id: 'l13', front: 'My Bonnie Is Over the Ocean (aufwärts)', back: 'große Sexte', accept: ['gr. Sexte', 'grosse Sexte'] },
    { id: 'l14', front: 'Star Trek, alte Serie (aufwärts)', back: 'kleine Septime', accept: ['kl. Septime'] },
    { id: 'l15', front: 'Für Elise (abwärts)', back: 'kleine Sekunde', accept: ['kl. Sekunde', 'Halbton'] },
    { id: 'l16', front: 'Beethovens 5. Sinfonie, ta-ta-ta-taaa (abwärts)', back: 'große Terz', accept: ['gr. Terz', 'grosse Terz'] },
    { id: 'l17', front: 'Familie Feuerstein (abwärts)', back: 'reine Quinte', accept: ['Quinte'] },
    { id: 'l18', front: 'Hänschen klein (abwärts)', back: 'kleine Terz', accept: ['kl. Terz'] }
  ]
};
