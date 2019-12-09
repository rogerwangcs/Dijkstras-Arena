import React, { Component } from "react";
import styled from "styled-components";

const SGameOverlayLearn = styled.div`
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
`;

const HeadText = styled.h1`
  display: ${props => (props.active ? "block" : "none")};
  position: absolute;
  font-size: 28px;
  color: white;

  @media (max-width: 500px) {
    font-size: 1em;
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

const DistanceContainer = styled.div`
  display: ${props => (props.active ? "block" : "none")};
  overflow: auto;
  position: absolute;
  max-height: calc(100vh - 70px);
  top: 56px;
  left: 20px;
  border-radius: 5px;
`;

const PQContainer = styled.div`
  display: ${props => (props.active ? "block" : "none")};
  overflow: auto;
  position: absolute;
  max-height: calc(100vh - 70px);
  top: 56px;
  right: 20px;
  border-radius: 5px;
`;

const DistanceItem = styled.div`
  .block {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-color: rgb(225, 225, 225);
    border: 1px solid black;
    h1 {
      line-height: 64px;
      margin: auto;
      vertical-align: center;
    }

    @media (max-width: 500px) {
      width: 32px;
      height: 32px;
      h1 {
        font-size: 1.2em;
        line-height: 32px;
      }
    }
  }
`;

const ExploreContainer = styled.div`
  position: absolute;
  top: 75vh;
  left: 50%;
  transform: translate(-50%);
  display: flex;
`;

const Node = styled.div`
  display: ${props => (props.active ? "block" : "none")};
  width: 100px;
  height: 100px;
  margin: 25px;
  border-radius: 25px;
  background-color: rgba(200, 200, 200, 0.5);
  border: 3px solid darkgray;
  h1 {
    line-height: 100px;
    font-size: 1.5em;
    color: white;
  }
  :hover {
    cursor: pointer;
    background-color: rgba(175, 175, 250, 0.9);
  }

  @media (max-width: 500px) {
    margin: 5px;
    width: 72px;
    height: 72px;
    border: 5px solid lightgray;
    h1 {
      line-height: 72px;
      font-size: 1em;
    }
  }
`;

class GameOverlayLearn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: false,
      text: "Helper"
    };
  }

  startTeacher = () => {
    this.setState({ teacher: !this.state.teacher });
    if (this.state.text == "Helper") {
      this.state.text = "Hide";
    } else {
      this.state.text = "Helper";
    }
  };

  showW = () => {
    if (this.props.teacher) {
      return <h1>Hide</h1>;
    } else {
      return <h1>TeachMe</h1>;
    }
  };

  render() {
    const step = this.props.step;

    const Distances = Object.keys(this.props.allDistances[step]).map(nodeId => {
      let distance = this.props.allDistances[step][nodeId];
      if (this.props.allDistances[step][nodeId] === null) {
        distance = "∞";
      }
      return (
        <DistanceItem>
          <div className="block">
            <h1>{nodeId}</h1>
          </div>
          <div className="block">
            <h1>{distance}</h1>
          </div>
        </DistanceItem>
      );
    });

    const PQueue = this.props.allPQ[step].map(node => {
      return (
        <DistanceItem>
          <div className="block">
            <h1>{node.data}</h1>
          </div>
          <div className="block">
            <h1>{node.priority}</h1>
          </div>
        </DistanceItem>
      );
    });

    const ExploreOptions = this.props.exploreOptions.map(option => {
      return (
        <div className="node">
          <h1>{option.node}</h1>
        </div>
      );
    });

    let isComplete = this.props.isLevelComplete();

    return (
      <SGameOverlayLearn>
        <SScore>
          <h1>
            Level: {this.props.level} <br /> Score: {this.props.score}
          </h1>
        </SScore>
        <HeadText
          style={{
            top: "10px",
            left: "23px"
          }}
          active={this.state.teacher}
        >
          Distances
        </HeadText>
        <DistanceContainer active={this.state.teacher}>
          {Distances}
        </DistanceContainer>
        <HeadText
          style={{
            top: "10px",
            right: "40px"
          }}
          active={this.state.teacher}
        >
          Queue
        </HeadText>
        <PQContainer active={this.state.teacher}>{PQueue}</PQContainer>
        <ExploreContainer active={this.state.teacher}>
          <Node onClick={this.props.stepFn} active={true}>
            <a
              href="https://www.youtube.com/watch?v=CL1byLngb5Q"
              target="_blank"
            >
              <h1>Tutorial</h1>
            </a>
          </Node>
          <Node onClick={() => this.startTeacher()} active={true}>
            <h1>{this.state.text}</h1>
          </Node>
          <Node onClick={this.props.stepFn} active={this.state.teacher}>
            <h1>Step</h1>
          </Node>
          <Node onClick={() => this.props.nextLevel()} active={isComplete}>
            <h1>Next</h1>
          </Node>
        </ExploreContainer>
      </SGameOverlayLearn>
    );
  }
}

export default GameOverlayLearn;
