"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Video, Stethoscope, FlaskConical, Brain } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Mock Schedule Data ───────────────────────────────────────
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

interface Appointment {
    id: string;
    patient: string;
    avatar: string;
    type: 'follow-up' | 'emergency' | 'lab-review' | 'telehealth' | 'surgery';
    day: number;
    startHour: number;
    duration: number; // in hours
    notes?: string;
}

const typeConfig = {
    'follow-up': { color: 'bg-primary-blue/10 border-primary-blue/20 text-primary-blue', icon: Stethoscope, label: 'Follow-up' },
    'emergency': { color: 'bg-red-50 border-red-200 text-red-600', icon: Brain, label: 'Emergency' },
    'lab-review': { color: 'bg-amber-50 border-amber-200 text-amber-600', icon: FlaskConical, label: 'Lab Review' },
    'telehealth': { color: 'bg-emerald-50 border-emerald-200 text-emerald-600', icon: Video, label: 'Telehealth' },
    'surgery': { color: 'bg-purple-50 border-purple-200 text-purple-600', icon: Brain, label: 'Surgery Consult' },
};

const appointments: Appointment[] = [
    { id: 'A1', patient: 'Gregor Golden', avatar: 'Gregor', type: 'emergency', day: 0, startHour: 0, duration: 1.5, notes: 'MRI Review' },
    { id: 'A2', patient: 'Emma Watson', avatar: 'Emma', type: 'follow-up', day: 0, startHour: 3, duration: 1 },
    { id: 'A3', patient: 'Marcus Rivera', avatar: 'Marcus', type: 'telehealth', day: 1, startHour: 1, duration: 0.5 },
    { id: 'A4', patient: 'Aisha Patel', avatar: 'Aisha', type: 'lab-review', day: 1, startHour: 4, duration: 1 },
    { id: 'A5', patient: 'Thomas Chen', avatar: 'Thomas', type: 'follow-up', day: 2, startHour: 0, duration: 1 },
    { id: 'A6', patient: 'Sofia Andersson', avatar: 'Sofia', type: 'telehealth', day: 2, startHour: 5, duration: 0.5 },
    { id: 'A7', patient: 'James Okafor', avatar: 'James', type: 'surgery', day: 3, startHour: 1, duration: 2 },
    { id: 'A8', patient: 'Lena Müller', avatar: 'Lena', type: 'follow-up', day: 3, startHour: 6, duration: 1 },
    { id: 'A9', patient: 'Gregor Golden', avatar: 'Gregor', type: 'lab-review', day: 4, startHour: 2, duration: 1, notes: 'Blood Work' },
    { id: 'A10', patient: 'Emma Watson', avatar: 'Emma', type: 'telehealth', day: 4, startHour: 7, duration: 0.5 },
];

export const ScheduleView = () => {
    const [currentWeek] = useState('Feb 10 – Feb 14, 2024');

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-text-header tracking-tight">Schedule</h2>
                    <p className="text-xs font-medium text-text-secondary mt-1 tracking-wide">
                        {appointments.length} appointments this week
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Week Navigator */}
                    <div className="flex items-center gap-3 bg-white/30 backdrop-blur-xl px-2 py-1 rounded-full border border-white/40">
                        <button className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-all">
                            <ChevronLeft className="w-4 h-4 text-text-secondary" />
                        </button>
                        <span className="text-[11px] font-bold text-text-header px-3">{currentWeek}</span>
                        <button className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-all">
                            <ChevronRight className="w-4 h-4 text-text-secondary" />
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-3">
                        {Object.entries(typeConfig).map(([key, config]) => (
                            <div key={key} className="flex items-center gap-1.5">
                                <span className={cn("w-2 h-2 rounded-full", config.color.split(' ')[0].replace('/10', '').replace('/50', ''))}
                                    style={{ backgroundColor: key === 'follow-up' ? '#082AF2' : key === 'emergency' ? '#ef4444' : key === 'lab-review' ? '#f59e0b' : key === 'telehealth' ? '#10b981' : '#8b5cf6' }} />
                                <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">{config.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="glass-card p-0 overflow-hidden flex-1">
                <div className="grid grid-cols-[80px_repeat(5,1fr)]">
                    {/* Header Row */}
                    <div className="border-b border-r border-white/30 p-4" />
                    {weekDays.map((day, idx) => (
                        <div key={day} className="border-b border-r border-white/30 p-4 text-center last:border-r-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">{day.slice(0, 3)}</p>
                            <p className="text-lg font-black text-text-header mt-1">{10 + idx}</p>
                        </div>
                    ))}

                    {/* Time Rows */}
                    {hours.map((hour, hourIdx) => (
                        <div key={hour} className="contents">
                            {/* Time Label */}
                            <div className="border-r border-b border-white/20 p-3 flex items-start justify-end">
                                <span className="text-[10px] font-bold text-text-secondary/50">{hour}</span>
                            </div>

                            {/* Day Cells */}
                            {weekDays.map((_, dayIdx) => {
                                const cellAppointments = appointments.filter(a => a.day === dayIdx && a.startHour === hourIdx);
                                return (
                                    <div
                                        key={`${hourIdx}-${dayIdx}`}
                                        className="border-r border-b border-white/10 relative min-h-[60px] last:border-r-0 hover:bg-white/20 transition-colors"
                                    >
                                        {cellAppointments.map((apt) => {
                                            const config = typeConfig[apt.type];
                                            return (
                                                <motion.div
                                                    key={apt.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className={cn(
                                                        "absolute inset-x-1 top-1 rounded-xl border p-3 cursor-pointer hover:scale-[1.02] transition-transform z-10 overflow-hidden",
                                                        config.color
                                                    )}
                                                    style={{ height: `${apt.duration * 60 - 8}px` }}
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <config.icon className="w-3 h-3" />
                                                        <span className="text-[9px] font-black uppercase tracking-wider">{config.label}</span>
                                                    </div>
                                                    <p className="text-[11px] font-bold truncate">{apt.patient}</p>
                                                    {apt.notes && (
                                                        <p className="text-[9px] opacity-60 mt-0.5">{apt.notes}</p>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
