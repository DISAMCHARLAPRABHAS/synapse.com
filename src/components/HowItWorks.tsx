import { MessageCircle, GitCompare, CheckCircle } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: <MessageCircle className="w-16 h-16 text-[#40E0D0]" />,
      title: "Chat",
      description: "Tell our AI assistant what you're looking for in natural conversation"
    },
    {
      icon: <GitCompare className="w-16 h-16 text-[#40E0D0]" />,
      title: "Compare",
      description: "Review intelligent recommendations tailored to your preferences and budget"
    },
    {
      icon: <CheckCircle className="w-16 h-16 text-[#40E0D0]" />,
      title: "Confirm",
      description: "Book with confidence knowing you got the best deal available"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F7FAFC]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to your perfect booking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <div className="absolute -top-4 -left-4 bg-[#40E0D0] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-[#1A202C] mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
