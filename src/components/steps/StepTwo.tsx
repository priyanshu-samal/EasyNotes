
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Palette, Loader2, CheckCircle } from 'lucide-react';

interface StepTwoProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ pdfData, updatePdfData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [previewMode, setPreviewMode] = useState<'original' | 'inverted'>('inverted');
  const [colorChoice, setColorChoice] = useState<'original' | 'inverted'>('inverted');

  const handleKeepOriginal = () => {
    console.log('User chose to keep original colors - no processing needed');
    setColorChoice('original');
    // Simply use the merged PDF as the "processed" PDF
    updatePdfData({ invertedPdf: pdfData.mergedPdf });
  };

  const handleInvertColors = async () => {
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Original Document (Dark Background)
              </div>
              <div className="h-80 bg-black p-4 relative">
                <div className="space-y-2">
                  <div className="text-base font-bold text-yellow-400">
                    1. Higher Order Components
                  </div>
                  <div className="text-xs text-cyan-400 font-medium">
                    🔷 Definition
                  </div>
                  <div className="text-xs text-white leading-relaxed pr-2">
                    A Higher Order Component (HOC) is a function that takes a component and returns a new component.
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs text-cyan-400 font-medium">
                      🔷 Code Example
                    </div>
                    <div className="bg-gray-800 p-2 rounded text-xs font-mono space-y-1">
                      <div className="text-blue-400">function withLoading(Component)</div>
                      <div className="text-green-300 ml-2">return Enhanced;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Inverted Colors (Light Background)
              </div>
              <div className="h-80 bg-white p-4 relative border-2">
                <div className="space-y-2">
                  <div className="text-base font-bold text-purple-800">
                    1. Higher Order Components
                  </div>
                  <div className="text-xs text-red-600 font-medium">
                    🔷 Definition
                  </div>
                  <div className="text-xs text-black leading-relaxed pr-2">
                    A Higher Order Component (HOC) is a function that takes a component and returns a new component.
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs text-red-600 font-medium">
                      🔷 Code Example
                    </div>
                    <div className="bg-gray-200 p-2 rounded text-xs font-mono space-y-1">
                      <div className="text-orange-600">function withLoading(Component)</div>
                      <div className="text-green-700 ml-2">return Enhanced;</div>
                    </div>
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
            <h3 className="text-lg font-semibold">Choose Your Processing Option</h3>
          </div>
          
          <div className="space-y-4">
            {/* Quick Options */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 hover:border-green-300 transition-colors">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-700 mb-2">Keep Original Colors</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Skip processing and keep your PDF as-is. Perfect if your PDF already has good contrast.
                  </p>
                  <Button
                    onClick={handleKeepOriginal}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    Keep Original (No Processing)
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-700 mb-2">Invert Colors</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Process your PDF to invert colors - dark becomes light, perfect for printing.
                  </p>
                  <Button
                    onClick={handleInvertColors}
                    disabled={!pdfData.mergedPdf || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Invert Colors'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Processing Progress */}
            {isProcessing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{processingStatus}</span>
                  <span className="text-sm text-gray-500">{Math.round(processingProgress)}%</span>
                </div>
                <Progress value={processingProgress} className="h-2" />
              </div>
            )}

            {/* Success Message */}
            {pdfData.invertedPdf && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-700 font-medium">
                    ✓ {colorChoice === 'original' ? 'Original PDF ready!' : 'Color inversion completed!'}
                  </p>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  {colorChoice === 'original' 
                    ? 'Your PDF is ready for the next step - no processing was needed!'
                    : 'Your PDF has been properly inverted with real content processing!'}
                </p>
              </div>
            )}

            {/* Info for True Processing */}
            {colorChoice === 'inverted' && (
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwo;
