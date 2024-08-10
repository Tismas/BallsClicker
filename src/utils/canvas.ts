export const clear = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

export const resize = (canvas: HTMLCanvasElement) => {
  const { innerWidth, innerHeight } = window;
  canvas.width = innerWidth - 300;
  canvas.height = innerHeight;
};

let cachedCanvas: HTMLCanvasElement | null = null;
let cachedContext: CanvasRenderingContext2D | null = null;

export const getCanvas = () => {
  if (cachedCanvas) return cachedCanvas;
  const canvas = document.getElementById("game") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("Canvas not found");
  cachedCanvas = canvas;
  return canvas;
};
export const getContext = () => {
  if (cachedContext) return cachedContext;
  const canvas = getCanvas();
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not found");
  cachedContext = ctx;
  return ctx;
};
