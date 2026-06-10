import { Button } from "@/components/Button/Button";

export const metadata = {
  title: 'Portfolio - Projects',
  description: 'Projects page of my portfolio.',
}

export default function Projects() {
  return (
    <div className="min-h-screen flex items-center pt-24 px-12 pb-12">

      <div className="grid grid-cols-1 gap-10 w-full max-w-6xl mx-auto">
    
            <div className="theme-card flex flex-col gap-4 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[3px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
              <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="block text-zinc-900 dark:text-white text-7xl font-black">RYAN</span>
                <span className="block text-zinc-500 dark:text-zinc-400 text-6xl font-black">SOKOLOWSKY</span>
              </h1>
              <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed tracking-[0.2em] uppercase">
                Builder of <span className="text-[#F2360C] font-bold">AI-powered systems</span> and Python automation pipelines focused on real-world impact. Specializing in <span className="text-[#F27329] font-bold">LLM orchestration</span>, machine learning prototypes, and data pipelines that reduce cost and increase efficiency. Every project below was designed to solve a concrete problem and delivers measurable results.
              </p>
            </div>

            <div className="theme-card flex flex-col bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[3px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
              <h1 className="leading-none mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="block text-zinc-900 dark:text-white text-6xl font-black">PROJECTS</span>
              </h1>
              <div className="mb-6">
                <div className="flex items-center gap-8">
                  <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                  Subaru Lead Classification Demo
                  </h2>
                  <Button href="https://www.linkedin.com/in/ryan-sokolowsky/" color="outline" customClasses="backdrop-blur-md">See the Project Here</Button>
                </div>
                <p className="mt-3 text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Built a Python-based machine learning prototype using scikit-learn designed to process multi-variable dealership datasets and simulate predicting walking-buyer intent with an <span className="text-[#F27329] font-bold">87% target accuracy</span>
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-8">
                  <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                  Semantic Vector Layer for LLMs
                  </h2>
                  <Button href="https://www.linkedin.com/in/ryan-sokolowsky/" color="outline" customClasses="backdrop-blur-md">LinkedIn</Button>
                </div>
                <p className="mt-3 text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Optimizing a 3D semantic vector space optimized via nightly Python cron-jobs, expanding model capacity to map entire English language while increasing semantic accuracy by <span className="text-[#F27329] font-bold">24%</span> over a multi-month autonomous training cycle
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-8">
                  <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                    AI Token Optimization & Workflow Engine
                  </h2>
                  <Button href="https://www.linkedin.com/in/ryan-sokolowsky/" color="outline" customClasses="backdrop-blur-md">LinkedIn</Button>
                </div>
                <p className="mt-3 text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Created a Python-based orchestration system utilizing dual-model validation logic to reduce LLM API token consumption by <span className="text-[#F27329] font-bold">32%</span> and minimize output hallucinations</p>
              </div>
              <div>
                <div className="flex items-center gap-8">
                  <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                    Automated Video Asset Synthesis Pipeline
                  </h2>
                  <Button href="https://www.linkedin.com/in/ryan-sokolowsky/" color="outline" customClasses="backdrop-blur-md">LinkedIn</Button>
                </div>
                <p className="mt-3 text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Developed a Python-based video generation pipeline integrating the Pexels API to combine stock and user-submitted footage for client Facebook ad campaigns, streamlining ad creative production and reducing manual editing by an estimated <span className="text-[#F27329] font-bold">70%</span></p>
              </div>


          </div>

      </div>
    </div>
  );
}
