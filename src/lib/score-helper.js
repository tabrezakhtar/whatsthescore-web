class ScoreHelper {
  winPoints(game, times) {
    [...Array(times)].forEach((e) => game.winPoint());
  }

  losePoints(game, times) {
    [...Array(times)].forEach((e) => game.losePoint());
  }
}

export default new ScoreHelper();