import React from 'react';
import { Phone } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-kalka-charcoal pb-32">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-kalka-charcoal via-kalka-charcoal/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-kalka-charcoal via-transparent to-kalka-charcoal/40 z-10"></div>
        <img
          src="/hero.jpg"
          alt="Emergency Tow Truck on Highway"
          className="w-full h-full object-cover opacity-50 scale-105 animate-[pulse_10s_ease-in-out_infinite] grayscale" 
          style={{ animationDuration: '30s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 flex flex-col items-center text-center">
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-4 tracking-tight">
          STUCK ON <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-kalka-red to-orange-500">THE ROAD?</span>
        </h1>
        
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium text-sm tracking-wide">
          <span className="w-2 h-2 rounded-full bg-kalka-red animate-pulse"></span>
          24×7 Emergency Recovery Service
        </div>
        
        <p className="mt-4 max-w-xl mx-auto text-lg sm:text-xl text-gray-300 font-light leading-relaxed mb-10">
          Professional crane and towing service in Mayapuri. <br className="hidden sm:block" /> 
          <span className="text-white font-medium">Fast arrival, damage-free handling, fair prices.</span>
        </p>
        
        {/* RSA Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-kalka-red/20 to-orange-500/20 backdrop-blur-sm border border-white/20 text-white font-bold text-sm tracking-wide">
          <span className="text-kalka-red">✓</span>
          <span>Reputed RSA (Road Side Assistance) Partner</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <a
            href="tel:+919212225577"
            className="group relative flex items-center justify-center bg-kalka-red text-white text-lg font-bold px-8 py-4 rounded-xl shadow-glow transition-all hover:bg-red-700 hover:scale-[1.02]"
          >
            <Phone className="w-5 h-5 mr-3 animate-wiggle" />
            <span>CALL NOW</span>
            <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </a>
          
          <a
            href="https://wa.me/919212225577"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all hover:scale-[1.02]"
          >
            <svg className="w-6 h-6 mr-3" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Floating Quick Stats - Desktop Only */}
        <div className="hidden md:block mt-16 mb-8 relative z-30">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl px-10 py-8 border-2 border-white/30 shadow-2xl">
            <div className="flex gap-8 lg:gap-12 justify-center items-center">
              <div className="flex-1 text-center">
                <p className="text-5xl lg:text-6xl font-black text-white leading-none mb-3 drop-shadow-2xl">
                  15<span className="text-kalka-red text-3xl lg:text-4xl font-bold">min</span>
                </p>
                <p className="text-sm text-gray-200 uppercase tracking-wider font-bold">Avg. Arrival</p>
              </div>
              
              <div className="w-px h-16 bg-white/30"></div>
              
              <div className="flex-1 text-center">
                <p className="text-5xl lg:text-6xl font-black text-white leading-none mb-3 drop-shadow-2xl">
                  20<span className="text-kalka-red text-3xl lg:text-4xl font-bold">+</span>
                </p>
                <p className="text-sm text-gray-200 uppercase tracking-wider font-bold">Years Exp.</p>
              </div>
              
              <div className="w-px h-16 bg-white/30"></div>
              
              <div className="flex-1 text-center">
                <p className="text-5xl lg:text-6xl font-black text-white leading-none mb-3 drop-shadow-2xl">
                  24<span className="text-kalka-red text-3xl lg:text-4xl font-bold">/7</span>
                </p>
                <p className="text-sm text-gray-200 uppercase tracking-wider font-bold">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;