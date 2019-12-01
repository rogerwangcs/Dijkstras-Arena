import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

const SLobby = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  h1 {
    color: white;
    font-size: 5em;
    margin: 100px;
  }
  h2 {
    color: white;
    font-size: 2em;
    margin: 100px;
  }
`;

class Lobby extends Component {
  constructor(props) {
    super(props);

    let name = "";
    if (localStorage.getItem("playerName") !== null) {
      name = localStorage.getItem("playerName");
    }

    this.state = {
      name: name,
      queued: false
    };
  }

  onInput = e => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  submitQueue = () => {
    if (this.state.name.length > 0) {
      this.setState({ queued: true });
      this.props.enterQueue(this.state.name.substring(0, 12));
      localStorage.setItem("playerName", this.state.name);
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
            <h2>Matching with Opponents...</h2>
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
            <form onSubmit={this.submitQueue}>
              <input
                value={this.state.name}
                onChange={this.onInput}
                placeholder="Your name"
                style={{ fontSize: "36px" }}
              ></input>
              <button style={{ fontSize: "36px" }} type="submit">
                Play
              </button>
            </form>
          </React.Fragment>
        )}
      </SLobby>
    );
  }
}

export default withRouter(Lobby);
