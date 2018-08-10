import React, {
  Component,
  Fragment,
} from 'react';
import { injectGlobal } from 'styled-components';
import {
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  ComponentPlayground,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import preloader from 'spectacle/lib/utils/preloader';
import CodeSlide from 'spectacle-code-slide';

import { COLORS } from './constants';

import spacerSrc from './assets/spacer.png';
import basketballSrc from './assets/basketball.gif';
import districtSrc from './assets/district-v2.mp4';
import traditionalSoundArticleSrc from './assets/traditional-sound-article.png';
import convergingSquareSrc from './assets/converging-square.gif';
import bananaPathSrc from './assets/banana-path.png';
import stopwatchSrc from './assets/stopwatch.jpg';
import phaseSrc from './assets/phase-4.gif';
import legoSrc from './assets/lego.jpeg';
import modularSynthSrc from './assets/modular-synth.jpg';
import allTheThingsFastSrc from './assets/all-the-things-fast.mp4';
import howItsMadeSrc from './assets/how-its-made.jpg';
import hadoukenSrc from './assets/hadouken.jpeg';

import TitleSlide from './slides/Title';
import IntroSlide from './slides/Intro';

import Highlighted from './components/Highlighted';
import Quote from './components/Quote';
import Waveform from './components/Waveform';
import AirGrid from './components/AirGrid';
import Spacer from './components/Spacer';
import WaveformCalculator from './components/WaveformCalculator';
import WaveformPointManager from './components/WaveformPointManager';
import AmplitudeFrequencyManager from './components/AmplitudeFrequencyManager';
import GridVsWave from './components/GridVsWave';
import Stopwatch from './components/Stopwatch';
import WaveformState from './components/WaveformState';
import StopwatchSimple from './components/Stopwatch/Stopwatch.no-animation';
import ReactRallyWaveformV1 from './components/ReactRallyWaveformV1';
import ReactRallyWaveformV2 from './components/ReactRallyWaveformV2';
import ReactRallyWaveformV3 from './components/ReactRallyWaveformV3';
import ReactRallyWaveformV4 from './components/ReactRallyWaveformV4';
import FullscreenConfetti from './components/FullscreenConfetti/FullscreenConfetti';
import UnsplashCredit from './components/UnsplashCredit/UnsplashCredit';
import VennDiagram from './components/VennDiagram/VennDiagram';

preloader({
  spacerSrc,
  basketballSrc,
  districtSrc,
  convergingSquareSrc,
  bananaPathSrc,
  stopwatchSrc,
  phaseSrc,
  legoSrc,
  modularSynthSrc,
  howItsMadeSrc,
  hadoukenSrc,
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
    blue: COLORS.blue[700],
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
      <Deck
        transition={['fade']}
        transitionDuration={500}
        progress={null}
        theme={theme}
      >
        <Slide>
          <TitleSlide />
        </Slide>

        <Slide
          notes={`
            Hello! My name is Josh, and I work for Khan Academy. Today I'd like to talk about an exciting new form of media.
          `}
        >
          <IntroSlide />
        </Slide>

        <Slide
          notes={`
            So before becoming a software developer, I was studying to become
            an audio engineer. One of the things you learn, when becoming an
            audio engineer, is how sound works, the physics of sound.

            It turns out that this is surprisingly tricky, I remember we spent quite a bit of time learning about sound waves, waveforms, frequency, amplitude... sound is a complex system, and what I mean by that is that there are multiple variables, and rules about how those variables interact.

            And understanding complex systems is traditionally quite difficult.

            When you google "How sound works", you get a page that looks like...
          `}
        >
          <Heading size={1}>🔊</Heading>
        </Slide>

        <Slide
          notes={`
            ...this. I don't want to denigrate this page, or others
            like it, because the authors clearly put a lot of time and care
            into creating something helpful, but it's a tall order for someone
            without an audio background to be presented with words and pictures,
            and to come away with a working intuitive knowledge for complex
            systems.

            There's a couple things that make this tough.
          `}
        >
          <img
            src={traditionalSoundArticleSrc}
            width="100%"
          />
        </Slide>

        {/* <Slide
          notes={`
            The first is that language is lossy.

            Words are a way to try and transmit an idea from my head to yours,
            but at best they're a rough approximation. Complex systems aren't
            easily compressed into a handful of vocal bits, it would take hours
            of talking just to go over all the rules of a system.

            And, it still wouldn't be sufficient, because...
          `}
        >
          <Heading size={3}>
            Language is lossy
          </Heading>
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
          <Heading size={3}>
            Learning is active
          </Heading>
        </Slide> */}

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
          <AmplitudeFrequencyManager
            initialAmplitude={0}
          >
            {({
              amplitude,
              frequency,
              progress,
            }) => (
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
            {points => (
              <Waveform
                width={500}
                height={250}
                points={points}
              />
            )}
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
          <a href="https://pudding.cool/2018/02/waveforms/">
            pudding.cool/2018/02/waveforms/
          </a>
        </Slide>

        <Slide
          bgColor="secondary"
          notes={`
            I did not come up with this idea, for interactive learning experiences. The common term used is "Explorable Explanations".

            There's a whole community of people building these things.
          `}
        >
          <Heading
            size={1}
            style={{ fontWeight: 900 }}
          >
            Explorable Explanations
          </Heading>
          <FullscreenConfetti />
        </Slide>

        <Slide bgColor="secondary">
          <Heading
            textColor="primary"
            size={6}
          >
            <a
              href="http://polytrope.com/district/"
              style={{ color: COLORS.white }}
            >
              District
            </a>{' '}
            By{' '}
            <a
              href="EnDimensions"
              style={{ color: COLORS.white }}
            >
              Christopher Walker
            </a>
          </Heading>

          <video
            autoPlay
            loop
            src={districtSrc}
            style={{ width: '100%' }}
          />
        </Slide>

        <Slide
          notes={`
            But not a lot of people building these kinds of experiences are using React. It's this separate community with very little overlap.
          `}
        >
          <VennDiagram
            set1="Explorable Explanations"
            set2="React.js"
            overlap={10}
          />
        </Slide>

        <Slide
          bgColor="#FAFAFA"
          notes={`
            And React is a great tool for building these kinds of things!

            For example, can you imagine how much gross imperative spaghetti would be required to handle all the different state changes in this project? That waveform in the left does a lot of things!

            With React, I was able to build small, simple components and compose them together as needed to build a complex experience. If I wasn't using React for this, it would have been a lot buggier.
          `}
        >
          {/* HACK: Video has some weird borders in it. Hiding it this way rather than re-recording the video */}
          <div
            style={{
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            <div
              style={{
                transform:
                  'translate(-2px, -2px)',
              }}
            >
              <video
                autoPlay
                loop
                src={allTheThingsFastSrc}
              />
            </div>
          </div>
        </Slide>

        <Slide
          bgImage={howItsMadeSrc}
          notes={`
            Let's take a look at how I used React to build this thing.
          `}
        />

        <Slide
          bgColor="secondary"
          notes={`
            The first thing I needed was a Waveform component, and the first step was figuring out if I wanted to use Canvas or SVG.

            In general, I prefer SVG - it's easier to work with in React, it's easier to inspect with browser tools, it's more accessible. But I wasn't sure if performance would suffer.

            So I built it using both technologies, a task that is surprisingly easy, since both technologies have very similar drawing APIs.
          `}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Heading
              size={3}
              textColor="primary"
            >
              Canvas
            </Heading>

            <Heading
              size={5}
              textColor="rgba(255, 255, 255, 0.5)"
            >
              VS
            </Heading>

            <Heading
              size={3}
              textColor="primary"
            >
              SVG
            </Heading>
          </div>
        </Slide>

        <Slide
          bgColor="secondary"
          transition={[null]}
          notes={`
            And it turns out that there was no measurable difference in performance, so SVG it was!
          `}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Heading
              size={3}
              style={{
                position: 'absolute',
                top: -110,
                right: 100,
              }}
            >
              🎉
            </Heading>

            <Heading
              size={3}
              textColor="rgba(255, 255, 255, 0.5)"
            >
              Canvas
            </Heading>

            <Heading
              size={5}
              textColor="rgba(255, 255, 255, 0.5)"
            >
              VS
            </Heading>

            <Heading
              size={3}
              textColor="#1cff8d"
            >
              SVG
            </Heading>
          </div>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-v1.example')}
          ranges={[
            {
              loc: [0],
              title: '<Waveform /> v1',
            },
            { loc: [1, 4] },
            { loc: [4, 10] },
            { loc: [10, 12] },
            { loc: [12, 14] },
            { loc: [16, 17] },
            { loc: [27, 32] },
            { loc: [32, 39] },
            { loc: [33, 35] },
          ]}
        />

        <Slide>
          <img
            src={bananaPathSrc}
            width="100%"
          />
          <br />
          <br />
          <a href="https://codepen.io/SitePoint/pen/scIdq">
            https://codepen.io/SitePoint/pen/scIdq
          </a>
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
            {points => (
              <Waveform
                width={500}
                height={250}
                points={points}
              />
            )}
          </WaveformCalculator>
        </Slide>

        <Slide>
          <img
            src={convergingSquareSrc}
            style={{ margin: 'auto' }}
          />
        </Slide>

        <Slide>
          <WaveformPointManager />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-v2.example')}
          ranges={[
            {
              loc: [0],
              title: '<Waveform /> v2',
            },
            { loc: [1, 15] },
            { loc: [16, 17] },
            { loc: [27, 34] },
            { loc: [34, 42] },
            { loc: [43, 49] },
            { loc: [50, 63] },
          ]}
        />

        <Slide>
          <WaveformCalculator
            width={500}
            height={250}
            frequency={1}
            amplitude={1}
          >
            {points => (
              <Waveform
                width={500}
                height={250}
                color={COLORS.blue[700]}
                points={points}
                strokeWidth={4}
              />
            )}
          </WaveformCalculator>
        </Slide>

        <Slide>
          <ReactRallyWaveformV1
            showControls={false}
          />
        </Slide>

        {/* <Slide
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

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-consumption-v1.example')}
          ranges={[
            {
              loc: [0],
              title: 'Waveform consumption',
            },
            { loc: [0, 14] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-consumption-v2.example')}
          ranges={[{ loc: [0, 17] }]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-calculator-v1.example')}
          ranges={[{ loc: [0, 21] }]}
        />

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/live/waveform-calculator-json.example')}
              theme="external"
              scope={{ WaveformCalculator, Waveform }}
            />
          </div>
        </Slide> */}

        <CodeSlide
          notes={`
            One possible way to do this would be through a couple of boolean props.
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-axes-alt-universe.example')}
          ranges={[
            {
              loc: [0, 11],
              title: 'One possible way...',
            },
          ]}
        />

        <CodeSlide
          notes={`
            I don't love that, though. As we keep building stuff, this
            Waveform component is going to become overburdened. It's much
            nicer, I believe, to create lots of simple, reusable components.
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-axes.example')}
          ranges={[
            {
              loc: [1, 10],
              title: 'But I prefer this way',
            },
            { loc: [10, 20] },
          ]}
        />

        <Slide
          notes={`
            In order to make an explorable explanation with these building blocks, we need a couple more things.
          `}
        >
          <Heading size={3}>
            We need two things:
          </Heading>
          <List>
            <ListItem>
              A place to assemble these pieces
            </ListItem>
            <ListItem>
              A source of truth for the state
            </ListItem>
          </List>
        </Slide>

        <CodeSlide
          notes={`
            First, the state management bit. This could be done through redux,
            but for now we'll just use React state.
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-state.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<WaveformState>',
            },
            { loc: [1, 4] },
            { loc: [5, 9] },
            { loc: [10, 17] },
            { loc: [18, 24] },
            { loc: [24, 28] },
            { loc: [29, 35] },
          ]}
        />

        <CodeSlide
          notes={`
            I'm a fan of creating wrappers that combine simpler blocks in specific ways.

            We have a number of these pieces, so let's construct a ready-to-use wrapper, I'll call it ReactRallyWaveform.

            It'll have our WaveformCalculator, a Waveform, and then a couple axes.

            It'll also hold the state for our waveform.
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-with-axes.example')}
          ranges={[
            {
              loc: [0, 1],
              title:
                '<ReactRallyWaveform> v1',
            },
            { loc: [1, 3] },
            { loc: [4, 12] },
            { loc: [13, 22] },
            { loc: [23, 33] },
            { loc: [35, 46] },
          ]}
        />

        <Slide bgColor="secondary">
          <Heading
            size={3}
            textColor="primary"
          >
            Why a separate state component?
          </Heading>
          <br />
          <br />
          <List textColor="primary">
            <ListItem>
              Keeps complexity down
            </ListItem>
            <ListItem>
              Easier migration (Redux,
              Context)
            </ListItem>
            <ListItem>Reusable</ListItem>
          </List>
        </Slide>

        <Slide>
          <ReactRallyWaveformV1 />
        </Slide>

        <Slide bgColor="blue">
          <Heading
            size={2}
            textColor="primary"
          >
            Shifting Between Waveforms
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV2 />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-state-with-shape.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<WaveformState> v2',
            },
            { loc: [8, 9] },
            { loc: [19, 22] },
            { loc: [36, 44] },
          ]}
        />

        <CodeSlide
          notes={`
            Looking at the current API, we could embed this tweening within
            Waveform... but it's already doing quite a bit. I don't like when
            any of my components get too complex. Let's instead create a new
            component to deal with this.
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-before-conversion.example')}
          ranges={[
            {
              loc: [0, 1],
              title: 'ReactRallyWaveform',
            },
            { loc: [5, 14] },
            { loc: [15, 19] },
          ]}
        />

        <Slide bgColor="secondary">
          <Heading>⚠️ 🛣</Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-calculator-first-look.example')}
          ranges={[
            {
              loc: [0, 7],
              title:
                'Using a Calculator component',
            },
            { loc: [7, 8] },
            { loc: [9, 16] },
            { loc: [16, 26] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-calculator-tween.example')}
          ranges={[
            {
              loc: [0],
              title: '<WaveformCalculator>',
            },
            { loc: [0, 7] },
            { loc: [7, 8] },
            { loc: [10, 11] },
            { loc: [11, 13] },
            { loc: [13, 14], title: '🤔' },
            { loc: [16, 20] },
            { loc: [20, 29] },
            { loc: [24, 25] },
            { loc: [25, 26] },
            { loc: [26, 27] },
            { loc: [33, 34] },
            { loc: [34, 43] },
            { loc: [44, 50] },
            { loc: [50, 51] },
            { loc: [51, 59] },
            { loc: [59, 62] },
            { loc: [63, 68] },
            { loc: [69, 70] },
          ]}
        />

        <Slide
          notes={`
            Ok, so truthfully, I'm not the happiest with this implementation. There's definitely room for improvement, I just ran out of time.
          `}
          bgColor="secondary"
        >
          <Heading
            size={2}
            textColor="primary"
          >
            This implementation is not
            great...
          </Heading>
        </Slide>

        <Slide
          notes={`
            But you know what? It's OK that it's not great.

            I'm happy with the inputs and outputs. It gives me the data I want, and it's OK if the inner workings of this black box aren't great. The beautiful thing about this being its own component is that it's sequestered; a bit of hackiness here doesn't affect the maintainability of our ReactRallyWaveform component.
          `}
          bgColor="secondary"
        >
          <Heading
            size={2}
            textColor="primary"
          >
            ...but that's OK!
          </Heading>
        </Slide>

        <Slide bgColor="blue">
          <Heading
            size={2}
            textColor="primary"
          >
            Playing The Waveform
          </Heading>
        </Slide>

        <Slide
          notes={`
            This is looking pretty good... but our waveform doesn't move yet!

            The waveform animation for "playing" is really just about rotating the shape through its possible positions by changing where the drawing starts from. In sound terminology, we're modifying the waveform's phase.

            It would also be nice if when we toggle it to stop, it doesn't just stop immediately, it stops when it hits the next cycle.
          `}
        >
          <ReactRallyWaveformV3 />
        </Slide>

        <Slide>
          <img src={phaseSrc} />
        </Slide>

        <Slide bgImage={stopwatchSrc}>
          <UnsplashCredit
            username="veri_ivanova"
            fullName="Veri Ivanova"
          />
        </Slide>

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/live/stopwatch-demo-alone.example')}
              theme="external"
              scope={{
                Stopwatch: StopwatchSimple,
                WaveformState,
                Component,
                Fragment,
              }}
            />
          </div>
        </Slide>

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/live/stopwatch-demo-with-toggle.example')}
              theme="external"
              scope={{
                Stopwatch: StopwatchSimple,
                WaveformState,
                Component,
                Fragment,
              }}
            />
          </div>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/stopwatch.example')}
          ranges={[
            {
              loc: [0, 1],
              title:
                '<Stopwatch />',
            },
            { loc: [1, 4] },
            { loc: [5, 9] },
            { loc: [10, 19] },
            { loc: [26, 32] },
            { loc: [33, 34] },
            { loc: [34, 37] },
            { loc: [37, 42] },
            { loc: [43, 46] },
            { loc: [47, 48] },
            { loc: [49, 53] },
            { loc: [54, 61] },
            { loc: [20, 25] },
            { loc: [66, 72] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-state-with-running.example')}
          ranges={[
            {
              loc: [0, 1],
              title:
                'Updated <WaveformState />',
            },
            { loc: [9, 10] },
            { loc: [24, 29] },
            { loc: [49, 50] },
            { loc: [53, 54] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-stopwatch.example')}
          ranges={[
            {
              loc: [0, 1],
              title:
                'Updated <ReactRallyWaveform>',
            },
            { loc: [4, 16] },
            { loc: [16, 18] },
            { loc: [18, 27] },
            { loc: [27, 34] },
          ]}
        />

        <Slide
          bgColor="secondary"
          notes={`
            This looks familiar, and not in a good way...

            We're 10 levels of indentation in before getting to the
            components that render UI!
          `}
        >
          <img
            src={hadoukenSrc}
            width="100%"
          />
        </Slide>

        <Slide>There are solutions 👼🏻</Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-hoc.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<ReactRallyWaveform>',
            },
            { loc: [1, 14] },
            { loc: [15, 27] },
            { loc: [28, 29] },
            { loc: [30, 37] },
            { loc: [37, 47] },
            { loc: [49, 60] },
            { loc: [61, 71] },
            { loc: [72, 75] },
            { loc: [81, 82] },
            { loc: [83, 84] },
            { loc: [84, 95] },
            { loc: [95, 97] },
            { loc: [97, 106] },
            { loc: [106, 121] },
            { loc: [0, 1] },
            { loc: [106, 121] },
          ]}
        />

        <Slide bgColor="blue">
          <Heading
            size={2}
            textColor="primary"
          >
            Smoothing Everything Out
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV3 />
        </Slide>

        <Slide>
          <ReactRallyWaveformV4 />
        </Slide>

        {/*

        Conclusion

        */}

        <Slide
          bgImage={legoSrc}
          notes={`
            Something that has been said to the point of cliché is that react
            components are like lego blocks. You can build complete UIs by
            assembling a bunch of small, simple blocks.

            A criticism I've heard of this metaphor is that it's overly
            simplistic. React components can do much more than simply render
            UI, they can generate values, or make server requests, etc.

            I think a better metaphor is...
          `}
        />

        <Slide
          bgImage={modularSynthSrc}
          notes={`
            ...modular synthesizers. For those who aren't familiar, modular synthesizers are tools used to produce electronic sounds, like the waves we've been looking at... but a modular synthesizer is combined out of many smaller modules. Each module has inputs and outputs, so a module on its own might not produce any sound, but
            it might modulate sound that is passed through it.

            I think React components are like synth modules.
          `}
        />

        <Slide>
          <Heading>Did it work?</Heading>
        </Slide>

        <Slide
          notes={`
            I built this project on the side, over several months. As it
            neared completion, as happens with many side-projects, I start
            to worry that it's not useful, or good enough to release. I know
            Ives from Codesandbox has talked about this as well; when you're
            so close to a project, you lose perspective about how it'll seem
            to others, you can't see it with fresh eyes anymore.

            After releasing this project, I got a ton of really nice feedback
            like this. This wasn't an outlier. I also heard from college professors who said they'd use it, which is amazing.
          `}
        >
          <Quote>
            "...I'm in my third year studying
            sound engineering for film, and
            after reading this{' '}
            <Highlighted>
              I finally understand how
              harmonics and waveforms work.
            </Highlighted>{' '}
            I've known what harmonics and
            waveforms are, as well as their
            different applications. But the
            way it has always been taught to
            me,{' '}
            <Highlighted>
              I could just never understand{' '}
              <em>why</em> they are.
            </Highlighted>{' '}
            Thank you for explaining this to
            me in a way no one else has been
            able to."
          </Quote>
        </Slide>
      </Deck>
    );
  }
}
