import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const theme = {
  primary: "#2453c9",
  creme: "#fffcf5"
};

const SMainMenu = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  padding-top: 10vh;

  h1 {
    color: white;
    font-size: 5em;
    margin-bottom: 10vh;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 2.5em;
      margin: 15px 0px 10vh;
    }
  }
`;

const SButton = styled.div`
  /* outline: 1px black dotted; */
  div {
    display: inline-block;
    background-color: ${theme.primary};
    margin: 15px;
    padding: 15px 50px;
    border-radius: 50px;
    p,
    a {
      transition: all 100ms ease-out;
      font-size: 1.5em;
      color: white;
    }

    :hover {
      cursor: pointer;
      p,
      a {
        color: limegreen;
      }
    }
  }
`;

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SMainMenu>
        <h1>Dijkstra's Arena</h1>
        <SButton onClick={() => this.props.history.push("/intro")}>
          <div>
            <p>Introduction</p>
          </div>
        </SButton>
        <SButton onClick={() => this.props.history.push("/learn")}>
          <div>
            <p>Learn Dijkstra</p>
          </div>
        </SButton>
        <SButton onClick={() => this.props.history.push("/game")}>
          <div>
            <p>Compete</p>
          </div>
        </SButton>
        <SButton>
          <div>
            <a
              href="https://github.com/rogerwangcs/Dijkstras-Arena"
              target="_blank"
              rel="noopener noreferrer"
            >
              Algorithms Report
            </a>
          </div>
        </SButton>
        <SButton>
          <div>
            <a
              href="https://github.com/rogerwangcs/Dijkstras-Arena"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>
        </SButton>
      </SMainMenu>
    );
  }
}

export default withRouter(MainMenu);
