import ScoreBoard from "../scoreboard/ScoreBoard";
import PropTypes from "prop-types";
import { useMatches } from "../context/matchesContext";
import Header from "../Header";

const styles = {
  noMatchesMessage: {
    backdropFilter: "blur(10px)",
    borderRadius: "10px"
  }
};

function Matches() {
  const { matches, clear } = useMatches();
  let notification = "";
  if (!matches.completedMatches.length) {
    notification = (
      <div className="about secondary-container padding" style={styles.noMatchesMessage}>
        <p className="description">There are no completed matches.</p>
      </div>
    );
  } else {
    notification = <button type="button" className="extra medium-elevate surface-container" onClick={clear}>Clear Data</button>
  }

  return (
    <>
      <Header />
      <div className="matches padding">
        {notification}
        <div className="scoreContainer row wrap">
          {
            matches.completedMatches.map( (score, index) => {
                return <article key={index} className="scoreboard-border inverse-primary white-text">
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