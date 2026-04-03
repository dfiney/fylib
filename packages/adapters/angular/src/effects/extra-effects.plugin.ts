import { GlobalEffectPlugin, animationEngine } from '@fylib/animation';

let registered = false;
const activeLoops = new Map<string, { stop: () => void }>();

function createCanvas(id: string): HTMLCanvasElement | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  const canvasId = `fy-${id}-canvas`;
  const existing = document.querySelector<HTMLCanvasElement>(`#${canvasId}`);
  if (existing) return existing;
  
  const canvas = document.createElement('canvas');
  canvas.id = canvasId;
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

// --- SNOW (Christmas) ---
interface SnowParticle {
  x: number; y: number; vx: number; vy: number; radius: number; opacity: number;
}

function renderSnow(count: number, speed: number, loop: boolean, id: string) {
  const canvas = createCanvas('snow');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const particles: SnowParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() * 2 + 1) * speed,
      radius: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  let animationId: number;
  const stop = () => {
    cancelAnimationFrame(animationId);
    activeLoops.delete(id);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  activeLoops.set(id, { stop });

  function frame() {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    ctx!.fillStyle = 'white';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > canvas!.height) {
        p.y = -p.radius;
        p.x = Math.random() * canvas!.width;
      }
      ctx!.globalAlpha = p.opacity;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fill();
    });
    animationId = requestAnimationFrame(frame);
  }
  frame();
}

// --- BUBBLES (XP) ---
interface BubbleParticle {
  x: number; y: number; vy: number; radius: number; opacity: number; hue: number;
}

function renderBubbles(count: number, speed: number, loop: boolean, id: string) {
  const canvas = createCanvas('bubbles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const particles: BubbleParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vy: -(Math.random() * 1 + 0.5) * speed,
      radius: Math.random() * 15 + 5,
      opacity: Math.random() * 0.3 + 0.1,
      hue: 200 + Math.random() * 40 // Blueish
    });
  }

  let animationId: number;
  const stop = () => {
    cancelAnimationFrame(animationId);
    activeLoops.delete(id);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  activeLoops.set(id, { stop });

  function frame() {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    particles.forEach(p => {
      p.y += p.vy;
      if (p.y < -p.radius) {
        p.y = canvas!.height + p.radius;
        p.x = Math.random() * canvas!.width;
      }
      ctx!.strokeStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.stroke();
      // Reflection
      ctx!.beginPath();
      ctx!.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.2, 0, Math.PI * 2);
      ctx!.fillStyle = `hsla(${p.hue}, 70%, 90%, ${p.opacity})`;
      ctx!.fill();
    });
    animationId = requestAnimationFrame(frame);
  }
  frame();
}

// --- MATRIX (Nexus) ---
function renderMatrix(count: number, speed: number, loop: boolean, id: string) {
  const canvas = createCanvas('matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops: number[] = new Array(columns).fill(1);
  const chars = "0123456789ABCDEFHIJKLMNOPQRSTUVWXYZ@#$%^&*()".split("");

  let animationId: number;
  const stop = () => {
    cancelAnimationFrame(animationId);
    activeLoops.delete(id);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  activeLoops.set(id, { stop });

  let lastTime = 0;
  const interval = 50 / speed;

  function frame(time: number) {
    if (time - lastTime > interval) {
      // Usar uma opacidade muito baixa para o rastro, para não escurecer a tela (overlay sutil)
      ctx!.fillStyle = "rgba(10, 15, 18, 0.03)"; 
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      
      // Caracteres bem sutis
      ctx!.fillStyle = "rgba(34, 197, 94, 0.15)"; 
      ctx!.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      lastTime = time;
    }
    animationId = requestAnimationFrame(frame);
  }
  frame(0);
}

// --- PARTICLES (Default/Workbench) ---
interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; color: string;
}

function renderParticles(count: number, speed: number, loop: boolean, id: string, color: string = '#3b82f6') {
  const canvas = createCanvas('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 2 + 1,
      color: color
    });
  }

  let animationId: number;
  const stop = () => {
    cancelAnimationFrame(animationId);
    activeLoops.delete(id);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  activeLoops.set(id, { stop });

  function frame() {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
      
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = 0.3;
      ctx!.fill();
    });
    animationId = requestAnimationFrame(frame);
  }
  frame();
}

// --- STARS (Workbench 3) ---
function renderStars(count: number, speed: number, loop: boolean, id: string) {
  const canvas = createCanvas('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const stars: any[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      twinkle: Math.random() * 0.05 + 0.01,
      opacity: Math.random()
    });
  }

  let animationId: number;
  const stop = () => {
    cancelAnimationFrame(animationId);
    activeLoops.delete(id);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  activeLoops.set(id, { stop });

  function frame() {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    stars.forEach(s => {
      s.opacity += s.twinkle;
      if (s.opacity > 1 || s.opacity < 0) s.twinkle *= -1;
      ctx!.globalAlpha = s.opacity;
      ctx!.fillStyle = 'white';
      ctx!.beginPath();
      ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx!.fill();
    });
    animationId = requestAnimationFrame(frame);
  }
  frame();
}

export const extraEffectsPlugin: GlobalEffectPlugin = {
  name: 'extra-effects-renderer',
  renderEffect(effect) {
    if (effect.type !== 'global') return;
    const params = effect.params || {};
    const id = params['id'] || 'default-extra-loop';
    
    if (params['stop'] && params['id']) {
      activeLoops.get(params['id'])?.stop();
      return;
    }

    const count = params['intensity'] || 50;
    const speed = params['speed'] || 1;
    const loop = !!params['loop'];

    switch (effect.name) {
      case 'snow': renderSnow(count, speed, loop, id); break;
      case 'bubbles': renderBubbles(count, speed, loop, id); break;
      case 'matrix': renderMatrix(count, speed, loop, id); break;
      case 'particles': renderParticles(count, speed, loop, id); break;
      case 'stars': renderStars(count, speed, loop, id); break;
      case 'aurora': renderParticles(count, speed, loop, id, '#5ac8fa'); break; // Aurora uses light blue particles for now
    }
  }
};

export function registerExtraEffectsPlugin() {
  if (registered) return;
  animationEngine.registerGlobalEffectPlugin(extraEffectsPlugin);
  registered = true;
}
