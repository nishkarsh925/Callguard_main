import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

const StickyCall: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show earlier on mobile
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop/Tablet Floating Bar */}
      <div 
        className={`hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-kalka-charcoal/90 backdrop-blur-md text-white py-3 px-6 rounded-full items-center z-50 shadow-2xl border border-white/10 transition-all duration-500 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center mr-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-3"></span>
            <span className="font-semibold text-sm">Available Now for Recovery</span>
        </div>
        <div className="flex items-center space-x-3">
             <a href="tel:+919212225577" className="flex items-center bg-kalka-red text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                <Phone className="w-4 h-4 mr-2" />
                +91 92122 25577
             </a>
             <button 
                onClick={() => setIsVisible(false)} 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close sticky bar"
             >
                <X className="w-4 h-4 text-gray-400" />
             </button>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div 
        className={`md:hidden fixed bottom-6 left-6 right-6 z-50 transition-all duration-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <a 
            href="tel:+919212225577" 
            className="flex items-center justify-center w-full bg-gradient-to-r from-kalka-red to-red-700 text-white py-4 rounded-2xl font-black shadow-2xl border border-red-500/50 animate-bounce-subtle"
        >
            <div className="bg-white/20 p-2 rounded-full mr-3">
                 <Phone className="w-5 h-5 text-white" />
            </div>
            EMERGENCY CALL
        </a>
      </div>
    </>
  );
};

export default StickyCall;