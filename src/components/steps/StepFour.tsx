
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LayoutGrid, AlignLeft, AlignCenter } from 'lucide-react';

interface StepFourProps {
  pdfData: any;
  updatePdfData: (updates: any) => void;
}

const StepFour: React.FC<StepFourProps> = ({ pdfData, updatePdfData }) => {
  const [pagesPerSheet, setPagesPerSheet] = useState(1);
  const [alignment, setAlignment] = useState<'vertical' | 'horizontal'>('vertical');

  const handleApplyLayout = () => {
    updatePdfData({
      pagesPerSheet,
      alignment,
      processedPdf: new File(['final'], 'final.pdf', { type: 'application/pdf' })
    });
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
        className="grid gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white"
        style={{ 
          gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
          aspectRatio: '8.5/11'
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
      {/* Pages Per Sheet Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <LayoutGrid className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Pages Per Sheet</h3>
          </div>
          
          <RadioGroup
            value={pagesPerSheet.toString()}
            onValueChange={(value) => setPagesPerSheet(Number(value))}
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

      {/* Alignment Selection */}
      {pagesPerSheet === 2 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlignCenter className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Page Alignment</h3>
            </div>
            
            <RadioGroup
              value={alignment}
              onValueChange={(value) => setAlignment(value as 'vertical' | 'horizontal')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="vertical" id="vertical" />
                <Label htmlFor="vertical" className="flex-1 cursor-pointer">
                  <div className="font-medium">Vertical</div>
                  <div className="text-sm text-gray-500">Pages stacked vertically</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="horizontal" id="horizontal" />
                <Label htmlFor="horizontal" className="flex-1 cursor-pointer">
                  <div className="font-medium">Horizontal</div>
                  <div className="text-sm text-gray-500">Pages side by side</div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Layout Preview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Layout Preview</h3>
          <div className="max-w-sm mx-auto">
            {getLayoutPreview()}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Preview shows how {pagesPerSheet} page{pagesPerSheet > 1 ? 's' : ''} will be arranged per sheet
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Apply Button */}
      <Card>
        <CardContent className="p-4">
          <Button onClick={handleApplyLayout} className="w-full" size="lg">
            Apply Layout Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepFour;
