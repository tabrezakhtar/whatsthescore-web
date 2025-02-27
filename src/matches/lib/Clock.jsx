import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useMatches } from "../../context/matchesContext";
import { useStopWatch } from "../../context/stopWatchContext";

function Clock() {
  const { matches } = useMatches();
  const { stopWatch } = useStopWatch();

  const startTime = stopWatch.stopWatch;
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    let timerId = 0;

    if (matches.startTime) {
      timerId = setInterval(
        () => {
          const updatedTime = time.clone().add(1, "second");
          setTime(updatedTime);
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
    <div className="padding secondary center-align" style={{borderRadius: "10px 10px 0 0"}}>
      {time?.format("HH:mm:ss")}
    </div>
  )
}

export default Clock;