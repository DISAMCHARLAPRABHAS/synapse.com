interface HeaderProps {
  onGetStartedClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

function Header({ onGetStartedClick, onNavigate, currentPage }: HeaderProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (currentPage === 'home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate('home');
    }
  };

  // Function to scroll to AI Demo section
  const onLiveDemoClick = () => {
    if (currentPage === 'home') {
      const element = document.getElementById('ai-demo');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate('home');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto max-w-6xl px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <img src="/logo1.svg" alt="SynapseHub" className="h-10 w-10" />
            {/* Make text smaller on small screens */}
            <span className="text-xl sm:text-2xl font-bold text-[#1A202C]">SynapseHub</span>
          </button>

          {/* Desktop Navigation Links (Hidden on mobile AND on non-home pages) */}
          {currentPage === 'home' && (
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-[#1A202C] hover:text-[#40E0D0] transition-colors duration-200 font-medium cursor-pointer"
              >
                Home
              </a>
              <a
                href="#problem"
                onClick={(e) => handleNavClick(e, 'problem')}
                className="text-[#1A202C] hover:text-[#40E0D0] transition-colors duration-200 font-medium cursor-pointer"
              >
                About
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-[#1A202C] hover:text-[#40E0D0] transition-colors duration-200 font-medium cursor-pointer"
              >
                Features
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleNavClick(e, 'testimonials')}
                className="text-[#1A202C] hover:text-[#40E0D0] transition-colors duration-200 font-medium cursor-pointer"
              >
                Testimonials
              </a>
            </div>
          )}

          {/* Buttons - Adjust spacing and padding for mobile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Live Demo Button (Home only, hidden on mobile) */}
            {currentPage === 'home' && (
              <button
                onClick={onLiveDemoClick}
                className="hidden sm:block bg-white text-[#40E0D0] px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold border-2 border-[#40E0D0] shadow-sm hover:bg-[#40E0D0] hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer text-sm sm:text-base"
              >
                Live Demo
              </button>
            )}

            {/* NEW Fundraising Button */}
            <button
              onClick={() => onNavigate('fundraising')}
              className="bg-[#FF6B6B] text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-sm sm:text-base"
            >
              Fundraising
            </button>

            {/* Get Started Button - Smaller text/padding on mobile */}
            <button
              onClick={onGetStartedClick}
              className="bg-[#40E0D0] text-white px-3 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
