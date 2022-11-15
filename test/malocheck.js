var assert = require('assert');

var malocheck = require('../src/malocheck/malocheck.js');

describe('Malo-Id validity', function() {
    describe('valid Malo', function() {

        it('Valid Malo-Id should be recognized', function() {
            let validMalo = '41373559241';
            let result = malocheck.checkMaloIdValid(validMalo);
            assert.strictEqual(result.valid, true);
        });
    });

    describe('Invalid Malo', function() {

        it('Invalid Malo-Id with wrong pruefziffer should be recognized', function() {
            let invalidMalo = '41373559242';
            let result = malocheck.checkMaloIdValid(invalidMalo);
            assert.strictEqual(result.valid, false);
            assert.strictEqual(result.messages.length, 1);
            assert.strictEqual(result.messages[0].messageCode, "PRUEFZIFFER");
            assert.strictEqual(result.messages[0].pruefziffer, 1);

        });

        it('Invalid Malo-Id (empty string) should be recognized', function() {
            let invalidMalo = '';
            let result = malocheck.checkMaloIdValid(invalidMalo);
            assert.strictEqual(result.valid, false);
            assert.strictEqual(result.messages.length, 2);
        });

        it('Invalid Malo-Id (wrong length, starts with 0) should be recognized', function() {
            let invalidMalo = '012';
            let result = malocheck.checkMaloIdValid(invalidMalo);
            assert.strictEqual(result.valid, false);
            assert.strictEqual(result.messages.length, 2);
        });
    });

});