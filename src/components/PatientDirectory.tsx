"use client";

import { motion } from "framer-motion";
import { Search, Filter, Grid3X3, List, Heart, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockDatabase, type Patient } from "@/lib/MockDatabase";

const statusConfig = {
    critical: { color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', label: 'Critical' },
    active: { color: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Active' },
    discharged: { color: 'bg-slate-400', text: 'text-slate-500', bg: 'bg-slate-50', label: 'Discharged' },
};

const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-emerald-500';
};

export const PatientDirectory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterStatus, setFilterStatus] = useState<'all' | 'critical' | 'active' | 'discharged'>('all');

    const patients = mockDatabase.patients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-text-header tracking-tight">Patient Directory</h2>
                    <p className="text-xs font-medium text-text-secondary mt-1 tracking-wide">
                        {mockDatabase.patients.length} patients • {mockDatabase.patients.filter(p => p.status === 'critical').length} critical
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/40" />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 h-11 pl-11 pr-4 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-full text-[11px] font-medium text-text-header placeholder:text-slate-400/50 outline-none focus:ring-4 focus:ring-primary-blue/5 transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center bg-white/30 backdrop-blur-xl p-1 rounded-full border border-white/40">
                        {(['all', 'critical', 'active', 'discharged'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.15em] transition-all",
                                    filterStatus === status
                                        ? "bg-text-header text-white shadow-sm"
                                        : "text-text-secondary hover:text-text-header"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center bg-white/30 p-1 rounded-full border border-white/40">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all",
                                viewMode === 'grid' ? "bg-text-header text-white shadow-sm" : "text-text-secondary"
                            )}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all",
                                viewMode === 'list' ? "bg-text-header text-white shadow-sm" : "text-text-secondary"
                            )}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Patient Cards */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {patients.map((patient, idx) => (
                        <PatientCard key={patient.id} patient={patient} index={idx} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {patients.map((patient, idx) => (
                        <PatientRow key={patient.id} patient={patient} index={idx} />
                    ))}
                </div>
            )}

            {patients.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Filter className="w-8 h-8 text-text-secondary/30" />
                    <p className="text-sm font-medium text-text-secondary/50">No patients match your search</p>
                </div>
            )}
        </div>
    );
};

// ── Grid Card ────────────────────────────────────────────────
const PatientCard = ({ patient, index }: { patient: Patient; index: number }) => {
    const status = statusConfig[patient.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-7 cursor-pointer hover:scale-[1.02] hover:bg-white/60 transition-all group"
        >
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.avatar}`}
                            alt={patient.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-text-header">{patient.name}</p>
                        <p className="text-[10px] text-text-secondary">{patient.id} • {patient.age}y • {patient.gender}</p>
                    </div>
                </div>
                <span className={cn("w-2.5 h-2.5 rounded-full mt-1", status.color)} />
            </div>

            <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-1">Condition</p>
                <p className="text-[12px] font-semibold text-text-header">{patient.condition}</p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/30">
                <div className="flex-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary">Risk</p>
                    <p className={cn("text-lg font-black", getRiskColor(patient.riskScore))}>{patient.riskScore}</p>
                </div>
                <div className="flex-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary">Blood</p>
                    <p className="text-lg font-black text-text-header">{patient.bloodType}</p>
                </div>
                <div className={cn("px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.15em]", status.bg, status.text)}>
                    {status.label}
                </div>
            </div>
        </motion.div>
    );
};

// ── List Row ─────────────────────────────────────────────────
const PatientRow = ({ patient, index }: { patient: Patient; index: number }) => {
    const status = statusConfig[patient.status];

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className="glass-card p-5 flex items-center gap-6 cursor-pointer hover:bg-white/60 transition-all group"
        >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg shrink-0">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.avatar}`}
                    alt={patient.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="min-w-[140px]">
                <p className="text-[12px] font-bold text-text-header">{patient.name}</p>
                <p className="text-[10px] text-text-secondary">{patient.id}</p>
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-text-header truncate">{patient.condition}</p>
            </div>

            <div className="text-center shrink-0">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-text-secondary">Risk</p>
                <p className={cn("text-sm font-black", getRiskColor(patient.riskScore))}>{patient.riskScore}</p>
            </div>

            <div className="text-center shrink-0">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-text-secondary">Age</p>
                <p className="text-sm font-black text-text-header">{patient.age}</p>
            </div>

            <div className="text-center shrink-0">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-text-secondary">Last Visit</p>
                <p className="text-[11px] font-medium text-text-header">{patient.lastVisit}</p>
            </div>

            <div className={cn("px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] shrink-0", status.bg, status.text)}>
                {status.label}
            </div>
        </motion.div>
    );
};
