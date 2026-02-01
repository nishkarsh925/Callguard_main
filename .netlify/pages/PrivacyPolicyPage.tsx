import React from 'react';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="font-sans antialiased text-kalka-charcoal bg-white">
      <main className="min-h-screen pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black text-kalka-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Last updated: {new Date().getFullYear()}
          </p>

          <div className="space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
            <p>
              At Kalka Crane Service, we respect your privacy. This Privacy Policy explains how we collect,
              use, and protect your personal information when you contact us or use our services.
            </p>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Information We Collect
              </h2>
              <p>
                We may collect your name, phone number, location details, and any additional information you
                share while requesting service or submitting our contact form.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To respond to your enquiries and provide roadside assistance or towing services.</li>
                <li>To coordinate with our drivers and partners for timely service delivery.</li>
                <li>To improve our operations and customer experience.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Data Sharing
              </h2>
              <p>
                We do not sell your data. We may share necessary details only with trusted partners or RSA
                companies involved in fulfilling your service request, and only for operational purposes.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Data Security
              </h2>
              <p>
                We take reasonable measures to protect your information from unauthorized access, alteration,
                or disclosure. However, no online or phone-based transmission is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Your Choices
              </h2>
              <p>
                You may contact us to update or request deletion of your personal information, subject to any
                legal obligations we may have to retain certain records.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Contact
              </h2>
              <p>
                For any privacy questions, you can reach us at{' '}
                <a
                  href="mailto:kalkacraneservice@gmail.com"
                  className="text-kalka-red font-semibold"
                >
                  kalkacraneservice@gmail.com
                </a>{' '}
                or call us at{' '}
                <a
                  href="tel:+919212225577"
                  className="text-kalka-red font-semibold"
                >
                  +91 92122 25577
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;


