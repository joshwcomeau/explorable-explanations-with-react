import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import Presentation from './presentation';

import './vendor/prism.js';
import './vendor/prism.css';

injectGlobal`
  .spectacle-content > pre {
    /* HACK: For some reason, spectacle-code-slide decided to start adding
    black-coloured text. I'm in a rush, so I don't have time to figure out
    why that is. Overriding it here. */
    color: #FFF !important;
  }
`;

ReactDOM.render(<Presentation />, document.getElementById('root'));
