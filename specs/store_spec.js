const assert = require('assert');
const Record = require('../models/record.js');
const Store = require('../models/store.js');
const Collector = require('../models/collector.js');

describe('Store', function () {

  let record, record2, store, collector;

  beforeEach(function () {
    record = new Record("I Put a Spell on You", "Nina Simone", "Vocal Jazz", 25.00);
    record2 = new Record("Electric Ladybird", "Jimi Hendrix", "Psychedelic rock", 20.00);
    store = new Store("Stevie's Record Store", "Glasgow", 100.00);
    collector = new Collector("Bob", 100.00);
  });

  it('record store has name', function() {
    assert.deepStrictEqual(store.name, "Stevie's Record Store");
  });

  it('record store has location', function() {
    assert.deepStrictEqual(store.location, "Glasgow");
  });

  it('record store inventory starts empty', function() {
    assert.deepStrictEqual(store.inventory, []);
  });

  it('record store has balance', function() {
    assert.deepStrictEqual(store.balance, 100.00);
  });

  it('record store can add record to inventory', function() {
    store.addRecord(record);
    assert.deepStrictEqual(store.inventory, [record]);
  });

  it('record store shows pretty string properties for record (one record)', function() {
    store.addRecord(record);
    let expected = "I Put a Spell on You by Nina Simone, Vocal Jazz for £25.00";
    assert.deepStrictEqual(store.prettyPrintAllRecord(), [expected]);
  });


  it('record store shows pretty string properties for record (multiple records)', function() {
    store.addRecord(record);
    store.addRecord(record2);
    let expected = ["I Put a Spell on You by Nina Simone, Vocal Jazz for £25.00", "Electric Ladybird by Jimi Hendrix, Psychedelic rock for £20.00"];
    assert.deepStrictEqual(store.prettyPrintAllRecord(), expected);
  });

  it('record store can sell record', function() {
    store.addRecord(record);
    store.sellRecord(record);
    assert.deepStrictEqual(store.inventory, []);
    assert.deepStrictEqual(store.balance, 125.00);
  });

  it('record store reports the financial situation ', function() {
    store.addRecord(record);
    store.addRecord(record2);
    let expected = new Map;
    expected.set("balance", 100.00);
    expected.set("inventory", 45.00);
    assert.deepStrictEqual(store.financial(), expected);
  });

  it('record store can filter by genre', function() {
    store.addRecord(record);
    store.addRecord(record2);
    assert.deepStrictEqual(store.filterByGenre("Vocal Jazz"), [record]);
  });

  it('store can sell recor to collector', function() {
    store.addRecord(record);
    store.addRecord(record2);
    store.sellRecordToCollector(record, collector);
    assert.deepStrictEqual(store.inventory, [record2]);
    assert.deepStrictEqual(store.balance, 125.00);
    assert.deepStrictEqual(collector.money, 75.00);
    assert.deepStrictEqual(collector.collection, [record]);
  });

  it('store can buy record', function() {
    store.buyRecord(record);
    assert.deepStrictEqual(store.inventory, [record]);
    assert.deepStrictEqual(store.balance, 75.00);
  });

  it('store can buy record from collector', function() {
    collector.buyRecord(record);
    store.buyRecordFromCollector(record, collector);
    assert.deepStrictEqual(store.inventory, [record]);
    assert.deepStrictEqual(store.balance, 75.00);
    assert.deepStrictEqual(collector.collection, []);
    assert.deepStrictEqual(collector.money, 100.00);
  });

  it('store can get value of their inventory', function() {
    store.addRecord(record);
    store.addRecord(record2);
    assert.deepStrictEqual(store.inventoryValue(), 45.00);
  });
});
