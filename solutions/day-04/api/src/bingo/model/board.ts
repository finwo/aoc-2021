import { v4 as uuidv4 } from 'uuid';
import { Game } from './game';

export class Board {
  public uuid   : string;
  public values : number[][];
  public game   : (Game|string)[];

  constructor(data?: Partial<Board>) {
    this.uuid = uuidv4();
    if (data) Object.assign(this, data);
    this.values = this.values || [];
  }

}
