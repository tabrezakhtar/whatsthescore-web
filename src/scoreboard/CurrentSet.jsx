import PropTypes from "prop-types";

function CurrentSet({games}) {
  const scoreLeftBorder = {
    borderLeft: "2px solid white",
  }

  let p1Score = 0;
  let p2Score = 0;

  if (games) {
    p1Score = games.split("-")[0];
    p2Score = games.split("-")[1];
  }

  return (
    <div className="padding" style={scoreLeftBorder}>
      <div>
        {p1Score}
      </div>
      <div>
        {p2Score}
      </div>
    </div>
  )
}

CurrentSet.propTypes = {
  games: PropTypes.string,
};

export default CurrentSet;