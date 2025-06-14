
import React from 'react';
import SuccessSummary from './components/SuccessSummary';
import DownloadSection from './components/DownloadSection';
import ProcessingSummary from './components/ProcessingSummary';
import StartOverSection from './components/StartOverSection';

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
      <SuccessSummary 
        filesCount={pdfData.files.length}
        pagesPerSheet={pdfData.pagesPerSheet}
      />

      <DownloadSection 
        pdfData={pdfData}
        onDownload={handleDownload}
        onEmailSend={handleEmailSend}
        onShare={handleShare}
      />

      <ProcessingSummary pdfData={pdfData} />

      <StartOverSection onStartOver={handleStartOver} />
    </div>
  );
};

export default StepFive;
