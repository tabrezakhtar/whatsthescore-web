import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import game from "./matches/lib/Game";
import ScoreBoard from "./scoreboard/ScoreBoard";
import Clock from "./matches/lib/Clock";
import { useMatches } from "./context/matchesContext";
import { useStopWatch } from "./context/stopWatchContext";

function App() {
  const { matches, startMatch, addMatch, updateRunningScore, finishMatch } = useMatches();
  const { stopWatch, resetStopWatch, updateStopWatch } = useStopWatch();

  const score = matches.runningScore;
  let isMatchDone = "";
  if (score.sets && score.sets.length > 4) {
    isMatchDone = " disabled";
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
    //todo: add history
    //todo: update react router
    history.push("/matches");
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

  const hideRhs = matches.startTime ? "" : "hide";

  return (
    <>
      <Clock startTime={stopWatch.stopWatch} saveTime={saveTime} run={matches.startTime} />
      <article className="controls">
        <article>
          {bigScore}
        </article>

        <div className="controls__lhs"></div>

        <div className="controls__middle">
          {middleSection}
        </div>

        <div className={`controls__rhs ${hideRhs}`}>
          <button className="small-button" onClick={undoPoint}>Undo Point</button>
          <button className="small-button" onClick={reset}>Reset</button>
          <button className="small-button" onClick={endMatch}>Finish match</button>
        </div>
      </article>

      <footer className="footer" style={{ position: "fixed", bottom: "0" }}>
        <ScoreBoard score={score} />
      </footer>
    </>
  );
};

App.propTypes = {
  matches: PropTypes.array,
  stopWatch: PropTypes.object,
  history: PropTypes.object,
};

const AppWithRouter = withRouter(App);
export default AppWithRouter;
