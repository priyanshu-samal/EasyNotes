
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LayoutGrid } from 'lucide-react';

interface PagesPerSheetSelectionProps {
  pagesPerSheet: number;
  onPagesPerSheetChange: (pages: number) => void;
}

const PagesPerSheetSelection: React.FC<PagesPerSheetSelectionProps> = ({
  pagesPerSheet,
  onPagesPerSheetChange
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <LayoutGrid className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Pages Per Sheet</h3>
        </div>
        
        <RadioGroup
          value={pagesPerSheet.toString()}
          onValueChange={(value) => onPagesPerSheetChange(Number(value))}
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
  );
};

export default PagesPerSheetSelection;
