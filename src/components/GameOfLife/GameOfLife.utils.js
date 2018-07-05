export const generateNewBoard = (
  numRows,
  numCols,
  { randomize = false } = {}
) => {
  const board = [];

  let row = 0;
  let col = 0;

  while (row < numRows) {
    col = 0;
    board.push([]);

    while (col < numCols) {
      // Default all cells to 0, or randomize if requested
      const initialValue = randomize ? Math.round(Math.random()) : 0;

      board[row].push(initialValue);

      col++;
    }

    row++;
  }

  return board;
};

// TODO: Memoize this function if it winds up adding significantly to the
// render time.
export const getCellHeights = (cellWidth, cellGap) => {
  const cellHeight = Math.round(cellWidth / (Math.sqrt(3) / 2));

  // for _positioning_, we want to include the gap, since it's
  // the full width + gap that dictates the center position of
  // each hexagon.
  const heightWithGap = cellHeight + cellGap;

  // Since rows are 'nested', they aren't a full height apart.
  const stackedHeight = Math.round(heightWithGap * 0.75);

  return {
    cellHeight,
    stackedHeight,
  };
};

export const getInitialBoardDimensions = ({
  width,
  height,
  cellWidth,
  cellGap,
  stackedHeight,
}) => ({
  numRows: Math.ceil(height / stackedHeight) + 1,
  numCols: Math.ceil(width / (cellWidth + cellGap)) + 1,
});

export const getBoardDimensions = board => ({
  numRows: board.length,
  numCols: board[0].length,
});

export const convertFromIndicesToCartesianCoordinates = (
  row,
  col,
  { cellWidth, cellHeight, cellGap, stackedHeight }
) => {
  const widthWithGap = cellWidth + cellGap;

  const isOddRow = row % 2 !== 0;

  // Hex grids have offset rows; each second one is indented,
  // so that everything aligns properly.
  let x = col * widthWithGap + (isOddRow ? widthWithGap / 2 : 0);

  const y = row * stackedHeight;

  return [x, y];
};

export const getAliveCells = board => {
  const aliveCells = [];

  board.forEach((row, rowIndex) => {
    row.forEach((age, colIndex) => {
      if (age > 0) {
        aliveCells.push({ row: rowIndex, col: colIndex, age });
      }
    });
  });

  return aliveCells;
};

export const buildColorString = ({ r, g, b, a = 1 }) =>
  `rgba(${r}, ${g}, ${b}, ${a})`;

export const blendColors = (color1, color2, mix) => {
  if (mix < 0 || mix > 1) {
    throw new Error('Please provide a mix between 0 and 1');
  }

  return {
    r: Math.round(color1.r + (color2.r - color1.r) * mix),
    g: Math.round(color1.g + (color2.g - color1.g) * mix),
    b: Math.round(color1.b + (color2.b - color1.b) * mix),
    a: color1.a + (color2.a - color1.a) * mix,
  };
};

export const isDifferentCell = (cell1, cell2) =>
  cell1.rowIndex !== cell2.rowIndex || cell1.colIndex !== cell2.colIndex;

export const manuallyUpdateCellStatus = (rowIndex, colIndex, board) => {
  const currentStatus = board[rowIndex][colIndex];
  const newStatus = currentStatus > 0 ? currentStatus : 1;

  // Create a shallow copy of the board
  const newBoard = [...board];

  newBoard[rowIndex][colIndex] = newStatus;

  return newBoard;
};

export const getAdjacentCells = (row, col, board) => {
  const { numRows, numCols } = getBoardDimensions(board);

  const isOddRow = row % 2 !== 0;

  const adjacentList = [
    { row: row - 1, col: col - (isOddRow ? 0 : 1) },
    { row: row - 1, col: col + (isOddRow ? 1 : 0) },
    { row: row, col: col + 1 },
    { row: row + 1, col: col + (isOddRow ? 1 : 0) },
    { row: row + 1, col: col - (isOddRow ? 0 : 1) },
    { row: row, col: col - 1 },
  ];

  // Deal with wrapping.
  // Doing this mutatively, since this is a frequently-run operation;
  // Perf is important here, immutability cost is too high.
  // TODO: Is it worthwhile to abstract these 4 conditions?
  adjacentList.forEach(cell => {
    if (cell.row === -1) {
      cell.row = numRows - 1;
    }

    if (cell.col === -1) {
      cell.col = numCols - 1;
    }

    if (cell.row === numRows) {
      cell.row = 0;
    }

    if (cell.col === numCols) {
      cell.col = 0;
    }
  });

  return adjacentList;
};

export const getNumOfNeighbors = (row, col, board) => {
  const { numRows, numCols } = getBoardDimensions(board);

  const adjacentCells = getAdjacentCells(row, col, board);

  const aliveCells = adjacentCells.filter(
    ({ row, col }) => board[row][col] > 0
  );

  return aliveCells.length;
};

export const getCellIndexForCoordinates = (
  x,
  y,
  { cellWidth, cellHeight, stackedHeight, cellGap }
) => {
  // This is surprisingly non-trivial!
  // TODO: Clean this method up, it's a bit of a mess.

  // Get some helper vars.
  // `topHexHeight` is the height of the overlapping parts of the hexagon
  const topHexHeight = Math.round(cellHeight / 4);
  const widthWithGap = cellWidth + cellGap;

  // Get our rough approximation for which row it's in.
  // Because our hexes are pointy-topped, this may be wrong for cursors
  // in the top 1/4th of the cell height (because its X-position can affect
  // which row it's in). We'll correct that later.
  let rowIndex = Math.round((y + topHexHeight / 2) / stackedHeight);

  const rowIsOdd = rowIndex % 2 !== 0;

  // If we're in an odd row, the row is shifted to the right by half a cell.
  const offsetAmount = rowIsOdd ? 0 : cellWidth * 0.5;

  // Get an approximation of our column index.
  // Again, cursors in the top 1/4th of the cell may need to be corrected.
  let colIndex = Math.floor((x + offsetAmount) / (cellWidth + cellGap));

  // Get relative coordinates (so that each hexagon has the same coordinates).
  // Relative to the top-left corner. So, there's no (0, 0), since that would
  // be in the neighbouring hex, but there IS:
  // - (0, cellHeight / 2) - left edge, vertical center
  // - (cellWidth / 2, 0) - Top of the point of the hexagon.
  const relativeX = x - colIndex * widthWithGap + offsetAmount;
  const relativeY = y - rowIndex * stackedHeight + topHexHeight * 2;

  // The gradient is the steepness of the hexagon's top lines (relative to
  // a flat horizontal line)
  const gradient = topHexHeight / (cellWidth / 2);

  // If we're in the top-left or top-right, make the necessary adjustments.
  if (relativeY < -gradient * relativeX + topHexHeight) {
    rowIndex--;
    if (!rowIsOdd) {
      colIndex--;
    }
  } else if (relativeY < gradient * relativeX - topHexHeight) {
    rowIndex--;
    if (rowIsOdd) {
      colIndex++;
    }
  }

  return { rowIndex, colIndex };
};

export const getStatusForCell = ({ currentValue, numNeighbors }) => {
  // If this cell has less than X alive neighbors, it dies, as if caused by
  // underpopulation.
  if (numNeighbors < 3) {
    return 0;
  }

  // If this cell has more than X alive neighbors, it dies, as if caused by
  // overcrowding
  if (numNeighbors > 4) {
    return 0;
  }

  // If this cell was empty/dead, and only has 2 neighbors, it remains dead
  if (currentValue === 0 && numNeighbors === 2) {
    return 0;
  }

  // Only two possibilities remain:
  // - this is a dead cell with exactly 3 neighbors
  // - this is a live cell with exactly 2 or 3 neighbors
  //
  // In either case, we want to increment its value by 1 (dead cells reach
  // their first generation, and live cells age by 1 generation).
  return currentValue + 1;
};

// NOTE: This is not a very efficient implementation.
// I think it's fine, since it's the easiest to understand, and because
// I'm running at 1 tick per sec (and 60 frames per tick), this should be
// more than quick enough
export const tick = oldBoard => {
  const { numRows, numCols } = getBoardDimensions(oldBoard);

  const newBoard = [];

  for (let row = 0; row < numRows; row++) {
    newBoard[row] = [];

    for (let col = 0; col < numCols; col++) {
      newBoard[row][col] = getStatusForCell({
        currentValue: oldBoard[row][col],
        numNeighbors: getNumOfNeighbors(row, col, oldBoard),
      });
    }
  }

  return newBoard;
};
