
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, Mail, Share, RefreshCw } from 'lucide-react';

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

  const handleStartOver = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Success Summary */}
      <Card>
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-green-700 mb-2">Conversion Complete! 🎉</h2>
          <p className="text-gray-600 mb-6 text-lg">Your PDF has been successfully processed and is ready for download.</p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800">Files Processed</div>
              <div className="text-blue-600 text-lg">{pdfData.files.length} PDF{pdfData.files.length > 1 ? 's' : ''}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800">Pages Layout</div>
              <div className="text-green-600 text-lg">{pdfData.pagesPerSheet || 1} per sheet</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-800">Final Format</div>
              <div className="text-purple-600 text-lg">Inverted Colors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Download Section */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <Download className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-semibold text-green-800 mb-2">Download Your PDF</h3>
            <p className="text-green-700">Your converted PDF is ready with inverted colors for better printing</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleDownload}
              className="w-full justify-center gap-3 bg-green-600 hover:bg-green-700 text-white" 
              size="lg"
            >
              <Download className="w-5 h-5" />
              Download Converted PDF
              <span className="ml-auto px-3 py-1 bg-green-500 rounded-full text-sm">Ready!</span>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleEmailSend}
                className="justify-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
              >
                <Mail className="w-4 h-4" />
                Email PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="justify-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
              >
                <Share className="w-4 h-4" />
                Share PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Summary */}
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

      {/* Start Over Section */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Need to convert more PDFs?</h3>
            <p className="text-gray-600 mb-4">Start a new conversion process with different files</p>
            <Button 
              variant="outline" 
              onClick={handleStartOver}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Convert Another PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepFive;
