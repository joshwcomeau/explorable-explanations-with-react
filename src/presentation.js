import React, { Fragment } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Cite, Deck, Heading, ListItem, List, Slide, Text } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import preloader from 'spectacle/lib/utils/preloader';

import { COLORS } from './constants';
import { convertProgressToOffset } from './helpers/waveform.helpers';

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
import GridVsWave from './components/GridVsWave/GridVsWave';

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

        {/* <Slide>
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

        <Slide>
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
        </Slide> */}

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
            {({ amplitude, frequency, progress }) => (
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

        <Slide
          notes={`
            So I wanted to build a thing that would let people learn about
            sound by experimenting.
          `}
        >
          <GridVsWave />
        </Slide>

        <Slide>
          Go do a demo Should show the controls, look at how concepts are
          explained. Get to the harmonics / different shapes, and say "We don't
          have to understand how sound works, not a good use of time, but
          hopefully it's clear how this kind of stuff is incredibly useful in
          understanding complex ideas"
        </Slide>

        <Slide />

        <Slide
          notes={`
            After releasing this project, I got a ton of really nice feedback
            like this. This wasn't an outlier. I also heard from college professors who said they'd use it, which is amazing.
          `}
        >
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

        <Slide
          notes={`
            I did not come up with this idea, for interactive learning experiences. The common term used is "Explorable Explanations".

            There's a whole community of people building these things.
          `}
        >
          Explorable Explanations
        </Slide>

        <Slide
          notes={`
            But not a lot of people building these kinds of experiences are using React. It's this separate community with very little overlap.
          `}
        >
          Explorable Explanations :broken-heart: React
        </Slide>

        <Slide
          notes={`
            And React is a great tool for building these kinds of things!

            For example, can you imagine how much gross imperative spaghetti would be required to handle all the different state changes in this project? That waveform in the left does a lot of things!

            With React, I was able to build small, simple components and compose them together as needed to build a complex experience. If I wasn't using React for this, it would have been a lot buggier.
          `}
        >
          Video clip of waveforms project
        </Slide>

        <Slide
          notes={`
            Let's take a look at how I used React to build this thing.
          `}
        >
          How It's Made screen grab?
        </Slide>

        <Slide
          notes={`
            The first thing I needed was a Waveform component, and the first step was figuring out if I wanted to use Canvas or SVG.

            In general, I prefer SVG - it's easier to work with in React, it's easier to inspect with browser tools, it's more accessible. But I wasn't sure if performance would suffer.

            So I built it using both technologies, a task that is surprisingly easy, since both technologies have very similar drawing APIs.
          `}
        >
          Canvas SVG
        </Slide>

        <Slide
          notes={`
            And it turns out that there was no measurable difference in performance, so SVG it was!
          `}
        >
          Canvas SVG (Winner!)
        </Slide>

        <Slide>
          Early version of SVG Waveform. Have it take `shape` as a prop, either
          sine or triangle or w/e Maybe have a bunch of `???` where the actual
          "calculate path" goes.
        </Slide>

        <Slide
          notes={`
            How do you actually draw a sine wave, though?

            I looked into fancy solutions involving Bézier curves, but that got hairy really fast.

            It turns out that the simplest solution was just to draw straight lines. a _lot_ of them. This sine wave is 500px wide, and so it has 500 1px lines.
          `}
        >
          <Heading size={1}>🤔</Heading>

          <WaveformCalculator
            width={500}
            height={250}
            frequency={1}
            amplitude={1}
          >
            {points => <Waveform width={500} height={250} points={points} />}
          </WaveformCalculator>
        </Slide>

        <Slide>
          Show simplest-possible version of calculating points, done inline in
          the component
        </Slide>

        <Slide
          notes={`
            There's a problem with this, though.

            Our waveform is going to get a lot more complicatd.

            For one thing, we'll need to be able to play this animation.

            There's also waveform addition, where the waveform is some
            halfway point between different shapes.

            We COULD have a giant, monolithic <Waveform> component that does everything, but the beautiful thing with React is that you can compose your components so that no component ever gets that complicated.
          `}
        >
          Problem GIF?
        </Slide>

        <Slide
          notes={`
            What if instead of taking a shape prop, the waveform took
            an array of points?

            Then, our Waveform component is only responsible for translating
            the point values into an SVG path.
          `}
        >
          Waveform consumption, with shape replaced by points
        </Slide>

        <Slide
          notes={`
            Then, we can create a new component, WaveformCalculator, which
            computes the points for a given shape.

          `}
        >
          Waveform consumption with WaveformCalculator
        </Slide>

        <Slide
          notes={`
            In the demo, we had a lot of additional adornments, like having axes that fade in when needed.

            An instinct might be to add a prop to the <Waveform> component, like 'showYAxis' and 'showXAxis', but we don't need to do that; we can just create a separate component.
          `}
        >
          Lego blocks image
        </Slide>

        <Slide>WaveformAxis component</Slide>

        <Slide
          notes={`
            I'm a fan of creating wrappers that combine simpler blocks in specific ways.

            We have a number of these pieces, so let's construct a ready-to-use wrapper, I'll call it ReactRallyWaveform.

            It'll have our WaveformCalculator, a Waveform, and then a couple axes.

            It'll also hold the state for our waveform.
          `}
        >
          ReactRallyWaveform component definition, consuming the others.
        </Slide>

        <Slide
          notes={`
            This is looking pretty good... but our waveform doesn't move yet!

            The waveform animation for "playing" is really just about rotating the shape through its possible positions by changing where the drawing starts from. In sound terminology, we're modifying the waveform's phase.

            It would also be nice if when we toggle it to stop, it doesn't just stop immediately, it stops when it hits the next cycle.
          `}
        >
          Waveform with a start/stop toggle
        </Slide>

        <Slide
          notes={`
            So the first thing we need is to know how much time has passed...
            if we know our frequency, and how much time has passed, we'll know
            where to draw it from.

            Let's create a new component, WaveformStopwatch.
          `}
        >
          ReactRallyWaveform with WaveformStopwatch added
        </Slide>

        <Slide>WaveformStopwatch code</Slide>
      </Deck>
    );
  }
}
