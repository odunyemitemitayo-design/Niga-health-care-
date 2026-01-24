
import React, { useState, useEffect } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  isInline?: boolean;
}

type AuthMode = 'login' | 'register' | 'success' | '2fa';

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onLoginSuccess, isInline = false }) => {
  const [mode, setMode] = useState<AuthMode>('register');
  const [loading, setLoading] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);

  if (!isOpen && !isInline) return null;

  const handleCaptcha = () => {
    if (isHuman) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setIsHuman(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHuman) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'register') {
        setMode('success');
      } else if (mode === 'login') {
        setMode('2fa'); // Move to 2FA step after successful credentials
      }
    }, 1500);
  };

  const handle2FAVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    }, 1000);
  };

  const handle2FAChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`2fa-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleEnterDashboard = () => {
    if (onLoginSuccess) onLoginSuccess();
    onClose();
  };

  const content = (
    <div className={`${isInline ? '' : 'relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300'}`}>
      {!isInline && (
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      )}

      {mode === '2fa' ? (
        <div className="p-10 sm:p-14 text-center animate-in slide-in-from-right-4 duration-300">
          <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-3">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-teal-950 mb-4 tracking-tight serif-heading">Two-Factor Auth</h2>
          <p className="text-slate-500 mb-10 text-sm font-medium">Please enter the 6-digit verification code sent to your registered device.</p>
          
          <form onSubmit={handle2FAVerify} className="space-y-8">
            <div className="flex justify-between gap-2 max-w-xs mx-auto">
              {twoFactorCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`2fa-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handle2FAChange(idx, e.target.value)}
                  className="w-10 h-14 text-center text-xl font-bold bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                />
              ))}
            </div>
            <button 
              disabled={loading || twoFactorCode.some(d => !d)}
              className="w-full bg-teal-950 text-white font-bold py-6 rounded-2xl uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-teal-950/20 hover:bg-teal-900 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Complete Secure Login'}
            </button>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest cursor-pointer hover:text-teal-600">Resend Code</p>
          </form>
        </div>
      ) : mode !== 'success' ? (
        <div className="flex flex-col h-full">
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => { setMode('register'); setIsHuman(false); }}
              className={`flex-1 py-8 text-[11px] font-bold uppercase tracking-[0.3em] transition-all ${mode === 'register' ? 'text-teal-600 bg-teal-50/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Patient Registration
            </button>
            <button 
              onClick={() => { setMode('login'); setIsHuman(false); }}
              className={`flex-1 py-8 text-[11px] font-bold uppercase tracking-[0.3em] transition-all ${mode === 'login' ? 'text-teal-600 bg-teal-50/20' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
          </div>

          <div className={`${isInline ? 'py-12' : 'p-10 sm:p-14'}`}>
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-teal-950 mb-3 tracking-tight serif-heading">
                {mode === 'register' ? 'Create Patient Profile' : 'Access Your Portal'}
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {mode === 'register' 
                  ? 'Join the community of Nigerians choosing better care through verified reviews.' 
                  : 'Securely manage your medical review history and verified data.'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm font-medium" placeholder="Adebayo Chukwu" />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Location</label>
                    <select required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm appearance-none font-medium">
                      <option value="">Select Region</option>
                      <option value="Lagos">Lagos State</option>
                      <option value="Ogun">Ogun State</option>
                      <option value="Abuja">Abuja (FCT)</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                <input required type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm font-medium" placeholder="name@domain.ng" />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Secure Password</label>
                <input required type="password" minLength={8} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm font-medium" placeholder="••••••••" />
              </div>

              {/* Identity Verification (Simulated reCAPTCHA) */}
              <div 
                onClick={handleCaptcha}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${isHuman ? 'bg-teal-50/50 border-teal-200' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}
              >
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isHuman ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-200'}`}>
                  {captchaLoading ? (
                    <div className="w-3 h-3 border-2 border-teal-600 border-t-transparent animate-spin rounded-full" />
                  ) : isHuman ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  ) : null}
                </div>
                <div className="flex-grow">
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isHuman ? 'text-teal-900' : 'text-slate-400'}`}>
                    {isHuman ? 'Identity Verified' : 'Confirm Identity'}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-50 grayscale">
                   <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="recaptcha" className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading || !isHuman}
                  className="w-full bg-teal-950 text-white font-bold py-6 rounded-2xl uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-teal-950/20 hover:bg-teal-900 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : (mode === 'register' ? 'Register Account' : 'Secure Sign In')}
                </button>
              </div>
            </form>
            
            <div className="mt-8 flex items-center justify-between text-[9px] font-bold text-slate-300 uppercase tracking-widest">
               <span>Shielded by Wordfence</span>
               <div className="h-px bg-slate-100 flex-grow mx-4" />
               <span>End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${isInline ? 'py-20' : 'p-16'} text-center`}>
          <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-teal-600/10">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-bold text-teal-950 mb-4 tracking-tight serif-heading">Profile Verified</h2>
          <p className="text-slate-500 mb-12 text-lg font-light leading-relaxed max-w-sm mx-auto">Welcome to the inner circle of Nigerian healthcare transparency. Your subscriber account is active.</p>
          <button 
            onClick={handleEnterDashboard}
            className="w-full max-w-xs bg-teal-950 text-white font-bold py-6 rounded-2xl uppercase tracking-[0.4em] text-[10px] shadow-xl active:scale-95 mx-auto"
          >
            Enter Dashboard
          </button>
        </div>
      )}
    </div>
  );

  if (isInline) return content;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-teal-950/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      {content}
    </div>
  );
};

export default RegistrationModal;
