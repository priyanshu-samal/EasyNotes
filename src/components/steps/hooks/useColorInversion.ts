
import { useState } from 'react';

export const useColorInversion = (updatePdfData: (updates: any) => void) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [colorChoice, setColorChoice] = useState<'original' | 'inverted'>('inverted');

  const handleKeepOriginal = (pdfData: any) => {
    console.log('User chose to keep original colors - no processing needed');
    setColorChoice('original');
    // Simply use the merged PDF as the "processed" PDF
    updatePdfData({ invertedPdf: pdfData.mergedPdf });
  };

  const handleInvertColors = async (pdfData: any) => {
    if (!pdfData.mergedPdf) {
      alert('Please merge PDFs first');
      return;
    }

    setColorChoice('inverted');
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingStatus('Initializing PDF processing...');
    console.log('Starting TRUE color inversion process');
    
    try {
      // Create canvas to process the PDF
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      setProcessingProgress(10);
      setProcessingStatus('Loading PDF library...');

      // Read the PDF file
      const fileUrl = URL.createObjectURL(pdfData.mergedPdf);
      
      // Use pdf.js to render and invert the PDF
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      document.head.appendChild(script);
      
      script.onload = async () => {
        try {
          setProcessingProgress(20);
          setProcessingStatus('Analyzing PDF structure...');
          
          // @ts-ignore - pdf.js global
          const pdfjsLib = window.pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          
          const pdf = await pdfjsLib.getDocument(fileUrl).promise;
          const totalPages = pdf.numPages;
          console.log(`Processing ${totalPages} pages for TRUE color inversion`);
          
          setProcessingProgress(30);
          setProcessingStatus(`Found ${totalPages} pages to process...`);
          
          // Create a new PDF with inverted colors
          const { PDFDocument, rgb } = await import('pdf-lib');
          const invertedPdf = await PDFDocument.create();
          
          for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const pageProgress = 30 + ((pageNum - 1) / totalPages) * 60;
            setProcessingProgress(pageProgress);
            setProcessingStatus(`Processing page ${pageNum} of ${totalPages}...`);
            
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 });
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            // Render the page to canvas
            await page.render({
              canvasContext: ctx,
              viewport: viewport
            }).promise;
            
            // Get image data and invert colors
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Invert every pixel
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 255 - data[i];     // Red
              data[i + 1] = 255 - data[i + 1]; // Green
              data[i + 2] = 255 - data[i + 2]; // Blue
              // Alpha channel (data[i + 3]) stays the same
            }
            
            // Put the inverted image data back
            ctx.putImageData(imageData, 0, 0);
            
            // Convert canvas to image and add to new PDF
            const imageBytes = canvas.toDataURL('image/png');
            const image = await invertedPdf.embedPng(imageBytes);
            
            const newPage = invertedPdf.addPage([viewport.width, viewport.height]);
            newPage.drawImage(image, {
              x: 0,
              y: 0,
              width: viewport.width,
              height: viewport.height,
            });
            
            console.log(`Processed page ${pageNum}/${totalPages}`);
          }
          
          setProcessingProgress(90);
          setProcessingStatus('Finalizing PDF...');
          
          const invertedPdfBytes = await invertedPdf.save();
          const invertedFile = new File([invertedPdfBytes], 'inverted-document.pdf', { type: 'application/pdf' });
          
          setProcessingProgress(100);
          setProcessingStatus('Processing complete!');
          
          updatePdfData({ invertedPdf: invertedFile });
          console.log('TRUE color inversion completed successfully');
          
          // Clean up
          URL.revokeObjectURL(fileUrl);
          document.head.removeChild(script);
          
        } catch (error) {
          console.error('Error in PDF processing:', error);
          alert('Error processing PDF with pdf.js. Please try again.');
        } finally {
          setTimeout(() => {
            setIsProcessing(false);
            setProcessingProgress(0);
            setProcessingStatus('');
          }, 1000);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load pdf.js');
        alert('Failed to load PDF processing library. Please check your internet connection.');
        setIsProcessing(false);
        setProcessingProgress(0);
        setProcessingStatus('');
      };
      
    } catch (error) {
      console.error('Error inverting colors:', error);
      alert('Error processing PDF. Please try again.');
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingStatus('');
    }
  };

  return {
    isProcessing,
    processingProgress,
    processingStatus,
    colorChoice,
    handleKeepOriginal,
    handleInvertColors
  };
};
