import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import App from "./App";
import Matches from "./matches/Matches";
import About from "./about/About";
import Menu from "./menu/Menu";
import Hamburger from "./menu/Hamburger";
import { MatchesProvider } from "./context/matchesContext";
import { StopWatchProvider } from "./context/stopWatchContext";
import { MenuProvider } from "./context/menuContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MatchesProvider>
        <StopWatchProvider>
          <MenuProvider>
            <header className="header">
              <div className="header__logo-box">
                <NavLink to="/">
                  <img src="/ball.png" alt="Logo" className="header__logo" />
                  <span>whatsthescore</span>
                </NavLink>
              </div>

              <Hamburger />
              <Menu />
            </header>

            <div className="main">
              <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/matches" component={Matches} />
                <Route exact path="/about" component={About} />
              </Switch>
            </div>
          </MenuProvider>
        </StopWatchProvider>
      </MatchesProvider>
    </BrowserRouter>
  </StrictMode>
);
