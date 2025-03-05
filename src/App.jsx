import React from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import game from "./matches/lib/Game";
import ScoreBoard from "./scoreboard/ScoreBoard";
import Clock from "./matches/lib/Clock";
import { useMatches } from "./context/matchesContext";
import { useStopWatch } from "./context/stopWatchContext";
import Header from "./Header";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100dvh",
    boxSizing: "border-box",
    padding: "0 15px"
  },
  paddingContainer: {
    backdropFilter: "blur(10px)",
    flex: "1"
  },
  largeText: {
    fontSize: "10vw",
    cursor: "initial"
  },
  footer: {
    borderRadius: "0 0 10px 10px"
  }
};

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
    resetStopWatch();
  }

  function endMatch() {
    addMatch(game.getRunningScore());
    finishMatch();
    resetStopWatch();
    game.endGame();
    history.push("/matches");
  }

  function start() {
    startMatch();
  }

  const bigScore = (score.gameWon || score.gameLost) ?
    <h1 className="large secondary-text" style={styles.largeText}>0 - 0</h1> :
    <h1 className="large secondary-text" style={styles.largeText}>{score.player1} - {score.player2}</h1>;

  const middleSection = matches.startTime ?
    <React.Fragment>
      <button type="button" disabled={isMatchDone} className="extra medium-elevate surface-container" onClick={losePoint}>-</button>
      <button type="button" disabled={isMatchDone} className="extra medium-elevate surface-container" onClick={winPoint}>+</button>
    </React.Fragment> :
    <button type="button" className="extra medium-elevate surface-container" onClick={start}>Start</button>;

  const showRhs = !!matches.startTime;

  return (
    <div className="app-container" style={styles.container}>
      <Header />
      <Clock />
      <div className="padding secondary-container" style={styles.paddingContainer}>
        <summary className="center-align">
          {bigScore}
        </summary>

        <div className="row middle-align">
          {middleSection}
        </div>

        <div className="medium-space"></div>

        {showRhs &&
          <div className="row middle-align wrap">
            <nav className="no-space vertical middle-align">
              <button className="small-margin surface-container round small medium-elevate" onClick={undoPoint}>Undo Point</button>
              <button className="small-margin surface-container round small medium-elevate" onClick={reset}>Reset</button>
              <button className="small-margin surface-container round small medium-elevate" onClick={endMatch}>Finish match</button>
            </nav>
          </div>
        }
      </div>

      <footer className="footer inverse-primary bottom-margin" style={styles.footer}>
        <ScoreBoard score={score} />
      </footer>
    </div>
  );
};

App.propTypes = {
  matches: PropTypes.array,
  stopWatch: PropTypes.object,
  history: PropTypes.object,
};

const AppWithRouter = withRouter(App);
export default AppWithRouter;
