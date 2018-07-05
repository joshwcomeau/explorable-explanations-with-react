import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  generateNewBoard,
  buildColorString,
  blendColors,
  getInitialBoardDimensions,
  convertFromIndicesToCartesianCoordinates,
  getCellIndexForCoordinates,
  manuallyUpdateCellStatus,
  isDifferentCell,
  tick,
} from './GameOfLife.utils';
import { COLOR_TYPE } from './GameOfLifePropConverter';
import { compose, clamp } from '../../utils';

import Canvas from '../Canvas';

const buildBlendedColorString = compose(
  buildColorString,
  blendColors
);

class GameOfLife extends PureComponent {
  static PropTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE).isRequired,
    backgroundColor: COLOR_TYPE,
    cellWidth: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    cellGap: PropTypes.number.isRequired,
    stackedHeight: PropTypes.number.isRequired,
    framesPerTick: PropTypes.number.isRequired,
  };

  static defaultProps = {
    // Default props are set in GameOfLifePropConverter.js!
    // Done this way to handle the prop-derivation for `cellHeight` and
    // `stackedHeight` in one place, for consistency.
  };

  state = {
    frame: 0,
  };

  componentDidMount() {
    this.initialize();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height
    ) {
      this.initialize();
    }
  }

  componentDidUpdate() {
    const { cellWidth, cellHeight, colors, framesPerTick } = this.props;
    const { frame } = this.state;
    const { board, nextBoard, highlightCell } = this;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Look into the future, and see what happens to this cell next tick.
        // We'll transition into this new state (dead, or an increasing color).
        const nextCell = nextBoard[rowIndex][colIndex];

        // Ignore dead cells (this and next turn, because transitions)
        if (cell === 0 && nextCell === 0) {
          return;
        }

        const [x, y] = convertFromIndicesToCartesianCoordinates(
          rowIndex,
          colIndex,
          this.props
        );

        // The cell value is an integer of its age.
        // We can use that integer as an array index for its colour.
        // If the cell is older than our top value (eg. we have 3 values, and
        // this cell is 4 ticks old), use the oldest colour available.
        const currentColorIndex = Math.min(colors.length - 1, cell);
        const nextColorIndex = Math.min(colors.length - 1, nextCell);

        const currentColor = colors[currentColorIndex];
        const nextColor = colors[nextColorIndex];

        // TODO: Might be nice if each cell had a different animation speed.
        // Could be seeded from the coords
        const fractionMultiple = 2;
        const fractionOffset =
          colIndex / row.length / 2 + rowIndex / row.length / 2;
        const progressThroughTick = clamp(
          ((frame % framesPerTick) / framesPerTick) * fractionMultiple -
            fractionOffset,
          0,
          1
        );

        const cellColor = buildBlendedColorString(
          currentColor,
          nextColor,
          progressThroughTick
        );

        this.drawHex(this.ctx, x, y, cellWidth, cellHeight, {
          color: cellColor,
          fill: true,
        });
      });
    });

    // If there's a highlight cell, draw that as well.
    if (highlightCell) {
      const { rowIndex, colIndex } = highlightCell;

      const [x, y] = convertFromIndicesToCartesianCoordinates(
        rowIndex,
        colIndex,
        this.props
      );

      this.drawHex(this.ctx, x, y, cellWidth, cellHeight, {
        color: '#666',
        stroke: true,
        fill: false,
      });
    }
  }

  initialize = () => {
    const { width, height, cellWidth, cellGap, stackedHeight } = this.props;
    const { numRows, numCols } = getInitialBoardDimensions(this.props);

    window.cancelAnimationFrame(this.animationFrameId);

    // The initial board should be totally empty, so that our first _real_
    // board can fade in.
    this.board = generateNewBoard(numRows, numCols);

    // Randomly generate a board.
    // TODO: Find a nicer starting pattern?
    this.nextBoard = generateNewBoard(numRows, numCols, {
      randomize: true,
    });

    // We'll keep the current frame in state.
    // This is because we want the component to re-render on every frame,
    // so we can leverage the component lifecycle to do this for us.
    this.setState({
      frame: 0,
    });

    this.drawBackgroundGrid();
    this.draw();
  };

  handleMouseMove = ev => {
    // NOTE: I happen to know that in this app, the canvas sits at the
    // very top left of the page, so I don't have to worry about getting
    // relative coordinates in the canvas, I can just use window pos.
    const x = ev.clientX;
    const y = ev.clientY;

    const cell = getCellIndexForCoordinates(x, y, this.props);

    const isSameCell =
      this.highlightCell && !isDifferentCell(cell, this.highlightCell);

    if (isSameCell) {
      return;
    }

    // If this is indeed a new cell, store it on our instance.
    this.highlightCell = cell;

    // if the mouse button is depressed, update the board.
    if (!this.isPainting) {
      return;
    }

    const { rowIndex, colIndex } = cell;

    const board = manuallyUpdateCellStatus(rowIndex, colIndex, this.board);

    this.board = board;
    this.nextBoard = tick(board);
  };

  handleMouseDown = ev => {
    // Ignore non-left-clicks
    if (ev.which !== 1) {
      return;
    }

    const { rowIndex, colIndex } = getCellIndexForCoordinates(
      ev.clientX,
      ev.clientY,
      this.props
    );

    // We want to allow click-dragging, so we need to store the fact that
    // the user has clicked down.
    this.isPainting = true;

    const board = manuallyUpdateCellStatus(rowIndex, colIndex, this.board);

    this.board = board;
    this.nextBoard = tick(board);
  };

  handleMouseUp = ev => {
    this.isPainting = false;
  };

  handleMouseLeave = ev => {
    this.highlightCell = null;
  };

  draw = () => {
    const { framesPerTick } = this.props;
    const { frame } = this.state;
    const { board, nextBoard } = this;

    // There are X frames per game tick.
    // get the progress through the current game tick.
    const relativeFrame = (frame + 1) % framesPerTick;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const isStartOfNextTick = relativeFrame === 0;

    // Every X frames, we want to update the current board.
    this.board = isStartOfNextTick ? nextBoard : board;

    // Because we always want to be thinking "1 board ahead" (for
    // transitions), we need to generate the next nextBoard.
    this.nextBoard = isStartOfNextTick ? tick(nextBoard) : nextBoard;

    this.setState({ frame: frame + 1 }, () => {
      this.animationFrameId = window.requestAnimationFrame(this.draw);
    });
  };

  drawBackgroundGrid = () => {
    const {
      width,
      height,
      cellWidth,
      cellHeight,
      cellGap,
      stackedHeight,
      colors,
      backgroundColor,
    } = this.props;

    const { numRows, numCols } = getInitialBoardDimensions(this.props);

    const [deadCellColor] = colors;

    // Draw our background first
    this.bgCtx.fillStyle = buildColorString(backgroundColor);
    this.bgCtx.fillRect(0, 0, width, height);

    for (let column = 0; column < numCols; column++) {
      for (let row = 0; row < numRows; row++) {
        const [x, y] = convertFromIndicesToCartesianCoordinates(
          row,
          column,
          this.props
        );

        this.drawHex(this.bgCtx, x, y, cellWidth, cellHeight, {
          color: buildColorString(deadCellColor),
          fill: true,
        });
      }
    }
  };

  drawHex = (ctx, x, y, width, height, options) => {
    const { color, stroke = false, fill = false } = options;

    // To draw a hexagon, we'll just compute the 6 points relative to
    // the given x/y center point. Starting from the topmost point, and
    // moving clockwise.
    // There are smarter solutions, but this is simpler, and I'll actually
    // understand it when I come back in a few months :D
    const hexagonPoints = [
      [x, y - height * 0.5],
      [x + width * 0.5, y - height * 0.25],
      [x + width * 0.5, y + height * 0.25],
      [x, y + height * 0.5],
      [x - width * 0.5, y + height * 0.25],
      [x - width * 0.5, y - height * 0.25],
    ];

    const [startingPoint, ...remainingPoints] = hexagonPoints;

    ctx.beginPath();
    ctx.moveTo(...startingPoint);

    remainingPoints.forEach(point => {
      ctx.lineTo(...point);
    });

    ctx.closePath();

    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    }

    if (stroke) {
      ctx.strokeStyle = color;
      ctx.lineWidth = this.props.cellGap;
      ctx.stroke();
    }
  };

  captureForegroundRef = canvas => {
    if (!canvas) {
      return;
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  };

  captureBackgroundRef = canvas => {
    if (!canvas) {
      return;
    }

    this.bgCanvas = canvas;
    this.bgCtx = canvas.getContext('2d');
  };

  render() {
    const { width, height } = this.props;

    return (
      <Wrapper>
        <Foreground>
          <Canvas
            width={width}
            height={height}
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}
            innerRef={this.captureForegroundRef}
          />
        </Foreground>

        <Background>
          <Canvas
            width={width}
            height={height}
            innerRef={this.captureBackgroundRef}
          />
        </Background>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
`;

const Foreground = styled.div`
  position: relative;
  z-index: 2;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default GameOfLife;
