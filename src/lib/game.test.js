import { describe, test, expect, afterEach } from 'vitest'
import testGame from './game';
import scoreHelper from './score-helper';

afterEach(() => {
  testGame.endGame();
});

describe('initial score', () => {
  test('score is initialised', () => {
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 0,
      player2: 0
    });
  });
});

describe('player 1 scoring', () => {
  test('when player 1 wins a point', () => {
    scoreHelper.winPoints(testGame, 1);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 15,
      player2: 0
    });
  });

  test('when player 1 wins 2 points', () => {
    scoreHelper.winPoints(testGame, 2);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 30,
      player2: 0
    });
  });

  test('when player 1 wins 3 points', () => {
    scoreHelper.winPoints(testGame, 2);
    scoreHelper.winPoints(testGame, 1);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 40,
      player2: 0
    });
  });

  test('when player 1 wins 4 points', () => {
    scoreHelper.winPoints(testGame, 3);
    scoreHelper.winPoints(testGame, 1);
    expect(testGame.getRunningScore()).toEqual({
      games: '1-0',
      player1: 40,
      player2: 0,
      gameWon: true
    });
  });

  test('when player 1 wins 4 points and player 2 is at 30', () => {
    scoreHelper.winPoints(testGame, 3);
    scoreHelper.losePoints(testGame, 2);
    scoreHelper.winPoints(testGame, 1);

    expect(testGame.getRunningScore()).toEqual({
      games: '1-0',
      player1: 40,
      player2: 30,
      gameWon: true
    });
  });

  test('when player 1 wins 3 points in a row when player 2 is at 40', () => {
    scoreHelper.losePoints(testGame, 3);
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.winPoints(testGame, 1);

    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 40,
      player2: 40
    });
  });

  test('when player 1 comes back and wins game when player 2 is at 40', () => {
    scoreHelper.losePoints(testGame, 3);
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.winPoints(testGame, 1);

    expect(testGame.getRunningScore()).toEqual({
      games: '1-0',
      player1: 'Ad',
      player2: 40,
      gameWon: true
    });
  });
});

describe('player 2 scoring', () => {
  test('when player 2 wins a point', () => {
    scoreHelper.losePoints(testGame, 1);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 0,
      player2: 15
    });
  });

  test('when player 2 wins 2 points', () => {
    scoreHelper.losePoints(testGame, 2);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 0,
      player2: 30
    });
  });

  test('when player 2 wins 3 points', () => {
    scoreHelper.losePoints(testGame, 3);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 0,
      player2: 40
    });
  });

  test('when player 2 wins 4 points', () => {
    scoreHelper.losePoints(testGame, 3);
    scoreHelper.losePoints(testGame, 1);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-1',
      player1: 0,
      player2: 40,
      gameLost: true
    });
  });
});

describe('deuce scoring', () => {

  describe('player 1', () => {
    test('when both players are at deuce', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 3);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 40,
        player2: 40,
      });
    });
  
    test('when player 1 wins point at deuce', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 3);
      scoreHelper.winPoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 'Ad',
        player2: 40,
      });
    });
  
    test('when player 1 wins point at Advantage', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 3);
      scoreHelper.winPoints(testGame, 2);
      expect(testGame.getRunningScore()).toEqual({
        games: '1-0',
        player1: 'Ad',
        player2: 40,
        gameWon: true
      });
    });

    test('when player 1 loses point at Advantage', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 3);
      scoreHelper.winPoints(testGame, 1);
      scoreHelper.losePoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 40,
        player2: 40
      });
    });

    test('when player 1 loses 2 points at Advantage', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 3);
      scoreHelper.winPoints(testGame, 1);
      scoreHelper.losePoints(testGame, 1);
      scoreHelper.losePoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 40,
        player2: 'Ad'
      });
    });
  });

  describe('player 2', () => {
    test('when player 2 wins point at deuce', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 4);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 40,
        player2: 'Ad',
      });
    });
  
    test('when player 2 wins point at Advantage', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 3);
      scoreHelper.losePoints(testGame, 1)
      scoreHelper.losePoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-1',
        player1: 40,
        player2: 'Ad',
        gameLost: true
      });
    });

    test('when player 2 loses point at Advantage', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 40,
        player2: 40
      });
    });

    test('when player 2 loses 2 points at Advantage', () => {
      scoreHelper.winPoints(testGame, 3);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 1);
      scoreHelper.winPoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        games: '0-0',
        player1: 'Ad',
        player2: 40
      });
    });
  });
});

describe('when game is won', () => {
  test('game should reset scores', () => {
    scoreHelper.winPoints(testGame, 5);

    expect(testGame.getRunningScore()).toEqual({
      games: '1-0',
      player1: 15,
      player2: 0
    });
  });
});

describe('when game is lost', () => {
  test('game should reset scores', () => {
    scoreHelper.losePoints(testGame, 5);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-1',
      player1: 0,
      player2: 15
    });
  });
});

describe('undo', () => {
  test('when score is undone by 1 ', () => {
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.losePoints(testGame, 1);
    testGame.undo();
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 15,
      player2: 0
    }); 
  });

  test('when score is undone by 2 ', () => {
    scoreHelper.winPoints(testGame, 1);
    scoreHelper.losePoints(testGame, 2);
    testGame.undo();
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 15,
      player2: 15
    }); 
  });

  test('when score is undone at advantage ', () => {
    scoreHelper.winPoints(testGame, 3);
    scoreHelper.losePoints(testGame, 3);
    scoreHelper.winPoints(testGame, 1);

    testGame.undo();
    expect(testGame.getRunningScore()).toEqual({
      games: '0-0',
      player1: 40,
      player2: 40
    }); 
  });
});

describe('games scoring', () => {
  test('when a game is won', () => {
    scoreHelper.winPoints(testGame, 4);
    expect(testGame.getRunningScore()).toEqual({
      games: '1-0',
      player1: 40,
      player2: 0,
      gameWon: true
    }); 
  });

  test('when a game is lost', () => {
    scoreHelper.losePoints(testGame, 4);
    expect(testGame.getRunningScore()).toEqual({
      games: '0-1',
      player1: 0,
      player2: 40,
      gameLost: true
    }); 
  });

  test('when a game is won and lost', () => {
    scoreHelper.winPoints(testGame, 4);
    scoreHelper.losePoints(testGame, 4);
    expect(testGame.getRunningScore()).toEqual({
      games: '1-1',
      player1: 0,
      player2: 40,
      gameLost: true
    }); 
  });
});