class ScoreHelper {
  winPoints(game, times) {
    [...Array(times)].forEach(() => game.winPoint());
  }

  losePoints(game, times) {
    [...Array(times)].forEach(() => game.losePoint());
  }
}

export default new ScoreHelper();