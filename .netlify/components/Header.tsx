import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Determine if header should be transparent (only on home page)
  const isHomePage = location.pathname === '/';
  const shouldBeTransparent = isHomePage && !isScrolled && !isOpen;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        shouldBeTransparent
          ? 'bg-transparent py-5' 
          : 'bg-white/90 backdrop-blur-md shadow-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo className={`w-16 h-16 sm:w-20 sm:h-20 transition-transform group-hover:scale-105 ${shouldBeTransparent ? '' : ''}`} />
              <div className="flex flex-col">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight uppercase leading-none transition-colors ${shouldBeTransparent ? 'text-white' : 'text-kalka-red'}`}>
                  Kalka
                </span>
                <span className={`text-xs sm:text-sm font-bold tracking-[0.2em] uppercase leading-none mt-1 transition-colors ${shouldBeTransparent ? 'text-gray-200' : 'text-kalka-charcoal'}`}>
                  Crane Service
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-kalka-red ${
                  shouldBeTransparent ? 'text-white/90 hover:text-white' : 'text-kalka-charcoal'
                } ${location.pathname === link.href ? 'text-kalka-red' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+919212225577"
              className="bg-kalka-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center transition-all shadow-lg shadow-kalka-red/30 hover:shadow-kalka-red/50 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 mr-2" />
              +91 92122 25577
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none p-2 rounded-lg transition-colors ${
                shouldBeTransparent ? 'text-white hover:bg-white/10' : 'text-kalka-charcoal hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out origin-top transform ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
        }`}
      >
        <div className="px-6 py-6 space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold transition-colors w-full text-center py-2 border-b border-gray-50 last:border-0 ${
                location.pathname === link.href ? 'text-kalka-red' : 'text-kalka-charcoal hover:text-kalka-red'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+919212225577"
            className="w-full text-center bg-kalka-red text-white py-4 rounded-xl font-bold shadow-lg flex justify-center items-center mt-4"
          >
            <Phone className="w-5 h-5 mr-2" />
            Emergency Call
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;