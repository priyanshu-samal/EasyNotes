
import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">PDF Color Converter</h3>
            <p className="text-gray-400 text-sm">
              Fast, secure PDF color conversion. Process unlimited files with professional results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">Legal</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">Connect</h4>
            <div className="flex space-x-3">
              <a 
                href="https://x.com/PriyanshuS92042" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Follow on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/priyanshu-samal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/priyanshusamal-/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:samalpriyanshu966@gmail.com" 
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} PDF Color Converter. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
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
