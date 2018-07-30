const assert = require('assert');
const Record = require('../models/record.js');

describe('Record', function () {

  let record;

  beforeEach(function () {
    record = new Record("I Put a Spell on You", "Nina Simone", "Vocal Jazz", 25.00);
  });

  it('record has title', function() {
    assert.deepStrictEqual(record.title, "I Put a Spell on You");
  });

  it('record has artist', function() {
    assert.deepStrictEqual(record.artist, "Nina Simone");
  });

  it('record has genre', function() {
    assert.deepStrictEqual(record.genre, "Vocal Jazz");
  });

  it('record has price', function() {
    assert.deepStrictEqual(record.price, 25.00);
  });

  it('record properties as string', function() {
    let expected = "I Put a Spell on You by Nina Simone, Vocal Jazz for £25.00";
    assert.deepStrictEqual(record.prettyPrint(), expected);
  });
});
