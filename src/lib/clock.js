import React, {useEffect, useState} from "react";

function Clock({startTime, saveTime, run}) {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    let timerId = 0;

    if (run) {
      timerId = setInterval(
        () => {
          const updatedTime = time.clone().add(1, 'second');
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
    <div className="clock">{time.format('HH:mm:ss')}</div>
  )
}

export default Clock;