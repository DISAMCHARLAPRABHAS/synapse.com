import { AlertCircle } from 'lucide-react';

function Problem() {
  const problems = [
    "Users have to switch between multiple apps just to plan or book something.",
    "Extra fees, commissions, and hidden costs make everything more expensive.",
    "There's no single place to compare prices across categories like travel, movies, or shopping.",
    "Current apps don't offer personalized or AI-based suggestions — users do all the searching manually.",
    "Even after finding a deal, users often don't know if it's truly the best option."
  ];

  return (
    <section id="problem" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            The Problem We See
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            In today's fast-moving world, people use <span className="font-semibold">too many different apps</span> for simple tasks like booking tickets, comparing prices, shopping online, or finding the best deals.
            This creates frustration, confusion, and wasted time.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] border-l-4 border-[#FF6B6B] p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-[#1A202C] mb-8">Here's what's broken:</h3>
          <ul className="space-y-4">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-[#FF6B6B] flex-shrink-0 mt-1" />
                <span className="text-gray-700 leading-relaxed">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Problem;
