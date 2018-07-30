const Record = function (title, artist, genre, price) {
  this.title = title;
  this.artist = artist;
  this.genre = genre;
  this.price = price;
}

Record.prototype.prettyPrint = function() {
  return `${this.title} by ${this.artist}, ${this.genre} for £${this.price.toFixed(2)}`
}

module.exports = Record;
