"use client";

import { Sidebar } from "@/components/Sidebar";
import { PatientSummary } from "@/components/PatientSummary";
import { TimelineFilters } from "@/components/TimelineFilters";
import { EMRTimeline } from "@/components/EMRTimeline";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Settings, Command, Cpu, Plus, Activity, FileText, FlaskConical, Stethoscope, MessageSquare, Brain, CalendarDays, Users } from "lucide-react";
import { useState } from "react";

import { BioDigitalViewer } from "@/components/BioDigitalViewer";
import { UnifiedVisitView } from "@/components/UnifiedVisitView";
import { CollaborativeHub } from "@/components/CollaborativeHub";
import { LabResultsAnalytics } from "@/components/LabResultsAnalytics";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { AIScribe } from "@/components/AIScribe";
import { NotificationPanel } from "@/components/NotificationPanel";
import { PatientDirectory } from "@/components/PatientDirectory";
import { ScheduleView } from "@/components/ScheduleView";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentView, setCurrentView] = useState<'diagnostic' | 'visit' | 'collaboration' | 'analytics' | 'scribe' | 'patients' | 'schedule'>('diagnostic');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <main className="min-h-screen pl-36 pr-16 py-12 bg-background font-sans relative overflow-hidden font-outfit">
      {/* BACKGROUND BOKEH - STUDIO STYLE */}
      <div className="studio-blob bg-accent-purple w-[600px] h-[600px] -top-48 -right-48" />
      <div className="studio-blob bg-accent-blue w-[500px] h-[500px] top-1/2 -left-24 -translate-y-1/2" />
      <div className="studio-blob bg-accent-mint w-[400px] h-[400px] bottom-0 right-1/4" />

      <Sidebar currentView={currentView} onViewChange={(v) => setCurrentView(v as typeof currentView)} />

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        {/* TOP NAV - REFINED GLASS */}
        <div className="sticky top-0 z-40 flex items-center justify-between pb-8 pt-4 mb-12 gap-6 bg-white/5 backdrop-blur-sm -mx-6 px-6 rounded-b-[40px]">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative group max-w-[280px] w-full">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
                <Command className="w-2.5 h-2.5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-11 pl-12 pr-6 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-full focus:ring-4 focus:ring-primary-blue/5 outline-none text-[11px] font-medium text-text-header placeholder:text-slate-400 placeholder:opacity-50 transition-all font-outfit"
              />
            </div>

            {/* Dynamic View Title */}
            <div className="flex flex-col ml-2">
              <h1 className="text-sm font-black text-text-header uppercase tracking-[0.2em]">
                {currentView === 'diagnostic' ? 'Clinical Insights' :
                  currentView === 'visit' ? 'Unified Visit' :
                    currentView === 'collaboration' ? 'Collaborative Hub' :
                      currentView === 'analytics' ? 'Advanced Analytics' :
                        currentView === 'scribe' ? 'AI Scribe' :
                          currentView === 'patients' ? 'Patient Directory' :
                            'Medical Schedule'}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
                <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest opacity-60">System Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <RoleSwitcher />
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/40">
              <button onClick={() => setNotificationsOpen(true)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-all text-text-header relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-all text-text-header">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <div className="w-11 h-11 bg-text-header rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform cursor-pointer overflow-hidden border-2 border-white">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {currentView === 'diagnostic' ? (
              <motion.div
                key="diagnostic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px] flex flex-col items-center"
              >
                {/* Background Title - Soft & Studio Style */}
                <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[200px] font-semibold text-text-header/5 leading-[0.8] tracking-tighter -ml-12"
                  >
                    Brain<br />Analysis
                  </motion.h1>
                </div>

                <div className="relative w-full z-10 grid grid-cols-12 gap-12 items-center pt-24 px-4">
                  {/* Left Column: Patient Context - Elevated Z-Index */}
                  <div className="col-span-4 flex flex-col gap-10 relative z-40">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="glass-card p-8 flex flex-col items-start gap-8 w-full relative overflow-hidden group hover:scale-[1.02] transition-all shadow-2xl border-white/50"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl relative">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gregor" alt="Gregor" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-transparent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">Patient Case</p>
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          </div>
                          <p className="text-3xl font-semibold text-text-header tracking-tight">Gregor Golden</p>
                        </div>
                      </div>

                      <div className="absolute top-10 right-10 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                        <Bell className="w-6 h-6" />
                      </div>

                      <div className="pt-8 border-t border-white/30 w-full flex items-center justify-between">
                        <span className="glass-pill px-5 py-2.5 text-[12px] font-semibold text-text-header border-white/60 bg-white/40">Glioblastoma Multiforme</span>
                        <div className="flex -space-x-2.5">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Doc${i}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* New Analysis Metrics */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="glass-card p-6 border-white/40 bg-white/30">
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Risk Score</p>
                        <p className="text-4xl font-semibold text-red-500">84%</p>
                      </div>
                      <div className="glass-card p-6 border-white/40 bg-white/30">
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Progression</p>
                        <p className="text-4xl font-semibold text-text-header">+12%</p>
                      </div>
                    </div>
                  </div>

                  {/* Center Component 3D */}
                  <div className="col-span-5 flex justify-center items-center relative h-[700px] z-10">
                    <div className="absolute inset-0 bg-accent-blue/20 rounded-full blur-[160px] animate-pulse pointer-events-none" />
                    <div className="absolute inset-0 bg-white/40 rounded-full blur-[100px] scale-75 pointer-events-none" />

                    <BioDigitalViewer
                      modelId="6wR1"
                      className="scale-[1.3] shadow-none border-none bg-transparent relative z-10"
                    />
                  </div>

                  <div className="col-span-3 flex flex-col gap-4 relative z-40">
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">Diagnostic Regions</p>
                      <div className="glass-pill border-white/60 px-6 py-5 flex items-center gap-4 hover:bg-white transition-all cursor-pointer shadow-xl group">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-semibold text-text-header">Primary Tumor</span>
                      </div>
                      <div className="glass-pill border-white/60 px-6 py-5 flex items-center gap-4 hover:bg-white transition-all cursor-pointer shadow-xl group">
                        <div className="w-2.5 h-2.5 bg-accent-purple rounded-full shadow-[0_0_12px_rgba(192,132,252,0.5)] group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-semibold text-text-header">Diagnostic ROI</span>
                      </div>
                      <div className="glass-pill border-white/60 px-6 py-5 flex items-center gap-4 hover:bg-white transition-all cursor-pointer shadow-xl group">
                        <div className="w-14 h-14 bg-text-header rounded-full flex items-center justify-center text-white shadow-2xl -ml-6 border-4 border-white">
                          <FlaskConical className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-text-header">Lab Reports</span>
                          <span className="text-[10px] text-text-secondary font-medium">3 New Findings</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Stats - Realigned and Elevated */}
                <div className="flex gap-8 mt-12 relative z-40">
                  {[
                    { label: "Serotonin", value: "12g", icon: FileText, delay: 0 },
                    { label: "Cortisol", value: "45g", icon: Activity, delay: 0.1, active: true },
                    { label: "Dopamine", value: "88g", icon: Settings, delay: 0.2 }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + stat.delay }}
                      className={cn(
                        "glass-card p-6 w-[200px] flex flex-col justify-between items-start border-white/40 shadow-2xl hover:translate-y-[-8px] transition-all cursor-pointer",
                        stat.active && "bg-white/70 border-white ring-4 ring-white/20"
                      )}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                        <stat.icon className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-4xl font-semibold text-text-header tracking-tight">{stat.value}</p>
                        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-2">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : currentView === 'visit' ? (
              <motion.div
                key="visit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px]"
              >
                <UnifiedVisitView />
              </motion.div>
            ) : currentView === 'collaboration' ? (
              <motion.div
                key="collaboration"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px]"
              >
                <CollaborativeHub />
              </motion.div>
            ) : currentView === 'analytics' ? (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px]"
              >
                <LabResultsAnalytics />
              </motion.div>
            ) : currentView === 'scribe' ? (
              <motion.div
                key="scribe"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px]"
              >
                <AIScribe />
              </motion.div>
            ) : currentView === 'patients' ? (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px]"
              >
                <PatientDirectory />
              </motion.div>
            ) : (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative mb-32 min-h-[750px]"
              >
                <ScheduleView />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-16">
            <PatientSummary />
          </div>

          {/* Records Section */}
          <div className="mt-20">
            <div className="flex items-end justify-between mb-2">
              <div>
                <h2 className="text-5xl font-semibold text-text-header tracking-tight">Medical Story</h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-8 h-[2px] bg-primary-blue rounded-full" />
                  <p className="text-[11px] font-semibold tracking-widest text-text-secondary uppercase">Unified Clinical Narrative</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 mb-2">
                <span className="text-[11px] font-medium text-text-secondary opacity-60">Status • Synchronized</span>
                <div className="px-4 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[11px] font-semibold tracking-wide border border-emerald-500/10">
                  Last updated: 2m ago
                </div>
              </div>
            </div>

            <TimelineFilters />
            <EMRTimeline />
          </div>
        </motion.div>
      </div>

      {/* GLOBAL FAST ACTION - STUDIO STYLE */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-12 right-12 w-20 h-20 bg-primary-blue text-white rounded-full shadow-[0_20px_50px_rgba(8,42,242,0.3)] flex items-center justify-center z-50 border-4 border-white group"
      >
        <Plus className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </motion.button>

      <NotificationPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </main >
  );
}
