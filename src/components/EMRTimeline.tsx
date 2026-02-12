"use client";

import { motion } from "framer-motion";
import { Pill, Activity, FileText, FlaskConical, Microscope, Clock, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineData = [
    {
        id: 1,
        type: "DIAGNOSIS",
        title: "Acute Bronchitis",
        provider: "Dr. James Carter",
        date: "FEB 10",
        time: "09:30 AM",
        description: "Patient presented with persistent cough and low-grade fever over 48h.",
        color: "bg-purple-500",
        icon: FileText
    },
    {
        id: 2,
        type: "LAB REPORT",
        title: "Complete Blood Count",
        provider: "City Lab Services",
        date: "FEB 10",
        time: "11:45 AM",
        description: "White blood cell count slightly elevated (11,000/mcL). Inflammatory markers normal.",
        color: "bg-blue-500",
        icon: FlaskConical
    },
    {
        id: 3,
        type: "MEDICATION",
        title: "Amoxicillin 500mg",
        provider: "Dr. James Carter",
        date: "FEB 10",
        time: "01:00 PM",
        description: "Take 1 capsule every 8 hours for 7 days. Ensure full course completion.",
        color: "bg-emerald-500",
        icon: Pill
    }
];

export const EMRTimeline = () => {
    return (
        <div className="flex flex-col gap-10 relative mt-16 mb-20">
            {/* 1. Year Header - 2024 */}
            <div className="relative pl-24 mb-4">
                <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-[21px] h-[21px] bg-primary-blue shadow-xl rounded-full z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <h3 className="text-4xl font-black text-text-header/10 dark:text-white/5 uppercase tracking-[0.2em]">2024</h3>
            </div>

            {/* Dynamic Connector Line */}
            <div className="absolute left-10 top-8 bottom-2 w-px bg-gradient-to-b from-primary-blue/20 via-text-header/5 to-transparent" />

            {timelineData.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-24 group"
                >
                    {/* Month Label for first item of month (Mocked) */}
                    {idx === 0 && (
                        <div className="absolute -left-4 top-6 z-20">
                            <span className="text-[10px] font-black text-background bg-text-header px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                                February
                            </span>
                        </div>
                    )}

                    {/* Node Dot */}
                    <div className="absolute left-[36px] top-8 w-2 h-2 bg-primary-blue rounded-full z-10 opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />

                    <div className="glass-card p-10 hover:bg-white/5 dark:hover:bg-white/[0.02] transition-all duration-700 border-glass-border backdrop-blur-3xl group-hover:translate-x-3 overflow-hidden relative">
                        {/* Subtle Background Icon */}
                        <item.icon className="absolute -bottom-6 -right-6 w-32 h-32 text-text-header/5 dark:text-white/[0.03] group-hover:text-text-header/10 transition-colors -rotate-12" />

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
                            <div className="flex items-start gap-8">
                                <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl text-white transform group-hover:rotate-6 transition-transform", item.color)}>
                                    <item.icon className="w-7 h-7" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black tracking-[0.2em] text-text-secondary uppercase">
                                            {item.type}
                                        </span>
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5" /> {item.time}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-semibold text-text-header tracking-tight leading-none">{item.title}</h3>
                                    <div className="flex items-center gap-2.5 pt-2">
                                        <div className="w-6 h-6 rounded-full bg-glass overflow-hidden border border-glass-border">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.provider}`} />
                                        </div>
                                        <p className="text-[11px] font-bold text-text-secondary tracking-widest uppercase">{item.provider}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <div className="bg-glass backdrop-blur-md px-6 py-2.5 rounded-2xl text-text-header font-black text-[11px] tracking-[0.2em] uppercase shadow-sm border border-glass-border">
                                    {item.date}
                                </div>
                                <div className="flex -space-x-3">
                                    {[1, 2].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-glass-border bg-glass flex items-center justify-center overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Doc${i}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-glass-border relative z-10">
                            <p className="text-text-header/70 text-lg leading-relaxed font-medium group-hover:text-text-header transition-colors">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
