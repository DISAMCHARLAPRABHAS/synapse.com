import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DetailedHowItWorks from './components/DetailedHowItWorks';
import Testimonials from './components/Testimonials';
import Infographic from './components/Infographic';
import AIDemo from './components/AIDemo';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import Chatbot from './components/Chatbot';
// Import new pages
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Contact from './components/Contact';
import Careers from './components/Careers';

type Page = 'home' | 'terms' | 'privacy' | 'contact' | 'careers';

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      case 'contact':
        return <Contact />;
      case 'careers':
        return <Careers />;
      case 'home':
      default:
        return (
          <>
            <Hero onGetStartedClick={() => setIsWaitlistOpen(true)} />
            <Problem />
            <Solution />
            <Features />
            <HowItWorks />
            <DetailedHowItWorks />
            <Testimonials />
            <Infographic />
            <AIDemo />
            <CTA />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onGetStartedClick={() => setIsWaitlistOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      
      {/* Render the current page */}
      {renderPage()}

      <Footer onNavigate={handleNavigate} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <Chatbot />
    </div>
  );
}

export default App;
