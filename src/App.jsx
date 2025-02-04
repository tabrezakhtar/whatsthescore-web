import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import game from './lib/game';
import ScoreBoard from './scoreboard';
import Clock from './lib/clock';
import { MatchesContext, StopWatchContext } from "./reducers";

function App({matches, stopWatch, history}) {
  const { useMatches } = MatchesContext;
  const { startMatch, addMatch, updateRunningScore, finishMatch } = useMatches();

  const { useStopWatch } = StopWatchContext;
  const { resetStopWatch, updateStopWatch } = useStopWatch();

  const score = matches.runningScore;
  let isMatchDone = '';
  if (score.sets && score.sets.length > 4) {
    isMatchDone = ' disabled';
  }

  function winPoint() {
    game.winPoint();
    updateRunningScore(game.getRunningScore());
  }

  function losePoint() {
    game.losePoint();
    updateRunningScore(game.getRunningScore());
  }

  function undoPoint() {
    game.undo();
    updateRunningScore(game.getRunningScore());
  }

  function reset() {
    game.endGame();
    updateRunningScore(game.getRunningScore());
    resetStopWatch
  }

  function endMatch() {
    addMatch(game.getRunningScore());
    finishMatch();
    resetStopWatch();
    game.endGame();
    history.push('/matches');
  }

  function saveTime(time) {
    updateStopWatch(time);
  }

  function start() {
    startMatch()
  }

  const bigScore = (score.gameWon || score.gameLost) ?
    <div className="big-score">0 - 0</div> :
    <div className="big-score">{score.player1} - {score.player2}</div>

  const middleSection = matches.startTime ?
    <React.Fragment>
      <button disabled={isMatchDone} className="big-button" onClick={losePoint}>-</button>
      <button disabled={isMatchDone} className="big-button" onClick={winPoint}>+</button>
    </React.Fragment> :
    <button className="big-button big-button__start" onClick={start}>Start</button>

  const hideRhs = matches.startTime ? '' : 'hide';

  return (
    <React.Fragment>
      <Clock startTime={stopWatch.stopWatch} saveTime={saveTime} run={matches.startTime}/>
      {bigScore}

      <div className="controls">
        <div className="controls__lhs">
          
        </div>
        
        <div className="controls__middle">
          {middleSection}
        </div>

        <div className={`controls__rhs ${hideRhs}`}>
          <button className="small-button" onClick={undoPoint}>Undo Point</button>
          <button className="small-button" onClick={reset}>Reset</button>
          <button className="small-button" onClick={endMatch}>Finish match</button>
        </div>
      </div>

      <footer className="footer">
        <ScoreBoard score={score}/>
      </footer>
    </React.Fragment>
  );
};

App.propTypes = {
  matches: PropTypes.array.isRequired,
  stopWatch: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const AppWithRouter = withRouter(App);
export default AppWithRouter;

