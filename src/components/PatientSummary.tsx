"use client";

import { motion } from "framer-motion";
import { Activity, Heart, Thermometer, Droplets, ArrowUpRight } from "lucide-react";

const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Blood Pressure", value: "118/76", unit: "mmHg", icon: Activity, color: "text-blue-600", bg: "bg-blue-600/10" },
    { label: "Temperature", value: "36.8", unit: "°C", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "SpO2", value: "98", unit: "%", icon: Droplets, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export const PatientSummary = () => {
    return (
        <div className="flex flex-col gap-10 mb-16 relative z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                                alt="Sarah Johnson"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Animated Circle in BG */}
                        <div className="absolute inset-0 bg-primary-blue/10 rounded-full blur-xl scale-125 opacity-50 animate-pulse" />
                    </motion.div>

                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-5xl font-semibold text-text-header tracking-tight">Sarah Johnson</h1>
                            <span className="glass-pill text-[12px] font-semibold tracking-wide text-text-header shadow-none px-4 py-1 border-white/40">28 Y.O.</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-primary-green rounded-full shadow-[0_0_8px_rgba(82,147,90,0.5)]" />
                            <p className="text-text-secondary font-medium text-xs tracking-wide">Patient ID • #EMR-2024-0392 • Female</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="glass-pill font-semibold text-[11px] tracking-wide hover:bg-white transition-all shadow-none border-white/40">
                        Edit Data
                    </button>
                    <button className="h-14 px-8 bg-text-header text-white rounded-full font-semibold text-[12px] tracking-wide flex items-center gap-3 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        New Consultation <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {vitals.map((vital, idx) => (
                    <motion.div
                        key={vital.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.8, ease: "circOut" }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass-card flex flex-col items-center text-center p-8 border-white/20"
                    >
                        <div className={`w-16 h-16 ${vital.bg} rounded-full flex items-center justify-center mb-4`}>
                            <vital.icon className={`w-8 h-8 ${vital.color}`} />
                        </div>
                        <p className="text-[11px] font-semibold text-text-secondary tracking-widest uppercase mb-1">{vital.label}</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-semibold text-text-header">{vital.value}</span>
                            <span className="text-[12px] font-medium text-text-secondary">{vital.unit}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
