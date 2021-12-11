import { Service, Container } from 'typedi';
import { lineByLine } from '@common/line-by-line';

import { Board } from './model/board';
import { Game } from './model/game';

@Service()
export class BingoModule {

  constructor() {
    this.initializeDb();
  }

  // TODO: move into dedicated file
  async initializeDb() {
    const db: {[index:string]:{[index:string]:any}[]} = Container.get('db');
    db.game  = db.game || [];
    db.board = db.board || [];

    // Only a single input file exists
    let game  = null;
    let board = null;
    await lineByLine(__dirname + '/../../assets/input', async line => {

      // Task defined first line as already-drawn numbers
      if (!game) {
        game = new Game({ drawn: line.split(',').map(v => parseInt(v)), board: [] });
        db.game.push(game);
        return;
      }

      // Handle board closure
      if (!line) {
        board = new Board({ game });
        db.board.push(board);
        game.board.push(board);
        return;
      }

      // Parse the board values line
      board.values.push(line.split(' ').filter(v => v).map(v => parseInt(v)));
    });

  }
}
