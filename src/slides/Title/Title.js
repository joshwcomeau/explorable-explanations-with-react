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
import { COLORS } from '../../constants';

class Title extends Component {
  render() {
    return (
      <Fragment>
        <TitleText>Explorable Explanations with React</TitleText>
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
