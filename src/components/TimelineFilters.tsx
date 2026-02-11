"use client";

import { motion } from "framer-motion";
import { List, Pill, FlaskConical, Microscope, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filters = [
    { id: "all", label: "Full Timeline", icon: List },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "meds", label: "Medications", icon: Pill },
    { id: "labs", label: "Labs", icon: FlaskConical },
    { id: "imaging", label: "Imaging", icon: Microscope },
];

export const TimelineFilters = () => {
    const [active, setActive] = useState("all");
    const [timeScale, setTimeScale] = useState("year");

    return (
        <div className="flex flex-col gap-6 mt-12 mb-8 relative z-20">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 p-1.5 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-full shadow-lg">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setActive(f.id)}
                            className={cn(
                                "relative flex items-center gap-2.5 px-5 h-10 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-500",
                                active === f.id
                                    ? "text-white"
                                    : "text-text-secondary hover:text-text-header"
                            )}
                        >
                            {active === f.id && (
                                <motion.div
                                    layoutId="filter-active"
                                    className="absolute inset-0 bg-text-header rounded-full z-0 shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <f.icon className={cn("w-3.5 h-3.5 z-10", active === f.id ? "text-white" : "text-slate-400")} />
                            <span className="relative z-10">{f.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-4">
                    {/* Time Scale Switcher */}
                    <div className="flex gap-1 p-1 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full">
                        {['Day', 'Month', 'Year'].map((scale) => (
                            <button
                                key={scale}
                                onClick={() => setTimeScale(scale.toLowerCase())}
                                className={cn(
                                    "px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                    timeScale === scale.toLowerCase()
                                        ? "bg-white text-text-header shadow-md"
                                        : "text-text-secondary hover:text-text-header"
                                )}
                            >
                                {scale}
                            </button>
                        ))}
                    </div>

                    <button className="h-11 px-6 bg-text-header text-white rounded-full font-bold text-[10px] tracking-widest uppercase hover:scale-105 flex items-center gap-2 transition-all shadow-xl group border-2 border-white/20">
                        <Plus className="w-3.5 h-3.5" />
                        Add Record
                    </button>
                </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-text-header/10 to-transparent" />
        </div>
    );
};
