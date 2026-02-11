"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, User, Users, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const roles = [
    { id: 'doctor', label: 'Doctor', icon: Users, color: 'text-primary-blue', desc: 'Clinical & Diagnostics' },
    { id: 'patient', label: 'Patient', icon: User, color: 'text-emerald-500', desc: 'Personal Records' },
    { id: 'admin', label: 'Admin', icon: Shield, color: 'text-accent-purple', desc: 'System Control' },
];

export const RoleSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRole, setActiveRole] = useState(roles[0]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 bg-white/40 backdrop-blur-3xl border border-white/60 px-6 h-14 rounded-full shadow-xl hover:bg-white transition-all group"
            >
                <div className={cn("w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm", activeRole.color)}>
                    <activeRole.icon className="w-4 h-4" />
                </div>
                <div className="text-left pr-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-50">Active Role</p>
                    <p className="text-sm font-bold text-text-header">{activeRole.label}</p>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-500", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-4 w-[280px] bg-white/80 backdrop-blur-3xl border border-white rounded-[32px] shadow-2xl overflow-hidden p-3 z-50"
                    >
                        <div className="p-4 mb-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Switch Context</p>
                        </div>
                        <div className="space-y-1">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => {
                                        setActiveRole(role);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group",
                                        activeRole.id === role.id ? "bg-text-header text-white" : "hover:bg-text-header/5"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                        activeRole.id === role.id ? "bg-white/10" : "bg-white shadow-sm",
                                        activeRole.id !== role.id && role.color
                                    )}>
                                        <role.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-sm font-bold">{role.label}</p>
                                        <p className={cn(
                                            "text-[10px] font-medium opacity-60",
                                            activeRole.id === role.id ? "text-white/70" : "text-text-secondary"
                                        )}>{role.desc}</p>
                                    </div>
                                    {activeRole.id === role.id && <Check className="w-4 h-4 text-white" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
