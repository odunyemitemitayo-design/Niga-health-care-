import React, { useState, useMemo, useEffect, useRef } from 'https://esm.sh/react@^19.2.3';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import BottomNav from './components/BottomNav.tsx';
import HospitalCard from './components/HospitalCard.tsx';
import DoctorCard from './components/DoctorCard.tsx';
import HospitalDetail from './components/HospitalDetail.tsx';
import DoctorDetail from './components/DoctorDetail.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import RegistrationModal from './components/RegistrationModal.tsx';
import AboutPage from './about.tsx';
import PrivacyPage from './privacy.tsx';
import TermsPage from './terms.tsx';
import ContactPage from './contact.tsx';
import { HOSPITALS, DOCTORS } from './data.ts';
import { Hospital, Doctor } from './types.ts';
import { calculateDistance, Coords, formatDistance } from './utils/location.ts';
import { getVoiceGuidance } from './services/geminiService.ts';
import { decodeBase64, decodeAudioData } from './utils/audio.ts';

interface AddReviewPageProps {
  isLoggedIn: boolean;
  onNavigateToAuth: () => void;
}

const AddReviewPage: React.FC<AddReviewPageProps> = ({ isLoggedIn, onNavigateToAuth }) => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-40 pb-24 px-4 max-w-4xl mx-auto text-center animate-in fade-in duration-700">
        <div className="bg-white p-16 rounded-[40px] border border-slate-100 shadow-2xl">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-10">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-teal-950 mb-6 tracking-tight serif-heading">Members Only</h1>
          <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            To prevent dangerous or fake reports and ensure clinical accuracy, only verified members can contribute reviews. 
            <br /><span className="text-teal-900 font-bold">Please sign in to share your experience and help others find quality care.</span>
          </p>
          <button 
            onClick={onNavigateToAuth}
            className="bg-teal-950 text-white font-bold px-12 py-6 rounded-2xl uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-teal-900/20 active:scale-95 transition-all"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-4 max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white p-16 rounded-[40px] shadow-2xl border border-slate-100">
          <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-bold text-teal-950 mb-6 tracking-tight serif-heading">Thank You</h2>
          <p className="text-slate-500 mb-10 text-lg">Your voice has been recorded and will help thousands find the right care.</p>
          <button onClick={() => window.location.reload()} className="bg-teal-950 text-white font-bold px-12 py-5 rounded-2xl uppercase tracking-widest text-xs">Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-950 mb-12 text-center serif-heading">Contribute Your Experience</h1>
      <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-2xl space-y-10">
        <div className="space-y-4">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Hospital</label>
          <select required className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 font-medium">
            <option value="">Choose facility...</option>
            {HOSPITALS.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clinical Care Quality</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="transition-all active:scale-90">
                <svg className={`w-14 h-14 ${rating >= star ? 'text-teal-500 fill-teal-500' : 'text-slate-100'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Review Comments</label>
          <textarea required className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 min-h-[150px] font-medium" placeholder="Describe your experience with wait times, staff, and costs..." />
        </div>
        <button type="submit" disabled={rating === 0} className="w-full bg-teal-950 text-white font-bold py-6 rounded-2xl uppercase tracking-[0.3em] text-xs disabled:opacity-30">Publish Secure Review</button>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userCoords, setUserCoords] = useState<Coords | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [assistantText, setAssistantText] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const speakResponse = async (text: string) => {
    try {
      setAssistantText(text);
      setIsAssistantSpeaking(true);
      const base64Audio = await getVoiceGuidance(text);
      if (!base64Audio) return setIsAssistantSpeaking(false);
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const ctx = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => { setIsAssistantSpeaking(false); setAssistantText(''); };
      source.start(0);
    } catch (err) { setIsAssistantSpeaking(false); }
  };

  const handleQuickHelp = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
        const nearest = [...HOSPITALS].sort((a, b) => 
          calculateDistance(coords, { lat: a.location.lat, lng: a.location.lng }) - 
          calculateDistance(coords, { lat: b.location.lat, lng: b.location.lng })
        )[0];
        const dist = calculateDistance(coords, { lat: nearest.location.lat, lng: nearest.location.lng });
        
        setSelectedHospital(nearest);
        setIsLocating(false);
        speakResponse(`One moment. I've found your location. The closest verified facility is ${nearest.name}, approximately ${formatDistance(dist)} from you. I'm opening the details now.`);
      },
      () => {
        setIsLocating(false);
        alert("Location access is required for this feature.");
      }
    );
  };

  const filteredHospitals = useMemo(() => {
    let results = [...HOSPITALS];
    if (userCoords) results = results.map(h => ({ ...h, distance: calculateDistance(userCoords, h.location) }));
    const q = searchQuery.toLowerCase().trim();
    if (q) results = results.filter(h => [h.name, h.category, ...h.specialties].join(' ').toLowerCase().includes(q));
    return results.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity) || b.rating - a.rating);
  }, [searchQuery, userCoords]);

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return DOCTORS.slice(0, 3);
    return DOCTORS.filter(d => [d.name, d.specialty, d.title].join(' ').toLowerCase().includes(q));
  }, [searchQuery]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
    speakResponse("Welcome back. Your professional profile is now active.");
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'about': return <AboutPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'contact': return <ContactPage />;
      case 'add-review': return <AddReviewPage isLoggedIn={isLoggedIn} onNavigateToAuth={() => setCurrentPage('auth')} />;
      case 'auth': return (
        <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
            {/* Professional Side Panel */}
            <div className="lg:w-1/2 bg-teal-950 p-16 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 blur-[120px] rounded-full" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-10 shadow-xl shadow-teal-600/20">
                  <span className="text-white font-bold text-2xl">+</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight mb-6 serif-heading leading-tight">Secure Access to <br /><span className="text-teal-400">Premium Care.</span></h1>
                <p className="text-teal-100/60 text-lg max-w-md font-light leading-relaxed">
                  Join Nigeria's elite medical review network. Verified patients gain exclusive insights into wait times, actual costs, and clinical outcomes.
                </p>
              </div>
              <div className="relative z-10 mt-20">
                <div className="flex gap-4 mb-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-teal-950 bg-slate-200" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-teal-400 uppercase tracking-widest self-center">Joined by 12k+ Nigerians</p>
                </div>
                <div className="text-[10px] font-bold text-teal-700 uppercase tracking-[0.4em]">Proprietary Verification System</div>
              </div>
            </div>
            {/* Registration/Login Form Area */}
            <div className="lg:w-1/2 p-8 lg:p-20">
               <RegistrationModal 
                 isOpen={true} 
                 isInline={true} 
                 onClose={() => setCurrentPage('home')} 
                 onLoginSuccess={handleLoginSuccess}
               />
            </div>
          </div>
        </div>
      );
      case 'hospitals': return (
        <div className="pt-40 pb-24 px-4 max-w-7xl mx-auto animate-in fade-in duration-700">
          <h1 className="text-5xl font-bold text-teal-950 mb-16 tracking-tight serif-heading">Medical Directory</h1>
          <div className="flex flex-col md:flex-row gap-16">
            <aside className="w-full md:w-80 space-y-12">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                <div className="space-y-4">
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Search</label>
                   <input type="text" placeholder="Hospitals, doctors, specialties..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <button onClick={handleQuickHelp} className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl border-2 border-teal-600 text-teal-700 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-teal-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Find Near Me
                </button>
              </div>

              <div className="bg-teal-950 p-10 rounded-[40px] text-white">
                <h3 className="text-lg font-bold serif-heading mb-4">Elite Practitioners</h3>
                <p className="text-xs text-teal-400 font-medium mb-8">Access verified specialists with record-breaking outcomes.</p>
                <div className="space-y-6">
                  {DOCTORS.slice(0, 2).map(d => (
                    <div key={d.id} onClick={() => setSelectedDoctor(d)} className="flex items-center gap-4 cursor-pointer group">
                      <img src={d.imageUrl} className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      <div>
                        <p className="text-xs font-bold">{d.name}</p>
                        <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest">{d.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <div className="flex-grow space-y-16">
              <section>
                <h2 className="text-2xl font-bold text-teal-950 mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
                  Verified Hospitals
                  <div className="h-px bg-slate-100 flex-grow" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {filteredHospitals.map(h => <HospitalCard key={h.id} hospital={h} onClick={setSelectedHospital} />)}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-teal-950 mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
                  Top Specialists
                  <div className="h-px bg-slate-100 flex-grow" />
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {filteredDoctors.map(d => <DoctorCard key={d.id} doctor={d} onClick={setSelectedDoctor} />)}
                </div>
              </section>
            </div>
          </div>
        </div>
      );
      default: return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white -z-10" />
          
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-6">
              <span className="inline-block px-5 py-2 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-[0.4em] mb-4">Elite Nigerian Healthcare Network</span>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-teal-950 tracking-tighter leading-[0.85] serif-heading">
                Trustworthy care <br /><span className="text-teal-600">for Nigeria.</span>
              </h1>
              <p className="text-slate-500 text-xl sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed pt-4">
                Nigeria's premier platform for verified hospital reviews, costs, and medical transparency.
              </p>
            </div>

            {/* Siri-Style One-Tap Button */}
            <div className="flex flex-col items-center gap-10 pt-10">
              <button 
                onClick={handleQuickHelp}
                disabled={isLocating}
                className="group relative flex flex-col items-center justify-center p-1"
              >
                <div className={`w-32 h-32 sm:w-40 sm:h-40 bg-teal-600 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(13,148,136,0.3)] group-hover:shadow-[0_20px_60px_rgba(13,148,136,0.5)] transition-all duration-500 group-active:scale-90 ${isLocating ? 'animate-pulse' : ''}`}>
                   <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v5a3 3 0 01-3 3 3 3 0 01-3-3V6a3 3 0 013-3z" /></svg>
                   {/* Visual Ring Animation */}
                   <div className="absolute inset-0 border-4 border-teal-600 rounded-full animate-ping opacity-20" />
                   <div className="absolute -inset-4 border border-teal-100 rounded-full group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="mt-8">
                   <p className="text-[11px] font-bold text-teal-900 uppercase tracking-[0.5em] mb-2">{isLocating ? 'Identifying Location...' : 'One-Tap Assistance'}</p>
                   <p className="text-2xl font-bold text-teal-950 serif-heading group-hover:text-teal-600 transition-colors">🎤 Find Nearest Hospital</p>
                </div>
              </button>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="h-px w-20 bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Or search manually</span>
                <div className="h-px w-20 bg-slate-200" />
              </div>

              <div className="bg-white/80 backdrop-blur-md p-2 rounded-3xl shadow-2xl border border-slate-100 flex items-stretch w-full max-w-2xl group transition-all hover:shadow-teal-900/10">
                <input 
                  type="text" 
                  placeholder="Enter city, specialist, or facility..." 
                  className="flex-grow pl-8 pr-4 py-5 rounded-2xl border-0 outline-none text-xl font-light bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setCurrentPage('hospitals')}
                />
                <button 
                  onClick={() => setCurrentPage('hospitals')}
                  className="bg-teal-950 text-white px-10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-teal-900 transition-all active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-100 selection:text-teal-900">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        onOpenRegister={() => setCurrentPage('auth')}
        isLoggedIn={isLoggedIn}
      />
      <div className="flex-grow">{renderContent()}</div>
      <AIAssistant isSpeaking={isAssistantSpeaking} text={assistantText} />
      <Footer onNavigate={setCurrentPage} />
      <BottomNav onNavigate={setCurrentPage} currentPage={currentPage} />
      {selectedHospital && <HospitalDetail hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />}
      {selectedDoctor && <DoctorDetail doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />}
    </div>
  );
};

export default App;