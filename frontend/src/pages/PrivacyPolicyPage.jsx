import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'information',
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us for support. This includes:

• **Personal identifiers**: Name, email address, postal address, phone number
• **Payment information**: Credit card details (processed securely via our payment partners; we do not store full card numbers)
• **Account credentials**: Username and encrypted password
• **Purchase history**: Products ordered, sizes, colours, delivery preferences
• **Communications**: Messages you send us via email or our contact form

We also collect certain information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited.`,
  },
  {
    id: 'use',
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Process and fulfil your orders, including sending confirmations and shipping updates
• Manage your account and provide customer support
• Send you transactional emails and, where you have opted in, marketing communications about new collections, exclusive offers, and events
• Personalise your experience on our platform
• Detect and prevent fraudulent transactions and other illegal activities
• Comply with legal obligations and enforce our Terms of Service
• Improve our website, products, and services through analytics`,
  },
  {
    id: 'sharing',
    title: '3. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties for their own marketing purposes. We may share your information with:

• **Service providers**: Trusted partners who assist us in operating our website, processing payments (e.g., Stripe), fulfilling orders, and delivering emails — bound by confidentiality agreements
• **Logistics partners**: Courier services to fulfil and deliver your orders
• **Legal authorities**: Where required by law, court order, or governmental regulation
• **Business transfers**: In connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset

All third-party partners are required to maintain the confidentiality and security of your information.`,
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking',
    content: `We use cookies and similar tracking technologies to enhance your browsing experience. Our cookies fall into three categories:

• **Essential cookies**: Required for the website to function (session management, cart contents)
• **Analytics cookies**: Help us understand how visitors interact with our site (e.g., Google Analytics — data is anonymised)
• **Marketing cookies**: Used to deliver relevant advertisements and measure campaign effectiveness

You can control cookie preferences through your browser settings or our cookie consent manager. Disabling certain cookies may affect website functionality.`,
  },
  {
    id: 'security',
    title: '5. Data Security',
    content: `We implement industry-standard security measures to protect your personal information:

• All data transmitted to and from our website is encrypted using TLS (Transport Layer Security)
• Payment information is processed through PCI-DSS compliant payment gateways
• Access to personal data is restricted to authorised personnel only
• We conduct regular security audits and vulnerability assessments

While we take every precaution, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to use strong, unique passwords and to notify us immediately if you suspect unauthorised access to your account.`,
  },
  {
    id: 'rights',
    title: '6. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• **Access**: Request a copy of the personal information we hold about you
• **Rectification**: Request correction of inaccurate or incomplete data
• **Erasure**: Request deletion of your personal data (subject to legal obligations)
• **Portability**: Request transfer of your data to another service provider
• **Objection**: Object to processing of your data for marketing purposes
• **Restriction**: Request restriction of processing under certain circumstances

To exercise any of these rights, please contact our Data Protection Officer at privacy@theatelier.com. We will respond to all legitimate requests within 30 days.`,
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Specifically:

• Account data is retained for the duration of your account plus 2 years following closure
• Transaction records are retained for 7 years to comply with financial regulations
• Marketing preferences are retained until you unsubscribe or request deletion
• Cookie data is retained for no longer than 13 months

When data is no longer required, we securely destroy or anonymise it.`,
  },
  {
    id: 'changes',
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:

• Update the "Last Updated" date at the top of this page
• Notify registered account holders via email
• Display a prominent notice on our website for 30 days

Your continued use of our services after the effective date of any changes constitutes your acceptance of the revised policy. We encourage you to review this policy periodically.`,
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

• **Email**: privacy@theatelier.com
• **Post**: Data Protection Officer, THE ATELIER, 1 Mayfair Row, London W1K 1AA, United Kingdom
• **Phone**: +44 20 7946 0123 (Mon–Fri, 9am–6pm GMT)

If you are not satisfied with our response, you have the right to lodge a complaint with your local data protection authority. In the UK, this is the Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
];

const PrivacyPolicyPage = () => {
  const [active, setActive] = useState('information');

  return (
    <div className="bg-surface min-h-screen pt-24">
      {/* ── Header ── */}
      <div className="bg-primary text-on-primary py-24 px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <span className="text-xs font-label uppercase tracking-[0.3em] text-primary-fixed-dim mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-headline font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-primary-fixed-dim font-body max-w-2xl leading-relaxed">
            At THE ATELIER, your trust is the foundation of everything we do. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-primary-fixed-dim/60 text-xs font-label uppercase tracking-widest mt-8">
            Last Updated: 1 January 2024
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* ── Sticky Table of Contents ── */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h2 className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-6">
                Contents
              </h2>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActive(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`block w-full text-left py-2 text-sm font-body transition-all border-l-2 pl-4 ${
                      active === s.id
                        ? 'text-secondary border-secondary font-medium'
                        : 'text-on-surface-variant border-transparent hover:text-primary hover:border-outline-variant'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>

              <div className="mt-10 pt-10 border-t border-outline-variant/20">
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Questions about your data?
                </p>
                <Link
                  to="/contact"
                  className="text-secondary text-xs font-label uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 group"
                >
                  Contact Us
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Policy Content ── */}
          <div className="flex-grow max-w-3xl">
            {/* Intro */}
            <div className="mb-16 pb-16 border-b border-outline-variant/20">
              <p className="text-on-surface-variant text-lg leading-relaxed">
                This Privacy Policy governs the collection, use, and disclosure of personal information when you use THE ATELIER's website, mobile application, and services. By accessing our platform, you agree to the practices described herein.
              </p>
              <div className="mt-8 p-6 bg-surface-container-low border-l-2 border-secondary">
                <p className="text-sm text-on-surface-variant leading-relaxed italic">
                  "We believe privacy is a fundamental right. Every piece of data you share with us is treated with the same care and respect we apply to each garment that leaves our atelier."
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-16">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32"
                  onMouseEnter={() => setActive(section.id)}
                >
                  <h2 className="text-2xl font-headline font-bold mb-6 text-primary">{section.title}</h2>
                  <div className="text-on-surface-variant leading-relaxed space-y-4">
                    {section.content.split('\n\n').map((para, i) => (
                      <p key={i} className="text-base">
                        {para.split('\n').map((line, j) => (
                          <span key={j}>
                            {line.startsWith('• ') ? (
                              <span className="flex items-start gap-2 mb-1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span dangerouslySetInnerHTML={{
                                  __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-on-surface font-medium">$1</strong>')
                                }} />
                              </span>
                            ) : (
                              <span dangerouslySetInnerHTML={{
                                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-on-surface font-medium">$1</strong>')
                              }} />
                            )}
                            {j < para.split('\n').length - 1 && !line.startsWith('• ') && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 h-px bg-outline-variant/15" />
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-16 p-8 bg-surface-container-low text-center">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">
                Governing Law
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                This policy is governed by the laws of England and Wales. THE ATELIER complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
