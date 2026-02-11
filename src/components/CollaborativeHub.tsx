"use client";

import { motion } from "framer-motion";
import { MessageSquare, Video, Phone, Image as ImageIcon, Users, Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

const doctors = [
    { name: "Dr. Emma Lawson", role: "Co-Founder", status: "online", img: "Emma" },
    { name: "Dr. Felix Chen", role: "Neurosurgeon", status: "busy", img: "Felix" },
    { name: "Dr. Sarah Smith", role: "Radiologist", status: "online", img: "Sarah" },
];

export const CollaborativeHub = () => {
    return (
        <div className="flex bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[40px] overflow-hidden h-[700px] shadow-2xl">
            {/* 1. Members Sidebar */}
            <div className="w-24 border-r border-white/40 flex flex-col items-center py-10 gap-8">
                <div className="w-12 h-12 bg-primary-blue rounded-2xl flex items-center justify-center shadow-lg shadow-primary-blue/20 mb-4">
                    <Users className="w-6 h-6 text-white" />
                </div>
                {doctors.map((doc) => (
                    <div key={doc.name} className="relative group cursor-pointer">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white group-hover:scale-110 transition-all shadow-md">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.img}`} alt={doc.name} />
                        </div>
                        <div className={cn(
                            "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white",
                            doc.status === 'online' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                    </div>
                ))}
            </div>

            {/* 2. Chat & Discussion Area */}
            <div className="flex-1 flex flex-col">
                <div className="px-8 py-6 border-b border-white/40 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-text-header tracking-tight">Case Discussion Hub</h3>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">3 Doctors Active • Shared Context</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-11 h-11 glass-card p-0 rounded-2xl flex items-center justify-center border-white/40 hover:bg-white transition-all">
                            <Video className="w-4 h-4 text-text-header" />
                        </button>
                        <button className="w-11 h-11 glass-card p-0 rounded-2xl flex items-center justify-center border-white/40 hover:bg-white transition-all">
                            <Phone className="w-4 h-4 text-text-header" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto space-y-6">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" />
                        </div>
                        <div className="flex-1 p-4 bg-white/60 rounded-3xl rounded-tl-none border border-white/40">
                            <p className="text-sm font-medium text-text-header leading-relaxed">
                                I've reviewed the latest MRI slices from the morning scan. The inflammation seems to have localized.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <div className="p-4 bg-text-header text-white rounded-3xl rounded-br-none shadow-xl">
                                <p className="text-sm font-medium">Agreed. I'm tagging the ROI for the diagnostic team now.</p>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 mt-2 text-right uppercase tracking-widest">Read • 14:45</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                        </div>
                    </div>

                    {/* Shared Image Meta-Data Mock */}
                    <div className="p-6 bg-accent-blue/5 border border-accent-blue/10 rounded-[32px] flex items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border border-white/40 shadow-sm relative overflow-hidden group">
                            <ImageIcon className="w-8 h-8 text-accent-blue group-hover:scale-125 transition-transform" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-1">Shared Artifact</p>
                            <p className="text-base font-semibold text-text-header">Brain Slice #12 (Annotated)</p>
                            <div className="flex gap-2 mt-2">
                                <span className="text-[10px] bg-white/60 px-2 py-1 rounded-lg border border-white/40 font-bold text-text-secondary uppercase">MRI</span>
                                <span className="text-[10px] bg-white/60 px-2 py-1 rounded-lg border border-white/40 font-bold text-text-secondary uppercase">Dicom</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-8 border-t border-white/40">
                    <div className="flex items-center gap-4 bg-white/60 border border-white/80 p-2 pl-6 rounded-3xl backdrop-blur-3xl shadow-lg">
                        <input
                            placeholder="Type a message or share an artifact..."
                            className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-text-header placeholder:text-text-secondary/50"
                        />
                        <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-all">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 bg-primary-blue text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-transform shadow-xl">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
