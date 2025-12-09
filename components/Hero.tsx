import React from 'react';
import { ShieldAlert, FileText, Activity, Lock, ChevronRight, Database } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-24 px-6 rounded-3xl overflow-hidden shadow-2xl mx-4 mt-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/90 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-1.5 rounded-full border border-orange-500/50 text-sm font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            National Action Against Dowry
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Stop the Harassment.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              Report Dowry Without Fear.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            The <strong>India Dowry Complaint Portal (IDCP)</strong> connects victims directly to state police special cells (including Telangana, UP, Maharashtra). Secure. Encrypted. Anonymous options available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => onNavigate(AppView.COMPLAINT_FORM)}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/20 transition-all transform hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              File New Complaint
            </button>
            <button 
              onClick={() => onNavigate(AppView.DATA_ARCHIVE)}
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 transition-all"
            >
              <Database className="w-5 h-5" />
              Archives & Stats
            </button>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">100% Secure & Private</h3>
          <p className="text-slate-600">
            Your data is end-to-end encrypted. We support anonymous reporting to protect your identity from the accused.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Direct Police Routing</h3>
          <p className="text-slate-600">
            Smart routing sends your complaint instantly to the jurisdictional SP/DCP based on your Pincode.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-6">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Legal Backup</h3>
          <p className="text-slate-600">
            Complaints are filed under IPC 498A and Dowry Prohibition Act, 1961. We generate a valid digital FIR draft.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Know Your Rights</h2>
            <p className="text-slate-400 max-w-xl">
              Giving or taking dowry is a punishable offence with imprisonment up to 5 years. 
              If you are being harassed, you have the right to protection under the Domestic Violence Act, 2005.
            </p>
          </div>
          <button 
             onClick={() => onNavigate(AppView.LEGAL_INFO)}
             className="whitespace-nowrap flex items-center gap-2 text-white font-semibold hover:text-orange-400 transition-colors"
          >
            Learn More Laws <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};