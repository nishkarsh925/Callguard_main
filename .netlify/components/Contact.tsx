import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, ArrowRight } from 'lucide-react';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    location: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
        alert("Request Sent! Our team will contact you shortly.");
        setFormData({ name: '', phone: '', location: '', message: '' });
        setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-kalka-lightGrey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Contact Info Side */}
          <div className="bg-kalka-charcoal relative p-10 lg:p-14 lg:w-2/5 text-white flex flex-col justify-between overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-kalka-red/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl font-black mb-2">Get In Touch</h2>
                <p className="text-gray-400 mb-10 text-sm">We are here to help 24/7. Reach out now.</p>
                
                <div className="space-y-8">
                    <div className="flex items-start group cursor-pointer">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-5 group-hover:bg-kalka-red transition-colors duration-300">
                             <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Emergency Phone</p>
                            <a href="tel:+919212225577" className="text-xl font-bold hover:text-kalka-red transition-colors block">+91 92122 25577</a>
                            <a href="tel:+919899675125" className="text-xl font-bold hover:text-kalka-red transition-colors block mt-2">+91 98996 75125</a>
                        </div>
                    </div>
                    
                    <div className="flex items-start group">
                         <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-5 group-hover:bg-kalka-red transition-colors duration-300">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Headquarters</p>
                            <p className="text-lg font-medium">D Block Mayapuri,<br/>New Delhi</p>
                        </div>
                    </div>

                    <div className="flex items-start group cursor-pointer">
                         <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-5 group-hover:bg-kalka-red transition-colors duration-300">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Email</p>
                            <a href="mailto:kalkacraneservice@gmail.com" className="text-lg font-medium hover:text-kalka-red transition-colors">kalkacraneservice@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-12">
               <div className="flex gap-4">
                  {/* Social Icons Placeholder */}
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10 lg:p-14 lg:w-3/5 bg-white">
            <h3 className="text-2xl font-bold text-kalka-charcoal mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="peer w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-kalka-red/20 focus:ring-4 focus:ring-kalka-red/10 outline-none transition-all placeholder-transparent font-medium text-gray-800"
                            placeholder="Full Name"
                        />
                        <label htmlFor="name" className="absolute left-4 -top-2.5 bg-white px-2 text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-kalka-red">
                            Full Name
                        </label>
                    </div>
                    <div className="relative group">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="peer w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-kalka-red/20 focus:ring-4 focus:ring-kalka-red/10 outline-none transition-all placeholder-transparent font-medium text-gray-800"
                            placeholder="Phone Number"
                        />
                         <label htmlFor="phone" className="absolute left-4 -top-2.5 bg-white px-2 text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-kalka-red">
                            Phone Number
                        </label>
                    </div>
                </div>

                <div className="relative group">
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="peer w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-kalka-red/20 focus:ring-4 focus:ring-kalka-red/10 outline-none transition-all placeholder-transparent font-medium text-gray-800"
                        placeholder="Location"
                    />
                    <label htmlFor="location" className="absolute left-4 -top-2.5 bg-white px-2 text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-kalka-red">
                        Current Location (Optional)
                    </label>
                </div>

                <div className="relative group">
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="peer w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-kalka-red/20 focus:ring-4 focus:ring-kalka-red/10 outline-none transition-all placeholder-transparent resize-none font-medium text-gray-800"
                        placeholder="Message"
                    ></textarea>
                    <label htmlFor="message" className="absolute left-4 -top-2.5 bg-white px-2 text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-kalka-red">
                        How can we help?
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-kalka-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSubmitting ? 'Sending...' : (
                        <>
                            SEND REQUEST <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;