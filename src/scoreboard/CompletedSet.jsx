import PropTypes from "prop-types";

function CompletedSet({set}) {
  const scoreLeftBorder = {
    borderLeft: "2px solid yellow",
  }

  const tiebreak = {
    fontSize: "0.6rem",
    marginTop: "-5px",
  }

  const isTiebreak = set.split(" ").length > 1;
  let p1Score = 0;
  let p2Score = 0;
  let p1TbScore = null;
  let p2TbScore = null;

  if (set) {
    const games = set.split(" ");
    p1Score = games[0].split("-")[0];
    p2Score = games[0].split("-")[1];

    if (isTiebreak) {
      const tiebreakScore = set.split(" ")[1].replace("(","").replace(")","");
      p1TbScore = tiebreakScore.split("-")[0];
      p2TbScore = tiebreakScore.split("-")[1];
    }
  }

  return (
    <div className="set set-completed padding" style={scoreLeftBorder}>
      <div style={{display: "flex"}}>
        {p1Score} <span style={tiebreak}>{p1TbScore}</span>
      </div>
      <div style={{display: "flex"}}>
        {p2Score} <span style={tiebreak}>{p2TbScore}</span>
      </div>
    </div>
  )
}

CompletedSet.propTypes = {
  set: PropTypes.string.isRequired,
};

export default CompletedSet;
