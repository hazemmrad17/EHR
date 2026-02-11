"use client";

import { motion } from "framer-motion";
import { Stethoscope, Plus, Clock, Save, FileText, ChevronRight, MessageCircle, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export const UnifiedVisitView = () => {
    return (
        <div className="flex flex-col gap-8 h-full">
            {/* 1. Header: Active Session Context */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center shadow-lg shadow-primary-blue/20">
                        <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-text-header tracking-tight">Active Visit Session</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-xs font-medium text-text-secondary uppercase tracking-widest">In Progress • Dr. Emma Lawson</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 glass-pill px-4 py-2 border-white/40">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-[11px] font-bold text-text-header">00:42:15</span>
                    </div>
                    <button className="h-12 px-6 bg-text-header text-white rounded-full font-semibold text-[11px] tracking-wide flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
                        <Save className="w-4 h-4" /> Save Encounter
                    </button>
                    <button className="w-12 h-12 glass-card p-0 rounded-full flex items-center justify-center border-white/40">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 h-full">
                {/* 2. Left: Clinical Intake */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    {/* Chief Complaint Entry */}
                    <div className="glass-card p-8 border-white/60 bg-white/40 backdrop-blur-3xl overflow-hidden relative group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 text-primary-blue" />
                                <h3 className="text-lg font-semibold text-text-header">Chief Complaint</h3>
                            </div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-50">Capturing primary concern</span>
                        </div>
                        <textarea
                            placeholder="Type or dictate the patient's primary concern..."
                            className="w-full h-32 bg-transparent text-2xl font-medium text-text-header placeholder:text-text-secondary placeholder:opacity-30 border-none outline-none resize-none"
                        />
                        <div className="absolute bottom-6 right-6 flex gap-2">
                            <button className="glass-pill px-4 py-2 text-[10px] font-bold border-white/60 hover:bg-white/80">Voice Input</button>
                            <button className="glass-pill px-4 py-2 text-[10px] font-bold border-white/60 hover:bg-white/80">NLP Parse</button>
                        </div>
                    </div>

                    {/* Unified Visit Notes */}
                    <div className="glass-card p-8 flex-1 border-white/40 min-h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-4">
                                <button className="text-sm font-bold text-text-header border-b-2 border-primary-blue pb-2 tracking-wide uppercase">Observations</button>
                                <button className="text-sm font-semibold text-text-secondary pb-2 tracking-wide uppercase hover:text-text-header transition-colors">Assessment</button>
                                <button className="text-sm font-semibold text-text-secondary pb-2 tracking-wide uppercase hover:text-text-header transition-colors">Plan</button>
                            </div>
                            <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all border border-slate-100">
                                <Plus className="w-5 h-5 text-text-header" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="flex-1 pb-6 border-b border-slate-100/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">14:24 • Physical Findings</span>
                                            < ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-lg text-text-header font-medium leading-relaxed">
                                            Persistent inflammation noted in the occipital region. Pain intensity reported at 7/10 during manual palpation.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Right: Contextual Evidence */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="glass-card p-6 border-white/40 bg-accent-blue/5">
                        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-6">Linked Evidence</h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/60 rounded-3xl border border-white flex items-center gap-4 hover:bg-white transition-all cursor-pointer group shadow-sm">
                                <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-accent-blue" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-text-header">MRI Scan #4922</p>
                                    <p className="text-[10px] font-medium text-text-secondary uppercase tracking-tight">Radiology • 2 days ago</p>
                                </div>
                            </div>
                            <div className="p-4 bg-white/60 rounded-3xl border border-white flex items-center gap-4 hover:bg-white transition-all cursor-pointer group shadow-sm">
                                <div className="w-12 h-12 bg-accent-purple/10 rounded-2xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-accent-purple" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-text-header">Previous Visit Summary</p>
                                    <p className="text-[10px] font-medium text-text-secondary uppercase tracking-tight">Dr. Felix • Jan 24</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-4 mt-6 border border-dashed border-slate-300 rounded-3xl text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:border-primary-blue hover:text-primary-blue transition-all">
                            Attach Document
                        </button>
                    </div>

                    <div className="glass-card p-6 border-white/40 bg-white/40">
                        <h4 className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-6">Confirmed Diagnoses</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Acute Glioblastoma', 'Hypotonia', 'Chronic Pain'].map(tag => (
                                <span key={tag} className="glass-pill px-4 py-2 text-[10px] font-bold border-white/80 bg-white uppercase tracking-tight">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
