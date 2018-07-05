import React, { Component } from 'react';

import { debounce } from '../../utils';

class WindowDimensions extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500);

  render() {
    return this.props.children(this.state);
  }
}

export default WindowDimensions;
