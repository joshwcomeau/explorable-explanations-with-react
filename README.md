# Explorable Explanations with React

This repo holds the presentation and associated code for my 2018 React Rally talk, "Explorable Explanations with React".

Something you should know: The code _used_ this presentation differs here and there from the code _shown_ in the presentation. In some cases, there's a good reason for this (eg. the presentation needs to show the waveform without <Spring>, which isn't something we want in the real waveforms project). In other cases, I just didn't have time to backtrack and refactor.

The code used/shown in this project is also quite different from the code in the [actual Waveforms project](https://github.com/joshwcomeau/waveforms). The reason for this is that I refactored/rethought a bunch of stuff when preparing this presentation, and didn't have the chance to retrofit the original project. Many of the underlying concepts are the same, but the component architecture is different.

With these caveats in mind, here is some of the interesting "real-world" code from this presentation:

- [ReactRallyWaveformV4](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/ReactRallyWaveformV4/ReactRallyWaveformV4.js) - This is the final, all-bells-and-whistles parent component
- [Waveform](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/Waveform/Waveform.js)
- [waveform.helpers.js](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/helpers/waveform.helpers.js) - This holds the methods for calculating the waveform points, AKA the fun trigonometry-involving stuff I briefly mentioned!
- [Timekeeper](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/Timekeeper/Timekeeper.js) - Learn how our time-travelling timekeeper keeps (and manipulates!) the time.
- [AirGrid](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/AirGrid/AirGrid.js) - The grid of particles shown in the beginning
- [GridVsWave](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/GridVsWave/GridVsWave.js) - This component combines an AirGrid and a Waveform, in the side-by-side from early in the presentation
- [AudioOutput](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/AudioOutput/AudioOutput.js) and [Oscillator](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/components/Oscillator/Oscillator.js) - Not explicitly called out in the presentation, but these neat components are used to render to audio, for the tone heard near the beginning.
- [presentation](https://github.com/joshwcomeau/explorable-explanations-with-react/blob/master/src/presentation.js) - Want to see all the slides themselves? Fair warning, it's one big hideous file.
