import React, {Fragment} from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Cite, Deck, Heading, ListItem, List, Slide, Text } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import preloader from 'spectacle/lib/utils/preloader';

import { COLORS } from './constants';
import {convertProgressToOffset} from './helpers/waveform.helpers';

import spacerSrc from './assets/spacer.png';
import basketballSrc from './assets/basketball.gif';
import telloDemoSrc from './assets/tello-demo.mp4';
import guppyDemoSrc from './assets/guppy-demo.mp4';

import TitleSlide from './slides/Title';
import IntroSlide from './slides/Intro';

import Highlighted from './components/Highlighted';
import Quote from './components/Quote';
import Waveform from './components/Waveform';
import AirGrid from './components/AirGrid';
import Spacer from './components/Spacer';
import WaveformCalculator from './components/WaveformCalculator';
import WaveformIntercept from './components/WaveformIntercept';
import AmplitudeFrequencyManager from './components/AmplitudeFrequencyManager';

preloader({
  spacerSrc,
  basketballSrc,
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
        <Heading size={3}>I like building things</Heading>
        </Slide>

        <Slide>
          <Heading size={3}>Tello</Heading>
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

        <Slide >
          <Heading size={3}>Guppy</Heading>
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

        <Slide
          notes={`
            I usually have a side project going, and earlier this year I wanted
            to try something different. Before I got into programming, I was
            an audio engineer. I've always been fascinated by how
            sound works, the physics of sound are really interesting.

            And yet, it's specialized, institutional knowledge for audio
            engineers and other folks who work with sound. It's not common
            knowledge. And I think the reason for that is that sound is a
            complex system, and it's hard to learn through traditional methods.
          `}
        >
          <Heading size={1}>🔊</Heading>
        </Slide>

        <Slide
          notes={`
            For example, when you search for this stuff on Google, you get
            articles like this. I don't want to denigrate this page, or others
            like it, because the authors clearly put a lot of time and care
            into creating something helpful, but it's a tall order for someone
            without an audio background to be presented with words and pictures,
            and to come away with a working intuitive knowledge for complex
            systems.

            There's a couple things that make this tough.
          `}
        >
          Screenshot of https://method-behind-the-music.com/mechanics/physics/
        </Slide>

        <Slide
          notes={`
            The first is that language is lossy.

            Words are a way to try and transmit an idea from my head to yours,
            but at best they're a rough approximation. Complex systems aren't
            easily compressed into a handful of vocal bits, it would take hours
            of talking just to go over all the rules of a system.

            And, it still wouldn't be sufficient, because...
          `}
        >
          <Heading size={3}>Language is lossy</Heading>
        </Slide>

        <Slide
          notes={`
            ...learning is active. Deep, intuitive understanding requires that
            your brain not only absorb the words, but think about them, make
            the connections, create a working model of the system. And it's
            hard to bridge the gap between theoretical and intuitive
            understanding
          `}
        >
          <Heading size={3}>Learning is active</Heading>
        </Slide>

        <Slide
          notes={`
            The best way to do that is through experimentation.

            Our brains are really good at building intuition through
            experimentation. We all understand how gravity works because we can
            toss things in the air and see how they react.
          `}
        >
          <Heading size={1}>👩‍🔬</Heading>
        </Slide>

        <Slide
          notes={`
            When you think about
            it, basketball players are amazing, because it demonstrates such
            deep understanding of how gravity affects objects. And they develop
            that skill not through reading about acceleration and mass, but by
            throwing things and seeing what happens
          `}
        >
          <img src={basketballSrc} />
        </Slide>

        <Slide
          notes={`
            So I wanted to build a thing that would let people learn about
            sound by experimenting.
          `}
        >
          <AmplitudeFrequencyManager>
            {({amplitude, frequency, progress}) => (
              <AirGrid
                shape="sine"
                width={600}
                height={300}
                waveformAmplitude={amplitude}
                waveformFrequency={frequency}
                waveformProgress={progress}
              />
            )}
          </AmplitudeFrequencyManager>
        </Slide>

        <Slide
          notes={`
            So I wanted to build a thing that would let people learn about
            sound by experimenting.
          `}
        >
          <AmplitudeFrequencyManager>
            {({amplitude, frequency, progress}) => (
              <Row>
                <div style={{position: 'relative' }}>
                  <WaveformCalculator
                    width={300}
                    height={150}
                    frequency={frequency}
                    amplitude={amplitude}
                    progress={progress}
                  >
                    {points => <Waveform width={400} height={200} points={points} />}
                  </WaveformCalculator>
                  <WaveformIntercept
                    size={20}
                    color={COLORS.primary[500]}
                    waveformSize={300}
                    waveformShape="sine"
                    frequency={frequency}
                    amplitude={amplitude}
                    offset={convertProgressToOffset(progress)}
                  />
                </div>
                <Spacer size={40} />
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
                />
              </Row>
            )}
          </AmplitudeFrequencyManager>
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

const Row = styled.div`
  display: flex;
`
