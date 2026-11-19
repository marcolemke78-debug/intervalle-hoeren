/**
 * Lektionen "Intervalle hören". Abspielknöpfe in den Texten: pb(Halbtöne, Richtung, Beschriftung).
 * Hörübungen: type 'interval-ear' (siehe js/ton.js).
 */
function pb(semis, dir, label) {
  return '<button class="play-btn" onclick="Ton.demo(' + semis + ',\'' + dir + '\')">▶ ' + label + '</button>';
}

// Klaviatur für Lektion 7: Taste antippen = c' und dann diese Taste
const KLAVIATUR = (function () {
  const white = [['c', 0], ['d', 2], ['e', 4], ['f', 5], ['g', 7], ['a', 9], ['h', 11], ["c'", 12]];
  const black = [[1, 0], [3, 1], [6, 3], [8, 4], [10, 5]]; // [Halbtöne, links von weißer Taste Nr.]
  let s = '<svg class="klaviatur" viewBox="0 0 322 150" role="img" aria-label="Klaviatur von c bis c mit Halbtonzahlen">';
  white.forEach((w, i) => {
    s += '<g class="key" onclick="Ton.key(' + w[1] + ')"><rect x="' + (1 + i * 40) + '" y="1" width="40" height="146" rx="4" fill="#fff" stroke="#333" stroke-width="1.5"/>'
      + '<text x="' + (21 + i * 40) + '" y="118" text-anchor="middle" font-size="15" fill="#333">' + w[0] + '</text>'
      + '<text x="' + (21 + i * 40) + '" y="138" text-anchor="middle" font-size="13" font-weight="bold" fill="#2563EB">' + w[1] + '</text></g>';
  });
  black.forEach(b => {
    const x = 1 + (b[1] + 1) * 40 - 13;
    s += '<g class="key" onclick="Ton.key(' + b[0] + ')"><rect x="' + x + '" y="1" width="26" height="88" rx="3" fill="#222"/>'
      + '<text x="' + (x + 13) + '" y="78" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">' + b[0] + '</text></g>';
  });
  return s + '</svg>';
})();

window.LESSON_DATA = (window.LESSON_DATA || []).concat([
  // ======================================================================
  {
    id: 1,
    title: 'Was ist ein Intervall?',
    explanation: {
      html: `
        <p>Ein <strong>Intervall</strong> ist der <strong>Abstand zwischen zwei Tönen</strong>. Wie groß der Abstand ist, sagt der Name des Intervalls.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Stell dir eine Treppe vor. Wenn du sagst &bdquo;Ich gehe von Stufe 1 bis Stufe 3&ldquo;, dann zählst du die Stufe, auf der du stehst, mit: 1, 2, 3. Genauso zählt man bei Intervallen die Töne: <strong>Der erste Ton zählt mit.</strong></div>
        <p>Die Namen kommen aus dem Lateinischen und sind einfach Ordnungszahlen: <em>secunda</em> = die zweite, <em>tertia</em> = die dritte und so weiter. Von c aus gezählt:</p>
        <table class="info-table">
          <tr><th>Töne</th><th>Stufen</th><th>Name</th><th>anhören</th></tr>
          <tr><td>c – d</td><td>2</td><td>Sekunde</td><td>${pb(2, 'up', 'c – d')}</td></tr>
          <tr><td>c – e</td><td>3</td><td>Terz</td><td>${pb(4, 'up', 'c – e')}</td></tr>
          <tr><td>c – f</td><td>4</td><td>Quarte</td><td>${pb(5, 'up', 'c – f')}</td></tr>
          <tr><td>c – g</td><td>5</td><td>Quinte</td><td>${pb(7, 'up', 'c – g')}</td></tr>
          <tr><td>c – a</td><td>6</td><td>Sexte</td><td>${pb(9, 'up', 'c – a')}</td></tr>
          <tr><td>c – h</td><td>7</td><td>Septime</td><td>${pb(11, 'up', 'c – h')}</td></tr>
          <tr><td>c – c'</td><td>8</td><td>Oktave</td><td>${pb(12, 'up', "c – c'")}</td></tr>
        </table>
        <div class="tip-box"><strong>Gut zu wissen:</strong> Zweimal derselbe Ton heißt <em>Prime</em> (die erste). Die Oktave (die achte) klingt fast wie derselbe Ton, nur höher. Darum heißen beide Töne gleich: c und c'.</div>
        <div class="warning-box"><strong>Typischer Fehler:</strong> Nur die Schritte zählen. Von c nach e sind es zwei Schritte, aber drei Töne (c, d, e). Also ist es eine <strong>Terz</strong>, keine Sekunde.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Wer Intervalle hört, kann Melodien schneller nachsingen, nach Gehör spielen und Noten leichter lesen.</div>`
    },
    example: {
      title: 'Von c bis a bestimmen',
      steps: [
        { label: 'Töne aufzählen', html: '<p>Ich zähle alle Töne von c bis a auf, den ersten mitgezählt: c, d, e, f, g, a.</p>' },
        { label: 'Zählen', html: '<p>Das sind <strong>6</strong> Töne.</p>' },
        { label: 'Namen finden', html: '<p>6 = <em>sexta</em> = die sechste. Also eine <strong>Sexte</strong>. ' + pb(9, 'up', 'anhören') + '</p>' }
      ]
    },
    exercises: [
      {
        type: 'fill-in-blank',
        question: 'Ergänze.',
        text: 'Von c bis g zählt man c, d, e, f, g. Das sind {{blank}} Töne, also eine {{blank}}.',
        blanks: [{ correct: '5', alternatives: ['fünf'] }, { correct: 'Quinte' }],
        explanation: 'Der erste Ton zählt mit: c, d, e, f, g sind 5 Töne. 5 = quinta = Quinte.'
      },
      {
        type: 'ordering',
        question: 'Sortiere die Intervalle vom kleinsten zum größten.',
        items: ['Sekunde', 'Terz', 'Quarte', 'Quinte', 'Sexte', 'Septime', 'Oktave'],
        correctOrder: [0, 1, 2, 3, 4, 5, 6],
        explanation: 'Die Namen sind Ordnungszahlen: 2., 3., 4., 5., 6., 7. und 8. Ton.'
      },
      {
        type: 'multiple-choice',
        question: 'Warum ist c – e eine Terz und keine Sekunde?',
        options: ['Weil der erste Ton mitzählt: c, d, e sind drei Töne', 'Weil e ein hoher Ton ist', 'Weil man nur die Schritte zählt', 'Weil zwischen c und e eine schwarze Taste liegt'],
        correct: 0,
        wrongExplanations: {
          1: 'Die Tonhöhe allein sagt nichts über den Abstand. Es kommt auf das Zählen an.',
          2: 'Genau das ist der typische Fehler: Zwei Schritte, aber drei Töne. Gezählt werden die Töne.',
          3: 'Zwischen c und e liegen sogar zwei schwarze Tasten. Für den Namen zählt man aber die Töne c, d, e.'
        }
      },
      {
        type: 'interval-ear',
        question: 'Erster Hörtest: Ist das ein kleiner Schritt (Sekunde) oder ein großer Sprung (Oktave)? Tippe zuerst auf &bdquo;Anhören&ldquo;.',
        set: [2, 12], names: 'grob', direction: 'up', rounds: 6, need: 5
      }
    ]
  },
  // ======================================================================
  {
    id: 2,
    title: 'Sekunde, Terz, Quinte, Oktave',
    explanation: {
      html: `
        <p>Intervalle erkennt man am leichtesten mit einem <strong>Merklied</strong>: einem Lied, das genau mit diesem Intervall anfängt. Du hörst ein Intervall, singst im Kopf die Lieder durch und merkst, welches passt.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Ein Merklied ist wie eine Eselsbrücke beim Vokabellernen. Am Anfang brauchst du sie bei jedem Wort. Irgendwann weißt du es sofort, ganz ohne Brücke.</div>
        <p>Wir starten mit vier Intervallen, die sehr verschieden klingen:</p>
        <table class="info-table">
          <tr><th>Intervall</th><th>Merklied (aufwärts)</th><th>anhören</th></tr>
          <tr><td>Sekunde</td><td><strong>Al</strong>-<strong>le</strong> mei-ne Ent-chen</td><td>${pb(2, 'up', 'Sekunde')}</td></tr>
          <tr><td>Terz</td><td><strong>Oh when</strong> the Saints</td><td>${pb(4, 'up', 'Terz')}</td></tr>
          <tr><td>Quinte</td><td><strong>Mor</strong>-gen <strong>kommt</strong> der Weih-nachts-mann</td><td>${pb(7, 'up', 'Quinte')}</td></tr>
          <tr><td>Oktave</td><td><strong>Some</strong>-<strong>where</strong> o-ver the rain-bow</td><td>${pb(12, 'up', 'Oktave')}</td></tr>
        </table>
        <p>Die fett gedruckten Silben sind die zwei Töne des Intervalls. Bei &bdquo;Morgen kommt&ldquo; springt die Melodie von &bdquo;Mor&ldquo; (und &bdquo;gen&ldquo;) hoch zu &bdquo;kommt&ldquo;.</p>
        <div class="tip-box"><strong>Tipp:</strong> Sing das Lied laut oder leise mit, während du die zwei Töne hörst. Singen hilft mehr als nur Zuhören.</div>
        <div class="why-context"><strong>Warum diese vier zuerst?</strong> Sie liegen weit auseinander: ein Schritt, ein kleiner Sprung, ein großer Sprung, ein ganz großer Sprung. So verwechselt man sie am Anfang kaum.</div>`
    },
    example: {
      title: 'So bestimmst du ein Intervall',
      steps: [
        { label: 'Anhören', html: '<p>Hör dir das Intervall an: ' + pb(7, 'up', 'Rätsel-Intervall') + '</p>' },
        { label: 'Eng oder weit?', html: '<p>Die Töne liegen ziemlich weit auseinander. Sekunde und Terz fallen also weg.</p>' },
        { label: 'Lieder durchprobieren', html: '<p>&bdquo;Somewhere over the rainbow&ldquo; springt noch höher. &bdquo;Morgen kommt der Weihnachtsmann&ldquo; passt genau.</p>' },
        { label: 'Ergebnis', html: '<p>Es ist eine <strong>Quinte</strong>.</p>' }
      ]
    },
    exercises: [
      {
        type: 'matching',
        question: 'Welches Lied gehört zu welchem Intervall?',
        pairs: [
          { left: 'Alle meine Entchen', right: 'Sekunde' },
          { left: 'When the Saints Go Marching In', right: 'Terz' },
          { left: 'Morgen kommt der Weihnachtsmann', right: 'Quinte' },
          { left: 'Somewhere Over the Rainbow', right: 'Oktave' }
        ],
        explanation: 'Entchen = Schritt (Sekunde), Saints = kleiner Sprung (Terz), Weihnachtsmann = großer Sprung (Quinte), Rainbow = ganz großer Sprung (Oktave).'
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze ohne nachzuschauen.',
        text: '&bdquo;Somewhere Over the Rainbow&ldquo; beginnt mit einer {{blank}}. &bdquo;Alle meine Entchen&ldquo; beginnt mit einer {{blank}}.',
        blanks: [{ correct: 'Oktave' }, { correct: 'Sekunde', alternatives: ['große Sekunde'] }],
        explanation: 'Some-where = Oktave (ganz großer Sprung), Al-le = Sekunde (ein Schritt).'
      },
      {
        type: 'interval-ear',
        question: 'Sekunde, Terz, Quinte oder Oktave? Sing im Kopf die Merklieder mit.',
        set: [2, 4, 7, 12], names: 'grob', direction: 'up', rounds: 10, need: 8
      }
    ]
  },
  // ======================================================================
  {
    id: 3,
    title: 'Quarte oder Quinte?',
    explanation: {
      html: `
        <p>Jetzt kommt die <strong>Quarte</strong> dazu. Sie ist genau eine Stufe kleiner als die Quinte. Beide klingen &bdquo;leer&ldquo; und offen. Darum werden sie am häufigsten verwechselt.</p>
        <table class="info-table">
          <tr><th>Intervall</th><th>Merklied (aufwärts)</th><th>anhören</th></tr>
          <tr><td>Quarte</td><td><strong>O Tan</strong>-nen-baum, Treulich geführt (Hochzeitsmarsch)</td><td>${pb(5, 'up', 'Quarte')}</td></tr>
          <tr><td>Quinte</td><td><strong>Mor</strong>-gen <strong>kommt</strong> der Weihnachtsmann, Star Wars</td><td>${pb(7, 'up', 'Quinte')}</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Die Quarte klingt wie ein Signal: &bdquo;Achtung, jetzt geht's los!&ldquo; (O Tannenbaum, Hochzeitsmarsch). Die Quinte klingt weiter und größer, wie wenn sich eine Landschaft öffnet (Star Wars).</div>
        <div class="tip-box"><strong>Vergleichen:</strong> Hör beide direkt nacheinander: ${pb(5, 'up', 'Quarte')} ${pb(7, 'up', 'Quinte')}</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Quarte und Quinte stecken in sehr vielen Liedanfängen, Fanfaren und Hymnen. Wer sie sicher trennt, hat die schwierigste Stelle der groben Stufe geschafft.</div>`
    },
    example: {
      title: 'Quarte oder Quinte?',
      steps: [
        { label: 'Anhören', html: '<p>' + pb(5, 'up', 'Rätsel-Intervall') + '</p>' },
        { label: 'Beide Lieder testen', html: '<p>Sing &bdquo;O Tan-nen-baum&ldquo; und &bdquo;Mor-gen kommt&ldquo;. Bei &bdquo;Morgen kommt&ldquo; landest du zu hoch.</p>' },
        { label: 'Ergebnis', html: '<p>&bdquo;O Tannenbaum&ldquo; passt, also eine <strong>Quarte</strong>.</p>' }
      ]
    },
    exercises: [
      {
        type: 'interval-ear',
        question: 'Nur zwei zur Auswahl: Quarte oder Quinte?',
        set: [5, 7], names: 'grob', direction: 'up', rounds: 8, need: 7
      },
      {
        type: 'multiple-choice',
        question: 'Du hörst ein Intervall und &bdquo;O Tannenbaum&ldquo; passt genau. Was ist es?',
        options: ['Quinte', 'Quarte', 'Terz', 'Oktave'],
        correct: 1,
        wrongExplanations: {
          0: 'Die Quinte hat das Merklied &bdquo;Morgen kommt der Weihnachtsmann&ldquo;. Sie ist eine Stufe größer.',
          2: 'Die Terz ist kleiner, ihr Merklied ist &bdquo;When the Saints&ldquo;.',
          3: 'Die Oktave ist viel größer: &bdquo;Somewhere over the rainbow&ldquo;.'
        }
      },
      {
        type: 'interval-ear',
        question: 'Jetzt gemischt mit allen bisherigen Intervallen.',
        set: [2, 4, 5, 7, 12], names: 'grob', direction: 'up', rounds: 10, need: 8
      }
    ]
  },
  // ======================================================================
  {
    id: 4,
    title: 'Sexte und Septime',
    explanation: {
      html: `
        <p>Zwischen Quinte und Oktave liegen noch zwei große Sprünge: die <strong>Sexte</strong> und die <strong>Septime</strong>.</p>
        <table class="info-table">
          <tr><th>Intervall</th><th>Merklied (aufwärts)</th><th>anhören</th></tr>
          <tr><td>Sexte</td><td><strong>My Bon</strong>-nie is o-ver the o-cean</td><td>${pb(9, 'up', 'Sexte')}</td></tr>
          <tr><td>Septime</td><td>Star Trek (alte Serie), <strong>There's a</strong> place for us (Somewhere)</td><td>${pb(10, 'up', 'Septime')}</td></tr>
          <tr><td>Oktave</td><td><strong>Some</strong>-<strong>where</strong> over the rainbow</td><td>${pb(12, 'up', 'Oktave')}</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Die Septime ist wie eine Treppe, bei der die oberste Stufe fehlt. Du willst eigentlich noch einen Schritt weiter, zur Oktave. Darum klingt die Septime gespannt und &bdquo;nicht fertig&ldquo;.</div>
        <div class="tip-box"><strong>Vergleichen:</strong> ${pb(10, 'up', 'Septime')} ${pb(12, 'up', 'Oktave')} Die Oktave klingt ruhig und fertig, die Septime will weiter.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Große Sprünge kommen in Refrains und Filmmusik oft vor, weil sie Gefühl und Spannung erzeugen.</div>`
    },
    example: {
      title: 'Sexte, Septime oder Oktave?',
      steps: [
        { label: 'Anhören', html: '<p>' + pb(10, 'up', 'Rätsel-Intervall') + '</p>' },
        { label: 'Ist es fertig?', html: '<p>Der zweite Ton klingt nicht ruhig, er will noch weiter. Die Oktave fällt weg.</p>' },
        { label: 'Lied testen', html: '<p>&bdquo;My Bonnie&ldquo; ist zu klein. Der Star-Trek-Sprung passt.</p>' },
        { label: 'Ergebnis', html: '<p>Eine <strong>Septime</strong>.</p>' }
      ]
    },
    exercises: [
      {
        type: 'interval-ear',
        question: 'Sexte, Septime oder Oktave?',
        set: [9, 10, 12], names: 'grob', direction: 'up', rounds: 8, need: 6
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze.',
        text: '&bdquo;My Bonnie Is Over the Ocean&ldquo; beginnt mit einer {{blank}}. Ein Intervall, das wie eine Oktave klingt, der ein Stück fehlt, ist eine {{blank}}.',
        blanks: [{ correct: 'Sexte', alternatives: ['große Sexte'] }, { correct: 'Septime' }],
        explanation: 'My Bonnie = Sexte. Die Septime liegt knapp unter der Oktave und will weiter.'
      },
      {
        type: 'interval-ear',
        question: 'Alle groben Intervalle aufwärts. Du schaffst das!',
        set: [2, 4, 5, 7, 9, 10, 12], names: 'grob', direction: 'up', rounds: 10, need: 7
      }
    ]
  },
  // ======================================================================
  {
    id: 5,
    title: 'Abwärts hören',
    explanation: {
      html: `
        <p>Intervalle gibt es auch <strong>abwärts</strong>: Erst kommt der hohe Ton, dann der tiefe. Der Name bleibt gleich, nur die Richtung ist anders.</p>
        <table class="info-table">
          <tr><th>Intervall</th><th>Merklied (abwärts)</th><th>anhören</th></tr>
          <tr><td>Sekunde</td><td><strong>Yes</strong>-<strong>ter</strong>-day (Beatles)</td><td>${pb(2, 'down', 'Sekunde ab')}</td></tr>
          <tr><td>Terz</td><td><strong>Ku</strong>-<strong>ckuck</strong>, Ku-ckuck; Hänschen klein</td><td>${pb(3, 'down', 'Terz ab')}</td></tr>
          <tr><td>Quarte</td><td>Eine kleine Nachtmusik (Mozart)</td><td>${pb(5, 'down', 'Quarte ab')}</td></tr>
          <tr><td>Quinte</td><td><strong>Flint</strong>-<strong>stones</strong> (Familie Feuerstein)</td><td>${pb(7, 'down', 'Quinte ab')}</td></tr>
          <tr><td>Oktave</td><td>kein Lied nötig: klingt wie derselbe Ton, nur tiefer</td><td>${pb(12, 'down', 'Oktave ab')}</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Ein Weg von zu Hause zur Schule ist genauso lang wie zurück. Beim Intervall ist es auch so: Abwärts ist der Abstand gleich groß wie aufwärts.</div>
        <div class="tip-box"><strong>Der Umdreh-Trick:</strong> Kennst du kein Abwärts-Lied, sing die zwei Töne im Kopf <strong>umgekehrt</strong>, also erst den tiefen, dann den hohen. Dann passt dein Aufwärts-Lied.</div>
        <div class="warning-box"><strong>Typischer Fehler:</strong> Abwärts klingt oft kleiner, als es ist. Lass dich nicht täuschen und prüfe mit einem Lied.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Melodien gehen hoch und runter. Wer nur aufwärts hören kann, erkennt nur die halbe Melodie.</div>`
    },
    example: {
      title: 'Mit dem Umdreh-Trick',
      steps: [
        { label: 'Anhören', html: '<p>' + pb(7, 'down', 'Rätsel-Intervall abwärts') + '</p>' },
        { label: 'Umdrehen', html: '<p>Ich singe erst den tiefen, dann den hohen Ton: ' + pb(7, 'up', 'umgedreht') + '</p>' },
        { label: 'Lied testen', html: '<p>Aufwärts passt &bdquo;Morgen kommt der Weihnachtsmann&ldquo;. Abwärts passt auch &bdquo;Flintstones&ldquo;.</p>' },
        { label: 'Ergebnis', html: '<p>Eine <strong>Quinte abwärts</strong>.</p>' }
      ]
    },
    exercises: [
      {
        type: 'matching',
        question: 'Welches Lied beginnt mit welchem Intervall abwärts?',
        pairs: [
          { left: 'Yesterday', right: 'Sekunde' },
          { left: 'Kuckuck, Kuckuck', right: 'Terz' },
          { left: 'Eine kleine Nachtmusik', right: 'Quarte' },
          { left: 'Familie Feuerstein', right: 'Quinte' }
        ],
        explanation: 'Abwärts: Yesterday = Sekunde, Kuckuck = Terz, Nachtmusik = Quarte, Flintstones = Quinte.'
      },
      {
        type: 'multiple-choice',
        question: 'Du hörst ein Intervall abwärts. Umgedreht passt &bdquo;O Tannenbaum&ldquo;. Was ist es?',
        options: ['Quinte abwärts', 'Terz abwärts', 'Quarte abwärts', 'Das kann man nicht sagen'],
        correct: 2,
        wrongExplanations: {
          0: 'Die Quinte wäre &bdquo;Morgen kommt der Weihnachtsmann&ldquo;. O Tannenbaum ist eine Quarte.',
          1: 'Die Terz wäre &bdquo;When the Saints&ldquo;. O Tannenbaum ist größer.',
          3: 'Doch: Umgedreht ist der Abstand genauso groß. O Tannenbaum = Quarte, also Quarte abwärts.'
        }
      },
      {
        type: 'interval-ear',
        question: 'Alles abwärts. Nutze die Abwärts-Lieder oder den Umdreh-Trick.',
        set: [2, 3, 4, 5, 7, 12], names: 'grob', direction: 'down', rounds: 10, need: 8
      }
    ]
  },
  // ======================================================================
  {
    id: 6,
    title: 'Grob gemischt: auf und ab',
    explanation: {
      html: `
        <p>Jetzt kommt alles durcheinander: alle groben Intervalle, mal aufwärts, mal abwärts. Das ist wie im echten Hörtest.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Beim Fußballtraining übt man erst jeden Schuss einzeln. Im Spiel weiß man aber nie, was kommt. Gemischtes Üben ist das Spiel.</div>
        <p><strong>Dein Ablauf bei jedem Intervall:</strong></p>
        <ol>
          <li>Richtung hören: geht es hoch oder runter?</li>
          <li>Eng oder weit? (Schritt, kleiner Sprung, großer Sprung)</li>
          <li>Passendes Lied suchen (abwärts: Abwärts-Lied oder Umdreh-Trick)</li>
        </ol>
        <div class="tip-box"><strong>Tipp:</strong> Tippe ruhig mehrmals auf &bdquo;Anhören&ldquo;. Es zählt nur die Antwort.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Erst wenn du die Intervalle auch gemischt erkennst, sitzen sie wirklich. Forscher haben gezeigt: Gemischtes Üben bleibt deutlich länger im Kopf.</div>`
    },
    example: {
      title: 'Ein Fehler im Lösungsweg',
      steps: [
        { label: 'Toms Lösungsweg', html: '<p>Tom hört ein Intervall: ' + pb(7, 'down', 'anhören') + '</p><ol><li>Die Töne gehen abwärts.</li><li>Ich singe sie umgekehrt, also aufwärts.</li><li>Das klingt wie &bdquo;Morgen kommt der Weihnachtsmann&ldquo;.</li><li>Also ist es eine Quarte abwärts.</li></ol>' },
        { label: 'Wo ist der Fehler?', html: '<p>Das findest du in der Übung selbst heraus.</p>' }
      ]
    },
    exercises: [
      {
        type: 'multiple-choice',
        noShuffle: true, noMixed: true,
        question: 'Schau dir Toms Lösungsweg im Beispiel an. In welchem Schritt steckt der Fehler?',
        options: ['Schritt 1: Die Töne gehen abwärts', 'Schritt 2: umgekehrt singen', 'Schritt 3: Morgen kommt der Weihnachtsmann', 'Schritt 4: Also eine Quarte'],
        correct: 3,
        wrongExplanations: {
          0: 'Die Richtung stimmt, das Intervall geht abwärts.',
          1: 'Umdrehen ist ein guter Trick, der Abstand bleibt dabei gleich.',
          2: 'Das Lied hat Tom richtig erkannt. Der Fehler kommt danach.'
        },
        explanation: 'Richtig: &bdquo;Morgen kommt der Weihnachtsmann&ldquo; ist eine Quinte, nicht eine Quarte. Tom hat Lied und Name verwechselt.'
      },
      {
        type: 'fill-in-blank',
        noMixed: true,
        question: 'Verbessere Toms Ergebnis.',
        text: 'Richtig ist: Es ist eine {{blank}} abwärts, denn &bdquo;Morgen kommt der Weihnachtsmann&ldquo; ist das Merklied für die {{blank}}.',
        blanks: [{ correct: 'Quinte', alternatives: ['reine Quinte'] }, { correct: 'Quinte', alternatives: ['reine Quinte'] }],
        explanation: 'Quarte = O Tannenbaum, Quinte = Morgen kommt der Weihnachtsmann.'
      },
      {
        type: 'interval-ear',
        question: 'Die große Mischung: alle groben Intervalle, auf und ab.',
        set: [2, 3, 4, 5, 7, 9, 10, 12], names: 'grob', direction: 'mixed', rounds: 12, need: 9
      }
    ]
  },
  // ======================================================================
  {
    id: 7,
    title: 'Klein oder groß? Halbtöne zählen',
    explanation: {
      html: `
        <p>Bisher hast du die Intervalle <strong>grob</strong> bestimmt. Jetzt geht es <strong>fein</strong>: Eine Terz kann <strong>klein</strong> oder <strong>groß</strong> sein. Das misst man in <strong>Halbtönen</strong>. Ein Halbton ist der kleinste Schritt auf dem Klavier, von einer Taste zur direkt daneben (auch zu einer schwarzen).</p>
        <p><strong>Tippe auf eine Taste:</strong> Du hörst c und dann die Taste. Die blaue Zahl ist die Zahl der Halbtöne von c aus.</p>
        ${KLAVIATUR}
        <table class="info-table">
          <tr><th>Intervall</th><th>Halbtöne</th><th>Merklied</th><th>anhören</th></tr>
          <tr><td>kleine Sekunde</td><td>1</td><td>Der weiße Hai (bedrohlich)</td><td>${pb(1, 'up', 'kl. Sekunde')}</td></tr>
          <tr><td>große Sekunde</td><td>2</td><td>Alle meine Entchen</td><td>${pb(2, 'up', 'gr. Sekunde')}</td></tr>
          <tr><td>kleine Terz</td><td>3</td><td>Smoke on the Water, Greensleeves</td><td>${pb(3, 'up', 'kl. Terz')}</td></tr>
          <tr><td>große Terz</td><td>4</td><td>When the Saints</td><td>${pb(4, 'up', 'gr. Terz')}</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Die große Terz klingt wie Sonnenschein: hell und fröhlich (Dur). Die kleine Terz klingt wie ein Regentag: eher nachdenklich oder traurig (Moll). Die kleine Sekunde reibt und klingt wie Gefahr, darum nutzt sie der Hai-Film.</div>
        <div class="tip-box"><strong>Zusammen anhören:</strong> Wenn beide Töne gleichzeitig klingen, hörst du Dur und Moll noch deutlicher. In der Übung gibt es dafür den Knopf &bdquo;Zusammen anhören&ldquo;.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Ob ein Lied fröhlich oder traurig klingt, hängt oft an genau diesem einen Halbton zwischen kleiner und großer Terz.</div>`
    },
    example: {
      title: 'Kleine oder große Terz?',
      steps: [
        { label: 'Anhören', html: '<p>' + pb(3, 'up', 'Rätsel-Intervall') + '</p>' },
        { label: 'Grob bestimmen', html: '<p>Ein kleiner Sprung, &bdquo;Saints&ldquo; passt ungefähr: eine Terz.</p>' },
        { label: 'Hell oder traurig?', html: '<p>Es klingt eher traurig, und &bdquo;Smoke on the Water&ldquo; passt genauer.</p>' },
        { label: 'Ergebnis', html: '<p>Eine <strong>kleine Terz</strong> (3 Halbtöne).</p>' }
      ]
    },
    exercises: [
      {
        type: 'fill-in-blank',
        question: 'Ergänze. Die Klaviatur in der Erklärung hilft.',
        text: 'Eine große Terz hat {{blank}} Halbtöne. Eine kleine Sekunde hat {{blank}} Halbton.',
        blanks: [{ correct: '4', alternatives: ['vier'] }, { correct: '1', alternatives: ['einen', 'ein', 'eins'] }],
        explanation: 'Von c bis e sind es 4 Tastenschritte, wenn man die schwarzen Tasten mitzählt. Die kleine Sekunde ist genau 1 Halbton, z. B. e – f.'
      },
      {
        type: 'interval-ear',
        question: 'Kleine oder große Sekunde? Der Hai oder die Entchen?',
        set: [1, 2], names: 'fein', direction: 'up', rounds: 8, need: 7, together: true
      },
      {
        type: 'interval-ear',
        question: 'Kleine oder große Terz? Regen oder Sonne?',
        set: [3, 4], names: 'fein', direction: 'up', rounds: 10, need: 8, together: true
      },
      {
        type: 'multiple-choice',
        question: 'Eine Terz klingt hell und fröhlich. Welche ist es wahrscheinlich?',
        options: ['kleine Terz', 'große Terz', 'reine Terz', 'Das hört man nicht'],
        correct: 1,
        wrongExplanations: {
          0: 'Die kleine Terz klingt eher traurig (Moll).',
          2: '&bdquo;Rein&ldquo; gibt es nur bei Quarte, Quinte und Oktave. Terzen sind klein oder groß.',
          3: 'Doch, mit etwas Übung schon: große Terz = hell (Dur), kleine Terz = eher traurig (Moll).'
        }
      }
    ]
  },
  // ======================================================================
  {
    id: 8,
    title: 'Quarte, Tritonus, Quinte',
    explanation: {
      html: `
        <p>Quarte, Quinte und Oktave gibt es nicht in klein und groß. Sie heißen <strong>rein</strong>: reine Quarte (5 Halbtöne), reine Quinte (7 Halbtöne). Genau dazwischen liegt ein besonderes Intervall: der <strong>Tritonus</strong> (6 Halbtöne).</p>
        <table class="info-table">
          <tr><th>Intervall</th><th>Halbtöne</th><th>Merklied</th><th>anhören</th></tr>
          <tr><td>reine Quarte</td><td>5</td><td>O Tannenbaum</td><td>${pb(5, 'up', 'Quarte')}</td></tr>
          <tr><td>Tritonus</td><td>6</td><td>The Simp-sons</td><td>${pb(6, 'up', 'Tritonus')}</td></tr>
          <tr><td>reine Quinte</td><td>7</td><td>Star Wars, Morgen kommt der Weihnachtsmann</td><td>${pb(7, 'up', 'Quinte')}</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Der Tritonus klingt schräg und unruhig, wie eine Tür, die quietscht. Früher nannte man ihn sogar &bdquo;Teufelsintervall&ldquo;. Quarte und Quinte dagegen klingen offen und stabil, wie ein fester Boden.</div>
        <div class="tip-box"><strong>Merkhilfe:</strong> Der Tritonus teilt die Oktave genau in zwei Hälften (6 + 6 Halbtöne). Der Name kommt von &bdquo;drei Ganztöne&ldquo; (3 · 2 = 6 Halbtöne).</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Der Tritonus erzeugt Spannung. Filmmusik und Krimiserien nutzen ihn, damit es unheimlich klingt.</div>`
    },
    example: {
      title: 'Offen oder schräg?',
      steps: [
        { label: 'Anhören', html: '<p>' + pb(6, 'up', 'Rätsel-Intervall') + '</p>' },
        { label: 'Wie klingt es?', html: '<p>Es klingt schräg und unruhig, nicht offen.</p>' },
        { label: 'Lied testen', html: '<p>&bdquo;The Simp-sons&ldquo; passt.</p>' },
        { label: 'Ergebnis', html: '<p>Ein <strong>Tritonus</strong> (6 Halbtöne).</p>' }
      ]
    },
    exercises: [
      {
        type: 'interval-ear',
        question: 'Reine Quarte, Tritonus oder reine Quinte?',
        set: [5, 6, 7], names: 'fein', direction: 'up', rounds: 10, need: 8, together: true
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze.',
        text: 'Der Tritonus hat {{blank}} Halbtöne. Merklied: Die {{blank}}.',
        blanks: [{ correct: '6', alternatives: ['sechs'] }, { correct: 'Simpsons', alternatives: ['The Simpsons'] }],
        explanation: 'Tritonus = 6 Halbtöne, genau die halbe Oktave. Merklied: The Simp-sons.'
      },
      {
        type: 'interval-ear',
        question: 'Gemischt mit Sekunden und Terzen aus Lektion 7.',
        set: [1, 2, 3, 4, 5, 6, 7], names: 'fein', direction: 'up', rounds: 10, need: 7, together: true
      }
    ]
  },
  // ======================================================================
  {
    id: 9,
    title: 'Sexten und Septimen fein',
    explanation: {
      html: `
        <p>Auch Sexte und Septime gibt es klein und groß. Bei der Sexte hilft wieder <strong>hell oder traurig</strong>, bei der Septime die <strong>Nähe zur Oktave</strong>.</p>
        <table class="info-table">
          <tr><th>Intervall</th><th>Halbtöne</th><th>Merklied / Merkhilfe</th><th>anhören</th></tr>
          <tr><td>kleine Sexte</td><td>8</td><td>The Entertainer (der große Sprung nach dem Auftakt), klingt sehnsüchtig</td><td>${pb(8, 'up', 'kl. Sexte')}</td></tr>
          <tr><td>große Sexte</td><td>9</td><td>My Bonnie, klingt hell</td><td>${pb(9, 'up', 'gr. Sexte')}</td></tr>
          <tr><td>kleine Septime</td><td>10</td><td>Star Trek (alte Serie), Somewhere (West Side Story)</td><td>${pb(10, 'up', 'kl. Septime')}</td></tr>
          <tr><td>große Septime</td><td>11</td><td>kein gutes Lied: klingt wie eine schiefe Oktave</td><td>${pb(11, 'up', 'gr. Septime')}</td></tr>
          <tr><td>Oktave</td><td>12</td><td>Somewhere over the rainbow</td><td>${pb(12, 'up', 'Oktave')}</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Die große Septime ist wie ein Bild, das fast gerade hängt: Es fehlt nur ein winziges Stück (1 Halbton) bis zur Oktave, und genau das stört. Die kleine Septime ist weiter weg und klingt eher weich und offen.</div>
        <div class="tip-box"><strong>Vergleichen:</strong> ${pb(11, 'up', 'gr. Septime')} ${pb(12, 'up', 'Oktave')} Hörst du, wie die große Septime fast, aber nicht ganz da ist?</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Damit kennst du alle Intervalle bis zur Oktave. Mehr gibt es in einer Oktave nicht.</div>`
    },
    example: {
      title: 'Kleine oder große Septime?',
      steps: [
        { label: 'Anhören', html: '<p>' + pb(11, 'up', 'Rätsel-Intervall') + '</p>' },
        { label: 'Grob', html: '<p>Fast eine Oktave, aber es klingt nicht ruhig: eine Septime.</p>' },
        { label: 'Fein', html: '<p>Es klingt wie eine schiefe Oktave, ganz knapp daneben.</p>' },
        { label: 'Ergebnis', html: '<p>Eine <strong>große Septime</strong> (11 Halbtöne).</p>' }
      ]
    },
    exercises: [
      {
        type: 'interval-ear',
        question: 'Kleine oder große Sexte?',
        set: [8, 9], names: 'fein', direction: 'up', rounds: 8, need: 6, together: true
      },
      {
        type: 'interval-ear',
        question: 'Kleine Septime, große Septime oder Oktave?',
        set: [10, 11, 12], names: 'fein', direction: 'up', rounds: 10, need: 8, together: true
      },
      {
        type: 'matching',
        question: 'Wie viele Halbtöne hat das Intervall?',
        pairs: [
          { left: 'kleine Sexte', right: '8' },
          { left: 'große Sexte', right: '9' },
          { left: 'kleine Septime', right: '10' },
          { left: 'große Septime', right: '11' }
        ],
        explanation: 'Von der Oktave (12) aus rückwärts: große Septime 11, kleine Septime 10, große Sexte 9, kleine Sexte 8.'
      }
    ]
  },
  // ======================================================================
  {
    id: 10,
    title: 'Alles fein: auf und ab',
    explanation: {
      html: `
        <p>Die Königsdisziplin: alle 12 Intervalle fein, aufwärts und abwärts gemischt.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Wie beim Erkennen von Stimmen am Telefon: Am Anfang musst du überlegen, wer das ist. Mit der Zeit erkennst du jede Stimme nach einem Wort.</div>
        <p><strong>Dein Ablauf:</strong></p>
        <ol>
          <li>Richtung: hoch oder runter?</li>
          <li>Grob: Welches Merklied passt ungefähr?</li>
          <li>Fein: hell oder traurig (Terz, Sexte)? Schräg (Tritonus)? Fast Oktave (große Septime)?</li>
        </ol>
        <table class="info-table">
          <tr><th>Halbtöne</th><th>Name</th><th>Halbtöne</th><th>Name</th></tr>
          <tr><td>1</td><td>kleine Sekunde</td><td>7</td><td>reine Quinte</td></tr>
          <tr><td>2</td><td>große Sekunde</td><td>8</td><td>kleine Sexte</td></tr>
          <tr><td>3</td><td>kleine Terz</td><td>9</td><td>große Sexte</td></tr>
          <tr><td>4</td><td>große Terz</td><td>10</td><td>kleine Septime</td></tr>
          <tr><td>5</td><td>reine Quarte</td><td>11</td><td>große Septime</td></tr>
          <tr><td>6</td><td>Tritonus</td><td>12</td><td>Oktave</td></tr>
        </table>
        <div class="tip-box"><strong>Tipp:</strong> Falsch ist nicht schlimm. Nutze nach jedem Fehler die zwei Vergleichsknöpfe. Genau da lernt dein Ohr am meisten.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Wer alle Intervalle fein hört, kann Melodien nach Gehör aufschreiben oder nachspielen.</div>`
    },
    example: {
      title: 'Ein Fehler im Lösungsweg',
      steps: [
        { label: 'Leas Lösungsweg', html: '<p>Lea hört ein Intervall: ' + pb(3, 'up', 'anhören') + '</p><ol><li>Es geht aufwärts.</li><li>Grob: &bdquo;When the Saints&ldquo; passt ungefähr, also eine Terz.</li><li>Es klingt eher traurig.</li><li>Traurig heißt große Terz.</li></ol>' },
        { label: 'Wo ist der Fehler?', html: '<p>Das findest du in der Übung selbst heraus.</p>' }
      ]
    },
    exercises: [
      {
        type: 'multiple-choice',
        noShuffle: true, noMixed: true,
        question: 'Schau dir Leas Lösungsweg im Beispiel an. Welcher Schritt ist falsch?',
        options: ['Schritt 1: Es geht aufwärts', 'Schritt 2: Grob eine Terz', 'Schritt 3: Es klingt eher traurig', 'Schritt 4: Traurig heißt große Terz'],
        correct: 3,
        wrongExplanations: {
          0: 'Die Richtung stimmt, es geht aufwärts.',
          1: 'Grob ist es eine Terz, das stimmt.',
          2: 'Das hat Lea richtig gehört. Der Fehler steckt in der Schlussfolgerung.'
        },
        explanation: 'Richtig: Traurig klingt die kleine Terz (Moll). Die große Terz klingt hell (Dur).'
      },
      {
        type: 'fill-in-blank',
        noMixed: true,
        question: 'Verbessere Leas Ergebnis.',
        text: 'Es ist eine {{blank}} Terz mit {{blank}} Halbtönen.',
        blanks: [{ correct: 'kleine', alternatives: ['kl.'] }, { correct: '3', alternatives: ['drei'] }],
        explanation: 'Traurig = kleine Terz = 3 Halbtöne, Merklied &bdquo;Smoke on the Water&ldquo;.'
      },
      {
        type: 'interval-ear',
        question: 'Alle 12 Intervalle fein, auf und ab. Nimm dir Zeit.',
        set: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], names: 'fein', direction: 'mixed', rounds: 12, need: 8, together: true
      }
    ]
  }
]);
