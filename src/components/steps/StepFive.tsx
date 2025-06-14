
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, Mail, Share, RefreshCw } from 'lucide-react';

interface StepFiveProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepFive: React.FC<StepFiveProps> = ({ pdfData, updatePdfData }) => {
  const handleDownload = async () => {
    console.log('Download button clicked');
    
    // Get the final PDF (prefer processedPdf, fallback to invertedPdf)
    const finalPdf = pdfData.processedPdf || pdfData.invertedPdf;
    
    if (!finalPdf) {
      console.error('No PDF available for download');
      alert('No processed PDF available for download');
      return;
    }

    try {
      console.log('Starting PDF download, file size:', finalPdf.size, 'bytes');
      
      // Create a proper blob from the file
      let blob;
      if (finalPdf instanceof File) {
        blob = new Blob([finalPdf], { type: 'application/pdf' });
      } else {
        blob = finalPdf;
      }
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-document-${new Date().getTime()}.pdf`;
      link.target = '_blank'; // Open in new tab to help with debugging
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
      
      console.log('PDF download initiated successfully');
    } catch (error) {
      console.error('Error during PDF download:', error);
      alert('Error downloading PDF. Please try again.');
    }
  };

  const handleEmailSend = () => {
    alert('Email functionality would require a backend service. PDF is available for download.');
  };

  const handleShare = async () => {
    const finalPdf = pdfData.processedPdf || pdfData.invertedPdf;
    
    if (navigator.share && finalPdf) {
      try {
        await navigator.share({
          title: 'Converted PDF',
          text: 'Check out this converted PDF',
          files: [finalPdf]
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        alert('Page URL copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Page URL copied to clipboard!');
    }
  };

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? This will clear all your current progress.')) {
      window.location.reload();
    }
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

      {/* Enhanced Download Section - Made more prominent */}
      <Card className="border-4 border-green-300 bg-gradient-to-br from-green-50 to-green-100 shadow-xl">
        <CardContent className="p-10">
          <div className="text-center mb-8">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Download className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-green-800 mb-3">Download Your PDF</h3>
            <p className="text-green-700 text-lg">Your converted PDF is ready with inverted colors for better printing</p>
          </div>
          
          <div className="space-y-6">
            <Button 
              onClick={handleDownload}
              className="w-full justify-center gap-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-6 shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              <Download className="w-6 h-6" />
              Download Converted PDF
              <span className="ml-auto px-4 py-2 bg-green-500 rounded-full text-sm animate-pulse">Ready!</span>
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={handleEmailSend}
                className="justify-center gap-3 border-2 border-green-400 text-green-700 hover:bg-green-50 py-4"
                size="lg"
              >
                <Mail className="w-5 h-5" />
                Email PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="justify-center gap-3 border-2 border-green-400 text-green-700 hover:bg-green-50 py-4"
                size="lg"
              >
                <Share className="w-5 h-5" />
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
