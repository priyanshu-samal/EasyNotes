
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface StepThreeProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ pdfData, updatePdfData }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [pagePreviewUrls, setPagePreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const loadPagesWithPreviews = async () => {
      if (!pdfData.invertedPdf) return;
      
      setIsLoadingPages(true);
      try {
        const fileUrl = URL.createObjectURL(pdfData.invertedPdf);
        
        // Load pdf.js
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        document.head.appendChild(script);
        
        script.onload = async () => {
          try {
            // @ts-ignore - pdf.js global
            const pdfjsLib = window.pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            
            const pdf = await pdfjsLib.getDocument(fileUrl).promise;
            const pageCount = pdf.numPages;
            setTotalPages(pageCount);
            
            // Generate preview for each page
            const previews: string[] = [];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) return;
            
            for (let pageNum = 1; pageNum <= Math.min(pageCount, 20); pageNum++) { // Limit to first 20 pages for performance
              const page = await pdf.getPage(pageNum);
              const viewport = page.getViewport({ scale: 0.3 }); // Small scale for thumbnails
              
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              
              await page.render({
                canvasContext: ctx,
                viewport: viewport
              }).promise;
              
              const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
              previews.push(imageDataUrl);
            }
            
            setPagePreviewUrls(previews);
            console.log('Generated previews for', previews.length, 'pages');
            
            // Clean up
            URL.revokeObjectURL(fileUrl);
            document.head.removeChild(script);
            
          } catch (error) {
            console.error('Error generating previews:', error);
            setTotalPages(12); // Fallback
          } finally {
            setIsLoadingPages(false);
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load pdf.js');
          setIsLoadingPages(false);
        };
        
      } catch (error) {
        console.error('Error loading PDF:', error);
        setTotalPages(12); // Fallback
        setIsLoadingPages(false);
      }
    };

    loadPagesWithPreviews();
  }, [pdfData.invertedPdf]);

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
      
      // Create new PDF with remaining pages
      const processedPdf = await PDFDocument.create();
      const allPages = pdfDoc.getPages();
      
      // Get pages to keep (1-indexed to 0-indexed)
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
      
      // Copy remaining pages
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
        <span>Loading PDF pages and generating previews...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Review and Select Pages to Delete</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedPages.length === totalPages ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-sm text-gray-500">
                {selectedPages.length} of {totalPages} selected for deletion
              </span>
            </div>
          </div>

          {/* Page Grid with Real Previews */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <div
                key={pageNumber}
                className={`relative border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPages.includes(pageNumber)
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePageSelection(pageNumber, !selectedPages.includes(pageNumber))}
              >
                <div className="aspect-[3/4] bg-white rounded shadow-sm overflow-hidden">
                  {pagePreviewUrls[pageNumber - 1] ? (
                    <img 
                      src={pagePreviewUrls[pageNumber - 1]} 
                      alt={`Page ${pageNumber}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Page {pageNumber}</span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-2 p-2">
                  <span className="text-sm font-medium">Page {pageNumber}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={selectedPages.includes(pageNumber)}
                    onCheckedChange={(checked) => handlePageSelection(pageNumber, checked as boolean)}
                  />
                </div>
                {selectedPages.includes(pageNumber) && (
                  <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Document Summary</p>
                <p className="text-sm text-gray-600">
                  Original: {totalPages} pages → Final: {totalPages - selectedPages.length} pages
                </p>
              </div>
              <Button
                onClick={handleDeletePages}
                disabled={selectedPages.length === 0 || isProcessing}
                variant={selectedPages.length > 0 ? "destructive" : "outline"}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Delete Selected Pages'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {pdfData.processedPdf && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-green-700">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="font-medium">Pages deleted successfully!</p>
                <p className="text-sm text-green-600">
                  {selectedPages.length} pages removed from your document.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepThree;
