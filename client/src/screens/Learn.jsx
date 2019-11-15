import React, { Component } from "react";
import styled from "styled-components";

const SLearn = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <SLearn>Learn</SLearn>;
  }
}

export default Learn;
