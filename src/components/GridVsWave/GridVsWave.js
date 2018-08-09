import React, { Component, Fragment } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { convertProgressToOffset } from '../../helpers/waveform.helpers';

import AirGrid from '../AirGrid';
import Spacer from '../Spacer';
import Waveform from '../Waveform';
import WaveformCalculator from '../WaveformCalculator';
import WaveformIntercept from '../WaveformIntercept';
import AmplitudeFrequencyManager from '../AmplitudeFrequencyManager';
import Toggle from '../Toggle';
import WaveformAxis from '../WaveformAxis';

class GridVsWave extends Component {
  state = {
    highlightMolecule: false,
    rotateWaveform: false,
  };

  render() {
    const {
      highlightMolecule,
      rotateWaveform,
    } = this.state;

    return (
      <Fragment>
        <AmplitudeFrequencyManager>
          {({ amplitude, frequency, progress }) => (
            <Motion
              style={{
                frequency: spring(frequency),
                amplitude: spring(amplitude),
              }}
            >
              {({ frequency, amplitude }) => (
                <Fragment>
                  <Row>
                    <AirGrid
                      shape="sine"
                      width={400}
                      height={200}
                      numOfCols={13}
                      numOfRows={13}
                      waveformAmplitude={
                        // HACK: For some reason, the numOfRows/numOfCols affects
                        // how tightly-bound they are
                        amplitude * 0.5
                      }
                      waveformFrequency={frequency}
                      waveformProgress={progress}
                      highlightColumnIndex={
                        highlightMolecule
                          ? 0
                          : undefined
                      }
                    />

                    <Spacer size={70} />

                    <div
                      style={{
                        position: 'relative',
                        transformOrigin:
                          'center center',
                        transform: rotateWaveform
                          ? 'rotate(90deg) translateX(-5%)'
                          : 'rotate(0deg) translateX(0)',
                        transition:
                          'transform 1000ms',
                      }}
                    >
                      <WaveformCalculator
                        width={350}
                        height={175}
                        frequency={frequency}
                        amplitude={amplitude}
                        progress={progress}
                      >
                        {points => (
                          <Fragment>
                            <Waveform
                              width={350}
                              height={175}
                              points={points}
                              color={
                                highlightMolecule
                                  ? COLORS.gray[200]
                                  : COLORS.gray[900]
                              }
                            />
                            <WaveformAxis
                              x
                              waveformSize={350}
                              color={
                                highlightMolecule
                                  ? COLORS.gray[200]
                                  : COLORS.gray[700]
                              }
                              strokeWidth={3}
                            />
                            <WaveformAxis
                              y
                              waveformSize={350}
                              color={
                                highlightMolecule
                                  ? COLORS.gray[200]
                                  : COLORS.gray[700]
                              }
                              strokeWidth={3}
                            />
                          </Fragment>
                        )}
                      </WaveformCalculator>
                      {highlightMolecule && (
                        <WaveformIntercept
                          size={20}
                          color={
                            COLORS.primary[500]
                          }
                          waveformSize={350}
                          waveformShape="sine"
                          frequency={frequency}
                          amplitude={amplitude}
                          offset={convertProgressToOffset(
                            progress
                          )}
                        />
                      )}
                    </div>
                  </Row>
                </Fragment>
              )}
            </Motion>
          )}
        </AmplitudeFrequencyManager>
        <Row>
          <Col>
            <Toggle
              isToggled={highlightMolecule}
              onToggle={() =>
                this.setState({
                  highlightMolecule: !this.state
                    .highlightMolecule,
                })
              }
            />
            <Spacer size={10} />
            Highlight Molecule
          </Col>
          <Spacer size={70} />

          <Col>
            <Toggle
              isToggled={rotateWaveform}
              onToggle={() =>
                this.setState({
                  rotateWaveform: !this.state
                    .rotateWaveform,
                })
              }
            />
            <Spacer size={10} />
            Rotate Waveform
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const Row = styled.div`
  display: flex;
  width: 810px;
  margin: auto;
  margin-top: 35px;
`;

const Col = styled.div`
  flex: 1;
  text-align: left;
  font-size: 24px;
  display: flex;
  align-items: center;
`;

export default GridVsWave;
