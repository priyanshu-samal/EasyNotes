
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface ProcessingSummaryProps {
  pdfData: any;
}

const ProcessingSummary: React.FC<ProcessingSummaryProps> = ({ pdfData }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Processing Summary</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">What was processed:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ {pdfData.files.length} PDF file{pdfData.files.length > 1 ? 's' : ''} merged successfully</li>
              {pdfData.invertedPdf && <li>✓ Colors inverted from dark to light background</li>}
              {pdfData.selectedPages?.length > 0 && <li>✓ {pdfData.selectedPages.length} unwanted pages removed</li>}
              {pdfData.pagesPerSheet > 1 && <li>✓ Layout optimized for {pdfData.pagesPerSheet} pages per sheet</li>}
              {pdfData.pageOrientation && <li>✓ Page orientation set to {pdfData.pageOrientation}</li>}
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>💡 Pro Tip:</strong> Your PDF now has a light background perfect for printing and reading!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingSummary;
