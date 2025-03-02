import score from "./score";

class Game {
  constructor() {
    this.player1 = 0;
    this.player2 = 0;
    this.pointsIndex = 0;
    this.runningScore = [{
      player1: 0,
      player2: 0
    }];

    this.tiebreak = false;
    this.player1Tiebreak = 0;
    this.player2Tiebreak = 0;
    
    this.scoreMap = {
      0: 0,
      1: 15,
      2: 30,
      3: 40,
      4: "Ad"
    }

    this.winningGames = [
      "6-0", "6-1", "6-2", "6-3", "6-4", "7-5",
    ];

    this.losingGames = [
      "0-6", "1-6", "2-6", "3-6", "4-6", "5-7",
    ];
  }

  reset() {
    this.player1 = 0;
    this.player2 = 0;
    this.tiebreak = false;
    this.player1Tiebreak = 0;
    this.player2Tiebreak = 0;
  }

  endGame() {
    this.reset();
    this.pointsIndex = 0;
    this.runningScore = [{
      player1: 0,
      player2: 0
    }];
  }

  undo() {
    if (this.runningScore.length === 1) {
      this.pointsIndex = 0;
      this.player1 = 0;
      this.player2 = 0;
      return {
        player1: 0,
        player2: 0
      }
    }

    this.pointsIndex--;
    this.runningScore.pop();

    if (this.player1 > 0) {
      this.player1--;
    }

    if (this.player2 > 0) {
      this.player2--;
    }

    if (this.tiebreak) {
      if (this.player1Tiebreak > 0) {
        this.player1Tiebreak--;
      }
      
      if (this.player2Tiebreak > 0) {
        this.player2Tiebreak--;
      }
    }
  }

  winPoint() {
    if (this.tiebreak) {
      this.handleTiebreak(true);
    } else {
      this.player1++;
      this.updateScore(true);
    }
  }

  losePoint() {
    if (this.tiebreak) {
      this.handleTiebreak(false);
    } else {
      this.player2++;
      this.updateScore(false);
    }
  }

  handleTiebreak(win) {
    this.pointsIndex++;

    if (win) {
      this.player1Tiebreak++;
    } else {
      this.player2Tiebreak++;
    }

    let scores = {
      tiebreak: true, 
      player1: this.player1Tiebreak,
      player2: this.player2Tiebreak
    }

    if (this.player1Tiebreak >= 7 && Math.abs(this.player1Tiebreak - this.player2Tiebreak) >= 2) {
      scores["gameWon"] = true;
      scores["setWon"] = true;
      this.reset();
    } else if (this.player2Tiebreak >= 7 && Math.abs(this.player2Tiebreak - this.player1Tiebreak) >= 2) {
      scores["gameLost"] = true;
      scores["setLost"] = true;
      this.reset();
    }

    this.runningScore.push(scores);
  }

  updateScore(win) {
    this.pointsIndex++;

    let p1Score = this.scoreMap[this.player1 % 5];
    let p2Score = this.scoreMap[this.player2 % 5];
      
    const scores = {
      player1: p1Score,
      player2: p2Score
    }

    //if player 1 wins point at 40 and opponent is not at deuce
    if (this.player1 > score.FORTY && this.player2 < score.FORTY && win) {
      scores["player1"]= this.scoreMap[score.FORTY];
      scores["gameWon"]= true;
      this.reset();
    }

    //if player 1 wins point at 30 and opponent is not at deuce
    else if (this.player1 === score.FORTY && this.player2 < score.FORTY && win) {
      scores["player1"]= this.scoreMap[score.FORTY];
      this.player1 = 3;
    }

    //if player 1 wins point at 40 and opponent is at deuce
    else if (this.player1 === score.ADV && this.player2 === score.FORTY && win) {
      scores["player1"]= this.scoreMap[score.ADV];
      this.player1 = 4;
      this.player2 = 3;
    }

    //if player 1 wins point at deuce
    else if (this.player1 === score.FORTY && this.player2 === score.FORTY && win) {
      scores["player1"]= this.scoreMap[score.FORTY];
    }

    //if player 1 is at Advantage and wins point
    else if (this.player1 === score.WON && win) {
      scores["player1"]= this.scoreMap[score.ADV];
      scores["gameWon"]= true;
      this.reset();
    }

    //if player 1 is at Advantage and loses point
    else if (this.player1 === score.ADV && !win) {
      scores["player1"]= this.scoreMap[score.FORTY];
      scores["player2"]= this.scoreMap[score.FORTY];
      this.player1 = 3;
      this.player2 = 3;
    }

    //if player 2 wins point at deuce
    else if (this.player2 === score.ADV && this.player1 === score.FORTY && !win) {
      scores["player1"]= this.scoreMap[score.FORTY];
      scores["player2"]= this.scoreMap[score.ADV];
      this.player1 = 3;
      this.player2 = 4;
    }

    //if player 2 wins 4 points without getting to deuce
    else if (this.player2 > score.FORTY && this.player1 < score.FORTY && !win) {
      scores["player2"]= this.scoreMap[score.FORTY];
      scores["gameLost"]= true;
      this.reset();
    }

    //if player 2 is at Advantage and wins point
    else if (this.player2 > score.ADV && !win) {
      scores["player2"]= this.scoreMap[score.ADV];
      scores["gameLost"]= true;
      this.reset();
    }

    //if player 1 is at Advantage and loses point
    else if (this.player2 === score.ADV && win) {
      scores["player1"]= this.scoreMap[score.FORTY];
      scores["player2"]= this.scoreMap[score.FORTY];
      this.player1 = 3;
      this.player2 = 3;
    }

    this.runningScore.push(scores)

    if (this.winningGames.includes(this.getGamesForCurrentSet())) {
      scores["setWon"]= true;
    }

    if (this.losingGames.includes(this.getGamesForCurrentSet())) {
      scores["setLost"]= true;
    }

    if (this.getGamesForCurrentSet() === "6-6") {
      this.tiebreak = true;
    }
  }

  getGamesForCurrentSet() {
    //if not set won/lost
    if (this.runningScore.filter(score => score.setWon).length === 0 && this.runningScore.filter(score => score.setLost).length === 0) {
      const gamesWon = this.runningScore.filter(score => score.gameWon).length;
      const gamesLost = this.runningScore.filter(score => score.gameLost).length;
      return `${gamesWon}-${gamesLost}`;
    }

    //get last set won index
    let lastIndex = 0;
    this.runningScore.forEach( (rs, index) => { 
      if (rs.setWon || rs.setLost) {
        lastIndex = index;
      }
    });

    //slice array by last set index to get current set being played
    const currentSet = this.runningScore.slice(lastIndex + 1, this.runningScore.length);
    const gamesWon = currentSet.filter(score => score.gameWon).length;
    const gamesLost = currentSet.filter(score => score.gameLost).length;
    return `${gamesWon}-${gamesLost}`;
  }

  getCompletedSets() {
    //if a set won
    const completedSets = [];
    let currentIndex = 0;
    //split the running score into sets - look for sets won/lost
    this.runningScore.forEach( (score, index) => {
      if (score.setWon || score.setLost) {
        completedSets.push(this.runningScore.slice(currentIndex, index + 1));
        currentIndex = index + 1;
      }
    });

    //go through each set and count games
    completedSets.forEach(set => {
      const gamesWon = set.filter(score => score.gameWon).length;
      const gamesLost = set.filter(score => score.gameLost).length;

      let scoreStr = `${gamesWon}-${gamesLost}`;

      const lastPointInSet = set[set.length - 1];
      if (lastPointInSet.tiebreak && (lastPointInSet.setWon || lastPointInSet.setLost)) {
        scoreStr += ` (${lastPointInSet.player1}-${lastPointInSet.player2})`
      }

      set["gamesScore"] = scoreStr;
    });

    return completedSets.map(set => set.gamesScore);
    
  }

  getRunningScore() {
    const games = this.getGamesForCurrentSet();
    const sets = this.getCompletedSets();
    if (!sets.length) {
      return Object.assign({}, {games}, this.runningScore[this.pointsIndex]);
    }

    return Object.assign({}, {games}, {sets}, this.runningScore[this.pointsIndex]);
  }

}

export default new Game();
