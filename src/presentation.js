import React, { Fragment } from 'react';
import styled, { injectGlobal } from 'styled-components';
import {
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  ComponentPlayground,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import preloader from 'spectacle/lib/utils/preloader';
import CodeSlide from 'spectacle-code-slide';

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
import WaveformStopwatch from './components/WaveformStopwatch';
import AmplitudeFrequencyManager from './components/AmplitudeFrequencyManager';
import GridVsWave from './components/GridVsWave/GridVsWave';
import ReactRallyWaveformV1 from './components/ReactRallyWaveformV1';
import ReactRallyWaveformV2 from './components/ReactRallyWaveformV2';
import ReactRallyWaveformV3 from './components/ReactRallyWaveformV3';
import ReactRallyWaveformV4 from './components/ReactRallyWaveformV4';

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

        <Slide
          notes={`
            Hello! My name is Josh, and I work for Khan Academy. Today I'd like to talk about an exciting new form of media.
          `}
        >
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

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-v1.example')}
          ranges={[
            { loc: [0], title: '<Waveform /> v1' },
            { loc: [0, 20] },
            { loc: [20, 40] },
          ]}
        />

        <Slide>Maybe a quick word about how SVG paths work?</Slide>

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

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-v2.example')}
          ranges={[
            { loc: [0], title: '<Waveform /> v2' },
            { loc: [0, 20] },
            { loc: [20, 40] },
          ]}
        />

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
        </Slide>

        <Slide>
          <ReactRallyWaveformV1 showControls={false} />
        </Slide>

        <CodeSlide
          notes={`
            This pattern of creating new components instead of bundling logic
            within existing components is useful for all kinds of things.

            For example, you may have noticed that the final version of
            our waveform has an X axis and a Y axis. While we could have a
            'showXAxis'
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-consumption-v3.example')}
          ranges={[{ loc: [0, 17] }]}
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
          code={require('./code/react-rally-waveform-v1.example')}
          ranges={[{ loc: [0, 17] }]}
        />

        <Slide>
          <ReactRallyWaveformV1 />
        </Slide>

        <Slide>
          <Heading size={2}>Shifting Between Waveforms</Heading>
        </Slide>

        <Slide>
          <ReactRallyWaveformV2 />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-v2.example')}
          ranges={[{ loc: [0, 17] }]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-calculator-v2.example')}
          ranges={[{ loc: [0, 17] }]}
        />

        <Slide
          notes={`
            Ok, so truthfully, I'm not the happiest with this implementation.

            There's definitely room for improvement.

            Happily, though, the ugly bit is sequestered within a component.

            I'm happy with the API, the inputs and outputs... so I can refactor this later, without breaking anything else. This kind of component encapsulation is great for maintainability.
          `}
        >
          <Heading size={2}>To be honest...</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Playing The Waveform</Heading>
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

        <CodeSlide
          notes={`
            Here's what our updated ReactRallyWaveform component looks like:
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/react-rally-waveform-v3.example')}
          ranges={[{ loc: [0, 17] }]}
        />

        <Slide>
          <div style={{ textAlign: 'left' }}>
            <ComponentPlayground
              code={require('./code/live/waveform-stopwatch-json.example')}
              theme="external"
              scope={{ WaveformStopwatch }}
            />
          </div>
        </Slide>

        <Slide>
          Waveform Stopwatch progress bar example, split code
          <br /><br />
          If there's time.
        </Slide>

        <CodeSlide
          notes={`
            The WaveformStopwatch code, without easing or rounding
          `}
          bgColor="secondary"
          lang="jsx"
          code={require('./code/waveform-stopwatch-v1.example')}
          ranges={[
            { loc: [0, 17] },
            { loc: [17, 34] },
            { loc: [34, 51] },
            { loc: [51, 76] },
          ]}
        />

        <Slide>
          <Heading size={2}>Smoothing Everything Out</Heading>
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
          notes={`
            Something that has been said to the point of cliché is that react
            components are like lego blocks. You can build complete UIs by
            assembling a bunch of small, simple blocks.

            A criticism I've heard of this metaphor is that it's overly
            simplistic. React components can do much more than simply render
            UI, they can generate values, or make server requests, etc.

            I think a better metaphor is...
          `}
        >
          Lego blocks image
        </Slide>

        <Slide
          notes={`
            ...modular synthesizers. For those who aren't familiar, modular synthesizers are tools used to produce electronic sounds, like the waves we've been looking at... but a modular synthesizer is combined out of many smaller modules. Each module has inputs and outputs, so a module on its own might not produce any sound, but
            it might modulate sound that is passed through it.

            I think React components are like synth modules.
          `}
        >
          Modular synth image
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
            different applications. But they way it has always been taught to
            me,{' '}
            <Highlighted>
              I could just never understand <em>why</em> they are.
            </Highlighted>{' '}
            Thank you for explaining this to me in a way no one else has been
            able to."
          </Quote>
        </Slide>
      </Deck>
    );
  }
}
