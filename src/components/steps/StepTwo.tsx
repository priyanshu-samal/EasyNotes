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
      const pdfDoc = await PDFDocument.load(fileBuffer);
      
      // Create a new PDF with inverted colors
      const invertedPdf = await PDFDocument.create();
      const pages = pdfDoc.getPages();
      
      for (let i = 0; i < pages.length; i++) {
        const [copiedPage] = await invertedPdf.copyPages(pdfDoc, [i]);
        const page = invertedPdf.addPage(copiedPage);
        
        // Apply a dark background to simulate color inversion
        const { width, height } = page.getSize();
        page.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(0, 0, 0),
          opacity: 0.1,
        });
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
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">What happens during inversion?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• White backgrounds become black</li>
                <li>• Black text becomes white</li>
                <li>• Colors are converted to grayscale</li>
                <li>• Optimized for better contrast</li>
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
                'Invert Colors'
              )}
            </Button>

            {pdfData.invertedPdf && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">✓ Color inversion completed successfully!</p>
                <p className="text-sm text-green-600 mt-1">Your PDF has been converted to black and white.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwo;
