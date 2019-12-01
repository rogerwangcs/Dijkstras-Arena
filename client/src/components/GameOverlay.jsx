import React, { Component } from "react";
import styled from "styled-components";

const ProgressBar = require("progressbar.js");

const SGameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
`;

const SMoveProgress = styled.div`
  display: ${props => (props.moving ? "block" : "none")};
  position: absolute;
  top: 65vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;

  @media (max-width: 500px) {
    width: 75px;
    height: 75px;
    top: 60vh;
  }
`;

const SScore = styled.div`
  margin-top: 15px;
  padding: 25px;
  display: inline-block;
  background-color: #6a758faa;
  border-radius: 15px;
  color: white;

  @media (max-width: 500px) {
    h1 {
      font-size: 1em;
    }
  }
`;

class GameOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressBar: null
    };
  }

  componentWillReceiveProps = newProps => {
    if (newProps.moving && newProps.moving !== this.props.moving) {
      let progress = new ProgressBar.Circle("#moveProgress", {
        strokeWidth: 15,
        easing: "easeOut",
        color: "#FFEA82",
        text: {
          value: "Moving"
        },
        fill: "rgba(0, 0, 0, 0.8)"
      });

      progress.animate(
        1,
        {
          duration: newProps.currentWeight * 400
        },
        () => {
          progress.destroy();
        }
      );
    }
  };

  componentDidMount = () => {};

  render() {
    const adjNodes = this.props.getAdjNodes();
    let {
      playerName,
      playerScore,
      opponentName,
      opponentScore
    } = this.props.data;

    return (
      <SGameOverlay>
        <SScore>
          <h1>
            {playerScore +
              "  " +
              playerName +
              " | " +
              opponentName +
              "  " +
              opponentScore}
          </h1>
        </SScore>
        <SMoveProgress id="moveProgress" moving={this.props.moving} />
      </SGameOverlay>
    );
  }
}

export default GameOverlay;
