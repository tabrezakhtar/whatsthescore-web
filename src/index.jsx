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

const ball = {
  width: "1.2rem",
  margin: "0.5rem",
};

const navItemStyle = {
  display: "flex",
  alignItems: "center"
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MatchesProvider>
        <StopWatchProvider>
          <MenuProvider>
            <header className="container-fluid">
              <nav>
                <ul>
                  <li>
                    <strong>
                      <NavLink to="/" style={navItemStyle}>
                        <img src="/ball.png" alt="Logo" style={ball} />
                        <span>whatsthescore</span>  
                      </NavLink>
                    </strong>
                  </li>
                </ul>
                  <Menu />
              </nav>
            </header>

            <main className="container-fluid">
              <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/matches" component={Matches} />
                <Route exact path="/about" component={About} />
              </Switch>
            </main>
          </MenuProvider>
        </StopWatchProvider>
      </MatchesProvider>
    </BrowserRouter>
  </StrictMode>
);
