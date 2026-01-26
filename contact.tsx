
import React from 'https://esm.sh/react@^19.2.3';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-40 pb-24 px-4 max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold text-teal-950 tracking-tight serif-heading mb-8">Connect with Us.</h1>
        <p className="text-xl text-slate-500 font-light max-w-xl mx-auto">
          Whether you are a medical facility looking to verify your profile or a patient with a query, we are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl text-center group hover-lift">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-colors group-hover:bg-teal-600 group-hover:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Support Email</h3>
          <p className="text-teal-950 font-bold serif-heading">hello@naijahealth.reviews</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl text-center group hover-lift">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-colors group-hover:bg-teal-600 group-hover:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">HQ Address</h3>
          <p className="text-teal-950 font-bold serif-heading">Victoria Island, Lagos, Nigeria</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl text-center group hover-lift">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-colors group-hover:bg-teal-600 group-hover:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Facility Verification</h3>
          <p className="text-teal-950 font-bold serif-heading">verify@naijahealth.reviews</p>
        </div>
      </div>
      
      <div className="mt-20 bg-teal-950 p-16 rounded-[60px] text-white text-center">
        <h2 className="text-3xl font-bold serif-heading mb-6">Are you a Medical Director?</h2>
        <p className="text-teal-100/60 mb-10 max-w-lg mx-auto">Claim your facility's profile to respond to reviews and update your clinical metrics.</p>
        <button className="bg-teal-600 text-white font-bold px-12 py-5 rounded-2xl uppercase tracking-[0.4em] text-[10px] shadow-xl active:scale-95">Claim My Facility</button>
      </div>
    </div>
  );
};

export default ContactPage;
