
import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4 sm:py-6 mt-6 sm:mt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-2">EasyNotes</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Fast, secure PDF color conversion. Process unlimited files with professional results.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-2 text-sm">Legal</h4>
            <ul className="space-y-1 text-xs sm:text-sm text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-2 text-sm">Connect</h4>
            <div className="flex justify-center sm:justify-start space-x-3">
              <a 
                href="https://x.com/PriyanshuS92042" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Follow on Twitter"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a 
                href="https://github.com/priyanshu-samal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="View on GitHub"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/priyanshusamal-/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a 
                href="mailto:samalpriyanshu966@gmail.com" 
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Send email"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-3 sm:pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
            <p className="text-center sm:text-left">© {currentYear} EasyNotes. All rights reserved.</p>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                SSL Secured
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Auto-Delete Files
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
