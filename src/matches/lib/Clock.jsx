import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Clock({startTime, saveTime, run}) {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    let timerId = 0;

    if (run) {
      timerId = setInterval(
        () => {
          const updatedTime = time.clone().add(1, "second");
          setTime(updatedTime);
          saveTime(updatedTime);
        },
        1000
      );
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return (
    <div className="clock">{time?.format("HH:mm:ss")}</div>
  )
}
Clock.propTypes = {
  startTime: PropTypes.PropTypes.instanceOf(Date).isRequired,
  saveTime: PropTypes.PropTypes.instanceOf(Date).isRequired,
  run: PropTypes.bool.isRequired,
};

export default Clock;