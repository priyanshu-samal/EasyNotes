
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface StartOverSectionProps {
  onStartOver: () => void;
}

const StartOverSection: React.FC<StartOverSectionProps> = ({ onStartOver }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="font-semibold mb-2">Need to convert more PDFs?</h3>
          <p className="text-gray-600 mb-4">Start a new conversion process with different files</p>
          <Button 
            variant="outline" 
            onClick={onStartOver}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Convert Another PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StartOverSection;
