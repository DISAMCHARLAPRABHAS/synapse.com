function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#F7FAFC] to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <img src="/logo1.svg" alt="SynapseHub Logo" className="h-24 w-24 mx-auto mb-6" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#1A202C] mb-6 leading-tight">
            Your Intelligent Hub for<br />
            <span className="text-[#40E0D0]">Smart Bookings</span> and<br />
            AI-Powered Decisions
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl">
            Simplify how you book, compare, and save — powered by AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#40E0D0] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Get Started
            </button>
            <button className="bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
