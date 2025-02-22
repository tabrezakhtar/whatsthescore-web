import Players from "./Players";
import CurrentSet from "./CurrentSet";
import CompletedSet from "./CompletedSet";
import PropTypes from "prop-types";
import "./scoreboard.css";

function ScoreBoard({score}) {

  const completedSets = score.sets
    ? score.sets.map((set, index) => (
        <CompletedSet key={index} set={set} />
      ))
    : null;

  return (
    <footer className="horizontal secondary margin middle-align">
      <Players />
      <div className="completed-set-container">{completedSets}</div>
      <CurrentSet games={score?.games}/>
    </footer>
  )
}
ScoreBoard.propTypes = {
  score: PropTypes.shape({
    sets: PropTypes.arrayOf(PropTypes.object),
    games: PropTypes.arrayOf(PropTypes.object)
  })
};

export default ScoreBoard;