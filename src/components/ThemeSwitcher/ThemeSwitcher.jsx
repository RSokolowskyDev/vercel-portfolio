'use client'

import { useEffect, useRef } from 'react';

const ThemeSwitcher = () => {
  const isDarkRef = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkRef.current = prefersDark;
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    isDarkRef.current = nextDark;
    const html = document.documentElement;
    const main = document.querySelector('main');

    if (!main) {
      html.classList.toggle('dark', nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      return;
    }

    const card = main.querySelector('.theme-card');
    if (!card) {
      html.classList.toggle('dark', nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      return;
    }

    html.classList.add('changing-theme');

    function handleTransition(e) {
      if (e.propertyName !== 'opacity') return;
      if (parseFloat(getComputedStyle(card).opacity) > 0.1) return;

      card.removeEventListener('transitionend', handleTransition);
      html.classList.toggle('dark', nextDark);

      requestAnimationFrame(() => {
        html.classList.remove('changing-theme');
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      });
    }

    card.addEventListener('transitionend', handleTransition);
  };

  return (
    <button
      data-testid="themeSwitcherButton"
      onClick={toggleTheme}
      className="font-bold bg-zinc-700 dark:bg-zinc-300 text-zinc-100 dark:text-zinc-900 border border-zinc-600 dark:border-zinc-400 rounded-full px-4 h-8 cursor-pointer transition-colors duration-[800ms] hover:bg-zinc-900 dark:hover:bg-zinc-100"
    >
      <span className="inline dark:hidden">Light Mode</span>
      <span className="hidden dark:inline">Dark Mode</span>
    </button>
  );
};

export default ThemeSwitcher;
