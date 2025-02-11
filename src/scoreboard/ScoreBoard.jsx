import Players from "./Players";
import CurrentSet from "./CurrentSet";
import CompletedSet from "./CompletedSet";
import PropTypes from "prop-types";

function ScoreBoard({score}) {

  const completedSets = score.sets
    ? score.sets.map((set, index) => (
        <CompletedSet key={index} set={set} />
      ))
    : null;

  return (
    <div className="scoreboard">
      <Players />
      <div className="completed-set-container">{completedSets}</div>
      <CurrentSet games={score?.games}/>
    </div>
  )
}
ScoreBoard.propTypes = {
  score: PropTypes.shape({
    sets: PropTypes.arrayOf(PropTypes.object),
    games: PropTypes.arrayOf(PropTypes.object)
  })
};

export default ScoreBoard;