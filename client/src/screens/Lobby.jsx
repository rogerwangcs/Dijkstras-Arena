import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

const SLobby = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  h1 {
    margin: 100px;
  }
`;

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      queued: false
    };
  }

  // componentDidMount = () => {
  //   this.props.enterQueue("test user");
  // };

  onInput = e => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  submitQueue = () => {
    if (this.state.name.length > 0) {
      this.setState({ queued: true });
      this.props.enterQueue(this.state.name.substring(0, 12));
    } else {
      alert("Enter a name");
    }
  };

  render() {
    return (
      <SLobby>
        <h1>Lobby</h1>
        {this.state.queued ? (
          <React.Fragment>
            <h1>Matching with Opponents...</h1>
            <button
              style={{ fontSize: "36px" }}
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Cancel
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              value={this.state.name}
              onChange={this.onInput}
              placeholder="Your name"
              style={{ fontSize: "36px" }}
            ></input>
            <button style={{ fontSize: "36px" }} onClick={this.submitQueue}>
              Play
            </button>
          </React.Fragment>
        )}
      </SLobby>
    );
  }
}

export default withRouter(Lobby);
