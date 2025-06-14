
import React from 'react';

const SEOFooter: React.FC = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Why Convert PDF to Black and White?
      </h3>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">💰 Save Printing Costs</h4>
          <p>Converting colored PDFs to black and white can reduce printing costs by up to 80%. Black and white printing is significantly cheaper than color printing.</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">📖 Better Readability</h4>
          <p>Grayscale PDFs often provide better contrast and readability when printed, especially for text-heavy documents and study materials.</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">🖨️ Printer Friendly</h4>
          <p>Black and white PDFs are compatible with all printers and reduce ink consumption, making them perfect for bulk printing.</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">⚡ Fast & Free</h4>
          <p>Our online PDF color converter works instantly in your browser. No software installation or registration required.</p>
        </div>
      </div>
    </div>
  );
};

export default SEOFooter;
