import React, { Component } from "react";
import styled from "styled-components";

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
  render() {
    return <SLobby>Lobby</SLobby>;
  }
}

export default Lobby;
