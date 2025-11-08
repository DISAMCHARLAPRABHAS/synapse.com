import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DetailedHowItWorks from './components/DetailedHowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <DetailedHowItWorks />
  
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
