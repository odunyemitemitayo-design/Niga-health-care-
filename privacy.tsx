
import React from 'https://esm.sh/react@^19.2.3';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-40 pb-24 px-4 max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="bg-white p-12 md:p-20 rounded-[40px] border border-slate-100 shadow-2xl">
        <h1 className="text-5xl font-bold text-teal-950 tracking-tight serif-heading mb-12">Privacy Policy</h1>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-teal-900 serif-heading mb-4">1. Commitment to NDPR Compliance</h2>
            <p>
              NaijaHealth is strictly committed to the <strong>Nigeria Data Protection Regulation (NDPR)</strong>. We recognize the sensitive nature of healthcare information and implement bank-grade encryption (AES-256) for all patient data stored within our cloud infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-900 serif-heading mb-4">2. Data We Collect</h2>
            <p>
              To maintain the integrity of our review system, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>Contact details (Name, Email, Phone) for account verification.</li>
              <li>Facility interaction details (Wait times, Estimated costs paid).</li>
              <li>IP addresses for fraud prevention and to stop fake review campaigns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-900 serif-heading mb-4">3. Patient Confidentiality</h2>
            <p>
              While reviews are public, we encourage users to remain anonymous or use pseudonyms if they wish. We <strong>never</strong> sell your health interaction data to third-party pharmaceutical companies or insurance providers without explicit, informed consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-900 serif-heading mb-4">4. Your Rights</h2>
            <p>
              Under the NDPR, you have the right to request access to your data, correction of any inaccuracies, and the "right to be forgotten" (deletion of your profile and reviews).
            </p>
          </section>

          <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100 italic">
            <p className="text-teal-900 font-medium text-sm">Last updated: May 2024. For privacy inquiries, please reach out to dpo@naijahealth.reviews.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
