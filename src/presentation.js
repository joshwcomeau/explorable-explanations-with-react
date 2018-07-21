// Import React
import React from 'react';
import { injectGlobal } from 'styled-components';
import { Cite, Deck, Heading, ListItem, List, Slide, Text } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import preloader from 'spectacle/lib/utils/preloader';

import { COLORS } from './constants';

import spacerSrc from './assets/spacer.png';
import unlikelyAnimalFriendships1Src from './assets/unlikely-animal-friendships-1.gif';
import unlikelyAnimalFriendships2Src from './assets/unlikely-animal-friendships-2.mp4';
import telloDemoSrc from './assets/tello-demo.mp4';
import guppyDemoSrc from './assets/guppy-demo.mp4';

import TitleSlide from './slides/Title';
import IntroSlide from './slides/Intro';

import Highlighted from './components/Highlighted';
import Quote from './components/Quote';
import Waveform from './components/Waveform';
import WaveformCalculator from './components/WaveformCalculator';

preloader({
  spacerSrc,
  unlikelyAnimalFriendships1Src,
  unlikelyAnimalFriendships2Src,
});

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

  a {
    color: ${COLORS.blue[700]}
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
    secondary: 'Raleway',
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
          <IntroSlide />
        </Slide>

        <Slide>
          <Heading size={3}>Things I Like:</Heading>
          <img src={spacerSrc} height={500} />
        </Slide>

        <Slide transition={['none']}>
          <Heading size={3}>Things I Like:</Heading>
          <img src={unlikelyAnimalFriendships1Src} height={500} />
        </Slide>

        <Slide transition={['none']}>
          <Heading size={3}>Things I Like:</Heading>
          <video
            autoPlay
            loop
            src={unlikelyAnimalFriendships2Src}
            style={{
              height: 500,
              margin: 'auto',
            }}
          />
        </Slide>

        <Slide transition={['none']}>
          <Heading size={3}>Things I Like:</Heading>
          <video
            autoPlay
            loop
            src={telloDemoSrc}
            style={{
              height: 500,
              margin: 'auto',
            }}
          />
        </Slide>

        <Slide transition={['none']}>
          <Heading size={3}>Things I Like:</Heading>
          <video
            autoPlay
            loop
            src={guppyDemoSrc}
            style={{
              height: 500,
              margin: 'auto',
            }}
          />
        </Slide>

        <Slide>
          <Quote>
            "...I'm in my third year studying sound engineering for film, and
            after reading this{' '}
            <Highlighted>
              I finally understand how harmonics and waveforms work.
            </Highlighted>{' '}
            I've known what harmonics and waveforms are, as well as their
            different applications. But they way it has always been taught to
            me,{' '}
            <Highlighted>
              I could just never understand <em>why</em> they are.
            </Highlighted>{' '}
            Thank you for explaining this to me in a way no one else has been
            able to."
          </Quote>
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
