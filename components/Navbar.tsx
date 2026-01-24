
import React from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, onOpenRegister, isLoggedIn }) => {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'hospitals', label: 'Directory' },
    { id: 'add-review', label: 'Add Review' },
    { id: 'about', label: 'Mission' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-effect border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center shadow-xl shadow-teal-600/30 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-2xl leading-none">+</span>
            </div>
            <span className="text-2xl font-bold text-teal-950 tracking-tighter serif-heading">NaijaHealth</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-12 text-[11px] font-bold uppercase tracking-[0.2em]">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-all py-1 border-b-2 ${
                  currentPage === link.id 
                    ? 'text-teal-600 border-teal-600' 
                    : 'text-slate-400 border-transparent hover:text-teal-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={onOpenRegister}
                  className="text-[11px] font-bold text-slate-400 hover:text-teal-600 uppercase tracking-widest transition-colors hidden sm:block"
                >
                  REGISTER
                </button>
                <button 
                  onClick={onOpenRegister}
                  className="bg-teal-950 text-white px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-teal-900 transition-all shadow-xl shadow-teal-950/10 active:scale-95"
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest hidden md:block">Verified Member</span>
                <div className="w-12 h-12 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                  U
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
