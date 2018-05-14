// @flow

export default class Maze {
  constructor(map: Array<Array<number>>) {
    this.EMPTY = 0;
    this.WALL = 1;
    this.START = 2;
    this.END = 3;

    this.NORTH = 0;
    this.EAST = 1;
    this.SOUTH = 2;
    this.WEST = 3;

    this.map = map;
    this.succeed = false;

    this.WIDTH = this.map[0].length;
    this.HEIGHT = this.map.length;
  }

  init() {
    const startY = this.map.indexOf(this.map.filter(e => !!~e.indexOf(this.START))[0]);
    const startX = this.map[startY].indexOf(this.START);

    const endY = this.map.indexOf(this.map.filter(e => !!~e.indexOf(this.END))[0]);
    const endX = this.map[endY].indexOf(this.END);

    this.start = [startX, startY];
    this.end = [endX, endY];
    console.log(`END: ${this.end}`);

    this.currentPos = this.start;
  }

  move(direction: number) {
    const [tempX, tempY] = [
      [0, 1, 0, -1][direction] + this.currentPos[0],
      [1, 0, -1, 0][direction] + this.currentPos[1],
    ];

    if (
      tempX > -1 &&
      tempY > -1 &&
      tempX < this.WIDTH &&
      tempY < this.HEIGHT &&
      this.map[tempY][tempX] !== this.WALL
    ) {
      this.currentPos = [tempX, tempY];
    }

    this.succeed = this.currentPos[0] === this.end[0] && this.currentPos[1] === this.end[1];
    return this.succeed;
  }

  reset() {
    this.currentPos = this.start;
  }
}
