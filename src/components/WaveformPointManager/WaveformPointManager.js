/**
 * IGNORE ME
 * This component is from a prior universe. It still exists only because I
 * didn't have time to backtrack and clean up old components.
 */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Slider from '../Slider';
import WaveformOld from '../WaveformOld';
import WaveformCalculator from '../WaveformCalculator';

class WaveformPointManager extends Component {
  state = {
    pixelRatio: 100,
  };

  updatePixelRatio = val => this.setState({ pixelRatio: val });

  render() {
    return (
      <Wrapper>
        <WaveformCalculator
          pixelRatio={this.state.pixelRatio}
          width={500}
          height={250}
        >
          {points => <WaveformOld width={500} height={250} points={points} />}
        </WaveformCalculator>
        <br />
        <br />
        <Slider
          label="distance between points"
          min={2}
          max={150}
          step={1}
          value={this.state.pixelRatio}
          onChange={this.updatePixelRatio}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 500px;
  margin: auto;
`;

export default WaveformPointManager;
