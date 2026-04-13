import { GlobalEffectPlugin, animationEngine } from '@fylib/animation';

let registered = false;

function createCanvas(): HTMLCanvasElement {
  const existing = document.querySelector<HTMLCanvasElement>('#fy-hearts-canvas');
  if (existing) {
    return existing;
  }
  const canvas = document.createElement('canvas');
  canvas.id = 'fy-hearts-canvas';
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

interface HeartParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
  opacity: number;
}

const activeLoops = new Map<string, { stop: () => void }>();

function getPuffyColors(): string[] {
  // Cores do tema finey-puffy-1
  return [
    '#ff85a2', // primary (rosa vibrante)
    '#ffb3c6', // secondary (rosa pastel)
    '#a2d2ff', // success (azul candy)
    '#ff4d6d', // danger (rosa forte)
    '#ffe5ec', // warning (rosa claríssimo)
    '#c8b6ff', // info (roxo lavanda)
    '#ffccd5'  // surface (rosa suave)
  ];
}

function createParticles(count: number, width: number, height: number, speed: number = 1): HeartParticle[] {
  const particles: HeartParticle[] = [];
  const colors = getPuffyColors();
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: -Math.random() * height,
      vx: (Math.random() - 0.5) * 2 * speed,
      vy: (Math.random() * 2 + 1.5) * speed,
      size: Math.random() * 12 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.5 + 0.5
    });
  }
  return particles;
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  
  // Desenha o coração centralizado no (0,0)
  const d = size;
  ctx.moveTo(0, d / 4);
  ctx.bezierCurveTo(0, 0, -d / 2, 0, -d / 2, d / 4);
  ctx.bezierCurveTo(-d / 2, d / 2, 0, d * 0.75, 0, d);
  ctx.bezierCurveTo(0, d * 0.75, d / 2, d / 2, d / 2, d / 4);
  ctx.bezierCurveTo(d / 2, 0, 0, 0, 0, d / 4);
  
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function renderHeartsOnce(count: number, duration: number, speed: number = 1, loop: boolean = false, effectId?: string) {
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
    
    const isRecycling = loop || elapsed < duration;
    let anyVisible = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02 * speed; // Gravidade proporcional à velocidade
      p.rotation += p.vr;
      
      if (p.y - p.size > canvas.height) {
        if (isRecycling) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
          p.vy = (Math.random() * 2 + 1.5) * speed;
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
        ctx.globalAlpha = p.opacity;
        drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation);
      });
      ctx.globalAlpha = 1.0;
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

const heartsPlugin: GlobalEffectPlugin = {
  name: 'hearts-renderer',
  renderEffect(effect) {
    if (effect.name === 'hearts' && effect.type === 'global') {
      const params = effect.params || {};
      
      if (params['stop'] && params['id']) {
        activeLoops.get(params['id'])?.stop();
        return;
      }

      const count = params['intensity'] || 40;
      const duration = params['duration'] || 2000;
      const speed = params['speed'] || 1;
      const loop = !!params['loop'];
      const id = params['id'];

      renderHeartsOnce(count, duration, speed, loop, id);
    }
  }
};

export function registerHeartsPlugin() {
  if (registered) {
    return;
  }
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  animationEngine.registerGlobalEffectPlugin(heartsPlugin);
  registered = true;
}
