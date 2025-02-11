import { describe, test, expect, afterEach } from 'vitest'

import testGame from './game';
import scoreHelper from './score-helper';

afterEach(() => {
  testGame.endGame();
});

describe('tiebreak scoring', () => {
  describe('both players', () => {
    test('when both players get to 6-6', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        player1: 0,
        player2: 40,
        gameLost: true,
      });
    });
  });

  describe('player 1', () => {
    test('when first point of tiebreak is won', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 1);

      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        tiebreak: true,
        player1: 1,
        player2: 0,
      });
    });

    test('when 2nd point of tiebreak is won', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 2);

      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        tiebreak: true,
        player1: 2,
        player2: 0,
      });
    });

    test('when 2 points are won and lost', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 2);
      scoreHelper.losePoints(testGame, 2);

      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        tiebreak: true,
        player1: 2,
        player2: 2,
      });
    });

    test('when player gets to 7 and opponent hasnt scored', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 7);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['7-6 (7-0)'],
        games: '0-0',
        tiebreak: true,
        player1: 7,
        player2: 0,
        gameWon: true,
        setWon: true,
      });
    });

    test('when player gets to 6-5', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 6);
      scoreHelper.losePoints(testGame, 5);

      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        tiebreak: true,
        player1: 6,
        player2: 5,
      });
    });

    test('when player gets to 7-5', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 6);
      scoreHelper.losePoints(testGame, 5);
      scoreHelper.winPoints(testGame, 1);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['7-6 (7-5)'],
        games: '0-0',
        tiebreak: true,
        player1: 7,
        player2: 5,
        gameWon: true,
        setWon: true
      });
    });

    test('when player gets to 7-6', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 6);
      scoreHelper.losePoints(testGame, 6);
      scoreHelper.winPoints(testGame, 1);

      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        tiebreak: true,
        player1: 7,
        player2: 6
      });
    });

    test('when player gets to 8-6', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 6);
      scoreHelper.losePoints(testGame, 6);
      scoreHelper.winPoints(testGame, 2);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['7-6 (8-6)'],
        games: '0-0',
        tiebreak: true,
        player1: 8,
        player2: 6,
        gameWon: true,
        setWon: true
      });
    });
  });

  describe('player 2', () => {
    test('when first point of tiebreak is lost', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.losePoints(testGame, 1);

      expect(testGame.getRunningScore()).toEqual({
        games: '6-6',
        tiebreak: true,
        player1: 0,
        player2: 1,
      });
    });

    test('when player gets to 5-7', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 5);
      scoreHelper.losePoints(testGame, 7);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-7 (5-7)'],
        games: '0-0',
        tiebreak: true,
        player1: 5,
        player2: 7,
        gameLost: true,
        setLost: true
      });
    });

    test('when player gets to 6-8', () => {
      scoreHelper.winPoints(testGame, 20);
      scoreHelper.losePoints(testGame, 20);
      scoreHelper.winPoints(testGame, 4);
      scoreHelper.losePoints(testGame, 4);
      scoreHelper.winPoints(testGame, 6);
      scoreHelper.losePoints(testGame, 8);

      expect(testGame.getRunningScore()).toEqual({
        sets: ['6-7 (6-8)'],
        games: '0-0',
        tiebreak: true,
        player1: 6,
        player2: 8,
        gameLost: true,
        setLost: true
      });
    });
  });
});
