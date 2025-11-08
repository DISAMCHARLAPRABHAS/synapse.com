import { Bot, Lightbulb, DollarSign } from 'lucide-react';

function Features() {
  const features = [
    {
      icon: <Bot className="w-12 h-12 text-[#40E0D0]" />,
      title: "AI Booking Assistant",
      description: "Book faster with personalized AI help that understands your preferences and finds the perfect options."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-[#40E0D0]" />,
      title: "Smart Comparisons",
      description: "Find the best deals effortlessly with intelligent comparison tools that analyze thousands of options."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-[#40E0D0]" />,
      title: "No Hidden Fees",
      description: "Transparent, secure, and simple pricing. What you see is what you get, every single time."
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Why Choose SynapseHub?
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed to make your booking experience seamless
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1A202C] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
