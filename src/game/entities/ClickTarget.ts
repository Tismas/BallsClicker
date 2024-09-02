import { Canvas, CollisionCircle, PhysicsBody, Vector2, interpolate } from "@naszos/game-utils";

import { useGameStore } from "../../data/gameStore";
import { usePlayerStore } from "../../data/playerStore";
import { BasicBall } from "./balls/BasicBall";

export class ClickTarget extends PhysicsBody {
  radius: number;

  health: number;
  maxHealth: number;
  spawningPercentage: number;

  public static onBuy() {
    const gameStore = useGameStore();
    gameStore.addEntity(new ClickTarget());
  }

  constructor() {
    const { canvas } = useGameStore();

    const radius = 40;
    super({
      position: Vector2.random([radius, radius], [canvas.screenWidth - radius - 1, canvas.screenHeight - radius - 1]),
      isStatic: true,
    });

    this.collisionShapes = [new CollisionCircle({ parent: this, radius })];
    this.radius = radius;
    this.health = 10;
    this.maxHealth = 10;
    this.spawningPercentage = 95;

    this.setClickHandler(this.onClick);
    this.setCollisionCallback(this.onCollision);
  }

  get isDamageable() {
    return this.spawningPercentage >= 100;
  }

  get color() {
    return this.isDamageable ? "#f00" : "#ccc";
  }

  draw = (canvas: Canvas) => {
    const sizeModifier = this.spawningPercentage / 100;

    canvas.drawCircle(this.position, this.radius * sizeModifier, { fill: this.color });

    const fontSize = interpolate(10, 26, (this.radius - 10) / 40) * sizeModifier;
    canvas.drawText(this.health.toString(), this.position, {
      font: `${fontSize}px Monospace`,
      textAlign: "center",
      textBaseline: "middle",
      color: "#fff",
    });
  };

  update(deltaTime: number, _canvas: Canvas): void {
    super.update(deltaTime, _canvas);

    if (this.spawningPercentage < 100) this.spawningPercentage += deltaTime * 25;
    else this.spawningPercentage = 100;
  }

  recreate = () => {
    const { canvas } = useGameStore();

    this.spawningPercentage = 0;
    this.maxHealth += 5;
    this.health = this.maxHealth;
    this.radius = 40;
    this.position = Vector2.random(
      [this.radius, this.radius],
      [canvas.screenWidth - this.radius - 1, canvas.screenHeight - this.radius - 1],
    );
    this.collisionShapes = [new CollisionCircle({ parent: this, radius: this.radius })];
  };

  takeDamage = (damage: number) => {
    if (!this.isDamageable) return;

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
    }
  };
}
