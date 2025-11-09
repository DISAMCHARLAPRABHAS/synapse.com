import { Mail } from 'lucide-react';

function Fundraising() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-[#F7FAFC]">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-6">
          We're Growing!
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
          SynapseHub is currently fundraising to accelerate our growth and bring our AI-powered platform to more users. We are looking for partners who share our vision of a frictionless, intelligent future for commerce and travel.
        </p>
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-gray-100 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4">
            Interested in Joining Our Journey?
          </h2>
          <p className="text-gray-700 mb-8">
            If you are an investor and interested in learning more about our vision, team, and traction, we would love to talk.
          </p>
          <a
            href="mailto:investors@synapsehub.com?subject=Fundraising Inquiry - SynapseHub"
            className="inline-flex items-center justify-center bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}

export default Fundraising;
