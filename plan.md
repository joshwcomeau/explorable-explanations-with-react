Intro

1.  Title card
2.  Intro - name, job
    2A. Cats, unlikely animal friendships
3.  … And I really like building stuff on the side
4.  Quick demo of Tello
5.  Quick demo of Guppy
6.  Demo of Waveforms - cover how frequency and amplitude work
7.  One of my most satisfying side-projects ever
8.  [Snippet of email 1]
9.  [Snippet of email 2]
10. This project was meaningful to people because it allowed them to learn in a way that videos or articles don’t. Being able to play with the model is a way to supercharge intuitive understanding
11. There’s a whole community of people doing this stuff! explorabl.es
12. Demo of “To Build A Better Ballot”
13. React might be the perfect tool to build these kinds of things
14. Going back to waveforms demo. Notice how the waveform on the left changes several times throughout the experience.
15. React was built to solve these kinds of problems. Working on them makes you a better React developer
16. Today we’re gonna recreate this explorable explanation

Main Presentation

1.  A simple waveform on the screen. My first goal was to build a component that could render this
2.  Canvas vs SVG - I tried both, and in fact the production code can switch between SVG and canvas with a prop... but I settled on SVG, so that's what we'll use today
3.  SVGs have paths, so we need to get the path data - considered curves, but it seemed too complicated with animation, so I opted to cheat, and just draw a bunch of straight lines, 1px apart
4.  Initial implementation - Show a waveform API that takes frequency, amplitude, width, height.
5.  Show code for how it works
6.  Designing the component API - talk a bit about the spectrum of abstraction
7.  Show an alternative with <WaveformCalculator>
8.  Source for the new waveform
9.  Source for WaveformCalculator
10. The next thing to figure out is, how do we animate this? I thought about just translating the wave, and hiding the overflow, but then I realized the frequency can go above 1, and then you'd need to repeat the wave a bunch of times... it seemed easier just to recalculate the points. All I need is a time-keeping mechanism.
11. Photo of stopwatch
12. new API, with stopwatch passing a `secondsElapsed`.

CFP: https://docs.google.com/document/d/15LmX3HZ0-yssOQZlYIrAN7XHyzZKUGIFfaOPp-yW0SY/edit#heading=h.mt9lkosdjeje

For the intercept ball, mention how the instinct is to embed it within the <Waveform> component (after all, that's how a non-react, imperative solution would work!). This burdens that component, though, and makes it less flexible.

---

STRETCH GOALS:

- Make `<WaveformCalculator>` interruptible.
  This is a surprisingly hard problem, since we need some way of "resetting" the progress value.
- Mention how render props start to look a bit like callback hell, and how pseudo-HOCs can fix that
- Use context to pass width/height/frequency/amplitude around the tree?
