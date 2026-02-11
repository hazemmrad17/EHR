"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
    label: string;
    value: string;
    trend?: string;
    icon: React.ElementType;
    index: number;
}

export const StatsCard = ({ label, value, trend, icon: Icon, index }: StatsCardProps) => {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-sage-mist p-8 rounded-3xl flex flex-col justify-between min-w-[240px] border border-calm-green/20"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6 text-text-header" />
                </div>
                {trend && (
                    <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-primary-green">
                        {trend}
                    </span>
                )}
            </div>

            <div>
                <p className="text-text-secondary font-medium mb-1">{label}</p>
                <h3 className="text-4xl font-bold text-text-header">{value}</h3>
            </div>
        </motion.div>
    );
};
