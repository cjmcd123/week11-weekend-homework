const assert = require('assert');
const Record = require('../models/record.js');
const Store = require('../models/store.js');
const Collector = require('../models/collector.js');

describe('Collector', function () {

  let record, record2, store, collector, collector2;

  beforeEach(function () {
    record = new Record("I Put a Spell on You", "Nina Simone", "Vocal Jazz", 25.00);
    record2 = new Record("Electric Ladybird", "Jimi Hendrix", "Psychedelic rock", 20.00);
    store = new Store("Stevie's Record Store", "Glasgow", 100.00);
    collector = new Collector("Bob", 200.00);
    collector2 = new Collector("Jimi", 10.00);
  });

  it('collector has name', function() {
    assert.deepStrictEqual(collector.name, "Bob");
  });

  it('collector has money', function() {
    assert.deepStrictEqual(collector.money, 200.00);
  });

  it('collector collection starts empty', function() {
    assert.deepStrictEqual(collector.collection, []);
  });

  it('collector can buy record', function() {
    collector.buyRecord(record);
    assert.deepStrictEqual(collector.collection, [record]);
    assert.deepStrictEqual(collector.money, 175.00);
  });

  it('collector can sell record', function() {
    collector.buyRecord(record);
    collector.sellRecord(record);
    assert.deepStrictEqual(collector.collection, []);
    assert.deepStrictEqual(collector.money, 200.00);
  });

  it('collector can not buy record with insuficient money', function() {
    collector2.buyRecord(record);
    assert.deepStrictEqual(collector2.collection, []);
    assert.deepStrictEqual(collector2.money, 10.00);
  });

  it('collector can get the value of their collection', function() {
    collector.buyRecord(record);
    collector.buyRecord(record2);
    assert.deepStrictEqual(collector.totalValue(), 45.00);
  });

  it('collector can get the total value of a genre', function() {
    collector.buyRecord(record);
    collector.buyRecord(record2);
    assert.deepStrictEqual(collector.totalValueByGenre("Vocal Jazz"), 25.00);
  });

  it('collector can show their most valuable record', function() {
    collector.buyRecord(record);
    collector.buyRecord(record2);
    assert.deepStrictEqual(collector.mostValuable(), record);
  });

  it('collector can sort records', function() {
    collector.buyRecord(record);
    collector.buyRecord(record2);
    assert.deepStrictEqual(collector.sortRecods("asc"), [record2, record]);
    assert.deepStrictEqual(collector.sortRecods("desc"), [record, record2]);
  });

  it('collectors should be able to compair their collections', function() {
    collector.buyRecord(record);
    collector.buyRecord(record2);
    let collector3 = new Collector("Jane", 100.00);
    collector3.buyRecord(record);
    assert.deepStrictEqual(collector.compair(collector3), collector);
    assert.deepStrictEqual(collector.compairBoolean(collector3), true);
  });
});
