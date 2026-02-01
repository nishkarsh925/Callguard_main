import React from 'react';
import { Clock, ShieldCheck, BadgeCheck, Zap, DollarSign, Users, CheckCircle2 } from 'lucide-react';
import { FeatureItem } from '../types';

const features: (FeatureItem & { icon: React.ElementType })[] = [
  {
    id: '1',
    title: '24×7 Availability',
    description: 'Day or night, rain or shine, our team is always ready.',
    icon: Clock,
  },
  {
    id: '2',
    title: '15 Min Response',
    description: 'One of the quickest arrival times in the region.',
    icon: Zap,
  },
  {
    id: '3',
    title: 'Expert Team',
    description: 'Certified operators handling complex recoveries.',
    icon: Users,
  },
  {
    id: '4',
    title: 'Zero Damage',
    description: 'Advanced equipment ensuring vehicle safety.',
    icon: ShieldCheck,
  },
  {
    id: '5',
    title: 'Fair Pricing',
    description: 'Transparent quotes with no hidden charges.',
    icon: DollarSign,
  },
  {
    id: '6',
    title: 'Trusted Brand',
    description: 'Verified by hundreds of satisfied customers.',
    icon: BadgeCheck,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block py-1 px-3 rounded-md bg-red-50 text-kalka-red font-bold text-xs tracking-wider uppercase mb-4">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-kalka-charcoal mb-6 leading-tight">
              We Don't Just Tow.<br/>We <span className="text-kalka-red relative inline-block">Rescue.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed font-light">
              When you are stranded, you need more than a tow truck; you need a partner you can trust. 
              Our commitment to safety, speed, and professionalism makes us the preferred choice.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {features.map((feature) => (
                <div key={feature.id} className="flex">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-12 h-12 rounded-2xl bg-kalka-lightGrey flex items-center justify-center text-kalka-red shadow-sm group-hover:bg-kalka-red group-hover:text-white transition-colors">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-kalka-charcoal">{feature.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 leading-snug">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5] transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
               <img 
                 src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&q=80&auto=format" 
                 alt="Professional Crane Service" 
                 className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700 grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               
               <div className="absolute bottom-8 left-8 right-8 text-white">
                 <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-kalka-red fill-current bg-white rounded-full w-8 h-8 p-1" />
                    <span className="font-bold text-lg">Fully Insured</span>
                 </div>
                 <p className="text-gray-300 text-sm">We treat your vehicle like our own.</p>
               </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-float">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=11" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=12" alt="User" />
                        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=13" alt="User" />
                    </div>
                    <div className="text-sm">
                        <p className="font-bold text-kalka-charcoal">500+ Clients</p>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 italic">"Fastest service I've ever experienced!"</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;