
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">PDF Color Converter</h3>
            <p className="text-gray-400 mb-4">
              The fastest and most reliable way to convert your color PDFs to black and white. 
              Process unlimited files with professional quality results.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/PriyanshuS92042" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                title="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@pdfconverter.com" 
                className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
                title="Send us an email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} PDF Color Converter. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" fill="currentColor" /> by Priyanshu
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              SSL Secured
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              GDPR Compliant
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Files Auto-Deleted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
