const assert = require('assert');
const Bunny = require('./bunny');

describe('Bunny', () => {
  it('should return the correct number of carrots with 4 x 3 array', () => {
    const garden = [
      [5, 7, 3],
      [0, 0, 4],
      [4, 6, 9],
      [4, 5, 8]
    ];
    const mrBunny = new Bunny(garden);
    assert.equal(mrBunny.carrotsEaten, 36);
  });

  it('should return the correct number of carrots with a 3 x 3 array', () => {
    const garden = [
      [5, 7, 3],
      [1, 0, 4],
      [4, 2, 8]
    ];
    const mrBunny = new Bunny(garden);
    assert.equal(mrBunny.carrotsEaten, 34);
  });

  it('should return the correct number of carrots with a 5 x 4 array', () => {
    const garden = [
      [5, 7, 3, 1, 2],
      [0, 0, 5, 9, 8],
      [4, 6, 4, 3, 1],
      [5, 7, 3, 5, 2],
    ];
    const mrBunny = new Bunny(garden);
    assert.equal(mrBunny.carrotsEaten, 40);
  });
});