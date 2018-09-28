import React, { Fragment } from 'react';
import { injectGlobal } from 'styled-components';
import { Deck, Heading, Slide, ComponentPlayground } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import preloader from 'spectacle/lib/utils/preloader';
import CodeSlide from 'spectacle-code-slide';
import { Spring } from 'react-spring';
import { Value } from 'react-powerplug';

import { COLORS } from './constants';

import basketballSrc from './assets/basketball.gif';
import districtSrc from './assets/district-v2.mp4';
import traditionalSoundArticleSrc from './assets/traditional-sound-article.png';
import bananaPathSrc from './assets/banana-path.png';
import legoSrc from './assets/lego.jpeg';
import modularSynthSrc from './assets/modular-synth.jpg';
import allTheThingsFastSrc from './assets/all-the-things-fast.mp4';
import howItsMadeSrc from './assets/how-its-made.jpg';
import slinkySrc from './assets/slinky.jpg';
import timekeeperSrc from './assets/timekeeper.jpg';
import timekeeperThanosSrc from './assets/timekeeper-thanos.jpg';
import clockStockPhotosSrc from './assets/clock-stock-photos.gif';
import shiftingSrc from './assets/shifting.gif';
import meSrc from './assets/me.jpeg';
import khanAcademySrc from './assets/khan-academy.jpeg';
import curves1Src from './assets/curves1.png';
import curves2Src from './assets/curves2.png';

import Title from './components/Title';
import Highlighted from './components/Highlighted';
import Quote from './components/Quote';
import Waveform from './components/Waveform';
import AirGrid from './components/AirGrid';
import Slider from './components/Slider';
import AudioOutput from './components/AudioOutput';
import Oscillator from './components/Oscillator';
import WaveformPointManager from './components/WaveformPointManager';
import AmplitudeFrequencyManager from './components/AmplitudeFrequencyManager';
import GridVsWave from './components/GridVsWave';
import Timekeeper from './components/Timekeeper';
import ReactRallyWaveformV1 from './components/ReactRallyWaveformV1';
import ReactRallyWaveformV2 from './components/ReactRallyWaveformV2';
import ReactRallyWaveformV3 from './components/ReactRallyWaveformV3';
import ReactRallyWaveformV4 from './components/ReactRallyWaveformV4';
import ReactRallyWaveformTimeSlider from './components/ReactRallyWaveformTimeSlider';
import FullscreenConfetti from './components/FullscreenConfetti/FullscreenConfetti';
import UnsplashCredit from './components/UnsplashCredit/UnsplashCredit';
import VennDiagram from './components/VennDiagram/VennDiagram';

preloader({
  basketballSrc,
  districtSrc,
  traditionalSoundArticleSrc,
  bananaPathSrc,
  legoSrc,
  modularSynthSrc,
  allTheThingsFastSrc,
  howItsMadeSrc,
  slinkySrc,
  timekeeperSrc,
  timekeeperThanosSrc,
  clockStockPhotosSrc,
  shiftingSrc,
  meSrc,
  khanAcademySrc,
  curves1Src,
  curves2Src,
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
          <Title />
        </Slide>

        <Slide>
          <Heading size={1} textColor="secondary">
            👋🏻 Hi!
          </Heading>
        </Slide>

        <Slide>
          <img src={meSrc} style={{ borderRadius: '50%' }} />
          <br />
          <br />

          <Heading size={1} textColor="secondary">
            <a
              href="https://twitter.com/JoshWComeau"
              style={{ textDecoration: 'none' }}
            >
              @joshwcomeau
            </a>
          </Heading>
        </Slide>

        <Slide>
          <img src={khanAcademySrc} />
          <br />
          <br />
          <Heading size={2}>
            I work for <br />
            Khan Academy
          </Heading>
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
          <Heading style={{ fontSize: '16rem' }}>🔊</Heading>
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
          <img src={traditionalSoundArticleSrc} width="100%" />
        </Slide>

        <Slide
          notes={`
            The best way to do that is through experimentation.

            Our brains are really good at building intuition through
            experimentation. We all understand how gravity works because we can
            toss things in the air and see how they react.
          `}
        >
          <Heading style={{ fontSize: '16rem' }}>👩‍🔬</Heading>
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
          <AudioOutput masterVolume={5}>
            {(audioCtx, masterOut) => (
              <AmplitudeFrequencyManager initialAmplitude={0}>
                {({ amplitude, frequency }) => (
                  <Timekeeper runOnMount multiplier={frequency}>
                    {({ timeElapsed }) => (
                      <Fragment>
                        <AirGrid
                          shape="sine"
                          width={600}
                          height={300}
                          waveformAmplitude={amplitude}
                          waveformFrequency={frequency}
                          waveformProgress={timeElapsed / 1000}
                        />
                        <Oscillator
                          slidePitch={false}
                          audioCtx={audioCtx}
                          masterOut={masterOut}
                          frequency={frequency * 200}
                          amplitude={amplitude / 10}
                        />
                      </Fragment>
                    )}
                  </Timekeeper>
                )}
              </AmplitudeFrequencyManager>
            )}
          </AudioOutput>
        </Slide>

        <Slide>
          <Waveform
            shape="sine"
            width={500}
            height={250}
            frequency={1}
            amplitude={1}
            color="#000"
            strokeWidth={4}
          />
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
          <Heading size={1} style={{ fontWeight: 900 }}>
            Explorable Explanations
          </Heading>
          <FullscreenConfetti />
        </Slide>

        <Slide bgColor="secondary">
          <Heading textColor="primary" size={6}>
            <a
              href="http://polytrope.com/district/"
              style={{ color: COLORS.white }}
            >
              District
            </a>{' '}
            By{' '}
            <a href="EnDimensions" style={{ color: COLORS.white }}>
              Christopher Walker
            </a>
          </Heading>

          <video autoPlay loop src={districtSrc} style={{ width: '100%' }} />
        </Slide>

        {/* <Slide bgImage={explorablesSrc}>
          <a
            href="https://explorabl.es/"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#FFF',
              padding: 40,
              textAlign: 'center',
              boxShadow: '5px 5px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            https://explorabl.es/
          </a>
        </Slide> */}

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

        <Slide>
          <Heading size={3}>
            React is a great tool for building these things!
          </Heading>
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
                transform: 'translate(-2px, -2px)',
              }}
            >
              <video autoPlay loop src={allTheThingsFastSrc} />
            </div>
          </div>
        </Slide>

        <Slide
          bgImage={howItsMadeSrc}
          notes={`
            Let's take a look at how I used React to build this thing.
          `}
        />

        <Slide>
          <Heading size={4}>{'<Waveform>'}</Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-initial.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<Waveform />',
            },
            { loc: [2, 8] },
            { loc: [8, 10] },
            { loc: [10, 12] },
            { loc: [14, 15] },
            { loc: [15, 22] },
            { loc: [23, 25] },
            { loc: [25, 32] },
          ]}
        />

        <Slide bgColor="secondary">
          <img src={bananaPathSrc} width="100%" />
          <br />
          <br />
          <a
            href="https://codepen.io/SitePoint/pen/scIdq"
            style={{
              color: 'white',
              fontSize: 15,
            }}
          >
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

          <Waveform
            width={500}
            height={250}
            frequency={1}
            amplitude={1}
            color={COLORS.gray[700]}
          />
        </Slide>

        <Slide>
          <img src={curves1Src} style={{ width: 500 }} />
        </Slide>

        <Slide>
          <img src={curves2Src} style={{ width: 500 }} />
        </Slide>

        <Slide>
          <span style={{ fontSize: 144 }}>💡</span>
        </Slide>

        <Slide>
          <WaveformPointManager />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-with-path.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<Waveform />',
            },
            { loc: [1, 4] },
            { loc: [16, 17] },
            { loc: [27, 34] },
            { loc: [34, 42] },
            { loc: [43, 49] },
            { loc: [50, 63] },
            { loc: [56, 57] },
          ]}
        />

        <Slide>
          <Waveform width={500} height={250} frequency={1} amplitude={1} />
        </Slide>

        <Slide>
          <ReactRallyWaveformV1 showControls={false} />
        </Slide>

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
            Ok, so we have a static waveform, and its axes... In order to make
            an explorable explanation with these building blocks, we need a
            couple more things.
          `}
        >
          <Heading size={3}>We almost have an MVP!</Heading>
          <br />
          <br />
          <Heading size={3}>
            We just need a stateful home for these pieces.
          </Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-initial.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<ReactRallyWaveform>',
            },
            { loc: [1, 5] },
            { loc: [6, 10] },
            { loc: [11, 18] },
            { loc: [19, 21] },
            { loc: [21, 25] },
            { loc: [28, 37] },
            { loc: [38, 48] },
            { loc: [50, 61] },
          ]}
        />

        <Slide>
          <ReactRallyWaveformV1 />
        </Slide>

        <Slide bgColor="blue">
          <Heading size={2} textColor="primary">
            Smoothing It Out
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV1 />
        </Slide>

        <Slide>
          <ReactRallyWaveformV2 />
        </Slide>

        <Slide bgImage={slinkySrc}>
          <Heading
            size={1}
            style={{
              color: '#FFF',
              textShadow: `
                1px 1px 0px #111,
                2px 2px 0px #111,
                3px 3px 0px #111,
                4px 4px 0px #111
              `,
            }}
          >
            Spring Physics
          </Heading>

          <UnsplashCredit username="rawpixel" fullName="rawpixel" />
        </Slide>

        <Slide>
          <Heading size={3}>React Motion</Heading>
          <Heading size={6}>
            <a target="_blank" href="https://github.com/chenglou/react-motion">
              https://github.com/chenglou/react-motion
            </a>
          </Heading>
          <br />
          <br />

          <Heading size={3}>React Spring</Heading>
          <Heading size={6}>
            <a target="_blank" href="https://github.com/drcmda/react-spring">
              https://github.com/drcmda/react-spring
            </a>
          </Heading>
        </Slide>

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/playground/react-spring.example')}
              theme="external"
              scope={{
                Spring,
                Slider,
                Fragment,
                Value,
              }}
            />
          </div>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-with-spring.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<Waveform>',
            },
            { loc: [1, 15] },
            { loc: [16, 27] },
            { loc: [27, 29] },
            { loc: [29, 30] },
            { loc: [30, 38] },
            { loc: [39, 43] },
            { loc: [44, 57] },
          ]}
        />

        <Slide bgColor="blue">
          <Heading size={2} textColor="primary">
            Playing the Wave
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV3 useMultiplier />
        </Slide>

        <Slide>
          <Heading size={3}>
            I just need to know how much time has elapsed!
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformTimeSlider />
        </Slide>

        <Slide>
          <img src={timekeeperSrc} height="100%" />
        </Slide>

        <Slide bgImage={clockStockPhotosSrc} />

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/playground/timekeeper.example')}
              theme="external"
              scope={{ Timekeeper }}
            />
          </div>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-timekeeper.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<ReactRallyWaveform>',
            },
            { loc: [19, 20] },
            { loc: [26, 29] },
            { loc: [30, 40] },
            { loc: [34, 35] },
            { loc: [41, 51] },
            { loc: [69, 72] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-with-time-elapsed.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<Waveform>',
            },
            { loc: [12, 13] },
            { loc: [32, 41] },
            { loc: [37, 38] },
          ]}
        />

        <Slide>
          <Heading size={4}>There's a problem, though...</Heading>
          <br />
          <ReactRallyWaveformV3 />
        </Slide>

        <Slide>
          <ReactRallyWaveformV3 useMultiplier />
        </Slide>

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/playground/timekeeper-multiplier.example')}
              theme="external"
              scope={{ Timekeeper, Value }}
            />
          </div>
        </Slide>

        <Slide>
          <img src={timekeeperThanosSrc} height="100%" />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-timekeeper-multiplier.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<ReactRallyWaveform>',
            },
            { loc: [26, 28] },
          ]}
        />

        <Slide>
          <ReactRallyWaveformV3 useMultiplier />
        </Slide>

        <Slide bgColor="blue">
          <Heading size={2} textColor="primary">
            Tweening Between Shapes
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV4 />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/tweening.example')}
          ranges={[
            {
              loc: [0],
              title: 'The basic idea...',
            },
            { loc: [0, 8] },
            { loc: [9, 17] },
            { loc: [18, 19] },
            { loc: [20, 25] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-with-calculator.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<Waveform>',
            },
            { loc: [1, 11] },
            { loc: [12, 13] },
            { loc: [23, 32] },
            { loc: [32, 33] },
            { loc: [33, 44] },
            { loc: [38, 39] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/path-calculator-broken.example')}
          ranges={[
            {
              loc: [0, 1],
              title: '<PathCalculator>',
            },
            { loc: [1, 4] },
            { loc: [5, 6] },
            { loc: [6, 8] },
            { loc: [9, 10] },
            { loc: [10, 13] },
            { loc: [16, 17] },
            { loc: [17, 29] },
            { loc: [30, 31] },
            { loc: [31, 41] },
            { loc: [36, 38] },
            { loc: [38, 39] },
            { loc: [32, 35] },
            { loc: [32, 35], title: '*Ominous Music*' },
            { loc: [41, 46] },
            { loc: [46, 54] },
            { loc: [55, 63] },
            { loc: [63, 69] },
            { loc: [70, 72] },
            { loc: [73, 74] },
          ]}
        />

        <Slide>
          <ReactRallyWaveformV4 useBrokenCalculator />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/path-calculator.example')}
          ranges={[
            { loc: [40, 50] },
            { loc: [50, 51] },
            { loc: [1, 5] },
            { loc: [6, 9] },
            { loc: [11, 16] },
            { loc: [16, 21], title: '😅' },
          ]}
        />

        <Slide
          notes={`
            Ok, so truthfully, I'm not the happiest with this implementation. There's definitely room for improvement, I just ran out of time.
          `}
          bgColor="secondary"
        >
          <Heading size={2} textColor="primary">
            This implementation is not great...
          </Heading>
        </Slide>

        <Slide
          notes={`
            But you know what? It's OK that it's not great.

            I'm happy with the inputs and outputs. It gives me the data I want, and it's OK if the inner workings of this black box aren't great. The beautiful thing about this being its own component is that it's sequestered; a bit of hackiness here doesn't affect the maintainability of our ReactRallyWaveform component.
          `}
          bgColor="secondary"
        >
          <Heading size={2} textColor="primary">
            ...but that's OK!
          </Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV4 />
        </Slide>

        {/*

        Conclusion

        */}

        <Slide
          notes={`
            This pattern continued on for a while, adding new components and
            trying to keep thinking in small pieces.
          `}
        >
          <Heading size={1} textColor="secondary">
            And on and on it went...
          </Heading>
        </Slide>

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

        <Slide bgColor="secondary">
          <Heading textColor="primary">Did it work?</Heading>
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
            "...I'm in my third year studying sound engineering for film, and
            after reading this{' '}
            <Highlighted>
              I finally understand how harmonics and waveforms work.
            </Highlighted>{' '}
            I've known what harmonics and waveforms are, as well as their
            different applications. But the way it has always been taught to me,{' '}
            <Highlighted>
              I could just never understand <em>why</em> they are.
            </Highlighted>{' '}
            Thank you for explaining this to me in a way no one else has been
            able to."
          </Quote>
        </Slide>

        <Slide>
          <Heading size={3}>
            There's high demand for this kind of content.
          </Heading>
        </Slide>

        <Slide>
          <Heading size={3}>
            What would{' '}
            <strong
              style={{ fontWeight: 900, fontSize: 86, letterSpacing: -2 }}
            >
              <span style={{ color: COLORS.red[500] }}>y</span>
              <span style={{ color: COLORS.yellow[700] }}>o</span>
              <span style={{ color: COLORS.green[500] }}>u</span>
              <span style={{ color: COLORS.blue[700] }}>r</span>
            </strong>{' '}
            explorable explanation
            <br />
            be about?
          </Heading>
        </Slide>

        <Slide>
          <Heading size={1} textColor="secondary">
            Thank you!
          </Heading>
          <br />
          <br />
          <Heading size={5} textColor="secondary">
            Slides, code, and more available on Twitter:
          </Heading>
          <Heading size={2}>
            <a href="https://twitter.com/JoshWComeau">@joshwcomeau</a>
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
