import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import localforage from "localforage";

export const initialState = {
  completedMatches: [],
  runningScore: {
    player1: 0,
    player2: 0
  },
  startTime: null
}

const MatchesContext = createContext(null);

const MatchesProvider = ({ children }) => {
  console.log("MatchesProvider called")
  const [matches, setMatches] = useState(initialState);

  useEffect(() => {
    const loadMatches = async () => {
      const storedMatches = await localforage.getItem("matches");
      if (storedMatches) {
        setMatches(storedMatches);
      }
    };

    loadMatches();
  }, []);

  useEffect(() => {
    const saveMatches = async () => {
      await localforage.setItem("matches", matches);
    };

    saveMatches();
  }, [matches]);

  const startMatch = () => {
    setMatches((matches) => ({ ...matches, startTime: Date.now() }));
  };

  const addMatch = (runningScore) => {
    setMatches((matches) => ({
      ...matches,
      completedMatches: [...matches.completedMatches, { ...runningScore, endTime: Date.now(), startTime: matches.startTime}]
    }));
  };

  const updateRunningScore = (runningScore) => {
    setMatches((matches) => ({
      ...matches,
      runningScore
    }));
  };

  const finishMatch = async () => {
    // Save to localforage
    await localforage.setItem("matches", matches);
    setMatches((matches) => ({
      ...matches,
      runningScore: {
        player1: 0,
        player2: 0
      },
      startTime: null
    }));
  };

  const clear = async () => {
    await localforage.clear();
    setMatches(initialState);
  };

  const value = { matches, clear, startMatch, addMatch, updateRunningScore, finishMatch };
  
  return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>;
}

MatchesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useMatches = () => {
  console.log("useMatches called");
  const value = useContext(MatchesContext);

  if (!value) {
    throw new Error("🗣️ useMatches hook used without MatchesContext");
  }

  return value;
};


export { MatchesProvider, MatchesContext, useMatches };