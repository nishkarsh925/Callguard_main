import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceArea from '../components/ServiceArea';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="font-sans antialiased text-kalka-charcoal bg-white">
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

