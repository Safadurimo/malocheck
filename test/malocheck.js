import assert from "assert";
import { describe, it } from "mocha";

import {
  checkMaloIdValid,
  bestandteilZerlegung,
} from "../src/malocheck/malocheck.js";

describe("Malo-Id validity", function () {
  describe("valid Malo", function () {
    it("Valid Malo-Id should be recognized", function () {
      let validMalo = "41373559241";
      let result = checkMaloIdValid(validMalo);
      assert.strictEqual(result.valid, true);
    });
  });

  describe("Invalid Malo", function () {
    it("Invalid Malo-Id with wrong pruefziffer should be recognized", function () {
      let invalidMalo = "41373559242";
      let result = checkMaloIdValid(invalidMalo);
      assert.strictEqual(result.valid, false);
      assert.strictEqual(result.messages.length, 1);
      assert.strictEqual(result.messages[0].messageCode, "PRUEFZIFFER");
      assert.strictEqual(result.messages[0].pruefziffer, 1);
    });

    it("Invalid Malo-Id (empty string) should be recognized", function () {
      let invalidMalo = "";
      let result = checkMaloIdValid(invalidMalo);
      assert.strictEqual(result.valid, false);
      assert.strictEqual(result.messages.length, 2);
    });

    it("Invalid Malo-Id (wrong length, starts with 0) should be recognized", function () {
      let invalidMalo = "012";
      let result = checkMaloIdValid(invalidMalo);
      assert.strictEqual(result.valid, false);
      assert.strictEqual(result.messages.length, 2);
    });
  });
});

describe("Malo-Id sollte korrekt in ihre Bestandteile zerlegt werden können", function () {
  it("Gültige Marktloations-Id sollte in ihre Bestandteile zerlegt werden können", function () {
    let validMalo = "41373559241";
    let result = bestandteilZerlegung(validMalo);
    assert.strictEqual(result[0].wert, "4");
    assert.strictEqual(result[1].wert, "137355924");
    assert.strictEqual(result[2].wert, "1");
  });
});
