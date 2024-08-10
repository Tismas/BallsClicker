const moneyContainer = document.getElementById("money");

class Player {
  private _money = 0;
  public clickDamage = 1;

  constructor() {
    this.updateUi();
  }

  get money() {
    return this._money;
  }

  set money(value: number) {
    this._money = value;
    this.updateUi();
  }

  updateUi() {
    if (!moneyContainer) throw new Error("Money container not found");
    moneyContainer.innerText = Math.floor(this._money).toString();
  }
}

export const player = new Player();
