import React from 'react';
import Footer from '../components/Footer';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="font-sans antialiased text-kalka-charcoal bg-white">
      <main className="min-h-screen pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black text-kalka-charcoal mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Last updated: {new Date().getFullYear()}
          </p>

          <div className="space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
            <p>
              These Terms of Service govern your use of Kalka Crane Service and any roadside assistance,
              towing, or related services we provide.
            </p>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Service Scope
              </h2>
              <p>
                We provide emergency recovery, towing, vehicle movement and related services as agreed at
                the time of booking. Actual response times and service availability may vary based on
                location, traffic, and external conditions.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Customer Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide accurate location and contact details.</li>
                <li>Ensure it is safe for our team to operate at the breakdown or accident site.</li>
                <li>Comply with local traffic and safety regulations during recovery.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Pricing &amp; Payment
              </h2>
              <p>
                Estimates shared over phone or WhatsApp are indicative. Final charges may depend on actual
                distance, vehicle condition, equipment required, and waiting time. All charges will be
                communicated transparently before service confirmation whenever possible.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Liability
              </h2>
              <p>
                While our team takes utmost care and uses professional equipment, certain risks may be
                beyond our control. Our liability is limited to the extent permitted by applicable law and
                any written service agreement, if applicable.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Third‑Party RSA Partners
              </h2>
              <p>
                In some cases, we may operate under or alongside reputed RSA (Road Side Assistance) and
                insurance partners. Additional terms from those partners may apply and should be reviewed
                separately.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Changes to Terms
              </h2>
              <p>
                We may update these Terms from time to time. Continued use of our services after changes
                are published will be treated as acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-kalka-charcoal mb-2">
                Contact
              </h2>
              <p>
                For any questions about these Terms, you can reach us at{' '}
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

export default TermsOfServicePage;


