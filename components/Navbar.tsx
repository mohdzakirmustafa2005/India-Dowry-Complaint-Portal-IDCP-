import React from 'react';
import { Shield, Menu, Phone, BarChart3 } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  onNavigate: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate(AppView.HOME)}
          >
            <Shield className="h-8 w-8 text-indigo-600 fill-indigo-100" />
            <div>
              <span className="block text-xl font-bold text-slate-900 leading-none tracking-tight">IDCP</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Govt. of India Initiative (Concept)</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate(AppView.HOME)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">Home</button>
            <button onClick={() => onNavigate(AppView.LEGAL_INFO)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">Laws & Rights</button>
            <button onClick={() => onNavigate(AppView.DATA_ARCHIVE)} className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              <BarChart3 className="w-4 h-4" /> Data & Archives
            </button>
            <button onClick={() => onNavigate(AppView.TRACK_STATUS)} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">Track Status</button>
            <button onClick={() => onNavigate(AppView.COMPLAINT_FORM)} className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 text-sm">
              Report Now
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
             <a href="tel:1091" className="bg-red-50 text-red-600 p-2 rounded-full">
               <Phone className="w-5 h-5" />
             </a>
             <button className="text-slate-600" onClick={() => onNavigate(AppView.DATA_ARCHIVE)}>
               <BarChart3 className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>
      {/* Emergency Strip */}
      <div className="bg-red-600 text-white text-xs py-1 px-4 text-center font-bold tracking-wide">
         EMERGENCY HELPLINE: WOMEN POLICE 1091 | POLICE 100 | DOMESTIC ABUSE 181
      </div>
    </nav>
  );
};