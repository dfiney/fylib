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

const activeLoops = new Map<string, { stop: () => void }>();

function randomColor(): string {
  const colors = ['#f97316', '#22c55e', '#3b82f6', '#e11d48', '#eab308', '#6366f1'];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function createParticles(count: number, width: number, height: number, speed: number = 1): ConfettiParticle[] {
  const particles: ConfettiParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: -Math.random() * height,
      vx: (Math.random() - 0.5) * 4 * speed,
      vy: (Math.random() * 4 + 2) * speed,
      size: Math.random() * 8 + 4,
      color: randomColor(),
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2
    });
  }
  return particles;
}

function renderConfettiOnce(count: number, duration: number, speed: number = 1, loop: boolean = false, effectId?: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  // Se já existe um loop com esse ID, para ele antes de começar um novo
  if (effectId && activeLoops.has(effectId)) {
    activeLoops.get(effectId)?.stop();
  }

  const particles = createParticles(count, canvas.width, canvas.height, speed);
  const start = performance.now();
  let animationId: number;
  let isRunning = true;

  const stop = () => {
    isRunning = false;
    cancelAnimationFrame(animationId);
    if (effectId) activeLoops.delete(effectId);
  };

  if (effectId && loop) {
    activeLoops.set(effectId, { stop });
  }

  function frame(now: number) {
    if (!isRunning) return;
    const elapsed = now - start;
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Stop recycling after duration, but let existing particles finish falling
    const isRecycling = loop || elapsed < duration;
    let anyVisible = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05 * speed;
      p.rotation += p.vr;
      
      if (p.y - p.size > canvas.height) {
        if (isRecycling) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
          p.vy = (Math.random() * 4 + 2) * speed;
        }
      } else {
        anyVisible = true;
      }
    });

    if (anyVisible || isRecycling) {
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
      animationId = requestAnimationFrame(frame);
    } else {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (effectId) activeLoops.delete(effectId);
    }
  }

  animationId = requestAnimationFrame(frame);
}

const confettiPlugin: GlobalEffectPlugin = {
  name: 'confetti-renderer',
  renderEffect(effect) {
    if (effect.name === 'confetti' && effect.type === 'global') {
      const params = effect.params || {};

      if (params['stop'] && params['id']) {
        activeLoops.get(params['id'])?.stop();
        return;
      }

      const count = params['intensity'] || 80;
      const duration = params['duration'] || 1200;
      const speed = params['speed'] || 1;
      const loop = !!params['loop'];
      const id = params['id'];

      renderConfettiOnce(count, duration, speed, loop, id);
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
