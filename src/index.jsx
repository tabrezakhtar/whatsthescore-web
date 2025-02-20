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
            <main className="responsive">
              <header class="fixed">
                <nav>
                  <NavLink to="/"><img class="circle" src="/ball.png"/></NavLink>
                  <h5 className="page right active no-margin l">whatsthescore</h5>
                  <div class="max"></div>
                  <NavLink exact to="/">
                    <button class="small-round large transparent no-margin l">
                    <i className="fa-solid fa-house"></i>
                      <span>Home</span>
                    </button>
                  </NavLink>
                  <NavLink exact to="/matches">
                    <button class="small-round large transparent no-margin l">
                    <i class="fas fa-camera"></i>
                      <span>Matches</span>
                    </button>
                  </NavLink>
                  <NavLink exact to="/About">
                    <button class="small-round large transparent no-margin l">
                      <i class="fas fa-camera"></i>
                      <span>About</span>
                    </button>
                  </NavLink>                  
                </nav>
              </header>

              <div>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route exact path="/matches" component={Matches} />
                  <Route exact path="/about" component={About} />
                </Switch>
              </div>
            </main>
          </MenuProvider>
        </StopWatchProvider>
      </MatchesProvider>
    </BrowserRouter>
  </StrictMode>
);
