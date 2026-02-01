import React from 'react';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage: React.FC = () => {
  return (
    <div className="font-sans antialiased text-kalka-charcoal bg-white">
      <main>
        {/* Hero Section for Services Page */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-kalka-charcoal">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-kalka-charcoal via-kalka-charcoal/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-kalka-charcoal via-transparent to-kalka-charcoal/40 z-10"></div>
            <img
              src="https://picsum.photos/1920/1080?grayscale&blur=2"
              alt="Crane Services"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-kalka-red to-orange-500">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional crane and recovery services tailored to your needs
            </p>
          </div>
        </section>
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

