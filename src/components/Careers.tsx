import { ArrowRight } from 'lucide-react';

function Careers() {
  const openPositions = [
    { title: 'Senior Frontend Engineer (React)', location: 'Remote / Bangalore' },
    { title: 'Lead AI/ML Engineer (NLP)', location: 'Bangalore' },
    { title: 'Product Manager - Conversational AI', location: 'Remote' },
    { title: 'UX/UI Designer', location: 'Bangalore' },
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-[#F7FAFC]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We are building the future of conversational commerce and AI-powered decision making. If you are passionate about technology and innovation, we'd love to have you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8">
            Open Positions
          </h2>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 divide-y divide-gray-100">
            {openPositions.map((job, index) => (
              <div key={index} className="p-6 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <h3 className="text-xl font-bold text-[#1A202C]">{job.title}</h3>
                  <p className="text-gray-600">{job.location}</p>
                </div>
                <button className="text-[#40E0D0] hover:text-[#2BC4BC]">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-[#1A202C] mb-4">
              Don't see your role?
            </h3>
            <p className="text-gray-600 mb-6">
              We are always looking for talented people. Send us your resume and tell us why you'd be a great fit.
            </p>
            <button className="bg-[#40E0D0] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              Email Your Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Careers;
