/**
 * Berechnet die Prüfziffer aus den ersten 10 Stellen einer Malo-Id
 * @param {string} Die ersten 10 Stellen einer Malo-Id
 * @returns Die Prüfziffer
 *
 * Erklärung der Berechnung: https://www.bdew.de/media/documents/Awh_20170428_MaLo-ID_NyDa4vU.pdf
 *	Die Prüfziffernberechnung erfolgt im „Lok- and Waggon-Kennzeichnungsverfahren“ nach folgendem Schema:
 *   a) Quersumme aller Ziffern in ungerader Position
 *   b) Quersumme aller Ziffern auf gerader Position multipliziert mit 2
 *   c) Summe von a) und b)
 *   d) Differenz von c) zum nächsten Vielfachen von 10 (ergibt sich hier 10, wird die Prüfziffer 0 genommen)
 *
 * Beispiel:
 * MaLo-ID: 4 1 3 7 3 5 5 9 2 4 Prüfziffer
 *  a) 4 + 3 + 3 + 5 + 2 = 17
 *  b) (1 + 7 + 5 + 9 + 4) * 2 = 52
 *  c) 17 + 52 = 69
 *  d) 70 - 69 = 1 -> Prüfziffer „1“
 * MaLo-ID: 4 1 3 7 3 5 5 9 2 4 1
 */
var pruefzifferLokUndWaggon = function (val) {
  var erste10Positionen = val.split("").slice(0, 10);
  var a = erste10Positionen
    .filter((x, i) => i % 2 === 0)
    .reduce((pv, cv) => Number(pv) + Number(cv), 0);
  var b =
    erste10Positionen
      .filter((x, i) => i % 2 === 1)
      .reduce((pv, cv) => Number(pv) + Number(cv), 0) * 2;
  var c = a + b;
  var d = Math.min(c % 10, 10 - (c % 10));
  return d;
};

export { pruefzifferLokUndWaggon };
