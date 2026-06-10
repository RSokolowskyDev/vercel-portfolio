'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import styles from './DotsGrid.module.css';

gsap.registerPlugin(InertiaPlugin);

export const DotsGrid = ({
  dotColor = '#245E51',
  activeColor = '#A8FF51',
  opacity = 1,
  centerHole = false,
  dotSize = '1vw',
}) => {
  const containerRef = useRef(null);
  const dotsRef      = useRef([]);
  const centersRef   = useRef([]);
  const colorsRef    = useRef({ base: dotColor, active: activeColor });

  // Grid builder — only reruns when layout params change, never on color change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.fontSize = dotSize;

    const threshold      = 150;
    const speedThreshold = 100;
    const shockRadius    = 250;
    const shockPower     = 5;
    const maxSpeed       = 5000;

    function buildGrid() {
      container.innerHTML = '';
      dotsRef.current    = [];
      centersRef.current = [];

      const style  = getComputedStyle(container);
      const dotPx  = parseFloat(style.fontSize);
      const gapPx  = dotPx * 2;
      const contW  = container.clientWidth;
      const contH  = document.body.scrollHeight;

      const cols  = Math.floor((contW + gapPx) / (dotPx + gapPx));
      const rows  = Math.floor((contH + gapPx) / (dotPx + gapPx));
      const total = cols * rows;

      const holeCols = centerHole ? (cols % 2 === 0 ? 4 : 5) : 0;
      const holeRows = centerHole ? (rows % 2 === 0 ? 4 : 5) : 0;
      const startCol = (cols - holeCols) / 2;
      const startRow = (rows - holeRows) / 2;

      for (let i = 0; i < total; i++) {
        const row    = Math.floor(i / cols);
        const col    = i % cols;
        const isHole = centerHole &&
          row >= startRow && row < startRow + holeRows &&
          col >= startCol && col < startCol + holeCols;

        const d = document.createElement('div');
        d.className = styles.dot;

        if (isHole) {
          d.style.visibility = 'hidden';
          d._isHole = true;
        } else {
          gsap.set(d, { x: 0, y: 0, backgroundColor: colorsRef.current.base });
          d._inertiaApplied = false;
        }

        container.appendChild(d);
        dotsRef.current.push(d);
      }

      requestAnimationFrame(() => {
        centersRef.current = dotsRef.current
          .filter(d => !d._isHole)
          .map(d => {
            const r = d.getBoundingClientRect();
            return {
              el: d,
              x: r.left + window.scrollX + r.width  / 2,
              y: r.top  + window.scrollY + r.height / 2,
            };
          });
      });
    }

    let lastTime = 0, lastX = 0, lastY = 0;

    function handleMouseMove(e) {
      const now   = performance.now();
      const dt    = now - lastTime || 16;
      let   dx    = e.pageX - lastX;
      let   dy    = e.pageY - lastY;
      let   vx    = dx / dt * 1000;
      let   vy    = dy / dt * 1000;
      let   speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale; vy *= scale; speed = maxSpeed;
      }

      lastTime = now; lastX = e.pageX; lastY = e.pageY;

      requestAnimationFrame(() => {
        centersRef.current.forEach(({ el, x, y }) => {
          const dist = Math.hypot(x - e.pageX, y - e.pageY);
          const t    = Math.max(0, 1 - dist / threshold);
          const col  = gsap.utils.interpolate(colorsRef.current.base, colorsRef.current.active, t);
          gsap.set(el, { backgroundColor: col });

          if (speed > speedThreshold && dist < threshold && !el._inertiaApplied) {
            el._inertiaApplied = true;
            const pushX = (x - e.pageX) + vx * 0.005;
            const pushY = (y - e.pageY) + vy * 0.005;

            gsap.to(el, {
              inertia: { x: pushX, y: pushY, resistance: 750 },
              onComplete() {
                gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1,0.75)' });
                el._inertiaApplied = false;
              },
            });
          }
        });
      });
    }

    function handleClick(e) {
      centersRef.current.forEach(({ el, x, y }) => {
        const dist = Math.hypot(x - e.pageX, y - e.pageY);
        if (dist < shockRadius && !el._inertiaApplied) {
          el._inertiaApplied = true;
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX   = (x - e.pageX) * shockPower * falloff;
          const pushY   = (y - e.pageY) * shockPower * falloff;

          gsap.to(el, {
            inertia: { x: pushX, y: pushY, resistance: 750 },
            onComplete() {
              gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1,0.75)' });
              el._inertiaApplied = false;
            },
          });
        }
      });
    }

    window.addEventListener('resize', buildGrid);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    buildGrid();

    return () => {
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      container.innerHTML = '';
    };
  }, [centerHole, dotSize]);

  // Color-only update — just repaints existing dots, no rebuild
  useEffect(() => {
    colorsRef.current = { base: dotColor, active: activeColor };
    dotsRef.current.forEach(d => {
      if (!d._isHole) gsap.set(d, { backgroundColor: dotColor });
    });
  }, [dotColor, activeColor]);

  return (
    <div className={styles.dotsWrap} style={{ opacity }}>
      <div ref={containerRef} className={styles.dotsContainer} />
    </div>
  );
};
