import { v4 as uuidv4 } from 'uuid';
import { Board } from './board';

export class Game {
  public uuid  : string;
  public name  : string;
  public drawn : number[];
  public board : (Board|string)[];

  constructor(data?: Partial<Game>) {
    this.uuid = uuidv4();
    if (data) Object.assign(this, data);
    this.drawn = this.drawn || [];
  }
}
