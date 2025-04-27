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
var berechnePZ = function (val) {
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

var isNumeric = function (val) {
  return /^\d*$/.test(val);
};

var isLengthEleven = function (val) {
  return val.length === 11;
};

var isErsteZiffer1bis9 = function (val) {
  return /[1-9]/.test(val[0]);
};

var isPruefzifferKorrekt = function (val) {
  return berechnePZ(val) === Number(val[10]);
};

/**
 * Checks, if a given Malo-Id is valid
 * @param {string} The Malo-Id to be checked
 * @returns {object} Whether the Malo-ID is valid or not, potentially error messages
 */
var checkMaloIdValid = function (val) {
  var messages = [];

  var isnum = isNumeric(val);

  if (!isnum) {
    messages.push({
      message: "Die Malo-Id darf nur aus Ziffern bestehen.",
      messageCode: "NUM",
    });
  }

  var lengthIsEleven = isLengthEleven(val);
  if (!lengthIsEleven) {
    messages.push({
      message: "Die Malo-Id muss aus 11 Zeichen bestehen.",
      messageCode: "ELEVEN",
    });
  }

  var ersteZiffer1bis9 = isErsteZiffer1bis9(val);
  if (!ersteZiffer1bis9) {
    messages.push({
      message:
        "Das erste Zeichen der Malo-Id muss eine Ziffer zwischen 1 und 9 sein.",
      messageCode: "FIRSTDIGIT",
    });
  }

  if (messages.length > 0) {
    return {
      valid: false,
      messages: messages,
    };
  }

  var pruefzifferKorrekt = isPruefzifferKorrekt(val);
  if (!pruefzifferKorrekt) {
    let korrektePruefziffer = berechnePZ(val);
    messages.push({
      message: `Falsche Prüfziffer. Korrekt wäre ${korrektePruefziffer}`,
      pruefziffer: korrektePruefziffer,
      messageCode: "PRUEFZIFFER",
    });
  }

  return {
    valid: pruefzifferKorrekt,
    messages: messages,
  };
};

var generateRandomMaloId = function () {
  var random = function (a, b) {
    return Math.floor(Math.random() * b) + a;
  };

  var ersteZiffer = random(1, 9);

  var maloId = "" + ersteZiffer;

  for (let i = 0; i < 9; i++) {
    maloId += random(0, 9);
  }

  maloId += berechnePZ(maloId);
  return maloId;
};

var bestandteilZerlegung = function (val) {
  return [
    { "beginn:": 0, ende: 1, wert: val[0], beschreibung: "Ausgabestelle" },
    {
      "beginn:": 1,
      ende: 10,
      wert: val.split("").slice(1, 10).join(""),
      beschreibung: "Vergebene Nummer",
    },
    { "beginn:": 10, ende: 11, wert: val[10], beschreibung: "Prüfziffer" },
  ];
};

export { checkMaloIdValid, generateRandomMaloId, bestandteilZerlegung };
