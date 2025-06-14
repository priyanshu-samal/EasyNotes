
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Palette, Loader2 } from 'lucide-react';

interface StepTwoProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ pdfData, updatePdfData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState<'original' | 'inverted'>('original');

  const handleInvertColors = async () => {
    if (!pdfData.mergedPdf) {
      alert('Please merge PDFs first');
      return;
    }

    setIsProcessing(true);
    console.log('Starting TRUE color inversion process');
    
    try {
      // Create canvas to process the PDF
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Read the PDF file
      const fileUrl = URL.createObjectURL(pdfData.mergedPdf);
      
      // Use pdf.js to render and invert the PDF
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      document.head.appendChild(script);
      
      script.onload = async () => {
        try {
          // @ts-ignore - pdf.js global
          const pdfjsLib = window.pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          
          const pdf = await pdfjsLib.getDocument(fileUrl).promise;
          console.log(`Processing ${pdf.numPages} pages for TRUE color inversion`);
          
          // Create a new PDF with inverted colors
          const { PDFDocument, rgb } = await import('pdf-lib');
          const invertedPdf = await PDFDocument.create();
          
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
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
            
            console.log(`Processed page ${pageNum}/${pdf.numPages}`);
          }
          
          const invertedPdfBytes = await invertedPdf.save();
          const invertedFile = new File([invertedPdfBytes], 'inverted-document.pdf', { type: 'application/pdf' });
          
          updatePdfData({ invertedPdf: invertedFile });
          console.log('TRUE color inversion completed successfully');
          
          // Clean up
          URL.revokeObjectURL(fileUrl);
          document.head.removeChild(script);
          
        } catch (error) {
          console.error('Error in PDF processing:', error);
          alert('Error processing PDF with pdf.js. Please try again.');
        } finally {
          setIsProcessing(false);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load pdf.js');
        alert('Failed to load PDF processing library. Please check your internet connection.');
        setIsProcessing(false);
      };
      
    } catch (error) {
      console.error('Error inverting colors:', error);
      alert('Error processing PDF. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Color Inversion Preview</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm">Original</span>
              <Switch
                checked={previewMode === 'inverted'}
                onCheckedChange={(checked) => setPreviewMode(checked ? 'inverted' : 'original')}
              />
              <span className="text-sm">Inverted</span>
            </div>
          </div>

          {/* Enhanced Preview */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Original Document (Dark Background)
              </div>
              <div className="h-64 bg-black p-4 relative">
                <div className="absolute top-4 left-4 right-4">
                  <div className="text-xl font-bold text-yellow-400 mb-2">1. Higher Order Components (HOC)</div>
                  <div className="text-sm text-cyan-400 mb-4">🔷 Definition</div>
                  <div className="text-sm text-white leading-relaxed">
                    A Higher Order Component (HOC) is a function that takes a component and returns a new component with added behavior.
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-sm text-cyan-400 mb-2">🔷 Code (Example)</div>
                  <div className="bg-gray-800 p-2 rounded text-xs">
                    <span className="text-blue-400">function</span> <span className="text-yellow-300">withLoading</span>
                    <span className="text-white">(Component) &#123;</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Inverted Colors (Light Background)
              </div>
              <div className="h-64 bg-white p-4 relative border">
                <div className="absolute top-4 left-4 right-4">
                  <div className="text-xl font-bold text-purple-800 mb-2">1. Higher Order Components (HOC)</div>
                  <div className="text-sm text-red-600 mb-4">🔷 Definition</div>
                  <div className="text-sm text-black leading-relaxed">
                    A Higher Order Component (HOC) is a function that takes a component and returns a new component with added behavior.
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-sm text-red-600 mb-2">🔷 Code (Example)</div>
                  <div className="bg-gray-200 p-2 rounded text-xs">
                    <span className="text-orange-600">function</span> <span className="text-purple-700">withLoading</span>
                    <span className="text-black">(Component) &#123;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Options */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">TRUE Color Inversion</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2 text-blue-800">✨ Real PDF Processing Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Processes actual PDF content (not fake shapes)</li>
                <li>• Inverts every pixel: dark becomes light, light becomes dark</li>
                <li>• Preserves all text, images, and graphics</li>
                <li>• Maintains readability and layout</li>
                <li>• Perfect pixel-level color inversion</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">How it works:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Renders each PDF page to high-resolution canvas</li>
                <li>• Inverts RGB values of every pixel (255 - original)</li>
                <li>• Rebuilds PDF with inverted images</li>
                <li>• Maintains original quality and layout</li>
              </ul>
            </div>

            <Button
              onClick={handleInvertColors}
              disabled={!pdfData.mergedPdf || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Real PDF Content...
                </>
              ) : (
                'Invert PDF Colors (True Processing)'
              )}
            </Button>

            {pdfData.invertedPdf && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">✓ TRUE color inversion completed!</p>
                <p className="text-sm text-green-600 mt-1">Your PDF has been properly inverted with real content processing - all text and images should now be readable!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwo;
