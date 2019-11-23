import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import MainMenu from "./screens/MainMenu";
import Lobby from "./screens/Lobby";
import Learn from "./screens/Learn";
import GameContainer from "./screens/GameContainer.jsx";

import io from "socket.io-client";
const socket = io("http://localhost:4000/");
// const socket = io("136.167.212.5:4000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // socket.on("playerMove", data => {
    //   console.log(data);
    // });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path={process.env.PUBLIC_URL + "/"}
              component={MainMenu}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/learn"}
              component={Learn}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/lobby"}
              component={() => <Lobby socket={socket} />}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/game"}
              component={() => <GameContainer socket={socket} />}
            />
            <Redirect
              from={process.env.PUBLIC_URL + "/*"}
              to={process.env.PUBLIC_URL + "/"}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
