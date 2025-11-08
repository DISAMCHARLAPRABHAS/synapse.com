function Header() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    const element = document.getElementById('problem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <img src="/logo1.svg" alt="SynapseHub" className="h-10 w-10" />
            <span className="text-2xl font-bold text-[#1A202C]">SynapseHub</span>
          </button>

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

          <button
            onClick={handleGetStarted}
            className="bg-[#40E0D0] text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
