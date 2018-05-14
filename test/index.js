import GenePool from '../src/GenePool';
import Maze from './Maze';

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
];

const pool = new GenePool('MazePool', 300, 2048, { min: 0, max: 3 });
const maze = new Maze(map);

maze.init();

pool.logger(true);
pool.setFitnessFunction((data) => {
  maze.reset();
  let moveCount = 0;
  for (let i = 0; i < data.length; i++) {
    moveCount++;
    if (maze.move(data[i])) break;
  }
  return moveCount;
}, true);

pool.initialize();
pool.select();
