class goalsError extends Error {
  constructor(message, howToFix) {
    super(message);
    this.howToFix = howToFix;
  }
}

module.exports = goalsError;
