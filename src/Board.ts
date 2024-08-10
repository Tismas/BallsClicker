import { Ball } from "./entities/Ball";
import { ClickTarget } from "./entities/ClickTarget";
import { Vector } from "./math/Vector";
import { player } from "./Player";

export class Board {
  public balls: Ball[] = [];
  public clickTargets: ClickTarget[] = [];

  constructor() {}

  update(delta: number) {
    this.balls.forEach((ball) => {
      ball.update(delta);
    });
  }

  draw() {
    this.balls.forEach((ball) => {
      ball.draw();
    });
    this.clickTargets.forEach((clickTarget) => {
      clickTarget.draw();
    });
  }

  handleClick(event: MouseEvent) {
    const { x, y } = event;
    const clickPos = new Vector(x, y);
    this.clickTargets.forEach((clickTarget) => {
      const { position, radius } = clickTarget;
      const distance = position.distanceTo(clickPos);

      if (distance < radius) {
        clickTarget.damage(player.clickDamage);
      }
    });
  }

  setup() {
    this.clickTargets.push(ClickTarget.createClickTarget());
  }

  addBall() {
    this.balls.push(Ball.createBall());
  }

  addTarget() {
    this.clickTargets.push(ClickTarget.createClickTarget());
  }
}

export const board = new Board();
