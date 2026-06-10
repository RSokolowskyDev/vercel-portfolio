import SkillsCanvas from '@/components/SkillsCanvas/SkillsCanvas';

export const metadata = {
  title: 'Portfolio - Uses',
  description: 'Tech stack and tools I use.',
}

export default function Uses() {
  return (
    <div className="min-h-screen flex items-center pt-24 px-12 pb-12">
      <div className="grid grid-cols-1 gap-10 w-full max-w-6xl mx-auto">

        <div className="theme-card flex flex-col gap-4 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[4px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
          <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
            <span className="block text-zinc-900 dark:text-white text-7xl font-black">TECH</span>
            <span className="block text-zinc-500 dark:text-zinc-400 text-6xl font-black">STACK</span>
          </h1>
          <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed tracking-[0.2em] uppercase">
            The tools, languages, and frameworks at the core of my work — from LLM orchestration to cloud infrastructure.
          </p>
        </div>
        <SkillsCanvas />
      </div>
    </div>
  );
}
