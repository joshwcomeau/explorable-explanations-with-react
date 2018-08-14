CFP: https://docs.google.com/document/d/15LmX3HZ0-yssOQZlYIrAN7XHyzZKUGIFfaOPp-yW0SY/edit#heading=h.mt9lkosdjeje

- Add JSX "Adopt" info
- Move "Smoothing it out" earlier? So that WaveformCalculator isn't introduced with hairiness of tweening? Maybe even move tweening to the end!
- Stopwatch should control its own `isRunning`, and live above the calculator.
- Consider ditching <Stopwatch> and just storing timeElapsed in waveformState

- Create a simpler PathCalculator that doesn't support interrupts, so that I can introduce it alone.
