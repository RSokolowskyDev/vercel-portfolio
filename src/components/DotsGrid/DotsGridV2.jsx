'use client';
import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export const DotsGridV2 = ({
  dotColor   = '#245E51',
  activeColor = '#A8FF51',
  opacity    = 1,
  dotSize    = '0.8vw',
}) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef([hexToRgb(dotColor), hexToRgb(activeColor)]);
  const forceRedrawRef = useRef(false);

  useEffect(() => {
    colorsRef.current = [hexToRgb(dotColor), hexToRgb(activeColor)];
    forceRedrawRef.current = true;
  }, [dotColor, activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const THRESHOLD       = 150;
    const SHOCK_R         = 250;
    const SHOCK_POWER     = 5;
    const SPEED_THRESHOLD = 150;  // px/s before hover push kicks in
    const HOVER_SCALE     = 1/160; // mouse px/s → dot px/frame
    const K               = 0.08;
    const DAMP            = 0.75;

    let dots        = [];
    let dotR        = 0;
    let mouse       = { x: -9999, y: -9999 };
    let lastMx      = -9999, lastMy = -9999, lastMt = 0;
    let energy      = 1;
    let mouseActive = false;
    let animId;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const W   = window.innerWidth;
      const H   = window.innerHeight;

      // Setting width/height resets canvas context — then apply dpr scale once
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const raw  = dotSize.endsWith('vw') ? parseFloat(dotSize) / 100 * W : parseFloat(dotSize) || 8;
      dotR       = raw / 2;
      const gap  = raw * 2;
      const cols = Math.floor((W + gap) / (raw + gap));
      const rows = Math.floor((H + gap) / (raw + gap));

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * (raw + gap) + dotR;
          const y = r * (raw + gap) + dotR;
          dots.push({ ox: x, oy: y, px: x, py: y, vx: 0, vy: 0, t: 0, pushed: false });
        }
      }
      energy = 1;
      lastMx = -9999; lastMy = -9999; lastMt = 0;
    }

    function frame() {
      if (energy < 0.05 && !mouseActive && !forceRedrawRef.current) {
        animId = requestAnimationFrame(frame);
        return;
      }
      forceRedrawRef.current = false;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const [[br, bg, bb], [ar, ag, ab]] = colorsRef.current;
      let e = 0;

      // Physics pass + compute per-dot t value
      dots.forEach(dot => {
        dot.vx = (dot.vx + (dot.ox - dot.px) * K) * DAMP;
        dot.vy = (dot.vy + (dot.oy - dot.py) * K) * DAMP;
        dot.px += dot.vx;
        dot.py += dot.vy;
        e += dot.vx * dot.vx + dot.vy * dot.vy;
        dot.t = Math.max(0, 1 - Math.hypot(dot.ox - mouse.x, dot.oy - mouse.y) / THRESHOLD);
        // Reset push lock once dot has settled back
        if (dot.pushed && Math.hypot(dot.vx, dot.vy) < 0.3) dot.pushed = false;
      });
      energy = e;

      // Single batched path for base-color dots (one GPU fill call)
      ctx.fillStyle = `rgb(${br},${bg},${bb})`;
      ctx.beginPath();
      dots.forEach(dot => {
        if (dot.t === 0) {
          ctx.moveTo(dot.px + dotR, dot.py);
          ctx.arc(dot.px, dot.py, dotR, 0, Math.PI * 2);
        }
      });
      ctx.fill();

      // Individual fills for mouse-active (color-interpolated) dots
      dots.forEach(dot => {
        if (dot.t > 0) {
          const t = dot.t;
          ctx.fillStyle = `rgb(${Math.round(br + (ar - br) * t)},${Math.round(bg + (ag - bg) * t)},${Math.round(bb + (ab - bb) * t)})`;
          ctx.beginPath();
          ctx.arc(dot.px, dot.py, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const now = performance.now();
      const dt  = now - lastMt || 16;
      const svx = (e.clientX - lastMx) / dt * 1000; // px/s
      const svy = (e.clientY - lastMy) / dt * 1000;
      const spd = Math.hypot(svx, svy);

      lastMx = e.clientX; lastMy = e.clientY; lastMt = now;
      mouse = { x: e.clientX, y: e.clientY };
      mouseActive = true;
      if (energy < 0.05) energy = 1;

      // Push nearby dots proportional to mouse velocity (same mechanic as original)
      if (spd > SPEED_THRESHOLD) {
        dots.forEach(dot => {
          const d = Math.hypot(dot.ox - e.clientX, dot.oy - e.clientY);
          if (d < THRESHOLD && !dot.pushed) {
            dot.pushed = true;
            const t = 1 - d / THRESHOLD;
            dot.vx += svx * HOVER_SCALE * t;
            dot.vy += svy * HOVER_SCALE * t;
          }
        });
        energy = 1;
      }
    }

    function onLeave() {
      mouseActive = false;
    }

    function onClick(e) {
      dots.forEach(dot => {
        const d = Math.hypot(dot.ox - e.clientX, dot.oy - e.clientY);
        if (d < SHOCK_R) {
          const falloff = 1 - d / SHOCK_R;
          // Match original formula: push vector = (dot - click) * shockPower * falloff
          // divided by 30 to convert GSAP px/s units to canvas px/frame,
          // plus ±25% random variation to break the uniform star pattern
          const rand  = 0.75 + Math.random() * 0.5;
          const scale = SHOCK_POWER * falloff * rand / 30;
          dot.vx += (dot.ox - e.clientX) * scale;
          dot.vy += (dot.oy - e.clientY) * scale;
        }
      });
      energy = 1;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ opacity, display: 'block' }} />;
};
