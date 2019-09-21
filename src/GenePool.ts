type Range = { min: number; max: number };
type FitnessFunction = (data: number[]) => number;

export default class GenePool {
  name: string;
  poolCount: number;
  geneLength: number;
  range: Range;

  genePool: { data: number[]; fitness: number }[] = [];
  isLogger: boolean = false;

  fitnessFunction: FitnessFunction = () => 0;
  fitnessReversed: boolean = false;

  currentGen: number = 1;

  MUTATION_CHANCE = 0.5;
  MUTATION_COUNT = 10;

  constructor(
    name: string = "Pool1",
    poolCount: number,
    geneLength: number,
    range: Range
  ) {
    this.name = name;
    this.poolCount = poolCount;
    this.geneLength = geneLength;
    this.range = range;
  }

  logger(isLogger: boolean) {
    this.isLogger = isLogger;
  }

  log(message: string) {
    if (!this.isLogger) return;
    console.log(` - ${this.name} : ${message}`);
  }

  // 적합도 함수를 지정합니다.
  setFitnessFunction(
    fitnessFunction: FitnessFunction,
    fitnessReversed: boolean
  ) {
    this.fitnessFunction = fitnessFunction;
    this.fitnessReversed = fitnessReversed;
  }

  // 모든 세대를 랜덤값으로 초기화합니다.
  initialize() {
    this.log("Initializing started.");
    for (let i = 0; i < this.poolCount; i++) {
      this.genePool[i] = { data: [], fitness: 0 };

      for (let j = 0; j < this.geneLength; j++) {
        this.genePool[i].data[j] =
          Math.floor(Math.random() * (this.range.max - this.range.min + 1)) +
          this.range.min;
      }
      this.log(
        `GENE[pool: ${i}] = ${this.genePool[i].data.slice(0, 10)}...[${
          this.geneLength
        }]`
      );
    }
    this.log("Initializing done.");

    this.select();
  }

  // Reward-based selection
  select() {
    this.simulate();
    this.genePool.sort(
      (a, b) => (a.fitness - b.fitness) * (this.fitnessReversed ? 1 : -1)
    );
  }

  // 모든 풀의 적합도를 계산합니다.
  simulate(): void {
    for (let i = 0; i < this.poolCount; i++) {
      this.genePool[i].fitness = this.simulateGene(i);
    }
  }

  // 주어진 세대의 적합도 함수를 실행한 뒤 실행한 결과를 반환합니다.
  simulateGene(pool: number): number {
    return this.fitnessFunction(this.genePool[pool].data);
  }

  // Single-point Crossover
  crossover(pool1: number, pool2: number) {
    const point = Math.floor(Math.random() * this.geneLength);
    return [
      ...this.genePool[pool1].data.slice(0, point),
      ...this.genePool[pool2].data.slice(point)
    ];
  }

  // Reward-based selection
  getRandomParent() {
    const parent = Math.floor(Math.random() * Math.floor(this.poolCount / 4));
    return parent;
  }

  mutate() {
    for (let i = 0; i < this.poolCount; i++) {
      if (Math.random() > this.MUTATION_CHANCE) {
        for (let j = 0; j < this.MUTATION_COUNT; j++) {
          this.genePool[i].data[Math.floor(Math.random() * this.geneLength)] =
            Math.floor(Math.random() * (this.range.max - this.range.min + 1)) +
            this.range.min;
        }
      }
    }
  }

  nextGeneration() {
    const tempGen = [];
    for (let i = 0; i < this.poolCount; i++) {
      const crossovered = this.crossover(
        this.getRandomParent(),
        this.getRandomParent()
      );
      tempGen.push({ data: crossovered });
    }
    this.genePool = tempGen;
    this.currentGen++;

    this.select();
    this.mutate();

    if (this.isLogger) {
      process.stdout.write("\x1Bc");
      console.log(`=== Generation ${this.currentGen} Done. ===`);
      console.log(
        ` - Best Results : ${this.genePool.slice(0, 5).map(e => e.fitness)}`
      );
    }
  }

  getBestResult(rank: number = 0) {
    return this.genePool[rank].data;
  }
}
