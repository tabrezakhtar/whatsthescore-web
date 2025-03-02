import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import App from "./App";
import Matches from "./matches/Matches";
import About from "./about/About";
import { MatchesProvider } from "./context/matchesContext";
import { StopWatchProvider } from "./context/stopWatchContext";
import { MenuProvider } from "./context/menuContext";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MatchesProvider>
        <StopWatchProvider>
          <MenuProvider>
            <main className="responsive no-padding">
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
