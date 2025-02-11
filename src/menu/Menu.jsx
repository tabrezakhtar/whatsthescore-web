import { NavLink } from "react-router-dom";
import { useMenu } from "../context/menuContext";

function Menu() {
  const { menu } = useMenu();

  const showMenu = menu.selected ? " showMenu" : "";

  return (
    <ul className={"header__menu" + showMenu}>
      <li className="menu__item"><NavLink exact activeClassName="header__menu-active" to="/">Home</NavLink></li>
      <li className="menu__item"><NavLink exact activeClassName="header__menu-active" to="/matches">Matches</NavLink></li>
      <li className="menu__item"><NavLink exact activeClassName="header__menu-active" to="/about">About</NavLink></li>
    </ul>
  );
}

export default Menu;