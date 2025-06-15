import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LayoutGrid, AlignLeft, AlignCenter, RotateCw, Monitor, CheckCircle, Loader2 } from 'lucide-react';
import { PDFDocument, PageSizes } from 'pdf-lib';

interface StepFourProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepFour: React.FC<StepFourProps> = ({ pdfData, updatePdfData }) => {
  const [pagesPerSheet, setPagesPerSheet] = useState(1);
  const [alignment, setAlignment] = useState<'vertical' | 'horizontal'>('vertical');
  const [pageOrientation, setPageOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isApplied, setIsApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyLayout = async () => {
    console.log('Applying layout settings:', { pagesPerSheet, alignment, pageOrientation });
    
    // Use the existing PDF (either processedPdf or invertedPdf)
    const sourcePdf = pdfData.processedPdf || pdfData.invertedPdf;
    
    if (!sourcePdf) {
      alert('No PDF available to apply layout to');
      return;
    }

    if (pagesPerSheet === 1 && pageOrientation === 'portrait') {
      // No transformation needed, just pass through
      updatePdfData({
        pagesPerSheet,
        alignment,
        pageOrientation,
        processedPdf: sourcePdf
      });
      setIsApplied(true);
      return;
    }

    setIsProcessing(true);

    try {
      const fileBuffer = await sourcePdf.arrayBuffer();
      const sourcePdfDoc = await PDFDocument.load(fileBuffer);
      const newPdfDoc = await PDFDocument.create();
      
      const sourcePages = sourcePdfDoc.getPages();
      console.log('Processing', sourcePages.length, 'pages with layout:', pagesPerSheet, 'per sheet in', pageOrientation);

      // Determine target page size based on orientation
      const basePageSize = pageOrientation === 'landscape' ? 
        { width: PageSizes.A4[1], height: PageSizes.A4[0] } : 
        { width: PageSizes.A4[0], height: PageSizes.A4[1] };

      // Process pages in groups based on pagesPerSheet
      for (let i = 0; i < sourcePages.length; i += pagesPerSheet) {
        const newPage = newPdfDoc.addPage([basePageSize.width, basePageSize.height]);
        
        // Calculate layout dimensions
        let rows, cols;
        if (pagesPerSheet === 1) {
          rows = 1; cols = 1;
        } else if (pagesPerSheet === 2) {
          if (alignment === 'vertical') {
            rows = 2; cols = 1;
          } else {
            rows = 1; cols = 2;
          }
        } else if (pagesPerSheet === 3) {
          rows = 3; cols = 1;
        } else if (pagesPerSheet === 4) {
          rows = 2; cols = 2;
        }

        const cellWidth = basePageSize.width / cols;
        const cellHeight = basePageSize.height / rows;

        // Get the pages we need for this sheet and copy them properly
        const pagesToCopy = [];
        for (let j = 0; j < pagesPerSheet && (i + j) < sourcePages.length; j++) {
          pagesToCopy.push(i + j);
        }
        
        // Copy all pages at once to get embedded pages
        const embeddedPages = await newPdfDoc.copyPages(sourcePdfDoc, pagesToCopy);

        // Place embedded pages in the layout
        for (let j = 0; j < embeddedPages.length; j++) {
          const embeddedPage = embeddedPages[j];
          const sourcePageIndex = i + j;
          const sourcePage = sourcePages[sourcePageIndex];
          
          // Calculate position in grid
          const row = Math.floor(j / cols);
          const col = j % cols;
          
          // Calculate scale to fit page in cell while maintaining aspect ratio
          const sourceWidth = sourcePage.getWidth();
          const sourceHeight = sourcePage.getHeight();
          const scaleX = cellWidth / sourceWidth;
          const scaleY = cellHeight / sourceHeight;
          const scale = Math.min(scaleX, scaleY) * 0.95; // 5% margin
          
          // Calculate position to center the page in its cell
          const scaledWidth = sourceWidth * scale;
          const scaledHeight = sourceHeight * scale;
          const x = col * cellWidth + (cellWidth - scaledWidth) / 2;
          const y = basePageSize.height - (row + 1) * cellHeight + (cellHeight - scaledHeight) / 2;
          
          // Draw the embedded page
          newPage.drawPage(embeddedPage, {
            x: x,
            y: y,
            width: scaledWidth,
            height: scaledHeight,
          });
        }
      }

      const processedPdfBytes = await newPdfDoc.save();
      const processedFile = new File([processedPdfBytes], 'layout-applied.pdf', { type: 'application/pdf' });
      
      updatePdfData({
        pagesPerSheet,
        alignment,
        pageOrientation,
        processedPdf: processedFile
      });
      
      setIsApplied(true);
      console.log('Layout settings applied successfully');
    } catch (error) {
      console.error('Error applying layout:', error);
      alert('Error applying layout settings. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getLayoutPreview = () => {
    const layouts = {
      1: { rows: 1, cols: 1 },
      2: alignment === 'vertical' ? { rows: 2, cols: 1 } : { rows: 1, cols: 2 },
      3: { rows: 3, cols: 1 },
      4: { rows: 2, cols: 2 }
    };
    
    const layout = layouts[pagesPerSheet as keyof typeof layouts];
    const pages = Array.from({ length: pagesPerSheet }, (_, i) => i + 1);
    
    return (
      <div 
        className={`grid gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white ${
          pageOrientation === 'landscape' ? 'w-80 h-60' : 'w-60 h-80'
        }`}
        style={{ 
          gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${layout.cols}, 1fr)`
        }}
      >
        {pages.map((page) => (
          <div
            key={page}
            className="border border-gray-200 rounded flex items-center justify-center text-xs bg-gray-50"
          >
            Page {page}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Success indicator when applied */}
      {isApplied && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="w-6 h-6" />
              <div>
                <p className="font-medium">Layout settings applied successfully!</p>
                <p className="text-sm text-green-600">
                  Your PDF is now configured with {pagesPerSheet} page{pagesPerSheet > 1 ? 's' : ''} per sheet in {pageOrientation} orientation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Page Orientation Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <RotateCw className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Page Orientation</h3>
          </div>
          
          <RadioGroup
            value={pageOrientation}
            onValueChange={(value) => {
              setPageOrientation(value as 'portrait' | 'landscape');
              setIsApplied(false); // Reset applied status when settings change
            }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="portrait" id="portrait" />
              <Label htmlFor="portrait" className="flex-1 cursor-pointer">
                <div className="font-medium">Portrait</div>
                <div className="text-sm text-gray-500">A4 Portrait (8.5" × 11")</div>
              </Label>
              <div className="w-8 h-12 border-2 border-gray-400 rounded bg-white"></div>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="landscape" id="landscape" />
              <Label htmlFor="landscape" className="flex-1 cursor-pointer">
                <div className="font-medium">Landscape</div>
                <div className="text-sm text-gray-500">A4 Landscape (11" × 8.5")</div>
              </Label>
              <div className="w-12 h-8 border-2 border-gray-400 rounded bg-white"></div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Pages Per Sheet Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <LayoutGrid className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Pages Per Sheet</h3>
          </div>
          
          <RadioGroup
            value={pagesPerSheet.toString()}
            onValueChange={(value) => {
              setPagesPerSheet(Number(value));
              setIsApplied(false); // Reset applied status when settings change
            }}
            className="grid grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={num.toString()} id={`pages-${num}`} />
                <Label htmlFor={`pages-${num}`} className="flex-1 cursor-pointer">
                  <div className="font-medium">{num} page{num > 1 ? 's' : ''} per sheet</div>
                  <div className="text-sm text-gray-500">
                    {num === 1 && 'Standard single page layout'}
                    {num === 2 && 'Two pages side by side or stacked'}
                    {num === 3 && 'Three pages in vertical layout'}
                    {num === 4 && 'Four pages in 2x2 grid'}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Content Alignment Selection */}
      {pagesPerSheet === 2 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlignCenter className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Content Alignment</h3>
            </div>
            
            <RadioGroup
              value={alignment}
              onValueChange={(value) => {
                setAlignment(value as 'vertical' | 'horizontal');
                setIsApplied(false); // Reset applied status when settings change
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="vertical" id="vertical" />
                <Label htmlFor="vertical" className="flex-1 cursor-pointer">
                  <div className="font-medium">Vertical Stack</div>
                  <div className="text-sm text-gray-500">Pages arranged top to bottom</div>
                </Label>
                <div className="flex flex-col gap-1">
                  <div className="w-6 h-3 border border-gray-400 rounded bg-white"></div>
                  <div className="w-6 h-3 border border-gray-400 rounded bg-white"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="horizontal" id="horizontal" />
                <Label htmlFor="horizontal" className="flex-1 cursor-pointer">
                  <div className="font-medium">Side by Side</div>
                  <div className="text-sm text-gray-500">Pages arranged left to right</div>
                </Label>
                <div className="flex gap-1">
                  <div className="w-3 h-6 border border-gray-400 rounded bg-white"></div>
                  <div className="w-3 h-6 border border-gray-400 rounded bg-white"></div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Layout Preview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Layout Preview</h3>
          </div>
          <div className="flex justify-center">
            {getLayoutPreview()}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Preview shows {pagesPerSheet} page{pagesPerSheet > 1 ? 's' : ''} in {pageOrientation} orientation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Apply Button */}
      <Card>
        <CardContent className="p-4">
          <Button 
            onClick={handleApplyLayout} 
            className="w-full" 
            size="lg"
            disabled={isApplied || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Applying Layout...
              </>
            ) : isApplied ? (
              'Layout Settings Applied ✓'
            ) : (
              'Apply Layout Settings'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepFour;
