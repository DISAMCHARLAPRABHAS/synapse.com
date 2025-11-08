import { MessageCircle, Zap, CheckCircle, Rocket } from 'lucide-react';

function DetailedHowItWorks() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            How SynapseHub Works
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-4">
            We're reimagining how people make decisions online — from bookings to buying.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            With SynapseHub, you won't need to jump between apps or compare endless tabs. Everything happens in three simple steps
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="bg-gradient-to-r from-[#F0FFFE] to-white p-8 rounded-2xl border border-[#40E0D0]">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#40E0D0] rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  1️⃣
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-3xl font-bold text-[#1A202C] mb-4">Ask Synapse</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Just tell us what you need — by typing or talking.
                </p>
                <div className="bg-white p-6 rounded-xl mb-4 border border-gray-200">
                  <p className="text-gray-600 font-semibold mb-3">Examples:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-[#40E0D0]">✓</span>
                      <span>"Book a flight from Chennai to Bangalore next Friday."</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#40E0D0]">✓</span>
                      <span>"Find the best laptop under ₹50,000."</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#40E0D0]">✓</span>
                      <span>"Get me two movie tickets for Saturday night."</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  <MessageCircle className="inline w-5 h-5 mr-2 text-[#40E0D0]" />
                  <span className="font-semibold">AI-powered chat or voice interface</span> understands your needs instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-r from-[#F0FFFE] to-white p-8 rounded-2xl border border-[#40E0D0]">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#40E0D0] rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  2️⃣
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-3xl font-bold text-[#1A202C] mb-4">Compare Smartly</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  SynapseHub's AI searches across trusted apps and platforms to bring you the best options in seconds.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  You'll see clear comparisons — prices, ratings, features, and availability — all in one clean view.
                </p>
                <p className="text-gray-600">
                  <Zap className="inline w-5 h-5 mr-2 text-[#40E0D0]" />
                  <span className="font-semibold">No ads. No bias.</span> Just smart recommendations that save time and money.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-r from-[#F0FFFE] to-white p-8 rounded-2xl border border-[#40E0D0]">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-[#40E0D0] rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  3️⃣
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-3xl font-bold text-[#1A202C] mb-4">Confirm & Go</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Once you've found the best deal, confirm your booking or purchase — right inside SynapseHub.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We handle everything from checkout to confirmation, securely and transparently.
                </p>
                <p className="text-gray-600">
                  <CheckCircle className="inline w-5 h-5 mr-2 text-[#40E0D0]" />
                  <span className="font-semibold">No extra fees. No hidden costs.</span> Just simplicity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-16 bg-gradient-to-r from-[#40E0D0] to-[#2BC4BC] p-12 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Rocket className="w-16 h-16 flex-shrink-0" />
            <div>
              <h3 className="text-3xl font-bold mb-4">The Future Vision</h3>
              <p className="text-lg leading-relaxed">
                SynapseHub will evolve into your personal AI lifestyle companion — helping you book, compare, shop, and plan smarter every day. We're currently building the foundation — and soon, you'll be able to experience it firsthand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailedHowItWorks;
