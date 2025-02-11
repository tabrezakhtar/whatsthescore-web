import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const initialState = {
  selected: false
}

const MenuContext = createContext(null);

const MenuProvider = ({ children }) => {
  console.log("MenuProvider called");
  const [menu, setMenu] = useState(initialState);

  const toggleMenu = () => {
    setMenu((menu) => ({ ...menu, selected: !menu.selected }));
  };

  const value = { menu, toggleMenu };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useMenu = () => {
  console.log("useStopwatch called");
  const value = useContext(MenuContext);

  if (!value) {
    throw new Error("🗣️ useMenu hook used without MenuContext");
  }

  return value;
};

export { MenuProvider, MenuContext, useMenu };