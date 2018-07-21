/**
 * NOTE: This is a really old component, I just copy/pasted from a legacy
 * project for GameOfLife. If you're looking for inspiration for working with
 * Canvas in React, check out my egghead videos on the subject:
 * https://egghead.io/lessons/react-work-with-html-canvas-in-react
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import './hidpi-canvas-polyfill';

class Canvas extends Component {
  captureRef = elem => {
    const { innerRef } = this.props;

    // Store references to the canvas and context
    this.canvas = elem;

    // Pass the ref up to the parent, if requested
    if (typeof innerRef === 'function') {
      innerRef(elem);
    }
  }

  render() {
    const {
      innerRef,
      ...delegated,
    } = this.props;

    // If this is a high-dpi screen, we need to do some trickery to get it to
    // render smoothly. Our polyfill does most of the heavy lifting, but we
    // still need to set its width and height.
    //
    // The actual canvas width/height will be a multiple of the provided
    // value, and then we'll use CSS to set its _actual_ size properly.

    return (
      <canvas
        ref={this.captureRef}
        width={250}
        height={250}
        {...delegated}
      />
    );
  }
}


export default Canvas;
