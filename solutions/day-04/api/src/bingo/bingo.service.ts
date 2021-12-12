import { Service, Inject } from 'typedi';
import { Board } from './model/board';
import { Game } from './model/game';

@Service()
export class BingoService {

  constructor(
    @Inject('db') private db
  ) {}

  async all(): Promise<Game[]> {
    return this.db.game;
  }

  async get(game: string|Partial<Game>): Promise<Game> {
    if ('string' === typeof game) return this.db.game.find(g => g.uuid === game);
    if ('uuid' in game) return this.db.game.find(g => g.uuid === game.uuid);
    throw new Error("Could not fetch game: invalid identifier");
  }

  async getGameBoards(game: string|Partial<Game>): Promise<Board[]> {
    const found = await this.get(game);
    if (!found) return [];
    return found.board.map(board => {
      if (board instanceof Board) return board;
      return this.db.board.find(g => g.uuid === game);
    });;
  }

}
