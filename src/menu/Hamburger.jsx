import { useMenu } from "../context/menuContext";

function Hamburger() {
  const { menu, toggleMenu } = useMenu();
  const isSelected = menu.selected ? " is-active" : "";

  function burgerClick() {
    toggleMenu(!menu.selected);
  }

  return (
    <button className={"hamburger hamburger--slider" + isSelected} type="button" onClick={burgerClick}>
      <span className="hamburger-box">
      <span className="hamburger-inner"></span>
      </span>
    </button>
  )
};

export default Hamburger;
