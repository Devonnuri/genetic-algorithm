type Map = number[][];

export default class Maze {
  EMPTY = 0;
  WALL = 1;
  START = 2;
  END = 3;

  NORTH = 0;
  EAST = 1;
  SOUTH = 2;
  WEST = 3;

  map: Map;
  succeed: boolean = false;

  width: number;
  height: number;

  start: [number, number];
  end: [number, number];
  currentPos: [number, number];

  constructor(map: Map) {
    this.map = map;

    this.width = map[0].length;
    this.height = map.length;
  }

  init() {
    const startY = this.map.indexOf(
      this.map.filter(e => !!~e.indexOf(this.START))[0]
    );
    const startX = this.map[startY].indexOf(this.START);

    const endY = this.map.indexOf(
      this.map.filter(e => !!~e.indexOf(this.END))[0]
    );
    const endX = this.map[endY].indexOf(this.END);

    this.start = [startX, startY];
    this.end = [endX, endY];
    this.currentPos = this.start;
  }

  move(direction: number) {
    const [tempX, tempY] = [
      [0, 1, 0, -1][direction] + this.currentPos[0],
      [1, 0, -1, 0][direction] + this.currentPos[1]
    ];

    if (
      tempX > -1 &&
      tempY > -1 &&
      tempX < this.width &&
      tempY < this.height &&
      this.map[tempY][tempX] !== this.WALL
    ) {
      this.currentPos = [tempX, tempY];
    }

    this.succeed =
      this.currentPos[0] === this.end[0] && this.currentPos[1] === this.end[1];
    return this.succeed;
  }

  reset() {
    this.currentPos = this.start;
  }

  print() {
    for (let i = 0; i < this.height; i++) {
      let result = "";
      for (let j = 0; j < this.width; j++) {
        if (this.currentPos[1] === i && this.currentPos[0] === j) {
          result += "▲";
        } else if (this.map[i][j] === this.EMPTY) {
          result += "□";
        } else if (this.map[i][j] === this.WALL) {
          result += "■";
        } else if (this.map[i][j] === this.START) {
          result += "①";
        } else if (this.map[i][j] === this.END) {
          result += "②";
        }
      }
      console.log(result);
    }
  }
}
