"use client";

import { Home, Users, Calendar, Settings, Stethoscope, FlaskConical, MessageSquare, Sun, Moon, Brain, Cpu, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

// ── Map sidebar IDs → view IDs used in page.tsx ──────────────
const viewMap: Record<string, string> = {
    dashboard: 'diagnostic',
    patients: 'patients',
    visits: 'visit',
    labs: 'analytics',
    collab: 'collaboration',
    schedule: 'schedule',
    scribe: 'scribe',
};

interface SidebarProps {
    currentView: string;
    onViewChange: (view: string) => void;
}

interface SidebarItemProps {
    icon: React.ElementType;
    id: string;
    label: string;
    active: boolean;
    onClick: (id: string) => void;
}

const SidebarItem = ({ icon: Icon, id, label, active, onClick }: SidebarItemProps) => {
    return (
        <div
            onClick={() => onClick(id)}
            className="relative flex flex-col items-center gap-1 cursor-pointer group py-1"
        >
            <motion.div
                animate={active ? { scale: 1.05 } : { scale: 1 }}
                className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300",
                    active
                        ? "bg-text-header text-white shadow-lg shadow-text-header/20"
                        : "text-text-secondary hover:bg-white/50 hover:text-text-header"
                )}
            >
                <Icon className="w-[18px] h-[18px]" />
            </motion.div>

            <span className={cn(
                "text-[8px] font-bold uppercase tracking-[0.12em] transition-colors text-center leading-tight",
                active ? "text-text-header" : "text-text-secondary/60"
            )}>
                {label}
            </span>

            <AnimatePresence>
                {active && (
                    <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute -right-[14px] top-1/2 -translate-y-1/2 w-[3px] h-7 bg-primary-blue rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
    // Reverse-map to find which sidebar item matches the current view
    const activeSidebarItem = Object.entries(viewMap).find(([_, view]) => view === currentView)?.[0] || 'dashboard';

    const handleClick = (sidebarId: string) => {
        const view = viewMap[sidebarId];
        if (view) {
            onViewChange(view);
        }
    };

    const items = [
        { id: "dashboard", label: "Home", icon: Cpu },
        { id: "patients", label: "Patients", icon: Users },
        { id: "visits", label: "Visits", icon: Stethoscope },
        { id: "labs", label: "Analytics", icon: FlaskConical },
        { id: "collab", label: "Collab", icon: MessageSquare },
        { id: "scribe", label: "AI Scribe", icon: Brain },
        { id: "schedule", label: "Schedule", icon: Calendar },
    ];

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-6 top-6 bottom-6 w-[82px] bg-white/30 backdrop-blur-3xl border border-white/50 rounded-[32px] py-6 flex flex-col items-center z-50 shadow-2xl"
        >
            <div className="flex flex-col items-center w-full h-full">
                {/* STUDIO LOGO */}
                <div className="flex-shrink-0 w-11 h-11 bg-primary-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-blue/20">
                    <div className="w-4 h-4 bg-white rounded-full opacity-80" />
                </div>

                {/* MENU ITEMS - Scrollable */}
                <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <div className="flex flex-col items-center gap-1 px-2">
                        {items.map((item) => (
                            <SidebarItem
                                key={item.id}
                                {...item}
                                active={activeSidebarItem === item.id}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                </div>

                {/* THEME TOGGLE */}
                <div className="flex-shrink-0 pt-3 mt-auto">
                    <button
                        onClick={() => {
                            const isDark = document.documentElement.classList.toggle('dark');
                            // We can use a local state if we want to force re-render, 
                            // but the CSS 'dark:' classes handle it automatically.
                            // To swap the icon immediately, we'll use a small hack or just let CSS do it.
                        }}
                        className="w-11 h-11 rounded-2xl flex items-center justify-center hover:bg-white/40 transition-all text-text-secondary hover:text-text-header group relative overflow-hidden"
                    >
                        <Sun className="w-[18px] h-[18px] transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                        <Moon className="w-[18px] h-[18px] absolute transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                    </button>
                </div>

                {/* USER AVATAR */}
                <div className="flex-shrink-0 pt-2">
                    <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                            alt="Staff"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};
