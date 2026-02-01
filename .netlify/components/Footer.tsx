import React from 'react';
import { Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-kalka-charcoal text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex flex-col mb-6">
              <span className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Kalka</span>
              <span className="text-xs font-bold text-kalka-red tracking-[0.3em] uppercase mt-1">Crane Service</span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              Your trusted partner for 24x7 emergency recovery. Fast, reliable, and safe towing services when you need them most.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                 <a key={index} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-kalka-red hover:text-white transition-all duration-300">
                    <Icon className="w-4 h-4" />
                 </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Why Us', path: '/why-us' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                    <Link to={item.path} className="text-gray-400 hover:text-kalka-red transition-colors flex items-center group text-sm">
                        <ChevronRight className="w-3 h-3 mr-2 text-kalka-red opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item.name}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {['Car Recovery', 'Car Towing', 'Breakdown Assistance', 'Pan India Service'].map((item) => (
                 <li key={item} className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Emergency</h4>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">24/7 Hotline</p>
                <a href="tel:+919212225577" className="text-xl font-black text-white hover:text-kalka-red transition-colors block mb-2">+91 92122 25577</a>
                <a href="tel:+919899675125" className="text-xl font-black text-white hover:text-kalka-red transition-colors block mb-4">+91 98996 75125</a>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Base Location</p>
                <p className="text-white text-sm">D Block Mayapuri, New Delhi</p>
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kalka Crane Service. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;