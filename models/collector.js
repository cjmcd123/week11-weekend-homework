const _ = require('lodash');

const Collector = function (name, money) {
  this.name = name;
  this.money = money;
  this.collection = [];
}

Collector.prototype.buyRecord = function(record) {
  if (this.money >= record.price) {
    this.money -= record.price;
    this.collection.push(record);
  } else {
    return "Insufficient Cash"
  }
}

Collector.prototype.sellRecord = function(record) {
  this.money += record.price;
  _.remove(this.collection, record);
}

Collector.prototype.totalValue = function() {
  return _.reduce(this.collection, (accumulator, record) => accumulator + record.price, 0);
}

Collector.prototype.totalValueByGenre = function(genre) {
  return _.chain(this.collection)
          .filter(record => record.genre === genre)
          .sumBy("price")
          .value();
}

Collector.prototype.mostValuable = function() {
  return _.maxBy(this.collection, (record => record.price));
}

Collector.prototype.sortRecods = function(order) {
  return _.orderBy(this.collection, "price", order);
}

Collector.prototype.compareBoolean = function(rivalCollector) {
  return this.totalValue() > rivalCollector.totalValue();
}

Collector.prototype.compare = function(rivalCollector) {
  if (this.totalValue() > rivalCollector.totalValue()) {
    return this;
  } else {
    return rivalCollector;
  }
}

module.exports = Collector;
