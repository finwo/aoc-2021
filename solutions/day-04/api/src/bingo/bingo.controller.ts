import { Service, Inject } from 'typedi';
import { Request, Response } from 'express';

import { Controller, Get } from '../interface/rest';
import { BingoService } from './bingo.service';

@Controller('bingo')
@Service()
export class BingoController {

  constructor(
    private bingoService: BingoService
  ) {}

  // List game uuids
  @Get('games/:uuid/boards')
  async getGameBoards({ res, uuid }: { res: Response, uuid: string }) {
    const found = await this.bingoService.getGameBoards(uuid);
    if (!found) return res.end(JSON.stringify({
      ok    : false,
      error : 'not-found',
    }));
    res.end(JSON.stringify({
      ok   : true,
      data : found.map(board => ({
        uuid   : board.uuid,
        values : board.values,
      }))
    }, null, 2));
  }

  // Fetch a single game
  @Get('games/:uuid')
  async getGame({ res, uuid }: { res: Response, uuid: string }) {
    const found = await this.bingoService.get(uuid);
    if (!found) return res.end(JSON.stringify({
      ok    : false,
      error : 'not-found',
    }));
    res.end(JSON.stringify({
      ok   : true,
      data : {
        uuid  : found.uuid,
        name  : found.name,
        drawn : found.drawn,
      },
    }, null, 2));
  }

  // List game uuids
  @Get('games')
  async listGames({ res }: { res: Response }) {
    const found = await this.bingoService.all();
    res.end(JSON.stringify({
      ok   : true,
      data : found.map(game => ({
        uuid : game.uuid,
        name : game.name,
      })),
    }));
  }

}
