import { randomNumber } from "../math/random";
import { Vector } from "../math/Vector";
import { player } from "../Player";
import { getCanvas, getContext } from "../utils/canvas";

const canvas = getCanvas();
const ctx = getContext();

export class ClickTarget {
  public initialHealth: number;

  constructor(
    public position: Vector,
    public radius: number,
    public color: string,
    public health: number
  ) {
    this.initialHealth = health;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#111";
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    const fontSize = Math.round((this.radius * 2) / 3);
    ctx.font = `${fontSize}px Arial`;
    const text = Math.ceil(this.health).toString();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, this.position.x, this.position.y);
  }

  recreate() {
    this.position = Vector.random(
      this.radius * 2,
      canvas.width - this.radius * 2,
      this.radius * 2,
      canvas.height - this.radius * 2
    );
    this.radius = randomNumber(20, 50);
    this.health = Math.ceil(this.initialHealth * 1.05);
    this.initialHealth = this.health;
  }

  damage(dmg: number) {
    this.health -= dmg;
    player.money += player.clickDamage;
    if (this.health <= 0) this.recreate();
  }

  static createClickTarget = () => {
    const radius = randomNumber(20, 50);
    const position = Vector.random(
      radius * 2,
      canvas.width - radius * 2,
      radius * 2,
      canvas.height - radius * 2
    );

    return new ClickTarget(position, radius, "red", 10);
  };
}
