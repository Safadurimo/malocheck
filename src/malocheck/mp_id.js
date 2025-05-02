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
  var erste10Positionen = val.split("").slice(0, 11);
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

var isLength13 = function (val) {
  return val.length === 13;
};
var erstebeidenZiffern = function (val) {
  return val.startsWith("99") || val.startsWith("98");
};

var drittesZeichen = function (val) {
  let erstebeidenZeichen = val.substring(0, 2);
  if (erstebeidenZeichen === "98") {
    return val[2] >= "0" && val[2] <= "8";
  }
  if (erstebeidenZeichen === "99") {
    return val[2] >= "0" && val[2] <= "9";
  }
};

var analyse = function (mp_id) {
  let ret_value = {
    id: mp_id,
    valid: true,
    error_messages: [],
  };

  // prüfen auf numerisch
  if (!isNumeric(mp_id)) {
    ret_value.error_messages.push({
      message: "Die Malo-Id darf nur aus Ziffern bestehen.",
    });
    ret_value.valid = false;
    return ret_value;
  }

  // prüfen auf Länge 13
  if (!isLength13(mp_id)) {
    ret_value.error_messages.push({
      message: "Die Malo-Id muss aus 13 Zeichen bestehen.",
    });
    ret_value.valid = false;
    return ret_value;
  }

  // prüfen auf die ersten zwei Zeichen
  if (!erstebeidenZiffern(mp_id)) {
    ret_value.error_messages.push({
      message: "Die ID muss mit 98 oder 99 beginnen.",
    });
    ret_value.valid = false;
    return ret_value;
  }

  // prüfen auf das dritte Zeichen
  if (!drittesZeichen(mp_id)) {
    ret_value.error_messages.push({
      message:
        "Das dritte Zeichen muss zwischen 0 und 8 liegen, wenn die ID mit 99 beginnt.",
    });
    ret_value.valid = false;
    return ret_value;
  }

  // prüfen auf das dritte Zeichen
  if (pruefzifferLokUndWaggon(mp_id.slice(0, 12)) !== Number(mp_id[12])) {
    ret_value.error_messages.push({
      message: "Die Prüffziffer ist falsch.",
    });
    ret_value.valid = false;
    return ret_value;
  }

  // prüfen der Prüfziffer
  return ret_value;
};

var isValid = function (mp_id) {
  return analyse(mp_id).valid;
};

var generate = function () {
  return "12345678901";
};

export { isValid, analyse, generate };
