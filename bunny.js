/*
  QUESTION
  Prompt: Write a function that takes the input, gives the output, and meets the conditions below.

  Input: An N x M matrix of a garden. Each cell contains an integer representing the number of carrots in that part of the garden.

  Output: The number of carrots Bunny eats before falling asleep.

  Conditions: 
    - Bunny starts in the center of the garden. 
      - If there are more than one center cell, Bunny starts in the cell with the largest number of carrots. 
      - There will never be a tie for the highest number of carrots in a center cell. 
    - Bunny eats all of the carrots in his cell, then looks left, right, up, and down for more carrots. 
    - Bunny always moves to the adjacent cell with the highest carrot count. 
    - If there are no adjacent cells with carrots, Bunny falls asleep.

  Example test cases: 
  >>> garden1 = [
            [5, 7, 3],
            [0, 0, 4],
            [4, 6, 9],
            [4, 5, 8]
  ]

  >>> eat(garden1)
  27  # starts at garden[1][2] = 7, eats 7 carrots, looks at the 8, 0, 3, and 0 adjacent, moves to the 8, repeat.
*/

class Bunny {
  constructor(garden) {
    this.garden = garden;
    this.bunnyAwake = true;
    this.totalCarrots = 0;
    this.currentCell = null;
    this.visitedCells = [];
  }

  get carrotsEaten() {
    // Return 0 if garden is empty
    if (this.garden.length === 0) {
      return this.totalCarrots;
    }
    // Set the starting cell of the bunny
    this.currentCell = this.findStartingCell();

    // Check for carrots until the bunny falls asleep
    while (this.bunnyAwake) {
      this.checkForCarrots();
    }
    return this.totalCarrots;
  }

  /*
   * Retrieves the indicies that make up the starting cell for the bunny
  */
  findStartingCell() {
    let currentCell = {};
    // Total columns and rows in the matrix
    const totalCols = this.garden.length;
    const totalRows = this.garden[0].length;

    // Get middle coordinates
    const midY = totalCols % 2 !== 0 ?
      this.getOddMiddle(totalCols) :
      this.getEvenMiddle(totalCols);
    const midX = totalRows % 2 !== 0 ?
      this.getOddMiddle(totalRows) :
      this.getEvenMiddle(totalRows);

    // A center cell exists since there is only 1 middle index for each
    if (midY.length === 1 && midX.length === 1) {
      this.totalCarrots += this.garden[midY[0]][midX[0]];
      currentCell = { y: midY[0], x: midX[0] };
    } else {
      // Get each center cell
      let centerCellCarrots = 0;
      for (let i = 0; i < midY.length; i++) {
        for (let k = 0; k < midX.length; k++) {
          // Carrots in the cell being iterated over
          const cellCarrots = this.garden[midY[i]][midX[k]];
          // If this cell has more carrots, make it the new starting cell
          if (centerCellCarrots < cellCarrots) {
            centerCellCarrots = cellCarrots;
            currentCell = { y: midY[i], x: midX[k] };
          }
        }
      }
      this.totalCarrots += centerCellCarrots;
    }
    this.visitedCells.push(currentCell);

    return currentCell;
  }

  /*
   * Checks adjacent cells for carrots, updates the total number of carrots eaten, the current
   * cell the bunny is in, the cells the bunny has visited, and puts the bunny to sleep if no carrots are
   * left to eat
  */
  checkForCarrots() {
    const x = this.currentCell.x;
    const y = this.currentCell.y;

    const cellsWithCarrots = [
      {
        direction: 'left',
        xPos: x - 1,
        yPos: y, 
        carrots: this.garden[y][x - 1]
      },
      {
        direction: 'right',
        xPos: x + 1,
        yPos: y, 
        carrots: this.garden[y][x + 1]
      },
      {
        direction: 'up',
        xPos: x,
        yPos: y - 1, 
        // Check that this exists first so that an error isn't thrown
        carrots: this.garden[y - 1] ? this.garden[y - 1][x] : undefined
      },
      {
        direction: 'down',
        xPos: x,
        yPos: y + 1, 
        // Check that this exists first so that an error isn't thrown
        carrots: this.garden[y + 1] ? this.garden[y + 1][x] : undefined
      }
    ];

    // Remove undefined values from the carrot counts 
    const carrotCounts = cellsWithCarrots.map(({ carrots, xPos, yPos }) => {
      const isVisitedCell = this.visitedCells.find(({ x, y }) => x === xPos && y === yPos);
      // If the adjacent cell doesn't exist, or it has been visited, set its carrot value to 0
      if (!carrots || isVisitedCell) {
        return 0;
      }
      return carrots;
    });
    // Pick the cell with the most carrots
    const highCarrotCount = Math.max(...carrotCounts);
    // If no adjacent carrots, fall asleep
    if (highCarrotCount === 0) {
      return this.bunnyAwake = false;
    }

    // Find the cell object with the most carrots 
    const highCarrotCell = cellsWithCarrots.find(({ carrots }) => carrots === highCarrotCount);

    // Update current cell to the one with the most carrots  
    const currentCell = { y: highCarrotCell.yPos, x: highCarrotCell.xPos };
    this.currentCell = currentCell;
    // Add the current cell to the list of previously visited cells
    this.visitedCells.push(currentCell);
    
    // Eat the carrots and update the total...nom nom
    this.totalCarrots += highCarrotCount;
  }

  /*
   * Retrieves the middle index in an odd numbered array
  */
  getOddMiddle(total) {
    return [Math.floor(total / 2)];
  }

  /*
   * Retrieves the middle indicies in an even numbered array
  */
  getEvenMiddle(total) {
    const half = total / 2;
    return [half, half - 1];
  }
}

module.exports = Bunny;
