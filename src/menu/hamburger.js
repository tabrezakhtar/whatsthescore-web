import PropTypes from 'prop-types';

import { menuContext } from "../reducers";

function Hamburger({selected}) {
  const { toggleMenu } = menuContext;
  const isSelected = selected.selected ? ' is-active' : '';

  function burgerClick() {
    toggleMenu(!selected.selected);
  }

  return (
    <button className={'hamburger hamburger--slider' + isSelected} type="button" onClick={burgerClick}>
      <span className="hamburger-box">
      <span className="hamburger-inner"></span>
      </span>
    </button>
  )
};

Hamburger.propTypes = {
  selected: PropTypes.shape({
    selected: PropTypes.bool.isRequired
  }).isRequired,
};

export default Hamburger;
