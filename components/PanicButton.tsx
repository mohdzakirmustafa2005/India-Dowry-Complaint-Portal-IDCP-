import React from 'react';
import { XCircle, LogOut } from 'lucide-react';

export const PanicButton: React.FC = () => {
  const handlePanic = () => {
    // Immediate redirect to a safe site (Google Weather)
    window.location.replace("https://www.google.com/search?q=weather");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-red-100 mb-2 max-w-[200px] text-xs text-gray-600 hidden sm:block">
        Click below if you are unsafe. It will immediately close this site.
      </div>
      <button
        onClick={handlePanic}
        className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 font-bold text-lg animate-pulse"
      >
        <LogOut className="w-6 h-6" />
        QUICK EXIT
      </button>
    </div>
  );
};