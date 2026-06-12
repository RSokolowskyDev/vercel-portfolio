import { Button } from '@/components/Button/Button'

export const metadata = {
  title: 'Portfolio - Home',
  description: 'Home page of my portfolio.',
}

const commands = [
  { command: "/help", type: "info", description: "Available commands: /about, /projects, /skills, /whoami, /theme, /clear" },
  { command: "/about", type: "path", path: "/about", description: "Learn more about me" },
  { command: "/projects", type: "path", path: "/projects", description: "View my projects and experience" },
  { command: "/skills", type: "path", path: "/skills", description: "See my tech stack and tools I use" },
  { command: "/whoami", type: "info", description: "I am an AI Solutions Engineer and Software Engineering student bridging the gap between technical development and commercial strategy to optimize business performance. I specialize in architecting scalable Python pipelines, cost-saving LLM orchestration, and 3D semantic vector spaces that turn complex code into measurable growth." },
  { command: "/theme", type: "theme", description: "Toggle dark/light mode" },
  { command: "/clear", type: "clear", description: "Clear terminal" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center pt-24 px-12 pb-12">
      <div className="grid grid-cols-1 gap-10 w-full max-w-6xl mx-auto">
        <div className="theme-card flex flex-col gap-8 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[4px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">

          {/* Top: name left, paragraph right */}
          <div className="flex gap-12 items-start">
            <div className="flex flex-col gap-3 shrink-0">
              <span className="text-zinc-600 dark:text-zinc-200 text-xs tracking-[0.4em] uppercase">
                AI Solutions <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span> Automation Engineer <span className="text-[#F2360C] font-bold text-4xl leading-[0] relative top-[8px]">·</span> Draper, UT
              </span>
              <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="block text-zinc-900 dark:text-white text-7xl font-black">RYAN</span>
                <span className="block text-zinc-500 dark:text-zinc-400 text-6xl font-black">SOKOLOWSKY</span>
              </h1>
            </div>

            <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed tracking-[0.2em] uppercase">
              Open to <span className="text-[#F2360C] font-bold">internships</span>, <span className="text-[#BF0413] font-bold">freelance projects</span>, and <span className="text-[#F27329] font-bold">collaborations</span> in AI engineering, automation, and software development. Whether you have a problem worth solving or just want to connect — I&apos;d love to hear from you.
            </p>
          </div>

          {/* Bottom: full-width contact buttons */}
          <div className="flex gap-[80px] justify-center">
            <Button href="mailto:ryansokolowsky@gmail.com" color="outline" customClasses="backdrop-blur-md w-34 justify-center !h-20 text-xl ">✉ Email</Button>
            <Button href="tel:3312983934" color="outline" customClasses="backdrop-blur-md w-34 justify-center !h-20 text-xl ">📞 Phone</Button>
            <Button href="https://www.linkedin.com/in/ryan-sokolowsky/" target="_blank" rel="noopener noreferrer" color="outline" customClasses="backdrop-blur-md w-34 justify-center !h-20 text-xl ">💼 LinkedIn</Button>
            <Button href="https://github.com/RSokolowskyDev" target="_blank" rel="noopener noreferrer" color="outline" customClasses="backdrop-blur-md w-34 justify-center !h-20 text-xl ">💻 GitHub</Button>
          </div>

        </div>

      </div>
    </div>
  );
}
