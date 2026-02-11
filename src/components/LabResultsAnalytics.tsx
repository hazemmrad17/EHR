"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, AlertTriangle, FileText, Download, Filter, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
    { label: "Blood Glucose", value: "112 mg/dL", trend: "up", status: "borderline", color: "text-amber-500" },
    { label: "Hemoglobin", value: "14.2 g/dL", trend: "stable", status: "normal", color: "text-emerald-500" },
    { label: "WBC Count", value: "11.5 k/µL", trend: "up", status: "elevated", color: "text-red-500" },
    { label: "Cholesterol", value: "185 mg/dL", trend: "down", status: "normal", color: "text-emerald-500" },
];

export const LabResultsAnalytics = () => {
    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-semibold text-text-header tracking-tight">Diagnostic Analytics</h2>
                    <p className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-2">Aggregate Lab Findings • AI Pattern Analysis</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass-pill px-6 h-12 flex items-center gap-2 border-white/60 hover:bg-white transition-all text-[11px] font-bold uppercase tracking-widest text-text-secondary">
                        <Calendar className="w-4 h-4" /> Last 6 Months
                    </button>
                    <button className="bg-text-header text-white px-6 h-12 rounded-full flex items-center gap-2 shadow-xl hover:scale-105 transition-all text-[11px] font-bold uppercase tracking-widest">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* 1. Key Metrics Grid */}
                {metrics.map((m, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="col-span-12 md:col-span-3 glass-card p-8 border-white/50 bg-white/40 backdrop-blur-3xl group hover:scale-[1.02] transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <Activity className={cn("w-6 h-6", m.color.replace('text', 'text'))} />
                            </div>
                            {m.trend === 'up' ? <TrendingUp className="w-4 h-4 text-red-500" /> : <TrendingDown className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">{m.label}</p>
                        <p className="text-3xl font-semibold text-text-header tracking-tight">{m.value}</p>
                        <div className="mt-6 pt-6 border-t border-white/40">
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg",
                                m.status === 'normal' ? "bg-emerald-500/10 text-emerald-500" :
                                    m.status === 'borderline' ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                            )}>
                                Status: {m.status}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {/* 2. Main Visualization: Trend Chart Mockup */}
                <div className="col-span-12 lg:col-span-8 glass-card p-10 border-white/40 bg-white/30 h-[450px] relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10 mb-12">
                        <div>
                            <h3 className="text-2xl font-semibold text-text-header tracking-tight">Leukocyte Progression</h3>
                            <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-1">Correlation with baseline results</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-text-header/5 rounded-lg">
                                <span className="w-2.5 h-2.5 bg-primary-blue rounded-full" />
                                <span className="text-[10px] font-bold text-text-secondary uppercase">Current</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-text-header/5 rounded-lg">
                                <span className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
                                <span className="text-[10px] font-bold text-text-secondary uppercase">Projected</span>
                            </div>
                        </div>
                    </div>

                    {/* SVG Chart Mockup */}
                    <svg viewBox="0 0 800 250" className="w-full h-full absolute inset-0 top-20 opacity-80 pointer-events-none p-10">
                        <path
                            d="M 50 200 Q 150 180 250 120 T 450 100 T 650 50 T 750 30"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#082AF2" />
                                <stop offset="100%" stopColor="#C084FC" />
                            </linearGradient>
                        </defs>
                        {/* Data Points */}
                        {[50, 250, 450, 650, 750].map((x, i) => (
                            <circle key={i} cx={x} cy={i === 0 ? 200 : i === 1 ? 120 : i === 2 ? 100 : i === 3 ? 50 : 30} r="6" fill="white" stroke="#082AF2" strokeWidth="3" shadow-lg="true" />
                        ))}
                    </svg>

                    {/* Chart Overlay Interactivity Mock */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                </div>

                {/* 3. AI Insights Panel */}
                <div className="col-span-12 lg:col-span-4 glass-card p-10 border-white/60 bg-text-header/80 backdrop-blur-3xl text-white">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                            <AlertTriangle className="w-7 h-7 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight">AI Insights</h3>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-3">Priority Observation</p>
                            <p className="text-lg font-medium leading-relaxed">
                                Recent upward trend in WBC Count (9% over 2 days) suggests localized inflammatory response. Cross-referencing with MRI slice #12.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">Recommended Actions</p>
                            <div className="space-y-3">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                                    <span className="text-sm font-semibold">Schedule C-Reactive Protein Lab</span>
                                    <TrendingUp className="w-4 h-4 opacity-50" />
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                                    <span className="text-sm font-semibold">Notify Neuro-Radiology</span>
                                    <FileText className="w-4 h-4 opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
