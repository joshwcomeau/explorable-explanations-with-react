import React, { Component, Fragment } from 'react';
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';

class Title extends Component {
  render() {
    return (
      <Fragment>
        <Heading size={2} textColor="secondary" textFont="secondary">
          Explorable Explanations with React
        </Heading>
      </Fragment>
    );
  }
}

export default Title;
