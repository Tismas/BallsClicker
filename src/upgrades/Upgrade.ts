import { player } from "../Player";

export class Upgrade {
  constructor(
    public name: string,
    public cost: number,
    private _onUpgrade: VoidFunction
  ) {}

  apply() {
    if (player.money < this.cost) return false;

    player.money -= this.cost;
    this.cost = Math.floor(this.cost * 1.1);
    this._onUpgrade();
    return true;
  }
}
