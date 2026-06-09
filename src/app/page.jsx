import { Button } from '@/components/Button/Button'
import { Terminal } from '@/components/Terminal/Terminal'

export const metadata = {
  title: 'Portfolio - Home',
  description: 'Home page of my portfolio.',
}

const commands = [
  { command: "/help", type: "info", description: "Available commands: /about, /projects, /uses, /whoami, /theme, /clear" },
  { command: "/about", type: "path", path: "/about", description: "Learn more about me" },
  { command: "/projects", type: "path", path: "/projects", description: "View my projects and experience" },
  { command: "/uses", type: "path", path: "/uses", description: "See my tech stack and tools I use" },
  { command: "/whoami", type: "info", description: "I am an AI Solutions Engineer and Software Engineering student bridging the gap between technical development and commercial strategy to optimize business performance. I specialize in architecting scalable Python pipelines, cost-saving LLM orchestration, and 3D semantic vector spaces that turn complex code into measurable growth." },
  { command: "/theme", type: "theme", description: "Toggle dark/light mode" },
  { command: "/clear", type: "clear", description: "Clear terminal" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center pt-24 px-12 pb-12">
      <div className="grid grid-cols-1 gap-10 w-full max-w-6xl mx-auto">
        <div className="theme-card flex flex-col gap-4 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[4px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
          <span className="text-zinc-600 dark:text-zinc-200 text-xs tracking-[0.4em] uppercase">
            AI Solutions <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span> Automation Engineer <span className="text-[#F2360C] font-bold text-4xl leading-[0] relative top-[8px]">·</span> Draper, UT
          </span>
          <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
            <span className="block text-zinc-900 dark:text-white text-7xl font-black">RYAN</span>
            <span className="block text-zinc-500 dark:text-zinc-400 text-6xl font-black">SOKOLOWSKY</span>
          </h1>
          <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed tracking-[0.2em] uppercase">
            <span className="text-[#F2360C] font-bold">AI Solutions Engineer / Software Engineering Student </span>at Ensign College bridging the gap between advanced technical architecture and high-impact business operations. Passionate about leveraging AI to drive innovation, efficiency, and <span className="text-[#F27329] font-bold">automation</span> in real-world applications.
          </p>
          <div className="flex gap-3">
            <Button href="https://www.linkedin.com/in/ryan-sokolowsky/" color="outline" customClasses="backdrop-blur-md">LinkedIn</Button>
            <Button href="https://github.com/RSokolowskyDev" color="outline" customClasses="backdrop-blur-md">GitHub</Button>
          </div>
        </div>

        <div className="theme-card flex items-center bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[5px] rounded-2xl border-[3px] border-[#F2360C]/5 overflow-hidden">
          <Terminal
            commands={commands}
            placeholder="Enter a command..."
            welcome="Welcome to my portfolio! Enter '/help' for available commands."
          />
        </div>
      </div>
    </div>
  );
}
