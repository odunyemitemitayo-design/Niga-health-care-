
import React from 'https://esm.sh/react@^19.2.3';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-40 pb-24 px-4 max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-20">
        <span className="text-teal-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Manifesto</span>
        <h1 className="text-6xl font-bold text-teal-950 tracking-tight serif-heading mb-8">NaijaHealth: Accountability <br />for Every Life.</h1>
        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          We are Nigeria's first high-end, data-driven platform designed to eliminate the information gap in healthcare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-teal-900/5">
          <h2 className="text-2xl font-bold text-teal-950 serif-heading mb-6">The Problem</h2>
          <p className="text-slate-600 leading-relaxed mb-6 font-medium">
            For decades, Nigerians have lacked a central, trustworthy source to verify hospital quality, actual patient costs, and clinical wait times. Decisions were often made based on hearsay, leading to suboptimal care outcomes.
          </p>
          <div className="h-px bg-slate-100 w-full mb-6" />
          <p className="text-slate-400 text-sm">Every minute lost to a full ER or every naira overspent on substandard care matters.</p>
        </div>
        <div className="bg-teal-950 p-12 rounded-[40px] text-white shadow-2xl">
          <h2 className="text-2xl font-bold serif-heading mb-6 text-teal-400">Our Solution</h2>
          <p className="text-teal-100/80 leading-relaxed mb-6 font-medium">
            NaijaHealth aggregates verified patient metrics into a minimalist, premium interface. We empower citizens to see exactly where they can receive the best treatment based on real data, not marketing.
          </p>
          <div className="h-px bg-teal-900 w-full mb-6" />
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center font-bold">+</div>
            <span className="text-[10px] uppercase tracking-widest font-bold">100% Data Integrity</span>
          </div>
        </div>
      </div>

      <section className="bg-slate-50 p-16 rounded-[60px] text-center">
        <h2 className="text-3xl font-bold text-teal-950 serif-heading mb-12">Driven by Excellence</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl font-bold text-teal-600 mb-2 tracking-tighter serif-heading">12k+</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Members</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-teal-600 mb-2 tracking-tighter serif-heading">500+</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Facilities</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-teal-600 mb-2 tracking-tighter serif-heading">98%</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Review Accuracy</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
