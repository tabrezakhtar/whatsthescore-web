import ScoreBoard from "../scoreboard/ScoreBoard";
import PropTypes from "prop-types";
import { useMatches } from "../context/matchesContext";

function Matches() {
  const { matches } = useMatches();
  let message = "";
  if (!matches.completedMatches.length) {
    message = <h3>There are no completed matches.</h3>;
  }

  return (
    <div className="matches padding">
      {message}
      <div className="scoreContainer row">
        {
          matches.completedMatches.map(score => {
            return <article key={score.id} className="scoreboard-border tertiary-container">
              <div>{new Date(score.startTime).toDateString()}</div>
              <div>{new Date(score.startTime).toLocaleTimeString()} to {new Date(score.endTime).toLocaleTimeString()}</div>
              <ScoreBoard score={score} />
            </article>
          })
        }
      </div>
    </div>
  )
}

export default Matches

Matches.propTypes = {
  matches: PropTypes.shape({
    completedMatches: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTime: PropTypes.string,
        endTime: PropTypes.string
      })
    )
  })
}