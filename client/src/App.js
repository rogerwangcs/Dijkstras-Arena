import React, { Component } from "react";
import "./App.css";
import GameContainer from "./GameContainer.jsx";

import io from "socket.io-client";
const socket = io("http://10.0.0.122:4000/");

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
      <div className="App">
        <GameContainer socket={socket} />
      </div>
    );
  }
}

export default App;
