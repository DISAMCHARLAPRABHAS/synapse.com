import { useEffect } from 'react';
import Chart from 'chart.js/auto';

function Infographic() {
  useEffect(() => {
    const initCharts = () => {
      const wrapLabels = (label: string | string[]) => {
        if (Array.isArray(label)) return label;
        if (label.length <= 16) return label;
        const words = label.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        for (const word of words) {
          if ((currentLine + ' ' + word).trim().length > 16) {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = (currentLine + ' ' + word).trim();
          }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
      };

      const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#222222',
              font: { family: 'Inter' }
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#222222', font: { family: 'Inter' } },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#222222', font: { family: 'Inter' } },
            grid: { color: '#DDDDDD' }
          },
          r: {
            angleLines: { color: '#DDDDDD' },
            grid: { color: '#DDDDDD' },
            pointLabels: {
              color: '#222222',
              font: { family: 'Inter', size: 13 }
            },
            ticks: {
              backdropColor: 'rgba(0,0,0,0)',
              color: '#555555'
            }
          }
        }
      };

      // Journey Compression Chart
      const journeyCanvas = document.getElementById('journeyCompressionChart') as HTMLCanvasElement;
      if (journeyCanvas) {
        new Chart(journeyCanvas, {
          type: 'doughnut',
          data: {
            labels: ['Friction Steps Eliminated', 'Conversational Steps'],
            datasets: [{
              label: 'Customer Journey Steps',
              data: [90, 10],
              backgroundColor: ['#4ECDC4', '#45B7D1'],
              borderColor: '#F7FFF7',
              borderWidth: 4
            }]
          },
          options: { ...chartOptions, cutout: '70%' }
        });
      }

      // AI Capabilities Radar Chart
      const capabilitiesCanvas = document.getElementById('aiCapabilitiesChart') as HTMLCanvasElement;
      if (capabilitiesCanvas) {
        new Chart(capabilitiesCanvas, {
          type: 'radar',
          data: {
            labels: ['Context Awareness', 'Sentiment Analysis', ['Recommendation', 'Accuracy'], 'Transaction Security', 'Speed'],
            datasets: [{
              label: 'AI Agent Score (out of 10)',
              data: [9, 8, 9, 10, 8],
              backgroundColor: 'rgba(69, 183, 209, 0.2)',
              borderColor: '#45B7D1',
              pointBackgroundColor: '#45B7D1',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#45B7D1',
              borderWidth: 2
            }]
          },
          options: chartOptions
        });
      }

      // Conversion Chart
      const conversionCanvas = document.getElementById('conversionChart') as HTMLCanvasElement;
      if (conversionCanvas) {
        new Chart(conversionCanvas, {
          type: 'bar',
          data: {
            labels: ['Traditional E-commerce', 'Conversational AI'].map(wrapLabels),
            datasets: [{
              label: 'Average Conversion Rate (%)',
              data: [3.2, 28.5],
              backgroundColor: ['#FF6B6B', '#4ECDC4'],
              borderRadius: 4
            }]
          },
          options: { ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }
        });
      }

      // Satisfaction Chart
      const satisfactionCanvas = document.getElementById('satisfactionChart') as HTMLCanvasElement;
      if (satisfactionCanvas) {
        new Chart(satisfactionCanvas, {
          type: 'bar',
          data: {
            labels: ['Traditional Journey', 'AI-Powered Journey'].map(wrapLabels),
            datasets: [{
              label: 'Customer Satisfaction Score (CSAT %)',
              data: [45, 92],
              backgroundColor: ['#FF6B6B', '#4ECDC4'],
              borderRadius: 4
            }]
          },
          options: { ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }
        });
      }
    };

    setTimeout(initCharts, 0);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F7FAFC]">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#40E0D0] mb-2 drop-shadow-[1px_1px_0_black]">
            The Frictionless Future of Commerce
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            From fragmented searching to unified conversation: How AI is solving the core problem of online booking and shopping.
          </p>
        </div>

        {/* The Problem Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-6">The Problem: A Fragmented & High-Friction Journey</h3>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
            Today's users face a frustrating, multi-step process. They discover a need on one platform, research reviews on another, compare prices on a third, and finally, attempt to purchase on a fourth. This fragmentation leads to decision fatigue and high abandonment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-6xl font-bold text-[#FF6B6B] mb-3">70%</div>
              <div className="text-lg font-semibold mb-2">Cart Abandonment</div>
              <p className="text-sm text-gray-600">Users drop off due to complex checkout and unexpected friction.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-6xl font-bold text-[#FF6B6B] mb-3">5+</div>
              <div className="text-lg font-semibold mb-2">Sites Visited</div>
              <p className="text-sm text-gray-600">Average number of sources consulted before a single purchase.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-6xl font-bold text-[#FF6B6B] mb-3">45</div>
              <div className="text-lg font-semibold mb-2">Minutes</div>
              <p className="text-sm text-gray-600">Average time spent on research for a significant purchase.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h4 className="text-2xl font-semibold text-center mb-6">Today's Painful Process</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 flex-wrap">
              <div className="border-2 border-[#FF6B6B] bg-white p-4 rounded-lg text-center font-semibold max-w-xs">
                Need: "I need a new laptop"
              </div>
              <div className="text-3xl font-bold text-[#FF6B6B]">→</div>
              <div className="border-2 border-[#FF6B6B] bg-white p-4 rounded-lg text-center font-semibold max-w-xs">
                Step 1: Research blogs & reviews
              </div>
              <div className="text-3xl font-bold text-[#FF6B6B]">→</div>
              <div className="border-2 border-[#FF6B6B] bg-white p-4 rounded-lg text-center font-semibold max-w-xs">
                Step 2: Compare 3+ vendor sites
              </div>
              <div className="text-3xl font-bold text-[#FF6B6B]">→</div>
              <div className="border-2 border-[#FF6B6B] bg-white p-4 rounded-lg text-center font-semibold max-w-xs">
                Step 3: Manually checkout
              </div>
              <div className="text-4xl font-bold text-[#FF6B6B]">✗</div>
            </div>
          </div>
        </div>

        {/* The Solution Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-6">The Solution: A Unified Conversational Agent</h3>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
            A single AI-powered assistant compresses this entire journey. It understands user needs, provides trusted recommendations based on real-time data, and completes the transaction instantly within the conversation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h4 className="text-2xl font-semibold text-center mb-6">The New Streamlined Journey</h4>
              <div className="flex flex-col items-center gap-3">
                <div className="border-2 border-[#4ECDC4] bg-white p-4 rounded-lg text-center font-semibold max-w-sm w-full">
                  "I need the best laptop for coding under $1000"
                </div>
                <div className="text-3xl font-bold text-[#4ECDC4]">↓</div>
                <div className="border-2 border-[#4ECDC4] bg-white p-4 rounded-lg text-center font-semibold max-w-sm w-full">
                  AI: "Based on 5,000 reviews, Model X is best. Here's why. Shall I order it?"
                </div>
                <div className="text-3xl font-bold text-[#4ECDC4]">↓</div>
                <div className="border-2 border-[#4ECDC4] bg-white p-4 rounded-lg text-center font-semibold max-w-sm w-full">
                  "Yes, please."
                </div>
                <div className="text-3xl font-bold text-[#4ECDC4]">↓</div>
                <div className="bg-[#FFE66D] border-2 border-[#FFE66D] p-4 rounded-lg text-center font-bold max-w-sm w-full">
                  Purchase Complete.
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-center mb-6">Customer Journey Compression</h4>
              <div className="relative w-full h-72 bg-white rounded-xl shadow-md p-4">
                <canvas id="journeyCompressionChart"></canvas>
              </div>
              <p className="text-center mt-4 text-gray-600">
                The AI agent handles the research and checkout, eliminating over 90% of the manual steps and friction points for the user.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works: Core Technology */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-6">How It Works: Core Technology</h3>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
            This isn't just a chatbot. It's a deeply integrated system powered by three key components: Natural Language Understanding, Data Aggregation, and Vendor Integration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h4 className="text-2xl font-semibold text-center mb-6">AI Agent Capabilities</h4>
              <div className="relative w-full h-72 bg-white rounded-xl shadow-md p-4">
                <canvas id="aiCapabilitiesChart"></canvas>
              </div>
              <p className="text-center mt-4 text-gray-600">
                The AI excels at understanding context and sentiment, providing accurate recommendations, and executing secure, fast transactions.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-center mb-6">System Architecture</h4>
              <div className="flex flex-col gap-3">
                <div className="border-2 border-[#4ECDC4] bg-white p-4 rounded-lg text-center font-semibold">
                  User Request
                </div>
                <div className="text-3xl font-bold text-[#4ECDC4] text-center">↓</div>
                <div className="border-4 border-[#45B7D1] bg-white p-4 rounded-lg text-center font-semibold text-lg">
                  NLU & Sentiment Engine
                </div>
                <div className="text-3xl font-bold text-[#4ECDC4] text-center">↓</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-[#4ECDC4] bg-white p-4 rounded-lg text-center font-semibold text-sm">
                    Data APIs (Reviews, Prices, Specs)
                  </div>
                  <div className="border-2 border-[#4ECDC4] bg-white p-4 rounded-lg text-center font-semibold text-sm">
                    Vendor APIs (Booking, Ordering, Payment)
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#4ECDC4] text-center">↓</div>
                <div className="bg-[#FFE66D] border-2 border-[#FFE66D] p-4 rounded-lg text-center font-bold">
                  Action & Confirmation
                </div>
              </div>
              <p className="text-center mt-4 text-gray-600">
                The AI core (NLU) mediates between the user's request and the live data from partner APIs to provide a single, correct response.
              </p>
            </div>
          </div>
        </div>

        {/* The Impact Section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-6">The Impact: A Win-Win for Users & Business</h3>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
            By solving the core friction problem, the conversational agent delivers massive value to both customers (time, confidence) and businesses (conversion, loyalty).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h4 className="text-2xl font-semibold text-center mb-6">Conversion Rate Uplift</h4>
              <div className="relative w-full h-72 bg-white rounded-xl shadow-md p-4">
                <canvas id="conversionChart"></canvas>
              </div>
              <p className="text-center mt-4 text-gray-600">
                By eliminating friction at the point of high intent, conversational agents can dramatically increase the likelihood of a completed purchase.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-center mb-6">Customer Satisfaction</h4>
              <div className="relative w-full h-72 bg-white rounded-xl shadow-md p-4">
                <canvas id="satisfactionChart"></canvas>
              </div>
              <p className="text-center mt-4 text-gray-600">
                Users report extreme satisfaction with a process that saves them time and provides a confident, simple, and successful outcome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Infographic;
