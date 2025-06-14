
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { usePdfPreviews } from './hooks/usePdfPreviews';
import PagePreviewGrid from './components/PagePreviewGrid';
import DocumentSummary from './components/DocumentSummary';
import StatusCard from './components/StatusCard';

interface StepThreeProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ pdfData, updatePdfData }) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { totalPages, isLoadingPages, pagePreviewUrls } = usePdfPreviews(pdfData.invertedPdf);

  const handlePageSelection = (pageNumber: number, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageNumber]);
    } else {
      setSelectedPages(selectedPages.filter(p => p !== pageNumber));
    }
  };

  const handleSelectAll = () => {
    if (selectedPages.length === totalPages) {
      setSelectedPages([]);
    } else {
      setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  };

  const handleDeletePages = async () => {
    if (!pdfData.invertedPdf || selectedPages.length === 0) return;

    setIsProcessing(true);
    console.log('Deleting pages:', selectedPages);
    
    try {
      const fileBuffer = await pdfData.invertedPdf.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);
      
      const processedPdf = await PDFDocument.create();
      const allPages = pdfDoc.getPages();
      
      const pagesToKeep = [];
      for (let i = 0; i < totalPages; i++) {
        if (!selectedPages.includes(i + 1)) {
          pagesToKeep.push(i);
        }
      }
      
      if (pagesToKeep.length === 0) {
        alert('Cannot delete all pages. Please keep at least one page.');
        return;
      }
      
      const copiedPages = await processedPdf.copyPages(pdfDoc, pagesToKeep);
      copiedPages.forEach((page) => processedPdf.addPage(page));
      
      const processedPdfBytes = await processedPdf.save();
      const processedFile = new File([processedPdfBytes], 'processed-document.pdf', { type: 'application/pdf' });
      
      updatePdfData({ 
        selectedPages: selectedPages,
        processedPdf: processedFile 
      });
      
      console.log('Pages deleted successfully. Remaining pages:', pagesToKeep.length);
    } catch (error) {
      console.error('Error deleting pages:', error);
      alert('Error processing PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoadingPages) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading all PDF pages and generating previews...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <PagePreviewGrid
            totalPages={totalPages}
            selectedPages={selectedPages}
            pagePreviewUrls={pagePreviewUrls}
            onPageSelection={handlePageSelection}
            onSelectAll={handleSelectAll}
          />
          
          <DocumentSummary
            totalPages={totalPages}
            selectedPages={selectedPages}
            isProcessing={isProcessing}
            onDeletePages={handleDeletePages}
          />
        </CardContent>
      </Card>

      <StatusCard
        isSuccess={!!pdfData.processedPdf}
        selectedPagesCount={selectedPages.length}
      />
    </div>
  );
};

export default StepThree;
