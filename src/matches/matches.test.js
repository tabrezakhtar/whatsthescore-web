import moment from 'moment'
import Matches from './index';
import ScoreBoard from '../scoreboard';

import { test, expect, shallow, describe } from 'vitest'

describe('matches', () => {
  test('when there are no completed matches', () => {
    const matches = {completedMatches: []};
  
    const wrapper = shallow(<Matches matches={matches} />);
  
    expect(wrapper.containsMatchingElement(
      <div className="matches">
        <h3>There are no completed matches.</h3>
        <div className="scoreContainer" />
      </div>
    )).toEqual(true);
  });
  
  test('when there is a completed match', () => {
    const startTime = moment();
    const endTime = moment().add(3, 'hours');
    const matches = {completedMatches: [ {id: 1, startTime, endTime} ]};
  
    const wrapper = shallow(<Matches matches={matches} />);
  
    expect(wrapper.containsMatchingElement(
      <div className="scoreboard-border">
        <div>{new Date(startTime).toDateString()}</div>
        <div>{new Date(startTime).toLocaleTimeString()} to {new Date(endTime).toLocaleTimeString()}</div>
        <ScoreBoard score={matches.completedMatches[0]} />
      </div>
    )).toEqual(true);
  });
});