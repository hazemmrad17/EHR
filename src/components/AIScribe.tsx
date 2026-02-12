"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Copy, Check, Sparkles, Brain, FileText, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ── SOAP Note Mock Data ──────────────────────────────────────
const soapContent = {
    subjective: `Patient reports persistent severe headaches over the past 3 weeks, predominantly frontal, rated 7/10 on pain scale. Associated symptoms include visual aura lasting ~15 minutes before onset, mild nausea without vomiting. Denies photophobia or phonophobia. No recent head trauma.

    Previous history of Glioblastoma Multiforme (GBM) diagnosed 8 months ago, currently on Temozolomide (TMZ) cycle 4. Reports compliance with medication regimen. Sleep quality has declined significantly.`,

    objective: `Vitals: BP 132/84, HR 72, Temp 36.8°C, SpO2 98%
    Neuro: Alert and oriented ×3. Cranial nerves II-XII grossly intact.
    Motor: 4+/5 strength in left upper extremity (baseline). Slight pronator drift on left.
    Visual fields: Mild temporal hemianopia (right eye), stable from prior.
    Fundoscopy: No papilledema noted.
    Gait: Steady, no ataxia. Romberg negative.`,

    assessment: `1. Recurrent headaches — likely secondary to peritumoral edema vs. tumor progression. Increased ICP unlikely given absence of papilledema.
    2. Left-sided motor weakness — stable from baseline, consistent with known right parietal lesion.
    3. GBM, WHO Grade IV — currently on TMZ cycle 4, tolerating well. Requires interval imaging.`,

    plan: `1. STAT MRI Brain with contrast to evaluate for disease progression or radiation necrosis.
    2. Dexamethasone 4mg PO BID × 5 days for suspected peritumoral edema.
    3. Continue TMZ per current dosing schedule.
    4. Neurosurgery consult if MRI shows progression for possible re-resection candidacy.
    5. Follow-up in 1 week post-MRI for results review and treatment adjustment.
    6. Consider palliative care referral for symptom management optimization.`
};

// ── Waveform Visualizer ──────────────────────────────────────
const WaveformBar = ({ delay, isActive }: { delay: number; isActive: boolean }) => (
    <motion.div
        className="w-1 rounded-full bg-primary-blue"
        animate={isActive ? {
            height: [8, Math.random() * 32 + 8, 8],
        } : { height: 4 }}
        transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            delay: delay * 0.05,
        }}
    />
);

// ── Typewriter Hook ──────────────────────────────────────────
const useTypewriter = (text: string, speed: number = 15, enabled: boolean = false) => {
    const [displayed, setDisplayed] = useState("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!enabled) {
            setDisplayed("");
            setIsDone(false);
            return;
        }
        let i = 0;
        setDisplayed("");
        setIsDone(false);
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                setIsDone(true);
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed, enabled]);

    return { displayed, isDone };
};

// ── Main Component ───────────────────────────────────────────
export const AIScribe = () => {
    const [isListening, setIsListening] = useState(false);
    const [activeTab, setActiveTab] = useState<'subjective' | 'objective' | 'assessment' | 'plan'>('subjective');
    const [generationPhase, setGenerationPhase] = useState<'idle' | 'listening' | 'generating' | 'complete'>('idle');
    const [copied, setCopied] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const currentContent = soapContent[activeTab];
    const { displayed, isDone } = useTypewriter(currentContent, 12, generationPhase === 'generating');

    // Auto-scroll during typewriter
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayed]);

    // Transition from listening → generating after a delay
    useEffect(() => {
        if (generationPhase === 'listening') {
            const timer = setTimeout(() => {
                setIsListening(false);
                setGenerationPhase('generating');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [generationPhase]);

    // When typewriter finishes
    useEffect(() => {
        if (isDone && generationPhase === 'generating') {
            setGenerationPhase('complete');
        }
    }, [isDone, generationPhase]);

    const handleStart = () => {
        setIsListening(true);
        setGenerationPhase('listening');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(currentContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs = [
        { id: 'subjective' as const, label: 'Subjective', icon: '🗣️' },
        { id: 'objective' as const, label: 'Objective', icon: '🔬' },
        { id: 'assessment' as const, label: 'Assessment', icon: '🧠' },
        { id: 'plan' as const, label: 'Plan', icon: '📋' },
    ];

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* ── Header ────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-blue to-accent-purple flex items-center justify-center shadow-xl dark:shadow-primary-blue/10 shadow-primary-blue/20">
                        <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-text-header tracking-tight">AI Scribe</h2>
                        <p className="text-xs font-medium text-text-secondary mt-1 tracking-wide">Intelligent SOAP Note Generation</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {generationPhase === 'complete' && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-6 py-3 bg-text-header text-background rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-text-header/90 transition-all"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copied" : "Copy to Visit"}
                        </motion.button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* ── Left: Microphone & Waveform ─────────── */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* Microphone Control */}
                    <div className="glass-card p-10 flex flex-col items-center gap-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                            {generationPhase === 'idle' && 'Ready to Record'}
                            {generationPhase === 'listening' && 'Listening...'}
                            {generationPhase === 'generating' && 'Processing Audio'}
                            {generationPhase === 'complete' && 'Note Generated'}
                        </p>

                        <button
                            onClick={generationPhase === 'idle' ? handleStart : () => {
                                setGenerationPhase('idle');
                                setIsListening(false);
                            }}
                            className={cn(
                                "w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl relative",
                                isListening
                                    ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                                    : generationPhase === 'complete'
                                        ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
                                        : "bg-primary-blue hover:bg-primary-blue/90 shadow-primary-blue/30"
                            )}
                        >
                            {/* Pulse ring */}
                            {isListening && (
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-red-400"
                                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                            {isListening
                                ? <MicOff className="w-10 h-10 text-white" />
                                : generationPhase === 'complete'
                                    ? <Check className="w-10 h-10 text-white" />
                                    : <Mic className="w-10 h-10 text-white" />
                            }
                        </button>

                        {/* Waveform */}
                        <div className="flex items-center justify-center gap-1 h-10 w-full">
                            {Array.from({ length: 24 }, (_, i) => (
                                <WaveformBar key={i} delay={i} isActive={isListening} />
                            ))}
                        </div>

                        <p className="text-center text-[11px] font-medium text-text-secondary/70 leading-relaxed max-w-xs">
                            {generationPhase === 'idle' && "Tap to begin recording the clinical encounter. The AI will structure your notes in real-time."}
                            {generationPhase === 'listening' && "Speak naturally. The AI is capturing and analyzing your clinical narrative..."}
                            {generationPhase === 'generating' && "Structuring SOAP note from audio analysis..."}
                            {generationPhase === 'complete' && "SOAP note generated successfully. Review each section and copy to the patient visit."}
                        </p>
                    </div>

                    {/* AI Stats */}
                    <div className="glass-card p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-6">AI Confidence</p>
                        <div className="space-y-5">
                            {[
                                { label: 'Speech Clarity', value: 94 },
                                { label: 'Medical Terms', value: 98 },
                                { label: 'SOAP Accuracy', value: 91 },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="flex justify-between text-[11px] font-bold text-text-header mb-2">
                                        <span>{stat.label}</span>
                                        <span className="text-primary-blue">{stat.value}%</span>
                                    </div>
                                    <div className="h-1.5 bg-text-header/10 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary-blue to-accent-purple rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: generationPhase !== 'idle' ? `${stat.value}%` : '0%' }}
                                            transition={{ duration: 1.5, delay: 0.3 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Right: SOAP Note Output ─────────────── */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="glass-card p-0 overflow-hidden h-full flex flex-col">
                        {/* SOAP Tabs */}
                        <div className="flex border-b border-glass-border bg-white/5 dark:bg-white/[0.02]">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        if (generationPhase === 'complete') {
                                            // Already generated, show full content instantly
                                        }
                                    }}
                                    className={cn(
                                        "flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border-b-2",
                                        activeTab === tab.id
                                            ? "text-text-header border-primary-blue bg-white/10 dark:bg-white/[0.05]"
                                            : "text-text-secondary border-transparent hover:text-text-header hover:bg-white/5"
                                    )}
                                >
                                    <span>{tab.icon}</span> {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {generationPhase === 'idle' ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col items-center justify-center gap-6 text-center py-20"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-glass flex items-center justify-center">
                                            <FileText className="w-8 h-8 text-text-secondary/40" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-secondary/50">No notes yet</p>
                                            <p className="text-[11px] text-text-secondary/30 mt-1">Start recording to generate a SOAP note</p>
                                        </div>
                                    </motion.div>
                                ) : generationPhase === 'listening' ? (
                                    <motion.div
                                        key="listening"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col items-center justify-center gap-6 py-20"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center"
                                        >
                                            <Sparkles className="w-8 h-8 text-red-500" />
                                        </motion.div>
                                        <p className="text-sm font-bold text-text-header animate-pulse">Processing audio stream...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <Sparkles className="w-4 h-4 text-accent-purple" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-purple">AI Generated</p>
                                        </div>
                                        <p className="text-sm font-medium text-text-header leading-[2] whitespace-pre-wrap font-outfit">
                                            {generationPhase === 'complete' ? currentContent : displayed}
                                            {generationPhase === 'generating' && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity }}
                                                    className="inline-block w-0.5 h-4 bg-primary-blue ml-1 align-middle"
                                                />
                                            )}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
