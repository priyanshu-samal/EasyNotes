
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { RotateCw } from 'lucide-react';

interface OrientationSelectionProps {
  pageOrientation: 'portrait' | 'landscape';
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void;
}

const OrientationSelection: React.FC<OrientationSelectionProps> = ({
  pageOrientation,
  onOrientationChange
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <RotateCw className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Page Orientation</h3>
        </div>
        
        <RadioGroup
          value={pageOrientation}
          onValueChange={onOrientationChange}
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
  );
};

export default OrientationSelection;
