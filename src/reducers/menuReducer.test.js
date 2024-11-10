import menuReducer from './menuReducer';

describe('menu reducer', () => {
  it('should return the initial state', () => {
    expect(menuReducer(undefined, {})).toEqual({selected: false});
  });

  it('should handle TOGGLE_MENU', () => {
    const toggleAction = {
      type: 'TOGGLE_MENU',
      payload: true
    };
    expect(menuReducer(undefined, toggleAction)).toEqual({selected: true});
  });
});
