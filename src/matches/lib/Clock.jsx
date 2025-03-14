import { useEffect } from "react";
import { useMatches } from "../../context/matchesContext";
import { useStopWatch } from "../../context/stopWatchContext";

const styles = {
  clockContainer: {
    borderRadius: "10px 10px 0 0"
  }
};

function Clock() {
  const { matches } = useMatches();
  const { stopWatch, updateStopWatch } = useStopWatch();

  useEffect(() => {
    let timerId = 0;

    if (matches.startTime) {
      timerId = setInterval(
        () => {
          const updatedTime = stopWatch.stopWatch.clone().add(1, "second");
          updateStopWatch(updatedTime);
        },
        1000
      );
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return (
    <div className="padding secondary center-align" style={styles.clockContainer}>
      {stopWatch.stopWatch?.format("HH:mm:ss")}
    </div>
  )
}

export default Clock;