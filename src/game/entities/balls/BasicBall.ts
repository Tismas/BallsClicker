import { Canvas, CollisionCircle, PhysicsBody, Vector2, clamp } from "@naszos/game-utils";

import { useGameStore } from "../../../data/gameStore";

export class BasicBall extends PhysicsBody {
  radius: number;
  damage: number;

  public static onBuy() {
    const gameStore = useGameStore();

    gameStore.addEntity(new BasicBall());
  }

  constructor() {
    const { canvas } = useGameStore();

    const radius = 10;
    super({
      position: Vector2.random([radius, radius], [canvas.screenWidth - radius - 1, canvas.screenHeight - radius - 1]),
      velocity: Vector2.random().normalized().multiply(100),
      keepMomentumOnCollision: true,
    });

    this.collisionShapes = [new CollisionCircle({ parent: this, radius })];
    this.radius = radius;
    this.damage = 1;
  }

  draw(canvas: Canvas): void {
    canvas.drawCircle(this.position, this.radius, { fill: "#eee" });
  }

  update(deltaTime: number, canvas: Canvas) {
    super.update(deltaTime, canvas);

    this.position.x = clamp(this.position.x, this.radius, canvas.screenWidth - this.radius - 1, () => (this.velocity.x *= -1));
    this.position.y = clamp(this.position.y, this.radius, canvas.screenHeight - this.radius - 1, () => (this.velocity.y *= -1));
  }
}
