// This is a very lazy VennDiagram component
// It assumes only 2 objects with not much overlap.
import React, { Component } from "react";
import styled from "styled-components";

class VennDiagram extends Component {
  render() {
    const {set1, set2, overlap} = this.props;
    return (
      <Wrapper>
        <Circle1>{set1}</Circle1>
        <Circle2 overlap={overlap}>{set2}</Circle2>
      </Wrapper>
    )
  }
}


const SIZE = 325;

const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
`

const Circle = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border: 7px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const Circle1 = Circle.extend`
  background-color: rgba(255, 191, 0, 0.5);
  border-color: rgb(255, 191, 0);
`

const Circle2 = Circle.extend`
  background: rgba(68, 134, 255, 0.5);
  border-color: rgb(68, 134, 255);
  margin-left: ${props => props.overlap / 100 * -SIZE}px;
`

export default VennDiagram;
