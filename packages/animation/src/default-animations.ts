import { animationEngine } from './engine';

const buttonAnimationsCss = `
.fy-anim-button-hover-soft:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.fy-anim-button-hover-glow:hover {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.35);
}

.fy-anim-button-hover-lift:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.fy-anim-button-click-press:active {
  transform: translateY(1px) scale(0.97);
}
`;

const layoutAnimationsCss = `
.fy-anim-layout-fade-in {
  animation: fy-layout-fade-in 0.4s ease-out;
}

@keyframes fy-layout-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const sidebarAnimationsCss = `
.fy-anim-sidebar-slide-in {
  animation: fy-sidebar-slide-in 0.25s ease-out;
}

.fy-anim-sidebar-slide-out {
  animation: fy-sidebar-slide-out 0.25s ease-in;
}

@keyframes fy-sidebar-slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fy-sidebar-slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
`;

const headerMenuAnimationsCss = `
.fy-anim-header-menu-dropdown-in {
  animation: fy-header-menu-dropdown-in 0.25s ease-out;
}
.fy-anim-header-menu-dropdown-out {
  animation: fy-header-menu-dropdown-out 0.25s ease-in;
}
@keyframes fy-header-menu-dropdown-in {
  from { transform: translateY(-8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes fy-header-menu-dropdown-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-8px); opacity: 0; }
}

.fy-anim-header-menu-macos-slide-in {
  animation: fy-header-menu-macos-slide-in 0.3s ease-out;
}
.fy-anim-header-menu-macos-slide-out {
  animation: fy-header-menu-macos-slide-out 0.26s ease-in;
}
@keyframes fy-header-menu-macos-slide-in {
  from { transform: translateY(-16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes fy-header-menu-macos-slide-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-16px); opacity: 0; }
}
`;

const inputAnimationsCss = `
.fy-anim-input-focus-glow:focus-within {
  box-shadow: 0 0 0 2px rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.45);
  border-color: rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.7);
}

.fy-anim-input-focus-soft:focus-within {
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.35);
}

.fy-anim-input-success-pulse {
  animation: fy-input-success-pulse 0.4s ease-out;
}

.fy-anim-input-error-shake {
  animation: fy-input-error-shake 0.3s ease-in-out;
}

@keyframes fy-input-success-pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  100% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}

@keyframes fy-input-error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
`;

const cardAnimationsCss = `
.fy-anim-card-fade-in {
  animation: fy-card-fade-in 0.4s ease-out;
}

@keyframes fy-card-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const selectAnimationsCss = `
.fy-anim-select-focus-glow:focus-within {
  box-shadow: 0 0 0 2px rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.45);
  border-color: rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.7);
}

.fy-anim-select-focus-soft:focus-within {
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.35);
}

.fy-anim-select-success-pulse {
  animation: fy-select-success-pulse 0.4s ease-out;
}

.fy-anim-select-error-shake {
  animation: fy-select-error-shake 0.3s ease-in-out;
}

@keyframes fy-select-success-pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  100% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}

@keyframes fy-select-error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
`;

const macosAnimationsCss = `
.fy-anim-layout-macos-window-enter {
  animation: fy-layout-macos-window-enter 0.45s ease-out;
}

@keyframes fy-layout-macos-window-enter {
  0% {
    opacity: 0;
    transform: translateY(-12px) scale(0.98);
  }
  60% {
    opacity: 1;
    transform: translateY(2px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fy-anim-sidebar-macos-slide-in {
  animation: fy-sidebar-macos-slide-in 0.3s ease-out;
}

.fy-anim-sidebar-macos-slide-out {
  animation: fy-sidebar-macos-slide-out 0.26s ease-in;
}

@keyframes fy-sidebar-macos-slide-in {
  from {
    transform: translateX(-16px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fy-sidebar-macos-slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-16px);
    opacity: 0;
  }
}

.fy-anim-input-focus-macos-glow:focus-within {
  box-shadow: 0 0 0 2px rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.45);
  border-color: rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.8);
}

.fy-anim-input-success-macos-pulse {
  animation: fy-input-success-macos-pulse 0.45s ease-out;
}

@keyframes fy-input-success-macos-pulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.5); }
  100% { box-shadow: 0 0 0 7px rgba(52, 199, 89, 0); }
}

.fy-anim-input-error-macos-shake {
  animation: fy-input-error-macos-shake 0.35s ease-in-out;
}

@keyframes fy-input-error-macos-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}

.fy-anim-card-macos-fade-in {
  animation: fy-card-macos-fade-in 0.45s ease-out;
}

@keyframes fy-card-macos-fade-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fy-anim-button-hover-macos-soft:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}

.fy-anim-button-click-macos-press:active {
  transform: translateY(1px) scale(0.97);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}
`;
function injectCssOnce(id: string, css: string) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

injectCssOnce('fy-button-animations', buttonAnimationsCss);
injectCssOnce('fy-layout-animations', layoutAnimationsCss);
injectCssOnce('fy-sidebar-animations', sidebarAnimationsCss);
injectCssOnce('fy-header-menu-animations', headerMenuAnimationsCss);
injectCssOnce('fy-input-animations', inputAnimationsCss);
injectCssOnce('fy-card-animations', cardAnimationsCss);
injectCssOnce('fy-macos-animations', macosAnimationsCss);

animationEngine.registerAnimation({
  name: 'button-hover-soft',
  duration: 150,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-hover-glow',
  duration: 150,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-hover-lift',
  duration: 180,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-click-press',
  duration: 120,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-click-ripple',
  duration: 220,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-success-pulse',
  duration: 300,
  easing: 'ease-in-out'
});

animationEngine.registerAnimation({
  name: 'button-error-shake',
  duration: 300,
  easing: 'ease-in-out'
});

animationEngine.registerAnimation({
  name: 'layout-fade-in',
  duration: 400,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'sidebar-slide-in',
  duration: 250,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'sidebar-slide-out',
  duration: 250,
  easing: 'ease-in'
});

animationEngine.registerAnimation({
  name: 'header-menu-dropdown-in',
  duration: 250,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'header-menu-dropdown-out',
  duration: 250,
  easing: 'ease-in'
});

animationEngine.registerAnimation({
  name: 'header-menu-macos-slide-in',
  duration: 300,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'header-menu-macos-slide-out',
  duration: 260,
  easing: 'ease-in'
});
animationEngine.registerAnimation({
  name: 'input-focus-glow',
  duration: 200,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'input-focus-soft',
  duration: 200,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'input-success-pulse',
  duration: 400,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'input-error-shake',
  duration: 300,
  easing: 'ease-in-out'
});

animationEngine.registerAnimation({
  name: 'card-fade-in',
  duration: 400,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'layout-macos-window-enter',
  duration: 450,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'sidebar-macos-slide-in',
  duration: 300,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'sidebar-macos-slide-out',
  duration: 260,
  easing: 'ease-in'
});

animationEngine.registerAnimation({
  name: 'input-focus-macos-glow',
  duration: 220,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'input-success-macos-pulse',
  duration: 450,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'input-error-macos-shake',
  duration: 350,
  easing: 'ease-in-out'
});

animationEngine.registerAnimation({
  name: 'card-macos-fade-in',
  duration: 450,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-hover-macos-soft',
  duration: 160,
  easing: 'ease-out'
});

animationEngine.registerAnimation({
  name: 'button-click-macos-press',
  duration: 130,
  easing: 'ease-out'
});
