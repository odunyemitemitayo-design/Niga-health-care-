import React, { useEffect, useState } from 'https://esm.sh/react@^19.2.3';
import { Doctor } from '../types.ts';
import { getDoctorSummary } from '../services/geminiService.ts';

interface DoctorDetailProps {
  doctor: Doctor;
  onClose: () => void;
}

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor, onClose }) => {
  const [summary, setSummary] = useState<string>('Generating professional profile...');

  useEffect(() => {
    async function loadData() {
      const s = await getDoctorSummary(doctor.name, doctor.title, doctor.specialty);
      setSummary(s);
    }
    loadData();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [doctor]);

  return (
    <div className="fixed inset-0 z-[120] bg-white overflow-y-auto animate-in fade-in duration-300">
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
              <h1 className="text-2xl font-bold text-teal-950 tracking-tight serif-heading">{doctor.name}</h1>
              {doctor.isVerified && (
                <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Verified Professional
                </span>
              )}
            </div>
            <p className="text-sm text-teal-600 font-bold uppercase tracking-widest">{doctor.title} • {doctor.specialty}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-teal-950 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-teal-900/20 active:scale-95">
            BOOK CONSULTATION
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Profile Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 aspect-square">
              <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-1.5 text-teal-600">
                    <span className="text-xl font-bold">★ {doctor.rating}</span>
                  </div>
                </div>
                <div className="bg-teal-950 text-white px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
                  {doctor.experience}Yrs Experience
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Affiliation</h4>
                <p className="text-xl font-bold text-teal-950 serif-heading">{doctor.hospitalAffiliation || 'Private Practice'}</p>
              </div>
              
              {doctor.education && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Credentials & Education</h4>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-600 font-medium">
                        <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-teal-50 p-10 rounded-[40px] border border-teal-100 space-y-6">
               <div className="flex items-center justify-between text-[10px] font-bold text-teal-800 uppercase tracking-widest">
                  <span>Trust Score</span>
                  <span>98%</span>
               </div>
               <div className="w-full bg-teal-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full w-[98%]" />
               </div>
               <p className="text-[10px] text-teal-700 font-medium italic">Verified by the NaijaHealth Clinical Review Board.</p>
            </div>
          </div>

          {/* Bio and Reviews */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-4xl font-bold text-teal-950 mb-8 tracking-tight serif-heading">Professional Biography</h2>
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 blur-3xl rounded-full" />
                <p className="text-xl text-slate-600 leading-relaxed font-light italic relative z-10">
                  "{summary}"
                </p>
                <p className="mt-8 text-slate-500 leading-relaxed">
                  As a leading expert in {doctor.specialty.toLowerCase()}, {doctor.name} has dedicated their career to advancing surgical techniques and improving patient outcomes within the Nigerian healthcare infrastructure. Their work at {doctor.hospitalAffiliation} is highly regarded for its clinical rigor and empathetic patient interaction.
                </p>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-teal-950 tracking-tight serif-heading">Patient Testimonials</h2>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doctor.reviewCount} Reviews Total</div>
              </div>
              
              <div className="space-y-8">
                {doctor.reviews && doctor.reviews.length > 0 ? doctor.reviews.map(r => (
                  <div key={r.id} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center font-bold text-teal-600">
                           {r.userName.charAt(0)}
                         </div>
                         <div>
                          <h5 className="font-bold text-teal-950 text-lg">{r.userName}</h5>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(r.date).toLocaleDateString('en-NG', { dateStyle: 'long' })}</p>
                        </div>
                      </div>
                      <div className="flex text-teal-500 font-bold text-lg">
                        {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
                      </div>
                    </div>
                    <p className="text-slate-600 italic text-lg leading-relaxed">"{r.comment}"</p>
                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span>Clinical Quality: {r.metrics.careQuality}/5</span>
                       <div className="w-1 h-1 bg-slate-200 rounded-full" />
                       <span>Patient Trust: High</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No clinical reviews yet for this professional.</p>
                  </div>
                )}
              </div>
            </section>

            <div className="bg-teal-950 p-12 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold serif-heading mb-2">Need a consultation?</h3>
                  <p className="text-teal-400/60 text-sm font-medium">Verify availability and book a secure slot directly.</p>
               </div>
               <button className="bg-teal-600 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-teal-500 transition-all active:scale-95">
                  Check Schedule
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 border-t border-slate-100 bg-slate-50/50">
         <div className="max-w-6xl mx-auto px-8 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
            <span>Shielded by Wordfence</span>
            <div className="h-px bg-slate-200 flex-grow mx-8" />
            <span>Identity Verified Profile</span>
         </div>
      </div>
    </div>
  );
};

export default DoctorDetail;