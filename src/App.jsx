import React from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import game from "./matches/lib/Game";
import ScoreBoard from "./scoreboard/ScoreBoard";
import Clock from "./matches/lib/Clock";
import { useMatches } from "./context/matchesContext";
import { useStopWatch } from "./context/stopWatchContext";

function App() {
  const history = useHistory();
  const { matches, startMatch, addMatch, updateRunningScore, finishMatch } = useMatches();
  const { resetStopWatch } = useStopWatch();

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
    history.push("/matches");
  }

  function start() {
    startMatch()
  }

  const bigScore = (score.gameWon || score.gameLost) ?
    <h1 className="large" style={{fontSize: "17rem"}}>0 - 0</h1> :
    <h1 className="large" style={{fontSize: "17rem"}}>{score.player1} - {score.player2}</h1>

  const middleSection = matches.startTime ?
    <React.Fragment>
      <button type="button" disabled={isMatchDone} className="big-button" onClick={losePoint}>-</button>
      <button type="button" disabled={isMatchDone} className="big-button" onClick={winPoint}>+</button>
    </React.Fragment> :
    <button type="button" onClick={start}>Start</button>

  const showRhs = !!matches.startTime;

  return (
    <>
      <Clock />
      <div className="padding secondary-container">
        <summary className="center-align">
          {bigScore}
        </summary>

        <div className="grid">
          <div className="s4" />
          <div className="s4 controls__middle center-align middle-align">
            {middleSection}
          </div>
          <div class="s4">
            {showRhs &&
              <div className="vertical middle-align">
                <button className="small-margin" onClick={undoPoint}>Undo Point</button>
                <button className="small-margin" onClick={reset}>Reset</button>
                <button className="small-margin" onClick={endMatch}>Finish match</button>
              </div>
            }
          </div>
        </div>
      </div>

      <footer className="footer inverse-primary">
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
