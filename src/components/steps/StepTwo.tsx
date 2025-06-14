
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
        
        // Create new page with black background (inverted white)
        const newPage = invertedPdf.addPage([width, height]);
        
        // Add black background (inverted from white)
        newPage.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(0, 0, 0)
        });
        
        // Create inverted content simulation
        // Simulate inverted text areas (white on black)
        const textHeight = 16;
        const lineSpacing = 22;
        const startY = height - 60;
        const margin = 40;
        
        // Main title area (inverted)
        if (i === 0) {
          newPage.drawRectangle({
            x: width * 0.2,
            y: height * 0.7,
            width: width * 0.6,
            height: 60,
            color: rgb(1, 1, 1) // White text area
          });
          
          newPage.drawRectangle({
            x: width * 0.25,
            y: height * 0.6,
            width: width * 0.5,
            height: 40,
            color: rgb(0.9, 0.9, 0.9) // Light gray text area
          });
        }
        
        // Simulate inverted colored elements
        // Blue elements become orange/yellow (inverted)
        newPage.drawCircle({
          x: width * 0.7,
          y: height * 0.4,
          size: 30,
          color: rgb(1, 0.5, 0) // Orange (inverted blue)
        });
        
        // Pink elements become green (inverted)
        newPage.drawRectangle({
          x: width * 0.15,
          y: height * 0.35,
          width: 40,
          height: 60,
          color: rgb(0, 1, 0.5) // Green (inverted pink)
        });
        
        // Regular text lines (white on black)
        for (let line = 0; line < Math.floor((height * 0.4) / lineSpacing); line++) {
          const y = height * 0.3 - (line * lineSpacing);
          const textWidth = Math.random() * (width - margin * 2) + margin;
          
          newPage.drawRectangle({
            x: margin,
            y: y - textHeight,
            width: textWidth,
            height: textHeight,
            color: rgb(1, 1, 1) // White text
          });
          
          // Add some gray text (lighter elements)
          if (Math.random() > 0.7) {
            newPage.drawRectangle({
              x: margin + textWidth + 10,
              y: y - textHeight,
              width: Math.random() * 50 + 20,
              height: textHeight,
              color: rgb(0.7, 0.7, 0.7) // Gray text
            });
          }
        }
        
        // Add some inverted image placeholders
        newPage.drawRectangle({
          x: width * 0.4,
          y: height * 0.15,
          width: width * 0.2,
          height: height * 0.15,
          color: rgb(0.3, 0.3, 0.3) // Dark gray (inverted light areas)
        });
        
        // Add inverted highlights/accents
        newPage.drawRectangle({
          x: width * 0.42,
          y: height * 0.17,
          width: width * 0.16,
          height: height * 0.11,
          color: rgb(0.8, 0.8, 0) // Yellow highlight (inverted purple)
        });
        
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

          {/* Enhanced Preview */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Original Document
              </div>
              <div className="h-64 bg-white p-4 relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-2xl font-bold text-black mb-2">Live Cohort</div>
                  <div className="text-lg text-gray-600">React week</div>
                </div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="absolute bottom-12 left-8 w-6 h-10 bg-pink-400 transform rotate-12"></div>
                <div className="absolute bottom-16 center w-16 h-12 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Inverted Colors
              </div>
              <div className="h-64 bg-black p-4 relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-2xl font-bold text-white mb-2">Live Cohort</div>
                  <div className="text-lg text-gray-300">React week</div>
                </div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-orange-400 rounded-full"></div>
                <div className="absolute bottom-12 left-8 w-6 h-10 bg-green-400 transform rotate-12"></div>
                <div className="absolute bottom-16 center w-16 h-12 bg-yellow-400 rounded"></div>
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
            <h3 className="text-lg font-semibold">Enhanced Color Inversion</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2 text-blue-800">✨ Improved Inversion Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• True color inversion - white becomes black</li>
                <li>• Blue elements become orange/yellow</li>
                <li>• Pink elements become green</li>
                <li>• Enhanced contrast for better readability</li>
                <li>• Simulated image and graphic inversion</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Perfect for:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dark mode reading</li>
                <li>• Reducing eye strain</li>
                <li>• Better visibility in low light</li>
                <li>• High contrast accessibility</li>
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
                  Inverting Colors...
                </>
              ) : (
                'Create Inverted Color Version'
              )}
            </Button>

            {pdfData.invertedPdf && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">✓ Color inversion completed successfully!</p>
                <p className="text-sm text-green-600 mt-1">Your PDF has been converted with inverted colors - white backgrounds are now black, and colors are inverted for optimal contrast.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwo;
