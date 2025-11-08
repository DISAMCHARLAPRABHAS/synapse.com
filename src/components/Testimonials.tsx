import { Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frequent Traveler",
      text: "SynapseHub saved me hours of research. The AI found me a perfect hotel deal that I would have never discovered on my own.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Professional",
      text: "The smart comparison feature is a game-changer. I trust SynapseHub to find the best options for all my business trips.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Budget Traveler",
      text: "No hidden fees, transparent pricing, and amazing deals. This platform has become my go-to for all bookings.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600">
            See what our users are saying about SynapseHub
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF6B6B] text-[#FF6B6B]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#40E0D0] to-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-[#1A202C]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
