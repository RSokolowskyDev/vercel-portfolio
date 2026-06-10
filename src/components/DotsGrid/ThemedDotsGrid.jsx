'use client';
import { useEffect, useState } from 'react';
import { DotsGridV2 } from './DotsGridV2';

const DARK_DOTS  = { dot: '#2e2e2e', active: '#e3e3e3' };
const LIGHT_DOTS = { dot: '#d4d4d8', active: '#71717a' };

export default function ThemedDotsGrid(props) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains('dark'));
    check();
    let timer;
    // Delay re-render until after the 400ms fade-in completes so the dots
    // color swap happens while hidden under the fully-opaque main.
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(check, 0);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);

  const colors = dark ? DARK_DOTS : LIGHT_DOTS;
  return <DotsGridV2 {...props} dotColor={colors.dot} activeColor={colors.active} />;
}
