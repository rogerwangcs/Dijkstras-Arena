import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

const SLobby = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    console.log("game started");
    this.props.socket.on("startGame", res => {
      this.props.history.push("./game");
    });
  };

  render() {
    return <SLobby>Lobby</SLobby>;
  }
}

export default withRouter(Lobby);
