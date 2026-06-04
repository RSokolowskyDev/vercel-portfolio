import { Button } from '@/components/Button/Button'
import { Terminal } from '@/components/Terminal/Terminal'
import { DotsGrid } from '@/components/DotsGrid/DotsGrid'

export const metadata = {
  title: 'Portfolio - Home',
  description: 'Home page of my portfolio.',
}

const commands = [
  { command: "/about", type: "path", path: "/about", description: "Learn more about me"},
  { command: "/help", type: "info", info: "/help", description:
    "Available commands: /about, /projects, /help"},
  { command: "/projects", type: "path", path: "/projects", description:
    "View my projects and experience"},
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-900 flex items-center p-12">

      <div className="absolute inset-0">
        <DotsGrid dotColor="#2e2e2e" activeColor="#e3e3e3" opacity={1} dotSize ="0.8vw" />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-10 w-full max-w-6xl mx-auto">

        <div className="flex flex-col gap-4 bg-zinc-850/60 backdrop-blur-[2px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
          <span className="text-zinc-200 text-xs tracking-[0.4em] uppercase">
            AI Solutions <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span> Automation Engineer <span className="text-[#F2360C] font-bold text-4xl leading-[0] relative top-[8px]">·</span> Draper, UT
          </span>
          <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
            <span className="block text-white text-8xl font-black">RYAN</span>
            <span className="block text-zinc-400 text-7xl font-black">SOKOLOWSKY</span>
          </h1>
          <p className="text-zinc-200 text-sm leading-relaxed max-w-xs tracking-[0.2em] uppercase">
            <span className="text-[#F2360C] font-bold">AI Solutions Engineer / Software Engineering Student </span>at Ensign College bridging the gap between advanced technical architecture and high-impact business operations. Passionate about leveraging AI to drive innovation, efficiency, and <span className="text-[#F27329] font-bold">automation</span> in real-world applications.
          </p>
          <div className="flex gap-3">
            <Button color="outline" customClasses="backdrop-blur-md">Projects</Button>
            <Button color="outline" customClasses="backdrop-blur-md">LinkedIn</Button>
            <Button color="outline" customClasses="backdrop-blur-md">GitHub</Button>
          </div>
        </div>

        <div className="flex items-center bg-zinc-850/60 backdrop-blur-[4px] rounded-2xl border-[3px] border-[#F2360C]/5 overflow-hidden">
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
