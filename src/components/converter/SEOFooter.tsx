
import { Link } from 'react-router-dom';

const SEOFooter = () => {
  return (
    <div className="bg-gray-50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                How does the color inversion work?
              </h3>
              <p className="text-gray-600 text-sm">
                Our tool processes each pixel in your PDF, inverting RGB values (255 - original value) 
                to convert dark backgrounds to light ones while maintaining text readability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Is my data secure?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! All processing happens locally in your browser. Your files never leave your device, 
                ensuring complete privacy and security.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                What file sizes are supported?
              </h3>
              <p className="text-gray-600 text-sm">
                Desktop: Up to 100MB per file, 400MB total. Mobile: Up to 50MB per file, 150MB total. 
                Perfect for most student notes and documents.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Can I process multiple PDFs?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely! Upload multiple PDFs and we'll merge them into one document before 
                applying color inversion, saving you time and effort.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Students Choose EasyNotes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">
                Reduce printing costs by up to 80% with our color inversion technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">📖</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Readability</h3>
              <p className="text-gray-600 text-sm">
                Light backgrounds with dark text are easier to read and cause less eye strain.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast & Easy</h3>
              <p className="text-gray-600 text-sm">
                Convert your PDFs in just 5 simple steps, no software installation needed.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Save on Printing Costs?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of students who use EasyNotes to convert their colorful PDFs 
            into print-friendly black and white format.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Converting Now
          </button>
        </div>

        {/* Legal Links */}
        <div className="flex justify-center space-x-6 mt-12 pt-8 border-t">
          <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
            Terms of Service
          </Link>
          <Link to="/cookies" className="text-gray-500 hover:text-gray-700 text-sm">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SEOFooter;
