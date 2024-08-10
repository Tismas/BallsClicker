import { board } from "./Board";
import { setupUi } from "./ui/tabContent";
import { clear, getCanvas, getContext, resize } from "./utils/canvas";

const TPS = 60;
let lastUpdate = Date.now();
const canvas = getCanvas();
const ctx = getContext();

const draw = () => {
  clear(ctx);

  board.draw();

  requestAnimationFrame(() => draw());
};

const update = () => {
  const now = Date.now();
  const delta = (now - lastUpdate) / 1000;

  board.update(delta);

  lastUpdate = now;
};

const setup = () => {
  resize(canvas);

  board.setup();

  setInterval(update, 1000 / TPS);
  requestAnimationFrame(() => draw());

  window.addEventListener("resize", () => resize(canvas));
  canvas.addEventListener("click", (event) => {
    board.handleClick(event);
  });

  setupUi();
};

setup();
