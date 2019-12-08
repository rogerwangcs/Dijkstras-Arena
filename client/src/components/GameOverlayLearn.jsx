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

const STeachMe = styled.div`
position: absolute;
top: 10px;
right: 100px;
transform: translate(-50%);
width: 100px;
height: 100px;
margin: 25px;
border-radius: 50%;
background-color: gray;
border: 10px solid lightgray;
h1 {
  line-height: 100px;
  font-size: 1.5em;
  color: white;
}
:hover {
  cursor: pointer;
  background-color: lightgray;
}
`;

const DistanceContainer = styled.div`
display: ${props => props.teacher ? "block" : "none"};
  position: absolute;
  top: 0;
  left: 0;
`;

const PQContainer = styled.div`
display: ${props => props.teacher ? "block" : "none"};
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

const PQItem = styled.div`
  .block {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-color: white;
    border: 1px solid black;
    /* border-radius: 50%; */
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
  display: ${props => props.teacher ? "block" : "none"};
  position: absolute;
  top: 75vh;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  .node {
    display: ${props => props.teacher ? "block" : "none"};
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
      background-color: lightgray;
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
    this.state = {
      teacher: false,
      text: "TeachMe"
    };
  }

  startTeacher = () => {
      this.setState({teacher: !this.state.teacher});
      if (this.state.text == "TeachMe") {
        this.state.text = "Hide";
      } else {
        this.state.text = "TeachMe"
      }
  }

  showW = () => {
    if (this.props.teacher) {
      return <h1>Hide</h1>;
    } else {
      return <h1>TeachMe</h1>;
    }
  }

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
        <PQItem>
          <div className="block">
            <h1>{node.data}</h1>
          </div>
          <div className="block">
            <h1>{node.priority}</h1>
          </div>
        </PQItem>
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
        <DistanceContainer teacher={this.state.teacher}>{Distances}</DistanceContainer>
        <PQContainer teacher={this.state.teacher}>{PQueue}</PQContainer>
        {/* <ExploreContainer>{ExploreOptions}</ExploreContainer> */}
        <ExploreContainer teacher={this.state.teacher}>
          <div className="node" onClick={this.props.stepFn}>
            <h1>Step</h1>
          </div>
        </ExploreContainer>
        <STeachMe onClick={()=> this.startTeacher()}>
          <h1>{this.state.text}</h1>
        </STeachMe>
      </SGameOverlayLearn>
    );
  }
}

export default GameOverlayLearn;
