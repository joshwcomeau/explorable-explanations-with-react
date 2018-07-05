// Import React
import React from 'react';
import { injectGlobal } from 'styled-components';
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
import createTheme from 'spectacle/lib/themes/default';

import { COLORS } from './constants';

import TitleSlide from './slides/Title';

import Waveform from './components/Waveform';
import WaveformCalculator from './components/WaveformCalculator';

// Require CSS
require('normalize.css');

// HACK: Spectacle applies a `transform: scale(1)` to all slides.
// This means that any children with position: fixed don't actually position
// themselves relative to the viewport, they position themselves relative to
// the 1000x700px slide container.
// This class allows us to override that scale, since none of my slides use
// scale in transitions anyway.
injectGlobal`
  .spectacle-content {
    transform: none !important;
  }
`;

const theme = createTheme(
  {
    primary: '#FFFFFF',
    secondary: '#222222',
    pink: COLORS.pink[500],
    red: COLORS.red[500],
    green: COLORS.green[700],
    blue: COLORS.blue[500],
    indigo: COLORS.indigo[700],
    purple: COLORS.purple[500],
  },
  {
    primary: 'Lato',
    secondary: 'Playfair Display',
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={['fade']} transitionDuration={500} theme={theme}>
        <Slide>
          <TitleSlide />
        </Slide>

        <Slide>
          <WaveformCalculator
            width={500}
            height={250}
            frequency={1}
            amplitude={1}
          >
            {points => <Waveform width={500} height={250} points={points} />}
          </WaveformCalculator>
        </Slide>
      </Deck>
    );
  }
}
