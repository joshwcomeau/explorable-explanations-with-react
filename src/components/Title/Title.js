import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import GameOfLife from '../GameOfLife';
import WindowDimensions from '../WindowDimensions';
import AudioOutput from '../AudioOutput';
import Oscillator from '../Oscillator';

class Title extends Component {
  state = {
    // Later in this presentation, I have some audible tones.
    // It occurs to me that it would be nice to know if the audio works earlier!
    // So, this title slide can toggle a simple sine wave on/off.
    playTestTone: false,
  };

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeypress);
  }

  handleKeypress = ev => {
    if (ev.key === 'p') {
      this.setState(state => ({
        playTestTone: !state.playTestTone,
      }));
    }
  };

  render() {
    const { playTestTone } = this.state;

    return (
      <AudioOutput masterVolume={5}>
        {(audioCtx, masterOut) => (
          <Fragment>
            <TitleText>Explorable Explanations with React</TitleText>
            <WindowDimensions>
              {({ width, height }) => (
                <GameOfLifeWrapper>
                  <GameOfLife
                    width={width}
                    height={height}
                    colors={[
                      '#FFFFFF',
                      COLORS.indigo[500],
                      COLORS.purple[500],
                      COLORS.pink[500],
                    ]}
                    framesPerTick={80}
                  />
                </GameOfLifeWrapper>
              )}
            </WindowDimensions>
            {playTestTone && (
              <Oscillator
                slidePitch={false}
                audioCtx={audioCtx}
                masterOut={masterOut}
                frequency={440}
                amplitude={0.08}
              />
            )}
          </Fragment>
        )}
      </AudioOutput>
    );
  }
}

const TitleText = styled.h1`
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0px;
  text-align: left;
  display: block;
  padding: 20px 30px;
  margin: 10px;
  font-family: 'Raleway';
  font-weight: 900;
  font-size: 3vw;
  color: ${COLORS.white};
  background: ${COLORS.gray[900]};
`;

const GameOfLifeWrapper = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
`;

export default Title;
