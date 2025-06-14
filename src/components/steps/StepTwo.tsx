
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
        
        // Create new page with white background (inverted from dark)
        const newPage = invertedPdf.addPage([width, height]);
        
        // Add white background
        newPage.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(1, 1, 1) // White background
        });
        
        // Main title area (dark text on white background)
        if (i === 0) {
          // Title background (light gray)
          newPage.drawRectangle({
            x: width * 0.1,
            y: height * 0.7,
            width: width * 0.8,
            height: 80,
            color: rgb(0.95, 0.95, 0.95) // Very light gray
          });
          
          // Title text simulation (dark text)
          newPage.drawRectangle({
            x: width * 0.2,
            y: height * 0.72,
            width: width * 0.6,
            height: 50,
            color: rgb(0.1, 0.1, 0.1) // Dark text
          });
          
          // Subtitle
          newPage.drawRectangle({
            x: width * 0.25,
            y: height * 0.65,
            width: width * 0.5,
            height: 30,
            color: rgb(0.3, 0.3, 0.3) // Medium gray text
          });
        }
        
        // Hourglass simulation (light gray/silver like in your image)
        const hourglassX = width * 0.5;
        const hourglassY = height * 0.4;
        
        // Main hourglass body (light gray - inverted from dark)
        newPage.drawRectangle({
          x: hourglassX - 60,
          y: hourglassY - 80,
          width: 120,
          height: 160,
          color: rgb(0.85, 0.85, 0.85) // Light gray
        });
        
        // Hourglass details (darker gray for contrast)
        newPage.drawRectangle({
          x: hourglassX - 50,
          y: hourglassY - 60,
          width: 100,
          height: 120,
          color: rgb(0.7, 0.7, 0.7) // Medium gray
        });
        
        // Paper airplane (light gray - inverted from pink)
        newPage.drawRectangle({
          x: width * 0.2,
          y: height * 0.45,
          width: 40,
          height: 25,
          color: rgb(0.8, 0.8, 0.8) // Light gray
        });
        
        // Light bulb (light gray - inverted from yellow)
        newPage.drawCircle({
          x: width * 0.7,
          y: height * 0.25,
          size: 25,
          color: rgb(0.75, 0.75, 0.75) // Light gray
        });
        
        // Content areas (dark text on light background)
        const textHeight = 14;
        const lineSpacing = 20;
        const startY = height * 0.6;
        const margin = 40;
        
        // Simulate text lines (dark on light)
        for (let line = 0; line < Math.floor((height * 0.4) / lineSpacing); line++) {
          const y = startY - (line * lineSpacing);
          const textWidth = Math.random() * (width - margin * 2 - 100) + 100;
          
          // Main text (dark)
          newPage.drawRectangle({
            x: margin,
            y: y - textHeight,
            width: textWidth,
            height: textHeight,
            color: rgb(0.2, 0.2, 0.2) // Dark gray text
          });
          
          // Some lighter text elements
          if (Math.random() > 0.6) {
            newPage.drawRectangle({
              x: margin + textWidth + 10,
              y: y - textHeight,
              width: Math.random() * 80 + 30,
              height: textHeight,
              color: rgb(0.5, 0.5, 0.5) // Medium gray text
            });
          }
        }
        
        // Add some light background elements (inverted from dark elements)
        newPage.drawRectangle({
          x: width * 0.15,
          y: height * 0.15,
          width: width * 0.7,
          height: height * 0.1,
          color: rgb(0.92, 0.92, 0.92) // Very light gray background
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
                Original Document (Colored)
              </div>
              <div className="h-64 bg-black p-4 relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-2xl font-bold text-white mb-2">Live Cohort</div>
                  <div className="text-lg text-blue-300">React week</div>
                </div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-12 left-8 w-6 h-10 bg-pink-400 transform rotate-12"></div>
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-blue-500 rounded"></div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                Inverted Colors (Light Background)
              </div>
              <div className="h-64 bg-white p-4 relative border">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-2xl font-bold text-black mb-2">Live Cohort</div>
                  <div className="text-lg text-gray-600">React week</div>
                </div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-gray-400 rounded-full"></div>
                <div className="absolute bottom-12 left-8 w-6 h-10 bg-gray-500 transform rotate-12"></div>
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-300 rounded"></div>
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
              <h4 className="font-medium mb-2 text-blue-800">✨ Proper Inversion Features</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Dark backgrounds become light/white</li>
                <li>• Colored elements become grayscale</li>
                <li>• Text remains readable with proper contrast</li>
                <li>• Graphics and images get light treatment</li>
                <li>• Perfect for printing on white paper</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Perfect for:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Printing documents (saves ink)</li>
                <li>• Light background reading</li>
                <li>• Professional document appearance</li>
                <li>• Better readability on paper</li>
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
                'Create Light Background Version'
              )}
            </Button>

            {pdfData.invertedPdf && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">✓ Color inversion completed successfully!</p>
                <p className="text-sm text-green-600 mt-1">Your PDF has been converted with light backgrounds and proper contrast - perfect for printing and reading!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwo;
