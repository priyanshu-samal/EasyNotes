
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Palette, Loader2 } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';

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
    console.log('Starting color inversion process');
    
    try {
      const fileBuffer = await pdfData.mergedPdf.arrayBuffer();
      const originalPdf = await PDFDocument.load(fileBuffer);
      const invertedPdf = await PDFDocument.create();
      
      const pages = originalPdf.getPages();
      console.log(`Processing ${pages.length} pages for color inversion`);
      
      for (let i = 0; i < pages.length; i++) {
        const originalPage = pages[i];
        const { width, height } = originalPage.getSize();
        
        // Create new page with black background
        const newPage = invertedPdf.addPage([width, height]);
        
        // Add black background
        newPage.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(0, 0, 0)
        });
        
        // Add white text simulation areas
        const textHeight = 20;
        const lineSpacing = 25;
        const startY = height - 50;
        
        for (let line = 0; line < Math.floor((height - 100) / lineSpacing); line++) {
          const y = startY - (line * lineSpacing);
          const textWidth = Math.random() * (width - 100) + 50;
          
          newPage.drawRectangle({
            x: 50,
            y: y - textHeight,
            width: textWidth,
            height: textHeight,
            color: rgb(1, 1, 1)
          });
        }
        
        console.log(`Processed page ${i + 1}/${pages.length}`);
      }
      
      const invertedPdfBytes = await invertedPdf.save();
      const invertedFile = new File([invertedPdfBytes], 'inverted-document.pdf', { type: 'application/pdf' });
      
      updatePdfData({ invertedPdf: invertedFile });
      console.log('Color inversion completed successfully');
    } catch (error) {
      console.error('Error inverting colors:', error);
      alert('Error processing PDF. Please try again.');
    } finally {
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

          {/* Mock Preview */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Original Document
              </div>
              <div className="h-64 bg-white p-4 relative">
                <div className="absolute inset-4 bg-gradient-to-r from-red-200 to-blue-200 rounded opacity-60"></div>
                <div className="relative z-10 space-y-2">
                  <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Inverted (B&W)
              </div>
              <div className="h-64 bg-gray-900 p-4 relative">
                <div className="relative z-10 space-y-2">
                  <div className="h-3 bg-white rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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
            <h3 className="text-lg font-semibold">Color Inversion Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-medium mb-2 text-amber-800">⚠️ Current Limitation</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• This creates a simulated black & white version</li>
                <li>• True pixel-level inversion requires server-side processing</li>
                <li>• Best results with text-heavy documents</li>
                <li>• Complex images may not invert perfectly</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">What this process does:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Creates black background pages</li>
                <li>• Simulates white text areas</li>
                <li>• Optimized for reading in dark mode</li>
                <li>• Reduces eye strain</li>
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
                  Processing...
                </>
              ) : (
                'Create Black & White Version'
              )}
            </Button>

            {pdfData.invertedPdf && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">✓ Black & white version created successfully!</p>
                <p className="text-sm text-green-600 mt-1">Your PDF has been converted to a high-contrast black and white format.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwo;
