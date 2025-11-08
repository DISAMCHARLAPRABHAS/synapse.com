import { MessageSquare, Zap, DollarSign, TrendingUp, Bell, Users } from 'lucide-react';

function Solution() {
  const solutions = [
    {
      icon: <MessageSquare className="w-10 h-10 text-[#40E0D0]" />,
      title: "AI-Powered Chat & Voice Assistant",
      description: "Users can simply ask, 'Book me a train to Hyderabad' or 'Find me the best phone under ₹20,000.'"
    },
    {
      icon: <Zap className="w-10 h-10 text-[#40E0D0]" />,
      title: "Unified Platform",
      description: "One place for flights, trains, buses, hotels, movies, shopping, and more."
    },
    {
      icon: <DollarSign className="w-10 h-10 text-[#40E0D0]" />,
      title: "Transparent Pricing",
      description: "No hidden fees or commissions — just honest, real-time deals."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#40E0D0]" />,
      title: "Smart Comparisons",
      description: "Instantly compare options from different providers to find the best value."
    },
    {
      icon: <Bell className="w-10 h-10 text-[#40E0D0]" />,
      title: "Real-Time Alerts",
      description: "Notifications for discounts, price drops, and exclusive offers."
    },
    {
      icon: <Users className="w-10 h-10 text-[#40E0D0]" />,
      title: "Community & Group Deals",
      description: "Unlock group discounts by booking or buying together (Coming Soon)."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#F7FAFC] to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-6">
            How We're Going to Solve It
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            We're building <span className="font-semibold text-[#40E0D0]">SynapseHub</span> — a unified platform powered by <span className="font-semibold">AI</span> to simplify how people book, compare, and buy.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our vision is to make everyday digital actions effortless by combining the power of <span className="font-semibold">automation</span>, <span className="font-semibold">intelligence</span>, and <span className="font-semibold">integration</span>.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-[#1A202C] mb-10">
          Here's how SynapseHub will solve these problems:
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-4">
                {solution.icon}
              </div>
              <h4 className="text-xl font-bold text-[#1A202C] mb-3">
                {solution.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#40E0D0] to-[#2BC4BC] p-8 rounded-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Our Mission
          </h3>
          <p className="text-xl text-white/90">
            To build a <span className="font-semibold">smart, unified platform</span> that saves users time, money, and effort — by letting <span className="font-semibold">AI handle the hard part of decision-making.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Solution;
