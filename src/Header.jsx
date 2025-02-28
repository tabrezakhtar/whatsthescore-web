import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="fixed no-padding">
            <nav className="l">
            <NavLink to="/"><img className="circle" src="/ball.png"/></NavLink>
            <h5 className="page right active no-margin l">whatsthescore</h5>
            <div className="max"></div>
            <NavLink exact to="/">
                <button className="small-round large transparent no-margin l">
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
                </button>
            </NavLink>
            <NavLink exact to="/matches">
                <button className="small-round large transparent no-margin l">
                <i className="fas fa-clipboard-list"></i>
                <span>Matches</span>
                </button>
            </NavLink>
            <NavLink exact to="/About">
                <button className="small-round large transparent no-margin l">
                <i className="fas fa-circle-user"></i>
                <span>About</span>
                </button>
            </NavLink>
            </nav>

            <nav className="m no-margin padding">
            <NavLink to="/"><img className="circle" src="/ball.png"/></NavLink>
            <h5 className="page right active no-margin l">whatsthescore</h5>
            <div className="max"></div>
            <NavLink exact to="/">
                <i className="fa-solid fa-house"></i>
            </NavLink>
            <NavLink exact to="/matches">
                <i className="fas fa-clipboard-list"></i>
            </NavLink>
            <NavLink exact to="/About">
                <i className="fas fa-circle-user"></i>
            </NavLink>
            </nav>

            <nav className="s no-margin padding">
            <button className="circle large transparent s" data-ui="#menu">
                <i>menu</i>
                <menu id="menu" className="no-wrap">
                <li>
                    <NavLink exact to="/" data-ui="#menu">
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/matches" data-ui="#menu">
                    Matches
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/About" data-ui="#menu">
                    About
                    </NavLink>
                </li>
                </menu>
            </button>
            <NavLink to="/"><img className="circle" src="/ball.png"/></NavLink>
            <h6 className="page right active no-margin l">whatsthescore</h6>
            </nav>
        </header>
    );
};

export default Header;