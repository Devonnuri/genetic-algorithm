// @flow

export default class GenePool {
  constructor(
    name: string = 'Pool1',
    genCount: number,
    geneLength: number,
    range: { min: number, max: number },
  ) {
    this.NAME = name;
    this.GENERATIONS = genCount;
    this.GENE_LENGTH = geneLength;
    this.range = range;

    this.genePool = [];
    this.isLogger = false;

    this.fitnessFunction = () => {};
    this.fitnessReversed = false;

    this.currentGen = 0;
  }

  logger(isLogger: boolean) {
    this.isLogger = isLogger;
  }

  log(message: string) {
    if (!this.isLogger) return;
    console.log(` - ${this.NAME} : ${message}`);
  }

  // 적합도 함수를 지정합니다.
  setFitnessFunction(
    fitnessFunction: (data: Array<number>) => number,
    fitnessReversed: ?boolean = false,
  ) {
    this.fitnessFunction = fitnessFunction;
    this.fitnessReversed = fitnessReversed;
  }

  // 모든 세대를 랜덤값으로 초기화합니다.
  initialize() {
    this.log('Initializing started.');
    for (let i = 0; i < this.GENERATIONS; i++) {
      this.genePool[i] = { data: [], fitness: 0 };

      for (let j = 0; j < this.GENE_LENGTH; j++) {
        this.genePool[i].data[j] =
          Math.floor(Math.random() * (this.range.max - this.range.min + 1)) + this.range.min;
      }
      this.log(`GENE[generation: ${i}] = ${this.genePool[i].data.slice(0, 10)}...[${this.GENE_LENGTH}]`);
    }
    this.log('Initializing done.');
  }

  // Fitness proportionate selection
  select() {
    this.simulate();
    this.genePool.sort((a, b) => (a.fitness - b.fitness) * (this.fitnessReversed ? 1 : -1));

    for (let i = 0; i < this.GENERATIONS; i++) {
      this.log(`GENE[generation: ${i}].fitness = ${this.genePool[i].fitness}`);
    }
  }

  // 모든 세대의 적합도를 계산합니다.
  simulate(): void {
    for (let i = 0; i < this.GENERATIONS; i++) {
      this.genePool[i].fitness = this.simulateGene(i);
    }
  }

  // 주어진 세대의 적합도 함수를 실행한 뒤 실행한 결과를 반환합니다.
  simulateGene(gen: number): number {
    return this.fitnessFunction(this.genePool[gen].data);
  }

  nextGen() {
    this.currentGen++;
  }
}
