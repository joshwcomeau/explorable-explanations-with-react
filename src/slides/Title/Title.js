import React, { Component, Fragment } from 'react';
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';
import styled from 'styled-components';

import GameOfLife from '../../components/GameOfLife';
import WindowDimensions from '../../components/WindowDimensions';

class Title extends Component {
  render() {
    return (
      <Fragment>
        <TitleText size={2} textColor="secondary" textFont="secondary">
          Explorable Explanations with React
        </TitleText>
        <WindowDimensions>
          {({ width, height }) => (
            <GameOfLifeWrapper>
              <GameOfLife
                width={width}
                height={height}
                colors={['#FFFFFF', '#f4f4f4', '#ececec', '#e0e0e0', '#dadada']}
                framesPerTick={90}
              />
            </GameOfLifeWrapper>
          )}
        </WindowDimensions>
      </Fragment>
    );
  }
}

const TitleText = styled(Heading)`
  position: relative;
  z-index: 1;
`;

const GameOfLifeWrapper = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
`;

export default Title;
