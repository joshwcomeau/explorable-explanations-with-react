import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Slider from '../Slider';
import Spacer from '../Spacer';
import Button from '../Button';
import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';
import Label from '../Label';
import Timekeeper from '../Timekeeper';

class ReactRallyWaveform extends Component {
  state = {
    frequency: 1,
    amplitude: 1,
    shape: 'sine',
  };

  static defaultProps = {
    width: 500,
    height: 250,
  };

  updateAmplitude = amplitude => {
    this.setState({ amplitude });
  };

  updateFrequency = frequency => {
    this.setState({ frequency });
  };

  updateShape = shape => {
    this.setState({ shape });
  };

  render() {
    const { width, height, useBrokenCalculator } = this.props;
    const { frequency, amplitude, shape, isRunning } = this.state;

    return (
      <Timekeeper eased multiplier={frequency}>
        {({ timeElapsed, isRunning, toggleRunning }) => (
          <Wrapper>
            <Waveform
              useBrokenCalculator={useBrokenCalculator}
              width={width}
              height={height}
              frequency={frequency}
              amplitude={amplitude}
              shape={shape}
              timeElapsed={timeElapsed}
              color={COLORS.blue[700]}
              strokeWidth={4}
            />

            <WaveformAxis
              x
              waveformSize={width}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <WaveformAxis
              y
              waveformSize={width}
              strokeWidth={4}
              strokeLinecap="round"
            />

            <Controls>
              <Row>
                <Column>
                  <Slider
                    label="amplitude"
                    min={0}
                    max={1}
                    step={0.01}
                    value={amplitude}
                    onChange={this.updateAmplitude}
                  />
                </Column>
                <Spacer size={30} />
                <Column>
                  <Slider
                    label="frequency"
                    min={0.05}
                    max={2}
                    step={0.01}
                    value={frequency}
                    onChange={this.updateFrequency}
                  />
                </Column>
              </Row>

              <Row>
                <Column>
                  <Label>Shape</Label>
                  <Button
                    isSelected={shape === 'sine'}
                    onClick={() => this.updateShape('sine')}
                  >
                    Sine
                  </Button>
                  <Button
                    isSelected={shape === 'triangle'}
                    onClick={() => this.updateShape('triangle')}
                  >
                    Triangle
                  </Button>
                  <Button
                    isSelected={shape === 'square'}
                    onClick={() => this.updateShape('square')}
                  >
                    Square
                  </Button>
                  <Button
                    isSelected={shape === 'sawtooth'}
                    onClick={() => this.updateShape('sawtooth')}
                  >
                    Sawtooth
                  </Button>
                </Column>
                <Spacer size={30} />
                <Column>
                  <Label>Play</Label>
                  <Button isSelected={isRunning} onClick={toggleRunning}>
                    Toggle
                  </Button>
                </Column>
              </Row>
            </Controls>
          </Wrapper>
        )}
      </Timekeeper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Controls = styled.div`
  width: 500px;
  margin-top: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin: 30px 0px;
`;

const Column = styled.div`
  flex: 1;
`;

const HalfWidthButton = Button.extend`
  width: calc(50% - 5px);
`;

export default ReactRallyWaveform;
