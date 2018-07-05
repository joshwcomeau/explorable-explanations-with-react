import React from 'react';
import PropTypes from 'prop-types';

import { hexToRgb } from '../../utils';

import GameOfLife from './GameOfLife';
import { getCellHeights } from './GameOfLife.utils.js';

const DEFAULT_COLORS = [
  '#F5F5F5', // dead cells
  '#FFE082', // 1st generation
  '#FFD54F', // 2nd generation
  '#FF9800', // ...and so on.
  '#FF5722',
  '#E53935',
];

const DEFAULT_BACKGROUND_COLOR = { r: 255, g: 255, b: 255, a: 1 };

export const COLOR_TYPE = PropTypes.shape({
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  a: PropTypes.number,
});

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.oneOfType([COLOR_TYPE, PropTypes.string]))
    .isRequired,
  backgroundColor: COLOR_TYPE.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellGap: PropTypes.number.isRequired,
  framesPerTick: PropTypes.number.isRequired,
};

const GameOfLifePropConverter = ({ children, ...props }) => {
  const { cellWidth, cellGap, colors } = props;
  const { cellHeight, stackedHeight } = getCellHeights(cellWidth, cellGap);

  // Convert any hex colors to RGB
  const convertedColors = colors.map(
    color => (typeof color === 'string' ? hexToRgb(color) : color)
  );

  return (
    <GameOfLife
      {...props}
      colors={convertedColors}
      cellHeight={cellHeight}
      stackedHeight={stackedHeight}
    />
  );
};

GameOfLifePropConverter.propTypes = propTypes;

GameOfLifePropConverter.defaultProps = {
  width: 1250,
  height: 286,
  colors: DEFAULT_COLORS,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  cellWidth: 32,
  cellGap: 2,
  framesPerTick: 60,
};

export default GameOfLifePropConverter;
