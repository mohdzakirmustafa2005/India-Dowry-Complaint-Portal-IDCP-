import React, { useState } from 'react';
import { ComplaintData, DowryType, INDIAN_STATES } from '../types';
import { refineComplaintText, analyzeSeverity } from '../services/geminiService';
import { store } from '../services/store';
import { AlertTriangle, Upload, Wand2, MapPin, CheckCircle, Loader2 } from 'lucide-react';

interface ComplaintFormProps {
  onSubmit: (data: ComplaintData) => void;
  onCancel: () => void;
}

const STEPS = ['Safety Check', 'Incident', 'Accused', 'Evidence', 'Review'];

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<ComplaintData>({
    isAnonymous: false,
    relationToVictim: 'Self',
    incidentDate: '',
    state: '',
    district: '',
    pincode: '',
    accusedName: '',
    accusedRelation: '',
    dowryType: [],
    description: '',
    evidenceFiles: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: DowryType) => {
    setFormData(prev => {
      const types = prev.dowryType.includes(type)
        ? prev.dowryType.filter(t => t !== type)
        : [...prev.dowryType, type];
      return { ...prev, dowryType: types };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        evidenceFiles: Array.from(e.target.files!)
      }));
    }
  };

  const handleAiRefine = async () => {
    if (!formData.description) return;
    setIsProcessing(true);
    const refined = await refineComplaintText(formData.description);
    setFormData(prev => ({ ...prev, description: refined }));
    setIsProcessing(false);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // 1. Analyze severity
    const analysis = await analyzeSeverity(formData.description);
    const finalData = { ...formData, severityScore: analysis.score };
    
    // 2. Submit to Real-Time Store
    const trackingId = store.addComplaint(finalData);

    // 3. Callback to Parent
    setTimeout(() => {
        // We pass the generated ID back up so the App can show the success screen
        // We augment the data object with the ID just for the callback
        onSubmit({ ...finalData, trackingId } as any);
        setIsProcessing(false);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Safety Check
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-orange-800 font-bold">Are you in immediate danger?</h3>
                  <p className="text-orange-700 text-sm mt-1">
                    If you or someone else is in immediate physical danger, please call <strong>100</strong> (Police) or <strong>1091</strong> (Women Helpline) immediately. Do not rely solely on this web form for emergencies.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="flex items-center space-x-3 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <div>
                  <span className="block font-semibold text-slate-900">File Anonymously</span>
                  <span className="text-sm text-slate-500">Your name will not be shared initially with the local station.</span>
                </div>
              </label>

              {!formData.isAnonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="victimName"
                      value={formData.victimName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="victimPhone"
                      value={formData.victimPhone || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Relation to Victim</label>
                <select
                  name="relationToVictim"
                  value={formData.relationToVictim}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Self">I am the victim (Self)</option>
                  <option value="Parent">Parent / Guardian</option>
                  <option value="Sibling">Brother / Sister</option>
                  <option value="Relative">Relative</option>
                  <option value="Neighbor">Neighbor / Witness</option>
                  <option value="NGO">NGO / Social Worker</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 1: // Incident
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Where did the harassment happen?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Pincode (Crucial for routing)</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 110001"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                 </div>
                 <p className="text-xs text-slate-500 mt-1">We use this to send your report to the correct SP/DCP office.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Incident (Latest)</label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Accused & Nature
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name of Main Accused</label>
                  <input
                    type="text"
                    name="accusedName"
                    value={formData.accusedName}
                    onChange={handleInputChange}
                    placeholder="e.g. Husband or Mother-in-law's name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Relation of Accused</label>
                  <input
                    type="text"
                    name="accusedRelation"
                    value={formData.accusedRelation}
                    onChange={handleInputChange}
                    placeholder="e.g. Husband, Father-in-law"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Nature of Harassment (Select all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.values(DowryType).map((type) => (
                    <label key={type} className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.dowryType.includes(type) ? 'bg-indigo-50 border-indigo-500' : 'hover:bg-slate-50'}`}>
                      <input
                        type="checkbox"
                        checked={formData.dowryType.includes(type)}
                        onChange={() => handleCheckboxChange(type)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
             </div>
          </div>
        );

      case 3: // Evidence & Description (AI Powered)
        return (
          <div className="space-y-6">
             <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-700">Detailed Description</label>
                  <button
                    type="button"
                    onClick={handleAiRefine}
                    disabled={isProcessing || !formData.description}
                    className="text-xs flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                    {isProcessing ? 'Refining...' : 'Refine with AI'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-2">Write roughly what happened. Our AI can help format it into legal language.</p>
                <textarea
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g. My mother in law asked for 5 lakhs cash last week and when I refused she locked me in the room..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Upload Evidence (Optional)</label>
               <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-indigo-600 font-medium">Click to upload photos/videos/audio</span>
                    <span className="text-xs text-slate-400 mt-1">Max 5 files. Securely encrypted.</span>
                  </label>
               </div>
               {formData.evidenceFiles.length > 0 && (
                 <div className="mt-3 space-y-1">
                   {formData.evidenceFiles.map((file, idx) => (
                     <div key={idx} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" /> {file.name}
                     </div>
                   ))}
                 </div>
               )}
             </div>
          </div>
        );

      case 4: // Review
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Review Your Complaint</h3>
            <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                 <div>
                    <span className="block text-slate-500">Applicant</span>
                    <span className="font-semibold text-slate-900">{formData.isAnonymous ? 'Anonymous' : formData.victimName}</span>
                 </div>
                 <div>
                    <span className="block text-slate-500">Location</span>
                    <span className="font-semibold text-slate-900">{formData.district}, {formData.state} ({formData.pincode})</span>
                 </div>
                 <div>
                    <span className="block text-slate-500">Accused</span>
                    <span className="font-semibold text-slate-900">{formData.accusedName} ({formData.accusedRelation})</span>
                 </div>
                 <div>
                    <span className="block text-slate-500">Types</span>
                    <span className="font-semibold text-slate-900">{formData.dowryType.join(', ')}</span>
                 </div>
              </div>
              <div>
                <span className="block text-slate-500 text-sm mb-1">Complaint Text</span>
                <p className="text-slate-800 text-sm bg-white p-3 rounded border border-slate-200">
                  {formData.description}
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-500 text-center">
              By clicking Submit, you declare that the information provided is true to the best of your knowledge. 
              False complaints are punishable by law.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in my-8">
       {/* Progress Bar */}
       <div className="bg-slate-100 h-2 w-full">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
       </div>

       <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-bold text-slate-900">{STEPS[currentStep]}</h2>
             <span className="text-sm font-medium text-slate-400">Step {currentStep + 1} of {STEPS.length}</span>
          </div>

          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
            <button
              onClick={currentStep === 0 ? onCancel : () => setCurrentStep(prev => prev - 1)}
              className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              disabled={isProcessing || (currentStep === 3 && !formData.description)}
              className="flex items-center gap-2 px-8 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              {currentStep === STEPS.length - 1 ? 'Submit Complaint' : 'Next'}
            </button>
          </div>
       </div>
    </div>
  );
};