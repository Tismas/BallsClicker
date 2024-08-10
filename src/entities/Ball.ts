import { board } from "../Board";
import { Vector } from "../math/Vector";
import { getCanvas, getContext } from "../utils/canvas";
import { ClickTarget } from "./ClickTarget";

const canvas = getCanvas();
const ctx = getContext();

export class Ball {
  constructor(
    public position: Vector,
    public velocity: Vector,
    public radius: number,
    public color: string,
    public speed: number
  ) {}

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(delta: number) {
    this.position = this.position.add(
      this.velocity.multiply(this.speed).multiply(delta)
    );

    if (
      this.position.x - this.radius < 0 ||
      this.position.x + this.radius > canvas.width
    ) {
      this.velocity.x *= -1;
    }
    if (
      this.position.y - this.radius < 0 ||
      this.position.y + this.radius > canvas.height
    ) {
      this.velocity.y *= -1;
    }

    board.clickTargets.forEach((target) => {
      if (this.isColliding(target)) {
        target.damage(1);
        this.velocity = this.position.subtract(target.position).normalize();
      }
    });
    board.balls.forEach((ball) => {
      if (ball !== this && ball.isColliding(this)) {
        this.velocity = this.position.subtract(ball.position).normalize();
        ball.velocity = this.velocity.multiply(-1);
      }
    });
  }

  isColliding(target: ClickTarget | Ball) {
    const distance = this.position.subtract(target.position).length;
    return distance < this.radius + target.radius;
  }

  static createBall = () => {
    const radius = 10;
    const position = Vector.random(
      radius * 2,
      canvas.width - radius * 2,
      radius * 2,
      canvas.height - radius * 2
    );
    const velocity = Vector.random(-1, 1, -1, 1).normalize();

    return new Ball(position, velocity, radius, "white", 50);
  };
}
