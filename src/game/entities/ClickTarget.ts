import { Canvas, CollisionCircle, PhysicsBody, Vector2, interpolate, randomInRange } from "@naszos/game-utils";

import { useGameStore } from "../../data/gameStore";
import { usePlayerStore } from "../../data/playerStore";
import { BasicBall } from "./balls/BasicBall";

export class ClickTarget extends PhysicsBody {
  radius: number;

  health: number;
  maxHealth: number;

  constructor() {
    const { canvas } = useGameStore();

    const radius = randomInRange(10, 50);
    super({
      position: Vector2.random([radius, radius], [canvas.screenWidth - radius - 1, canvas.screenHeight - radius - 1]),
      isStatic: true,
    });

    this.collisionShapes = [new CollisionCircle({ parent: this, radius })];
    this.radius = radius;
    this.health = 10;
    this.maxHealth = 10;

    this.setClickHandler(this.onClick);
    this.setCollisionCallback(this.onCollision);
  }

  draw = (canvas: Canvas) => {
    canvas.drawCircle(this.position, this.radius, { fill: "#f00" });

    const fontSize = interpolate(10, 26, (this.radius - 10) / 40);
    canvas.drawText(this.health.toString(), this.position, {
      font: `${fontSize}px Monospace`,
      textAlign: "center",
      textBaseline: "middle",
      color: "#fff",
    });
  };

  recreate = () => {
    const { canvas } = useGameStore();

    this.maxHealth += 5;
    this.health = this.maxHealth;
    this.radius = randomInRange(10, 50);
    this.position = Vector2.random(
      [this.radius, this.radius],
      [canvas.screenWidth - this.radius - 1, canvas.screenHeight - this.radius - 1],
    );
    this.collisionShapes = [new CollisionCircle({ parent: this, radius: this.radius })];
  };

  takeDamage = (damage: number) => {
    const player = usePlayerStore();
    player.gainMoney(damage);
    this.health -= damage;

    if (this.health <= 0) {
      this.recreate();
    }
  };

  onClick = () => {
    this.takeDamage(1);
  };

  onCollision = (other: PhysicsBody) => {
    if (other instanceof BasicBall) {
      this.takeDamage(other.damage);
    } else {
      this.takeDamage(1);
    }
  };
}
