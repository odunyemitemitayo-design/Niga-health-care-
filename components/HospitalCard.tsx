import React from 'https://esm.sh/react@^19.2.3';
import { Hospital } from '../types.ts';
import { formatDistance } from '../utils/location.ts';

interface HospitalCardProps {
  hospital: Hospital;
  onClick: (h: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      onClick={() => onClick(hospital)}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group hover-lift relative"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={hospital.imageUrl} 
          alt={hospital.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {hospital.isVerified && (
            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl w-fit">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Verified
            </span>
          )}
          {hospital.distance !== undefined && (
            <span className="bg-teal-600/90 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl w-fit">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {formatDistance(hospital.distance)}
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl">
            <div className="flex items-center gap-1.5 text-teal-600">
              <span className="text-xs font-black tracking-tighter uppercase">Rating</span>
              <span className="text-lg font-bold leading-none">{hospital.rating}</span>
            </div>
          </div>
          <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{hospital.reviewCount} Patient Reviews</span>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-teal-950 mb-2 leading-tight tracking-tight group-hover:text-teal-600 transition-colors serif-heading">{hospital.name}</h3>
        <p className="text-sm text-slate-400 mb-8 flex items-center gap-2 font-medium">
          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {hospital.location.address.split(',').slice(-1)[0]}
        </p>

        <div className="grid grid-cols-3 gap-6 py-6 border-y border-slate-50 mb-8">
          <div className="text-center">
            <span className="block text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest">Quality</span>
            <span className="text-sm font-bold text-slate-900">{hospital.avgMetrics.careQuality}/5</span>
          </div>
          <div className="text-center border-x border-slate-50">
            <span className="block text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest">Wait</span>
            <span className="text-sm font-bold text-slate-900">{hospital.avgMetrics.waitTime}m</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest">Pricing</span>
            <span className="text-sm font-bold text-teal-600">{formatCurrency(hospital.avgMetrics.estimatedCost)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hospital.specialties.slice(0, 3).map(s => (
            <span key={s} className="bg-slate-50 text-slate-500 text-[9px] uppercase font-bold px-2.5 py-1.5 rounded-lg border border-slate-100 tracking-wider">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;