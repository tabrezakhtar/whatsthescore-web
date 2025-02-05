import PropTypes from 'prop-types';

import { MenuContext } from "../reducers/menuContext";

function Hamburger({selected}) {
  const { toggleMenu } = MenuContext;
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
    selected: PropTypes.bool
  })
};

export default Hamburger;
