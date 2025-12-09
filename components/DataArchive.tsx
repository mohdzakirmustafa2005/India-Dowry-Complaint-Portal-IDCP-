import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, Database, Server, Wifi, AlertTriangle, ArrowUpRight, ShieldCheck, Map, Clock, Activity, Lock } from 'lucide-react';
import { store, CaseRecord } from '../services/store';

const API_STATUS = [
  { state: "Telangana", endpoint: "api.tspolice.gov.in/v2/dowry-cell", status: "ONLINE", latency: "45ms" },
  { state: "Andhra Pradesh", endpoint: "api.appolice.gov.in/women-safety", status: "ONLINE", latency: "52ms" },
  { state: "Uttar Pradesh", endpoint: "112.up.gov.in/api/incoming", status: "ONLINE", latency: "68ms" },
  { state: "Delhi", endpoint: "delhipolice.nic.in/api/crime-branch", status: "MAINTENANCE", latency: "-" },
  { state: "Maharashtra", endpoint: "mahapolice.gov.in/api/secure-route", status: "ONLINE", latency: "41ms" },
  { state: "Karnataka", endpoint: "ksp.gov.in/api/v1/complaints", status: "ONLINE", latency: "55ms" },
];

export const DataArchive: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, today: 0, liveFeed: [] as CaseRecord[] });
  const [activeUsers, setActiveUsers] = useState(1284);
  
  // Real-time subscription to the store
  useEffect(() => {
    // Initial fetch
    setStats(store.getStats());

    // Subscribe to updates
    const unsubscribe = store.subscribe(() => {
       setStats(store.getStats());
    });
    
    // Simulate active users fluctuation
    const interval = setInterval(() => {
        setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);

    return () => {
        unsubscribe();
        clearInterval(interval);
    };
  }, []);

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      
      {/* Real-Time Header */}
      <section className="bg-slate-900 text-white rounded-none md:rounded-b-3xl -mt-6 pt-12 pb-16 px-6 shadow-2xl relative overflow-hidden">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(to right, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
             <div>
                <div className="flex items-center gap-2 text-green-400 mb-2 animate-pulse">
                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                   <span className="text-xs font-mono uppercase tracking-widest">System Operational • Live Data Stream</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tight mb-2">IDCP COMMAND CENTER</h1>
                <p className="text-slate-400 font-mono text-sm">
                   National Real-Time Dowry Harassment Monitoring System
                </p>
             </div>
             
             <div className="flex gap-8 text-right">
                <div>
                   <span className="block text-slate-400 text-xs font-mono uppercase">Active Nodes</span>
                   <span className="text-2xl font-bold font-mono text-indigo-400">{activeUsers.toLocaleString()}</span>
                </div>
                <div>
                   <span className="block text-slate-400 text-xs font-mono uppercase">Total Records</span>
                   <span className="text-2xl font-bold font-mono text-white">{stats.total.toLocaleString()}</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Live Feed */}
              <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[500px]">
                 <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                       <Activity className="w-4 h-4 text-red-500 animate-pulse" /> Live Incident Feed
                    </h3>
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-0 scroll-smooth">
                    <div className="divide-y divide-slate-50">
                       {stats.liveFeed.map((record) => (
                          <div key={record.id} className={`p-4 hover:bg-slate-50 transition-colors ${record.isSimulation ? '' : 'bg-indigo-50/50'}`}>
                             <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-mono text-slate-400">#{record.id}</span>
                                <span className="text-[10px] font-bold text-indigo-600 uppercase">{record.status}</span>
                             </div>
                             <div className="text-sm font-semibold text-slate-800">{record.location}</div>
                             <div className="text-xs text-slate-500 mb-2">{record.type}</div>
                             <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                <Clock className="w-3 h-3" />
                                {new Date(record.timestamp).toLocaleTimeString()}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Right Column: Charts & Stats */}
              <div className="lg:col-span-2 space-y-6">
                 
                 {/* Quick Stats Row */}
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg shadow-indigo-200">
                       <div className="text-indigo-200 text-xs font-bold uppercase mb-1">New Cases (24h)</div>
                       <div className="text-4xl font-mono font-bold">{stats.today}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                       <div className="text-slate-400 text-xs font-bold uppercase mb-1">Avg Response Time</div>
                       <div className="text-4xl font-mono font-bold text-slate-800">12<span className="text-lg text-slate-400 ml-1">min</span></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hidden md:block">
                       <div className="text-slate-400 text-xs font-bold uppercase mb-1">System Health</div>
                       <div className="text-xl font-mono font-bold text-green-600 flex items-center h-full">
                          <Wifi className="w-5 h-5 mr-2" /> Optimal
                       </div>
                    </div>
                 </div>

                 {/* Real-Time Chart Simulation */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-64 relative overflow-hidden">
                     <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-slate-400" /> Incoming Data Volume
                     </h3>
                     <div className="flex items-end justify-between h-40 gap-1">
                        {Array.from({ length: 30 }).map((_, i) => (
                           <div 
                              key={i} 
                              className="bg-indigo-100 rounded-t w-full transition-all duration-1000 ease-in-out"
                              style={{ 
                                 height: `${20 + Math.random() * 80}%`,
                                 opacity: (i+1)/30 
                              }}
                           ></div>
                        ))}
                     </div>
                     <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>-60s</span>
                        <span>-30s</span>
                        <span>NOW</span>
                     </div>
                 </div>

                 {/* API Status Board */}
                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                       <h3 className="font-bold text-slate-700 flex items-center gap-2">
                          <Server className="w-4 h-4 text-slate-500" /> State Police Gateway Status
                       </h3>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {API_STATUS.map((api, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-indigo-100 transition-colors">
                            <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${api.status === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                               <div>
                                  <div className="font-bold text-xs text-slate-700 uppercase">{api.state}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">{api.latency}</div>
                               </div>
                            </div>
                            <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                               v2.1
                            </span>
                          </div>
                        ))}
                    </div>
                 </div>

              </div>
          </div>
          
          {/* TS Highlight */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl border border-orange-100 flex items-center gap-4">
             <div className="p-3 bg-white rounded-full shadow-sm text-orange-600">
                <Map className="w-6 h-6" />
             </div>
             <div>
                <h4 className="font-bold text-slate-900">Telangana State Integration Active</h4>
                <p className="text-sm text-slate-600">
                   Real-time link established with Hyderabad, Cyberabad, and Rachakonda Commissionerates.
                   All 498A FIRs are auto-synced to this central repository.
                </p>
             </div>
          </div>

      </div>
    </div>
  );
};