
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">+</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">NaijaHealth</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The premier platform for hospital reviews and medical transparency in Nigeria. Dedicated to saving lives through data.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('hospitals')} className="hover:text-teal-400 transition-colors">Directory</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-teal-400 transition-colors">Emergency Hub</button></li>
              <li><button className="hover:text-teal-400 transition-colors">Doctor Reviews</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-teal-400 transition-colors">Contact</button></li>
              <li><button className="hover:text-teal-400 transition-colors">Careers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-teal-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-teal-400 transition-colors">Terms & Disclaimer</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 mb-8">
          <p className="text-[10px] text-slate-500 leading-relaxed text-center italic max-w-3xl mx-auto uppercase">
            Disclaimer: This platform is for informational purposes only and does not provide medical advice. In case of an emergency, please contact a qualified medical professional or emergency services immediately. Ratings are based on user experiences.
          </p>
        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NaijaHealth Reviews. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
