
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlignCenter } from 'lucide-react';

interface AlignmentSelectionProps {
  alignment: 'vertical' | 'horizontal';
  onAlignmentChange: (alignment: 'vertical' | 'horizontal') => void;
  show: boolean;
}

const AlignmentSelection: React.FC<AlignmentSelectionProps> = ({
  alignment,
  onAlignmentChange,
  show
}) => {
  if (!show) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlignCenter className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Content Alignment</h3>
        </div>
        
        <RadioGroup
          value={alignment}
          onValueChange={onAlignmentChange}
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
  );
};

export default AlignmentSelection;
