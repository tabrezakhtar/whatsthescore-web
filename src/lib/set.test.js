import { describe, test, expect, afterEach } from 'vitest'
import testGame from './game';
import scoreHelper from './score-helper';

afterEach(() => {
  testGame.endGame();
});

describe('set scoring', () => {
  describe('player 1', () => {
    test('when player 1 wins a set to love', () => {
      scoreHelper.winPoints(testGame, 23);
      scoreHelper.winPoints(testGame, 1);
      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-0'],
        games: '0-0',
        player1: 40,
        player2: 0,
        gameWon: true,
        setWon: true
      });
    });
  
    test('when player 1 wins a set to 2', () => {
      scoreHelper.winPoints(testGame, 20); //5 games
      scoreHelper.losePoints(testGame, 8); //2 games
      scoreHelper.winPoints(testGame, 4);  //1 game
      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-2'],
        games: '0-0',
        player1: 40,
        player2: 0,
        gameWon: true,
        setWon: true
      });
    });
  
    test('when player 1 wins a set to 4', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 16);
      scoreHelper.winPoints(testGame, 4);
      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4'],
        games: '0-0',
        player1: 40,
        player2: 0,
        gameWon: true,
        setWon: true
      });
    });
  
    test('when player 1 wins a set to 5', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 8);
      expect(testGame.getRunningScore()).toEqual({
        sets: ['7-5'],
        games: '0-0',
        player1: 40,
        player2: 0,
        gameWon: true,
        setWon: true
      });
    });
  });

  describe('player 2', () => {
    test('when player 2 wins a set to love', () => {
      scoreHelper.losePoints(testGame, 23);

      testGame.losePoint();

      expect(testGame.getRunningScore()).toEqual({
        sets: ['0-6'],
        games: '0-0',
        player1: 0,
        player2: 40,
        gameLost: true,
        setLost: true
      });
    });
  
    test('when player 2 wins a set to 2', () => {
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 8);
      scoreHelper.losePoints(testGame, 4);
      expect(testGame.getRunningScore()).toEqual({
        sets: ['2-6'],
        games: '0-0',
        player1: 0,
        player2: 40,
        gameLost: true,
        setLost: true
      });
    });
  
    test('when player 2 wins a set to 4', () => {
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 16);
      scoreHelper.losePoints(testGame, 4)
      expect(testGame.getRunningScore()).toEqual({
        sets: ['4-6'],
        games: '0-0',
        player1: 0,
        player2: 40,
        gameLost: true,
        setLost: true
      });
    });
  
    test('when player 2 wins a set to 5', () => {
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 8);
      expect(testGame.getRunningScore()).toEqual({
        sets: ['5-7'],
        games: '0-0',
        player1: 0,
        player2: 40,
        gameLost: true,
        setLost: true
      });
    });
  });

  describe('winning set', () => {
    test("when set is won 6-4 and first point won of 2nd set", () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 16);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.winPoints(testGame, 1);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4'],
        games: "0-0",
        player1: 15,
        player2: 0
      });
    });

    test("when set is won 6-4 and first game is won", () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 16);
      scoreHelper.winPoints(testGame, 8);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4'],
        games: "1-0",
        player1: 40,
        player2: 0,
        gameWon: true
      });
    });

    test("when set is won 6-4 and and lost on a tiebreak", () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 16);
      scoreHelper.winPoints(testGame, 4);

      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.losePoints(testGame, 7);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4', '6-7 (0-7)'],
        games: '0-0',
        player1: 0,
        player2: 7,
        tiebreak: true,
        gameLost: true,
        setLost: true
      });
    });

    test("when set is won 6-4 and and lost on a tiebreak and won 6-2", () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 16);
      scoreHelper.winPoints(testGame, 4);

      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.losePoints(testGame, 7);

      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 8);
      scoreHelper.winPoints(testGame, 4);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4', '6-7 (0-7)', '6-2'],
        games: '0-0',
        player1: 40,
        player2: 0,
        gameWon: true,
        setWon: true
      });
    });

    test("when a set is won and lost, then last point is undone", () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 16);
      scoreHelper.winPoints(testGame, 4);

      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.losePoints(testGame, 7);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4', '6-7 (0-7)'],
        games: '0-0',
        player1: 0,
        player2: 7,
        gameLost: true,
        setLost: true,
        tiebreak: true
      });

      testGame.undo();

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-4'],
        games: '6-6',
        player1: 0,
        player2: 6,
        tiebreak: true
      });
    });
  });
});