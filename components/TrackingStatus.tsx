import React, { useState } from 'react';
import { Search, CheckCircle, Clock, User, ShieldCheck } from 'lucide-react';
import { TrackingResult } from '../types';

export const TrackingStatus: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setLoading(true);
    setError('');
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (trackingId.length < 6) {
        setError('Invalid Tracking ID format. Please check and try again.');
        return;
      }
      
      // Mock Response
      setResult({
        id: trackingId.toUpperCase(),
        status: 'ASSIGNED',
        policeStation: 'Women Cell, District Central',
        officerAssigned: 'Inspector Aditi Sharma',
        lastUpdate: new Date().toLocaleDateString()
      });
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Track Your Complaint</h2>
        <p className="text-slate-500">Enter the IDCP ID you received via SMS/Email</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. IDCP-883921"
            className="w-full pl-5 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-mono uppercase"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-2"></div>
          <p className="text-slate-500">Searching national database...</p>
        </div>
      )}

      {result && (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="font-mono font-bold text-slate-700">{result.id}</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">
              {result.status}
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
               <div className="mt-1">
                 <CheckCircle className="w-5 h-5 text-green-500" />
               </div>
               <div>
                 <p className="font-medium text-slate-900">Complaint Received</p>
                 <p className="text-sm text-slate-500">Your complaint was successfully logged.</p>
               </div>
            </div>
            
            <div className="flex items-start gap-4">
               <div className="mt-1">
                 <ShieldCheck className="w-5 h-5 text-indigo-500" />
               </div>
               <div>
                 <p className="font-medium text-slate-900">Routed to Jurisdiction</p>
                 <p className="text-sm text-slate-500">{result.policeStation}</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="mt-1">
                 <User className="w-5 h-5 text-orange-500" />
               </div>
               <div>
                 <p className="font-medium text-slate-900">Officer Assigned</p>
                 <p className="text-sm text-slate-500">{result.officerAssigned}</p>
               </div>
            </div>
          </div>
          <div className="bg-slate-50 p-3 text-center text-xs text-slate-400 border-t border-slate-200">
            Last Updated: {result.lastUpdate}
          </div>
        </div>
      )}
    </div>
  );
};