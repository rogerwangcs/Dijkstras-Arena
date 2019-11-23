import React, { Component } from "react";
import styled from "styled-components";

const SGameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: gray;
`;

class GameOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const adjNodes = this.props.getAdjNodes();

    return (
      <SGameOverlay>
        <p>Game Overlay</p>
        {adjNodes}
      </SGameOverlay>
    );
  }
}

export default GameOverlay;
