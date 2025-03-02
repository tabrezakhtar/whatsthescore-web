import ScoreBoard from "../scoreboard/ScoreBoard";
import PropTypes from "prop-types";
import { useMatches } from "../context/matchesContext";
import Header from "../Header";

function Matches() {
  const { matches } = useMatches();
  let message = "";
  if (!matches.completedMatches.length) {
    message = (
      <div className="about secondary-container padding" style={{backdropFilter: "blur(10px)", borderRadius: "10px"}}>
        <p className="description">There are no completed matches.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="matches padding">
        {message}
        <div className="scoreContainer row wrap">
          {
            matches.completedMatches.map(score => {
                return <article key={score.id} className="scoreboard-border inverse-primary white-text">
                <div>{new Date(score.startTime).toDateString()}</div>
                <div>{new Date(score.startTime).toLocaleTimeString()} to {new Date(score.endTime).toLocaleTimeString()}</div>
                <ScoreBoard score={score} />
                </article>
            })
          }
        </div>
      </div>
    </>
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