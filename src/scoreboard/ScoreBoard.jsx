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
    <div className="row no-space secondary margin" style={{alignSelf: "center"}}>
      <Players />
      <div className="completed-set-container surface-variant" style={{display: "flex"}}>{completedSets}</div>
      <CurrentSet games={score?.games}/>
    </div>
  )
}
ScoreBoard.propTypes = {
  score: PropTypes.shape({
    sets: PropTypes.arrayOf(PropTypes.object),
    games: PropTypes.string
  })
};

export default ScoreBoard;