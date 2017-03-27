class Pokemon {
  constructor(name, level) {
    this.name   = name;
    this.level  = level;
  }

  show() {
    console.log(`${this.name}: ${this.level}lvl`);
  }

  valueOf() {
    return this.level;
  }
}

module.exports = Pokemon;
