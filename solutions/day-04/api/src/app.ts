import { Service } from 'typedi';

import { BingoModule } from './bingo/bingo.module';

@Service()
export class AppModule {
  constructor(
    bingoModule: BingoModule
  ) {}
}
