import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white py-12 px-6 border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <img src="/logo1.svg" alt="SynapseHub" className="h-10 w-10" />
            <span className="text-2xl font-bold text-[#1A202C]">SynapseHub</span>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#terms" className="text-gray-600 hover:text-[#40E0D0] transition-colors duration-200">Terms</a>
            <a href="#privacy" className="text-gray-600 hover:text-[#40E0D0] transition-colors duration-200">Privacy</a>
            <a href="#contact" className="text-gray-600 hover:text-[#40E0D0] transition-colors duration-200">Contact</a>
          </div>

          <div className="flex space-x-4">
            <a href="#facebook" className="text-[#40E0D0] hover:scale-110 transition-transform duration-200">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#twitter" className="text-[#40E0D0] hover:scale-110 transition-transform duration-200">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#instagram" className="text-[#40E0D0] hover:scale-110 transition-transform duration-200">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#linkedin" className="text-[#40E0D0] hover:scale-110 transition-transform duration-200">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          Copyright © 2025 SynapseHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
