import Players from './players';
import CurrentSet from './current-set';
import CompletedSet from './completed-set';
import PropTypes from 'prop-types';

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