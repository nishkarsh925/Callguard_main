import React from 'react';
import { Car, Truck, Wrench, Anchor, ChevronRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Accident Recovery',
    description: 'Immediate response for accidental car recovery with specialized equipment to prevent further damage.',
    icon: Car,
  },
  {
    id: '2',
    title: 'Car Towing',
    description: 'Professional car towing services for all vehicle types with safe and secure transportation.',
    icon: Anchor,
  },
  {
    id: '3',
    title: 'Breakdown Assist',
    description: 'On-spot battery jumpstart, tyre change, and minor mechanical support to get you moving.',
    icon: Wrench,
  },
  {
    id: '4',
    title: 'Heavy Vehicle Pickup',
    description: 'Expertise in handling buses, trucks, and heavy commercial vehicles stuck in difficult terrain.',
    icon: Truck,
  },
  {
    id: '5',
    title: 'Pan India Service',
    description: 'Nationwide shifting and transportation of imported cars with specialized handling and care.',
    icon: Globe,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-kalka-lightGrey relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-kalka-red font-bold tracking-widest uppercase text-xs mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-black text-kalka-charcoal leading-tight">
              Premium Recovery <br/>Services
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
            From light cars to heavy trucks, our fleet is equipped to handle any situation on the road with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-kalka-red/10 relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -mr-8 -mt-8 transition-colors group-hover:bg-kalka-red/5"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-kalka-red transition-colors duration-300 shadow-sm">
                  <service.icon className="w-7 h-7 text-kalka-red group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-kalka-charcoal mb-3 group-hover:text-kalka-red transition-colors">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-6">{service.description}</p>
                
                <Link 
                  to="/contact" 
                  className="flex items-center text-kalka-red font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  Book Now <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;