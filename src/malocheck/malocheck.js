import { pruefzifferLokUndWaggon } from "./pruefziffer.js";

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
  return pruefzifferLokUndWaggon(val.slice(0, 10)) === Number(val[10]);
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
    let korrektePruefziffer = pruefzifferLokUndWaggon(val.slice(0, 10));
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

  maloId += pruefzifferLokUndWaggon(maloId);
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

var analyse = null;

// export { checkMaloIdValid, generateRandomMaloId, bestandteilZerlegung };
var generateRandom = generateRandomMaloId;
var isValid = checkMaloIdValid;

export { isValid, analyse, generateRandom, bestandteilZerlegung };
