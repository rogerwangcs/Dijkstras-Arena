import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

import dijkstra from "../utils/Dijkstras2";

const theme = {
  primary: "#2453c9",
  creme: "#fffcf5"
};

const SMainMenu = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${theme.creme};

  padding-top: 10vh;

  h1 {
    font-size: 6em;
    margin-bottom: 10vh;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 3em;
    }
  }
`;

const SButton = styled.div`
  /* outline: 1px black dotted; */
  div {
    display: inline-block;
    background-color: ${theme.primary};
    margin: 25px;
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

  componentDidMount = () => {
    dijkstra();
  };
  render() {
    return (
      <SMainMenu>
        <h1>Dijkstra's Arena</h1>
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
