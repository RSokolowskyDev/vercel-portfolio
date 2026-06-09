'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ACCENT = '#F2360C';

function highlight(text) {
    return text.split('/').map((part, i) =>
        i === 0 ? part : <span key={i}><span style={{ color: ACCENT }}>/</span>{part}</span>
    );
}

export const Terminal = (props) => {
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);
    const router = useRouter();

    const handleCommand = () => {
        const match = props.commands.find((cmd) => cmd.command === value);
        if (match) {
            if (match.type === "info") { setHistory([...history, { type: "info", message: match.description }]); }
            else if (match.type === "path") { setHistory([...history, { type: "path", message: `Navigating to ${match.path}` }]); router.push(match.path); }
            else if (match.type === "clear") { setHistory([]); setValue(""); return; }
            else if (match.type === "theme") {
                const nextDark = !document.documentElement.classList.contains('dark');
                document.documentElement.classList.toggle('dark', nextDark);
                localStorage.setItem('theme', nextDark ? 'dark' : 'light');
                setHistory([...history, { type: "info", message: `Switched to ${nextDark ? 'dark' : 'light'} mode` }]);
            }
        } else if (value.startsWith("/")) { setHistory([...history, { type: "error", message: "Unknown command" }]); }
        else { setHistory([...history, { type: "text", message: value }]); }
        setValue("");
    }

    return (
        <div className="flex flex-col w-full text-zinc-800 dark:text-zinc-100 text-sm tracking-[0.2em] uppercase leading-relaxed">
            <div className="p-3 min-h-[200px] border-b border-zinc-800/20 dark:border-white/[0.08]">
                {history.length === 0 && <p className="opacity-90 mb-[6px]">{highlight(props.welcome)}</p>}
                {history.map((entry, index) => (
                    <p key={index} className="mb-[6px]">{highlight(entry.message)}</p>
                ))}
            </div>
            <div className="relative flex items-center p-2.5">
                <div
                    aria-hidden="true"
                    className="absolute left-2.5 right-2.5 pointer-events-none text-sm tracking-[0.2em] uppercase whitespace-pre overflow-hidden"
                >
                    {value.length === 0
                        ? <span className="text-zinc-800 dark:text-zinc-100">{props.placeholder}</span>
                        : highlight(value)
                    }
                </div>
                <input
                    className="w-full bg-transparent border-none outline-none text-sm text-transparent tracking-[0.2em] uppercase caret-[#F27329] relative z-10"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                    placeholder=""
                />
            </div>
        </div>
    );
}
