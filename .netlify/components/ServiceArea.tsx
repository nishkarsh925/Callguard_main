import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const ServiceArea: React.FC = () => {
  return (
    <section className="py-24 bg-kalka-charcoal text-white text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Service Area</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg font-light">
          Strategically positioned in D Block Mayapuri to serve Delhi NCR and Pan India regions.
        </p>

        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-700 h-[400px] md:h-[500px] group">
             {/* Google Maps Embed */}
             <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56023.52479263402!2d77.06008029928017!3d28.645633678572445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0364eee5370b%3A0xd2296e79f0008229!2sMayapuri%20d%20block!5e0!3m2!1sen!2sin!4v1765988999403!5m2!1sen!2sin"
               width="100%"
               height="100%"
               style={{ border: 0 }}
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0"
             />
             
             {/* Overlay with Location Marker */}
             <div className="absolute inset-0 bg-gradient-to-t from-kalka-charcoal/60 via-transparent to-transparent pointer-events-none"></div>
             
             {/* Map UI Elements */}
             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
                <div className="relative">
                    <div className="absolute -inset-4 bg-kalka-red/20 rounded-full animate-ping"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-kalka-red to-red-700 rounded-full flex items-center justify-center shadow-glow relative z-10">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                </div>
                
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white drop-shadow-lg">D Block Mayapuri</h3>
                <div className="flex items-center gap-2 mt-2 text-red-300 bg-red-900/40 px-4 py-1 rounded-full border border-red-800/50 backdrop-blur-sm">
                    <Navigation className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Pan India Coverage</span>
                </div>
             </div>
             
             {/* Decorative Grid Lines */}
             <div className="absolute inset-0 border-2 border-white/5 rounded-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;