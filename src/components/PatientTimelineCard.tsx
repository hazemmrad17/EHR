"use client";

import { motion } from "framer-motion";
import { User, Activity, FileText, FlaskConical, Microscope } from "lucide-react";

const events = [
    { id: 1, type: "Check-up", date: "Today, 10:30 AM", doctor: "Dr. Ali", icon: Activity, color: "bg-primary-green" },
    { id: 2, type: "Lab Results", date: "Feb 10, 2026", doctor: "Lab Dept.", icon: FlaskConical, color: "bg-primary-blue" },
    { id: 3, type: "X-Ray", date: "Feb 08, 2026", doctor: "Radiology", icon: Microscope, color: "bg-orange-400" },
    { id: 4, type: "Vaccination", date: "Jan 25, 2026", doctor: "Nurse Sarah", icon: FileText, color: "bg-purple-400" },
];

export const PatientTimelineCard = () => {
    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bento-card col-span-2"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-glass border border-glass-border rounded-2xl flex items-center justify-center">
                        <User className="w-8 h-8 text-text-header" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-text-header">Patient History</h3>
                        <p className="text-text-secondary">Sarah Johnson • ID: #23894</p>
                    </div>
                </div>
                <button className="pill-button bg-text-header text-background text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all">
                    View Detail
                </button>
            </div>

            <div className="relative pl-10 space-y-10">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-glass border-l border-glass-border" />

                {events.map((event, idx) => (
                    <motion.div
                        key={event.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="relative flex items-center justify-between group"
                    >
                        <div className={`absolute -left-[10px] w-[21px] h-[21px] rounded-full border-4 border-white ${event.color} shadow-sm z-10 transition-transform group-hover:scale-125`} />

                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 ${event.color}/10 rounded-2xl flex items-center justify-center`}>
                                <event.icon className={`w-6 h-6 ${event.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-header">{event.type}</h4>
                                <p className="text-sm text-text-secondary">{event.doctor}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="font-medium text-text-header">{event.date}</p>
                            <p className="text-xs text-text-secondary">Verified</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
