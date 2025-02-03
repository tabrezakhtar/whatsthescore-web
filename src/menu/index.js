import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Menu({selected}) {
  const showMenu = selected.selected ? ' showMenu' : '';

  return (
    <ul className={'header__menu' + showMenu}>
      <li className="menu__item"><NavLink exact activeClassName="header__menu-active" to="/">Home</NavLink></li>
      <li className="menu__item"><NavLink exact activeClassName="header__menu-active" to="/matches">Matches</NavLink></li>
      <li className="menu__item"><NavLink exact activeClassName="header__menu-active"to="/about">About</NavLink></li>
    </ul>
  )
}

Menu.propTypes = {
  selected: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selected: state.selected
})

export const MenuRaw = Menu;
export default connect(mapStateToProps)(Menu)