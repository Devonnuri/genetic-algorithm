import GenePool from '../src/GenePool';

const pool = new GenePool('MazePool', 300, 2048, { min: 0, max: 4 });

pool.logger(true);

pool.initialize();
