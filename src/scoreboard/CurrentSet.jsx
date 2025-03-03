import PropTypes from "prop-types";

const styles = {
  container: {
    borderLeft: "2px solid yellow",
    fontWeight: "bold",
    padding: "10px"
  }
};

function CurrentSet({ games }) {
  let p1Score = 0;
  let p2Score = 0;

  if (games) {
    p1Score = games.split("-")[0];
    p2Score = games.split("-")[1];
  }

  return (
    <div className="padding" style={styles.container}>
      <div style={styles.score}>
        {p1Score}
      </div>
      <div style={styles.score}>
        {p2Score}
      </div>
    </div>
  );
}

CurrentSet.propTypes = {
  games: PropTypes.string,
};

export default CurrentSet;