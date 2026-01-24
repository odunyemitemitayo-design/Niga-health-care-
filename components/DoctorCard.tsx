
import React from 'https://esm.sh/react@^19.2.3';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all duration-300 hover-lift group">
      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-50">
        <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-lg font-bold text-slate-900 leading-none">{doctor.name}</h4>
          {doctor.isVerified && (
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          )}
        </div>
        <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">{doctor.title} • {doctor.specialty}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
            <span className="text-amber-400">★</span>
            <span>{doctor.rating}</span>
            <span className="text-slate-300">({doctor.reviewCount})</span>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            {doctor.experience}YRS EXP.
          </div>
        </div>
      </div>
      <button className="p-3 text-slate-300 hover:text-teal-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
};

export default DoctorCard;
