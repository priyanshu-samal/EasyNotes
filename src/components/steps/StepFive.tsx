
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, Mail, Share } from 'lucide-react';

interface StepFiveProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepFive: React.FC<StepFiveProps> = ({ pdfData, updatePdfData }) => {
  const handleDownload = () => {
    const finalPdf = pdfData.processedPdf || pdfData.invertedPdf || pdfData.mergedPdf;
    
    if (!finalPdf) {
      alert('No processed PDF available for download');
      return;
    }

    // Create download link
    const url = URL.createObjectURL(finalPdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted-document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('PDF downloaded successfully');
  };

  const handleEmailSend = () => {
    alert('Email functionality would require a backend service. PDF is available for download.');
  };

  const handleShare = () => {
    if (navigator.share) {
      const finalPdf = pdfData.processedPdf || pdfData.invertedPdf || pdfData.mergedPdf;
      navigator.share({
        title: 'Converted PDF',
        text: 'Check out this converted PDF',
        files: [finalPdf]
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Page URL copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Summary */}
      <Card>
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Processing Complete! 🎉</h2>
          <p className="text-gray-600 mb-6">Your PDF has been successfully processed.</p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Files Processed</div>
              <div className="text-blue-600">{pdfData.files.length} PDFs</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Pages Layout</div>
              <div className="text-green-600">{pdfData.pagesPerSheet || 1} per sheet</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium">Final Format</div>
              <div className="text-purple-600">Black & White</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Options */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Download Your Converted PDF</h3>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleDownload}
              className="w-full justify-start gap-3" 
              size="lg"
            >
              <FileText className="w-5 h-5" />
              Download as PDF
              <span className="ml-auto text-sm opacity-70">Ready!</span>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleEmailSend}
                className="justify-start gap-2"
              >
                <Mail className="w-4 h-4" />
                Email PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="justify-start gap-2"
              >
                <Share className="w-4 h-4" />
                Share PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sharing Options */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Share className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Processing Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">What was processed:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ {pdfData.files.length} PDF files merged</li>
                {pdfData.invertedPdf && <li>✓ Colors inverted to black & white</li>}
                {pdfData.selectedPages?.length > 0 && <li>✓ {pdfData.selectedPages.length} pages deleted</li>}
                {pdfData.pagesPerSheet > 1 && <li>✓ Layout set to {pdfData.pagesPerSheet} pages per sheet</li>}
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Pro Tip:</strong> Need to convert more PDFs? Save time with batch processing!
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                Process More PDFs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Again */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Need to convert more PDFs?</h3>
            <p className="text-gray-600 mb-4">Start a new conversion process</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              Convert Another PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepFive;
