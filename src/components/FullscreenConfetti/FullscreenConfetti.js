import React, { Component } from 'react';
import styled from 'styled-components';

import Confetti from '../Confetti';

class FullscreenConfetti extends Component {
  render() {
    return (
      <Wrapper>
        <Confetti
          // TODO: Resize handling
          width={window.innerWidth}
          height={window.innerHeight}
          makeItRainOn="mount"
          numParticles={800}
          emitDuration={6000}
          minScale={1}
          maxScale={3}
          spin={10}
          minSpeed={100}
          maxSpeed={200}
          gravity={1000}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: fixed;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export default FullscreenConfetti;
