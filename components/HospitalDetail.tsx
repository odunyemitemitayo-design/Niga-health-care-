import React, { useEffect, useState } from 'https://esm.sh/react@^19.2.3';
import { Hospital } from '../types.ts';
import { getHospitalSummary, getEmergencyGuidance, getFacilityOverview } from '../services/geminiService.ts';

interface HospitalDetailProps {
  hospital: Hospital;
  onClose: () => void;
}

const HospitalDetail: React.FC<HospitalDetailProps> = ({ hospital, onClose }) => {
  const [summary, setSummary] = useState<string>('Analyzing clinical data...');
  const [emergencyTips, setEmergencyTips] = useState<string | null>(null);
  const [facilityDesc, setFacilityDesc] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const [s, e, f] = await Promise.all([
        getHospitalSummary(hospital.name, hospital.specialties, hospital.rating),
        getEmergencyGuidance(hospital.name),
        getFacilityOverview(hospital.name, hospital.facilities)
      ]);
      setSummary(s);
      setEmergencyTips(e);
      setFacilityDesc(f);
    }
    loadData();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [hospital]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
      {/* Top Navigation / Header Area */}
      <header className="sticky top-0 z-10 glass-effect border-b border-slate-100 px-4 sm:px-8 py-5 flex justify-between items-center h-24">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-50 rounded-lg transition-colors text-slate-600 border border-slate-100 shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-teal-950 tracking-tight">{hospital.name}</h1>
              {hospital.isVerified && (
                <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Verified
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 font-medium">{hospital.location.address}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <a 
            href={`tel:${hospital.phone}`}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-xl shadow-red-900/20 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            <span className="hidden sm:inline">EMERGENCY CALL</span>
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Body */}
          <div className="lg:col-span-2 space-y-16">
            {/* Visual Hero */}
            <div className="relative rounded-lg overflow-hidden aspect-[21/9] shadow-2xl">
              <img src={hospital.imageUrl} alt={hospital.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <div className="flex items-center gap-2 bg-white text-teal-600 px-5 py-2 rounded-lg text-xl font-bold shadow-2xl">
                  <span>★</span>
                  <span>Patient Rating: {hospital.rating}</span>
                </div>
              </div>
            </div>

            {/* Description & AI Insight */}
            <section className="bg-white p-10 rounded-lg border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-bold text-teal-950 mb-8 tracking-tight">Facility Overview</h2>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-8 rounded-lg mb-10 shadow-inner">
                <h4 className="flex items-center gap-2 text-teal-900 font-bold mb-4 uppercase tracking-widest text-xs">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                  Patient Insight Summary
                </h4>
                <p className="text-teal-800 italic text-xl leading-relaxed font-medium">"{summary}"</p>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed">
                <p>Located in the heart of {hospital.location.address.split(',')[1] || 'the city'}, {hospital.name} is a premier {hospital.type.toLowerCase()} {hospital.category.toLowerCase()} facility dedicated to excellence in patient care.</p>
                {facilityDesc && (
                  <div className="mt-10 space-y-6">
                    <h3 className="text-teal-950 font-bold text-2xl tracking-tight">Clinical Capabilities</h3>
                    <div className="whitespace-pre-line text-slate-600 bg-slate-50 p-8 rounded-lg border border-slate-100 italic">{facilityDesc}</div>
                  </div>
                )}
              </div>
            </section>

            {/* Specialties & Facilities Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm">
                <h3 className="text-teal-950 font-bold mb-6 uppercase text-xs tracking-[0.2em]">Medical Specialties</h3>
                <div className="flex flex-wrap gap-3">
                  {hospital.specialties.map(s => (
                    <span key={s} className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm">
                <h3 className="text-teal-950 font-bold mb-6 uppercase text-xs tracking-[0.2em]">On-Site Facilities</h3>
                <div className="flex flex-wrap gap-3">
                  {hospital.facilities.map(f => (
                    <span key={f} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold border border-blue-100">{f}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="pt-16 border-t border-slate-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-teal-950 tracking-tight">Community Feedback</h2>
                <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all active:scale-95">Leave a Review</button>
              </div>
              <div className="space-y-8">
                {hospital.reviews.length > 0 ? hospital.reviews.map(r => (
                  <div key={r.id} className="bg-white p-10 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                           {r.userName.charAt(0)}
                         </div>
                         <div>
                          <h5 className="font-bold text-teal-950 text-lg">{r.userName}</h5>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(r.date).toLocaleDateString('en-NG', { dateStyle: 'long' })}</p>
                        </div>
                      </div>
                      <div className="flex text-teal-500 font-bold text-lg">
                        {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
                      </div>
                    </div>
                    <p className="text-slate-600 italic text-lg leading-relaxed mb-8">"{r.comment}"</p>
                    <div className="flex flex-wrap gap-6 text-xs uppercase font-bold text-slate-400 pt-6 border-t border-slate-50">
                      <span className="flex items-center gap-1"><span className="text-teal-600">Care Quality:</span> {r.metrics.careQuality}/5</span>
                      <span className="flex items-center gap-1"><span className="text-teal-600">Wait Time:</span> {r.metrics.waitTime}m</span>
                      <span className="flex items-center gap-1"><span className="text-teal-600">Cost Value:</span> Fair</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No clinical reviews yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Map Area */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-56 bg-slate-100 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-teal-600/5 group-hover:bg-teal-600/10 transition-colors" />
                <svg className="w-16 h-16 text-teal-600/30" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                <div className="absolute bottom-6 px-6 w-full">
                  <button className="w-full bg-white text-teal-950 text-xs font-bold py-3 rounded-lg shadow-xl border border-slate-100 hover:bg-slate-50 transition-colors uppercase tracking-widest">Launch Navigation</button>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Facility Location</h4>
                <p className="text-base text-teal-950 font-bold leading-relaxed">{hospital.location.address}</p>
              </div>
            </div>

            {/* Costs & Metrics */}
            <div className="bg-teal-950 text-white rounded-lg p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/10 blur-3xl rounded-full"></div>
              <h4 className="text-teal-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">Patient Pricing</h4>
              <div className="space-y-8">
                <div>
                  <p className="text-teal-300/60 text-xs font-bold uppercase mb-2">Base Consultation Fee</p>
                  <p className="text-4xl font-bold tracking-tighter">{formatCurrency(hospital.avgMetrics.estimatedCost)}</p>
                </div>
                <div className="pt-8 border-t border-teal-800 space-y-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-teal-300 font-medium">Avg. Wait Time</span>
                    <span className="font-bold">{hospital.avgMetrics.waitTime} minutes</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-teal-300 font-medium">Insurance Network</span>
                    <span className="font-bold">HMO / NHIS / Self-Pay</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-teal-600 text-white font-bold py-5 rounded-lg mt-10 hover:bg-teal-500 transition-all shadow-xl shadow-black/20 active:scale-95 uppercase tracking-widest">
                Secure Appointment
              </button>
            </div>

            {/* Emergency Tips Sidebar */}
            {emergencyTips && (
              <div className="bg-[#FFF5F5] border border-red-100 p-8 rounded-lg shadow-sm">
                <h4 className="text-[#D32F2F] font-bold mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  Emergency Checklist
                </h4>
                <div className="prose prose-sm text-red-900 whitespace-pre-line text-sm font-bold leading-relaxed opacity-80">
                  {emergencyTips}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      
      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 flex gap-4 z-50 shadow-2xl">
        <a 
          href={`tel:${hospital.phone}`}
          className="flex-1 bg-[#D32F2F] text-white font-bold py-5 rounded-lg text-center shadow-xl shadow-red-500/20 active:scale-95"
        >
          URGENT CALL
        </a>
      </div>
    </div>
  );
};

export default HospitalDetail;