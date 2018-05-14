// @flow

export default class GenePool {
  constructor(
    name: string = 'Pool1',
    poolCount: number,
    geneLength: number,
    range: { min: number, max: number },
  ) {
    this.NAME = name;
    this.POOL_COUNT = poolCount;
    this.GENE_LENGTH = geneLength;
    this.range = range;

    this.genePool = [];
    this.isLogger = false;
  }

  logger(isLogger: boolean) {
    this.isLogger = isLogger;
  }

  log(message: string) {
    if (!this.isLogger) return;
    console.log(` - ${this.NAME} : ${message}`);
  }

  initialize() {
    this.log('Initializing started.');
    for (let i = 0; i < this.POOL_COUNT; i++) {
      this.genePool[i] = { data: [], score: 0 };

      for (let j = 0; j < this.GENE_LENGTH; j++) {
        this.genePool[i].data[j] =
          Math.floor(Math.random() * (this.range.max - this.range.min + 1)) + this.range.min;
      }
      this.log(`GENE[pool: ${i}] = ${this.genePool[i].data.slice(0, 10)}...[${this.GENE_LENGTH}]`);
    }
    this.log('Initializing done.');
  }
}
