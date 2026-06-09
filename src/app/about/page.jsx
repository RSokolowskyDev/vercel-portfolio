export const metadata = {
  title: 'Portfolio - About',
  description: 'The about page of my portfolio.',
}

export default function About() {
  return (
    <div className="min-h-screen flex items-center pt-24 px-12 pb-12">

      <div className="grid grid-cols-1 gap-10 w-full max-w-6xl mx-auto">
    
            <div className="theme-card flex flex-col gap-4 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[3px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
              <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="block text-zinc-900 dark:text-white text-7xl font-black">RYAN</span>
                <span className="block text-zinc-500 dark:text-zinc-400 text-6xl font-black">SOKOLOWSKY</span>
              </h1>
              <p className="text-zinc-700 dark:text-zinc-200 text-sm leading-relaxed tracking-[0.2em] uppercase">
                Software Engineering student at Ensign College and practicing <span className="text-[#F2360C] font-bold">AI Solutions Engineer</span> with a track record of bridging technical depth and commercial strategy. Known for combining <span className="text-[#F27329] font-bold">Python automation</span>, LLM integration, and data-driven decision-making to create compounding business value. Equally comfortable leading cross-functional teams and writing production code.
              </p>
            </div>

          <div className="theme-card flex flex-col gap-4 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-[3px] rounded-2xl p-8 border-[3px] border-[#F2360C]/5">
              <h1 className="leading-none" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="block text-zinc-900 dark:text-white text-6xl font-black">EXPERIENCE</span>
              </h1>

              <div className="flex flex-col gap-2">
                <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                 AI Solutions Engineer Intern <span className="text-[#F2360C]">|</span> Interior Solutions
                </h2>
                <p className="text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Architecting custom GPT implementations and tailored Python scripts to automate multi-channel workflows; spanning email automation, product matching, and project analysis for a commercial furniture store
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                 Member Service Representative II <span className="text-[#F2360C]">|</span> UCCU
                </h2>
                <p className="text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Guided an average of 15 customers weekly through loan application process, contributing to approximately 4 funded loans per week
                </p>
                <p className="text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Utilized Excel to execute complex income calculations and debt-to-income logic, while auditing high-volume branch transactions to ensure 100% precision in monetary data entry</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold tracking-[0.2em] uppercase">
                 Spanish Ads & AI Optimization Manager <span className="text-[#F2360C]">|</span> THE CHURCH OF JESUS CHRIST OF LATTER-DAY SAINTS
                </h2>
                <p className="text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Architected an automated AI feedback loop utilizing ChatGPT to optimize targeting and ad creative, reducing cost-per-conversion to $4,000, outperforming organization’s premium benchmark of $10,000 by <span className="text-[#F27329] font-bold">60%</span></p>
                <p className="text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Deployed generative AI tools to conduct market research and scale dynamic A/B testing variations, utilizing cross-cultural data segmentation to align campaigns with distinct Spanish-speaking demographics and expand weekly engagement by <span className="text-[#F27329] font-bold">35%</span></p>
                <p className="text-zinc-600 dark:text-zinc-200 text-xs leading-relaxed tracking-[0.2em] uppercase max-w-2xl">
                  <span className="text-[#BF0413] font-bold text-4xl leading-[0] relative top-[8px]">·</span>
                  Led a 6-person team utilizing prompt engineering and demographic segmentation, resolving critical Tableau and Meta Ads data mismatches to protect telemetry integrity</p>
              </div> 

          </div>

    </div>
  </div>

  );
}
