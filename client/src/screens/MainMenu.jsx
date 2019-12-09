import React, { Component } from "react";
import { withRouter } from "react-router";
import Particles from "react-particles-js";
import styled from "styled-components";

const theme = {
  primary: "#2453c9",
  creme: "#fffcf5"
};

const SMainMenu = styled.div`
  position: relative;
  z-index: 100;
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

const particleParams = {
  number: {
    value: 1,
    density: {
      enable: true,
      value_area: 800
    }
  },
  color: {
    value: "#ffffff"
  },
  shape: {
    type: "circle",
    stroke: {
      width: 0,
      color: "#000000"
    },
    polygon: {
      nb_sides: 5
    }
  },
  opacity: {
    value: 1,
    random: false,
    anim: {
      enable: false,
      speed: 1,
      opacity_min: 0.1,
      sync: false
    }
  },
  size: {
    value: 10,
    random: true,
    anim: {
      enable: false,
      speed: 40,
      size_min: 0.1,
      sync: false
    }
  },
  line_linked: {
    enable: true,
    distance: 150,
    color: "#ffffff",
    opacity: 1,
    width: 1
  },
  move: {
    enable: true,
    speed: 6,
    direction: "none",
    random: false,
    straight: false,
    out_mode: "out",
    bounce: false,
    attract: {
      enable: false,
      rotateX: 600,
      rotateY: 1200
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse"
      },
      onclick: {
        enable: false,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  }
};

const StyledParticles = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
`;

const SButton = styled.div`
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
      <React.Fragment>
        <StyledParticles>
          <Particles params={particleParams} />
        </StyledParticles>
        <SMainMenu>
          <h1>Dijkstra's Arena</h1>
          {/*
        <SButton onClick={() => this.props.history.push("/intro")}>
          <div>
            <p>Introduction</p>
          </div>
         </SButton>
         */}
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
      </React.Fragment>
    );
  }
}

export default withRouter(MainMenu);
