Intro

1.  Title card
2.  Intro - name, job
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
4.  Designing the component API - talk a bit about the spectrum of abstraction
5.  Initially, this component took a bunch of waveform props - amplitude, frequency, shape - but this wound up constraining the component too much. So I made it more generic/reusable, and it just takes an array of the points
6.  Example of the consumption code
7.  Waveform source
8.  Realistically, though, we won't have this nice, ready-to-go array of points! Let's build a component to calculate them
9.  API concept for <WaveformCalculator>

CFP: https://docs.google.com/document/d/15LmX3HZ0-yssOQZlYIrAN7XHyzZKUGIFfaOPp-yW0SY/edit#heading=h.mt9lkosdjeje

For the intercept ball, mention how the instinct is to embed it within the <Waveform> component (after all, that's how a non-react, imperative solution would work!). This burdens that component, though, and makes it less flexible.
