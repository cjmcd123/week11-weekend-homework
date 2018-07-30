const _ = require('lodash');

const Store = function (name, location, balance) {
  this.name = name;
  this.location = location;
  this.balance = balance;
  this.inventory = [];
}

Store.prototype.addRecord = function(record) {
  this.inventory.push(record);
}

Store.prototype.prettyPrintAllRecord = function() {
  return _.map(this.inventory, record => record.prettyPrint());
}

Store.prototype.sellRecord = function(record) {
  this.balance += record.price;
  _.remove(this.inventory, record);
}

Store.prototype.financial = function() {
  let results = new Map;
  let inventoryPrice = _.sumBy(this.inventory, "price");
  results.set("balance", this.balance);
  results.set("inventory", inventoryPrice);
  return results;
}

Store.prototype.filterByGenre = function(genre) {
  return _.filter(this.inventory, record => record.genre === genre);
}

Store.prototype.sellRecordToCollector = function(record, collector) {
  collector.buyRecord(record);
  this.sellRecord(record);
}

Store.prototype.buyRecord = function(record) {
  this.balance -= record.price;
  this.inventory.push(record);
}

Store.prototype.buyRecordFromCollector = function(record, collector) {
  this.buyRecord(record);
  collector.sellRecord(record);
}

Store.prototype.inventoryValue = function() {
  return _.sumBy(this.inventory, "price");
}

module.exports = Store;
