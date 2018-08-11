import React, { Component } from 'react';
import { Heading } from 'spectacle';

import { COLORS } from '../../constants';

class Intro extends Component {
  render() {
    return (
      <div>
        <Heading size={2}>👋🏻 Hi, I'm Josh</Heading>
        <br />
        <br />
        <Heading size={4}>I work for Khan Academy</Heading>
      </div>
    );
  }
}

export default Intro;
