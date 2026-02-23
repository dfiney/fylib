import { GlobalEffectPlugin, animationEngine } from '@fylib/animation';

let registered = false;

function createCanvas(): HTMLCanvasElement {
  const existing = document.querySelector<HTMLCanvasElement>('#fy-confetti-canvas');
  if (existing) {
    return existing;
  }
  const canvas = document.createElement('canvas');
  canvas.id = 'fy-confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  document.body.appendChild(canvas);
  return canvas;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
}

function randomColor(): string {
  const colors = ['#f97316', '#22c55e', '#3b82f6', '#e11d48', '#eab308', '#6366f1'];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function createParticles(count: number, width: number, height: number): ConfettiParticle[] {
  const particles: ConfettiParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: -Math.random() * height,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      size: Math.random() * 8 + 4,
      color: randomColor(),
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2
    });
  }
  return particles;
}

function renderConfettiOnce(count: number, duration: number) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  const particles = createParticles(count, canvas.width, canvas.height);
  const start = performance.now();

  function frame(now: number) {
    const elapsed = now - start;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rotation += p.vr;
      if (p.y - p.size > canvas.height) {
        p.y = -p.size;
        p.vy = Math.random() * 4 + 2;
      }
    });
    particles.forEach(p => {
      if (!ctx) {
        return;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(frame);
}

const confettiPlugin: GlobalEffectPlugin = {
  name: 'confetti-renderer',
  renderEffect(effect) {
    if (effect.name === 'confetti' && effect.type === 'global') {
      renderConfettiOnce(80, 1200);
    }
  }
};

export function registerConfettiPlugin() {
  if (registered) {
    return;
  }
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  animationEngine.registerGlobalEffectPlugin(confettiPlugin);
  registered = true;
}
