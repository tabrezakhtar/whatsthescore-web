import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const initialState = {
  stopWatch: moment().startOf("day")
}

const StopWatchContext = createContext(null);

const StopWatchProvider = ({ children }) => {
  console.log("StopWatchProvider called");
  const [stopWatch, setStopWatch] = useState(initialState);

  const resetStopWatch = () => {
    setStopWatch(initialState);
  };

  const updateStopWatch = (newTime) => {
    setStopWatch((stopwatch) => ({ ...stopwatch, stopWatch: newTime }));
  };

  const value = { stopWatch, resetStopWatch, updateStopWatch };

  return <StopWatchContext.Provider value={value}>{children}</StopWatchContext.Provider>;
};

StopWatchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStopWatch = () => {
  console.log('useStopWatch called');
  const value = useContext(StopWatchContext);

  if (!value) {
    throw new Error('🗣️ useStopWatch hook used without StopWatchContext');
  }

  return value;
};


export { StopWatchProvider, StopWatchContext, useStopWatch };
