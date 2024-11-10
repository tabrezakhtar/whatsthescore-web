import matchesReducer from './matchesReducer';

let initialState = null;

const dateBackup = Date.now;

beforeEach(() => {
  global.Date.now = jest.fn(() => 'test date');

  initialState = {
    completedMatches: [],
    runningScore: {
      player1: 0,
      player2: 0
    },
    startTime: null,
  };
})

afterEach(() => {
  global.Date.now = dateBackup;
})

describe('matches reducer', () => {
  it('should return the initial state', () => {
    expect(matchesReducer(undefined, {})).toEqual(initialState);
  });

  it('should add a start date when a match is started', () => {
    const newState = {
      completedMatches: [],
      runningScore: {
        player1: 0,
        player2: 0
      },
      startTime: 'test date'
    };

    const startAction = {
      type: 'START_MATCH'
    };

    expect(matchesReducer(initialState, startAction)).toEqual(newState);
  });

  it('should add the completed match to state and start and end times', () => {
    initialState.startTime = 'test start time';

    const newState = {
      completedMatches: [{player1: 6, player2: 4, startTime: 'test start time', endTime: 'test date'}],
      runningScore: {
        player1: 0,
        player2: 0
      },
      startTime: 'test start time'
    };

    const startAction = {
      type: 'ADD_MATCH', payload: {player1: 6, player2: 4}
    };

    expect(matchesReducer(initialState, startAction)).toEqual(newState);
  });

  it('should update the running score', () => {
    const newState = {
      completedMatches: [],
      runningScore: {
        player1: 6,
        player2: 4
      },
      startTime: null
    };

    const startAction = {
      type: 'UPDATE_RUNNING_SCORE', payload: {player1: 6, player2: 4}
    };

    expect(matchesReducer(initialState, startAction)).toEqual(newState);
  });

  it('should reset the state when match is finished', () => {
    const newState = {
      completedMatches: [],
      runningScore: {
        player1: 0,
        player2: 0
      },
      startTime: null
    };

    const startAction = {
      type: 'FINISH_MATCH'
    };

    expect(matchesReducer(initialState, startAction)).toEqual(newState);
  });
});
