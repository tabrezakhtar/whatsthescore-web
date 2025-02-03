import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const initialState = {
  stopWatch: moment().startOf("day")
}

const StopwatchContext = createContext(null);

const StopwatchProvider = ({ children }) => {
  console.log("StopwatchProvider called");
  const [stopwatch, setStopwatch] = useState(initialState);

  const resetStopwatch = () => {
    setStopwatch(initialState);
  };

  const updateStopwatch = (newTime) => {
    setStopwatch((stopwatch) => ({ ...stopwatch, stopWatch: newTime }));
  };

  const value = { stopwatch, resetStopwatch, updateStopwatch };

  return <StopwatchContext.Provider value={value}>{children}</StopwatchContext.Provider>;
};

StopwatchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStopwatch = () => {
  console.log('useStopwatch called');
  const value = useContext(StopwatchContext);

  if (!value) {
    throw new Error('🗣️ useStopwatch hook used without StopwatchContext');
  }

  return value;
};


export { StopwatchProvider, StopwatchContext, useStopwatch };
