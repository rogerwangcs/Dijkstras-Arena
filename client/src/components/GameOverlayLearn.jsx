import React, { Component } from "react";
import styled from "styled-components";

const SGameOverlayLearn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
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
  position: absolute;
  top: 0;
  left: 0;
`;

const ShortestPathContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const DistanceItem = styled.div`
  .block {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-color: white;
    border: 1px solid black;
    h1 {
      line-height: 64px;
      margin: auto;
      vertical-align: center;
    }

    @media (max-width: 500px) {
      width: 24px;
      height: 24px;
      h1 {
        font-size: 1em;
        line-height: 24px;
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
  .node {
    width: 100px;
    height: 100px;
    margin: 25px;
    border-radius: 50%;
    background-color: gray;
    border: 10px solid lightgray;
    h1 {
      line-height: 100px;
      font-size: 3em;
      color: white;
    }
    :hover {
      cursor: pointer;
    }

    @media (max-width: 500px) {
      margin: 15px;
      width: 72px;
      height: 72px;
      border: 5px solid lightgray;
      h1 {
        line-height: 72px;
        font-size: 2em;
      }
    }
  }
`;

class GameOverlayLearn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};

  render() {
    const Distances = Object.keys(this.props.distances).map(nodeId => {
      return (
        <DistanceItem>
          <div className="block">
            <h1>{nodeId}</h1>
          </div>
          <div className="block">
            <h1>{this.props.distances[nodeId]}</h1>
          </div>
        </DistanceItem>
      );
    });

    const ShortestPaths = Object.keys(this.props.shortestPaths).map(nodeId => {
      return (
        <DistanceItem>
          <div className="block">
            <h1>{this.props.shortestPaths[nodeId]}</h1>
          </div>
          <div className="block">
            <h1>{nodeId}</h1>
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

    return (
      <SGameOverlayLearn>
        <SScore>
          <h1>{this.props.score}</h1>
        </SScore>
        <DistanceContainer>{Distances}</DistanceContainer>
        <ShortestPathContainer>{ShortestPaths}</ShortestPathContainer>
        <ExploreContainer>{ExploreOptions}</ExploreContainer>
      </SGameOverlayLearn>
    );
  }
}

export default GameOverlayLearn;
