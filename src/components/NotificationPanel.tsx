"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, FlaskConical, Calendar, MessageCircle, Pill, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const notifications = [
    {
        id: 1,
        priority: 'critical',
        title: 'Abnormal Lab Result',
        message: 'WBC count elevated to 11.5 ×10³/μL — exceeds normal range. Review recommended.',
        time: '2 min ago',
        icon: FlaskConical,
        read: false,
    },
    {
        id: 2,
        priority: 'warning',
        title: 'Consultation Request',
        message: 'Dr. Amara Patel requests neurological consult for patient #P002.',
        time: '15 min ago',
        icon: MessageCircle,
        read: false,
    },
    {
        id: 3,
        priority: 'info',
        title: 'MRI Scheduled',
        message: 'Gregor Golden — Brain MRI (Contrast) confirmed for Feb 13, 9:00 AM.',
        time: '1 hour ago',
        icon: Calendar,
        read: false,
    },
    {
        id: 4,
        priority: 'warning',
        title: 'Medication Interaction',
        message: 'Potential interaction between Temozolomide and newly prescribed Dexamethasone. Verify dosing.',
        time: '2 hours ago',
        icon: Pill,
        read: true,
    },
    {
        id: 5,
        priority: 'info',
        title: 'Shift Handoff Reminder',
        message: 'Your shift ends in 45 minutes. Complete open notes for handoff.',
        time: '3 hours ago',
        icon: Clock,
        read: true,
    },
];

const priorityStyles = {
    critical: {
        dot: 'bg-red-500',
        bg: 'bg-red-50',
        border: 'border-red-100',
        icon: 'text-red-500',
        label: 'CRITICAL',
    },
    warning: {
        dot: 'bg-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        icon: 'text-amber-500',
        label: 'WARNING',
    },
    info: {
        dot: 'bg-primary-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        icon: 'text-primary-blue',
        label: 'INFO',
    },
};

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[60]"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, y: -10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 20, y: -10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-24 right-20 w-[420px] max-h-[600px] bg-white/90 backdrop-blur-3xl border border-white/60 rounded-[32px] shadow-2xl z-[70] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 pb-4">
                            <div>
                                <h3 className="text-lg font-black text-text-header">Notifications</h3>
                                <p className="text-[11px] text-text-secondary mt-1">
                                    You have <span className="font-bold text-primary-blue">{unreadCount}</span> unread alerts
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-text-header/5 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>

                        {/* Notification List */}
                        <div className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar space-y-2">
                            {notifications.map((notif, idx) => {
                                const style = priorityStyles[notif.priority as keyof typeof priorityStyles];
                                return (
                                    <motion.div
                                        key={notif.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={cn(
                                            "flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01]",
                                            notif.read ? "opacity-60" : "bg-white shadow-sm border border-white/60"
                                        )}
                                    >
                                        {/* Icon */}
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", style.bg)}>
                                            <notif.icon className={cn("w-5 h-5", style.icon)} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-[12px] font-bold text-text-header truncate">{notif.title}</p>
                                                {!notif.read && <span className={cn("w-2 h-2 rounded-full shrink-0", style.dot)} />}
                                            </div>
                                            <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">{notif.message}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className={cn(
                                                    "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full",
                                                    style.bg, style.icon
                                                )}>
                                                    {style.label}
                                                </span>
                                                <span className="text-[10px] text-text-secondary/50">{notif.time}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-6 pt-3 border-t border-white/40">
                            <button className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-primary-blue hover:bg-primary-blue/5 transition-colors">
                                View All Notifications
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
