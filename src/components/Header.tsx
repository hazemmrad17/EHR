"use client";

import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
    return (
        <header className="flex items-center justify-between mb-12">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-semibold text-text-header">Good Morning, Dr. Ali</h1>
                <p className="text-text-secondary mt-1">Here is what is happening today.</p>
            </motion.div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary-green transition-colors" />
                    <input
                        type="text"
                        placeholder="Search patients, events..."
                        className="w-80 h-12 pl-12 pr-6 bg-sage-mist/30 border-none rounded-full focus:ring-2 focus:ring-primary-green/20 outline-none text-text-header placeholder:text-text-secondary/60 transition-all font-medium"
                    />
                </div>

                <button className="w-12 h-12 bg-surface rounded-full shadow-soft flex items-center justify-center border border-sage-mist/20 hover:scale-105 transition-transform">
                    <Bell className="w-5 h-5 text-text-header" />
                </button>

                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-soft">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ali"
                        alt="Dr. Ali"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>
    );
};
