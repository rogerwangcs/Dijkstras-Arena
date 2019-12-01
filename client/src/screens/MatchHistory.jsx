import React, { Component } from "react";
import styled from "styled-components";

const SMatchHistory = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMatches = () => {
    return JSON.parse(localStorage.getItem("matchHistory"));
  };

  render() {
    let matches = this.getMatches.map(match => {
      return <div>{match}</div>;
    });

    return (
      <SMatchHistory>
        <h1>Match History</h1>
        {matches}
      </SMatchHistory>
    );
  }
}

export default MatchHistory;
