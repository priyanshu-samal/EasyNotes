
import { useState, useEffect } from 'react';

export const usePdfPreviews = (pdfFile: File | null) => {
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [pagePreviewUrls, setPagePreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const loadPagesWithPreviews = async () => {
      if (!pdfFile) return;
      
      setIsLoadingPages(true);
      try {
        const fileUrl = URL.createObjectURL(pdfFile);
        
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
            
            const previews: string[] = [];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) return;
            
            console.log(`Loading previews for all ${pageCount} pages`);
            
            for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const viewport = page.getViewport({ scale: 0.3 });
              
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              
              await page.render({
                canvasContext: ctx,
                viewport: viewport
              }).promise;
              
              const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
              previews.push(imageDataUrl);
              
              if (pageNum % 5 === 0) {
                console.log(`Generated preview for page ${pageNum}/${pageCount}`);
              }
            }
            
            setPagePreviewUrls(previews);
            console.log('Generated previews for all', previews.length, 'pages');
            
            URL.revokeObjectURL(fileUrl);
            document.head.removeChild(script);
            
          } catch (error) {
            console.error('Error generating previews:', error);
            setTotalPages(12);
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
        setTotalPages(12);
        setIsLoadingPages(false);
      }
    };

    loadPagesWithPreviews();
  }, [pdfFile]);

  return {
    totalPages,
    isLoadingPages,
    pagePreviewUrls
  };
};
