import React from 'react';
import { BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

export const LegalInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Legal Protections Against Dowry</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          India has strong laws to protect women from dowry harassment. Knowledge is your first line of defense.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
               <BookOpen className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold text-slate-900">IPC Section 498A</h3>
           </div>
           <p className="text-slate-600 mb-4 leading-relaxed">
             Deals with <strong>cruelty by husband or relatives</strong>. Cruelty refers to any willful conduct that drives the woman to commit suicide or causes grave injury to life, limb, or health (mental or physical).
           </p>
           <ul className="list-disc list-inside text-sm text-slate-500 space-y-2">
             <li>Non-bailable offence.</li>
             <li>Punishment: Imprisonment up to 3 years + Fine.</li>
             <li>Covers both physical and mental harassment.</li>
           </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-red-50 rounded-lg text-red-600">
               <AlertCircle className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold text-slate-900">IPC Section 304B</h3>
           </div>
           <p className="text-slate-600 mb-4 leading-relaxed">
             Deals with <strong>Dowry Death</strong>. If a woman dies due to burns or bodily injury under suspicious circumstances within 7 years of marriage, and it is shown she was harassed for dowry soon before death.
           </p>
           <ul className="list-disc list-inside text-sm text-slate-500 space-y-2">
             <li>Cognizable & Non-bailable.</li>
             <li>Minimum Punishment: 7 years imprisonment.</li>
             <li>Maximum: Life imprisonment.</li>
           </ul>
        </div>
      </div>

      <div className="bg-indigo-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">Dowry Prohibition Act, 1961</h3>
          <p className="text-indigo-200 mb-4">
            Under this act, giving OR taking dowry is a crime. However, the law protects the victim (giver) if they are forced to give dowry.
          </p>
          <div className="flex gap-4">
             <div className="bg-white/10 p-3 rounded-lg">
               <span className="block text-xl font-bold">5 Yrs</span>
               <span className="text-xs text-indigo-300">Min Jail Term</span>
             </div>
             <div className="bg-white/10 p-3 rounded-lg">
               <span className="block text-xl font-bold">₹15k+</span>
               <span className="text-xs text-indigo-300">Min Fine</span>
             </div>
          </div>
        </div>
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm max-w-sm">
           <div className="flex items-start gap-3">
             <HelpCircle className="w-6 h-6 text-orange-400 shrink-0" />
             <div>
               <h4 className="font-bold text-white mb-1">How IDCP helps?</h4>
               <p className="text-sm text-indigo-200">
                 We automatically format your complaint to reference these specific sections based on the details you provide, ensuring the Police take immediate cognizance.
               </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};