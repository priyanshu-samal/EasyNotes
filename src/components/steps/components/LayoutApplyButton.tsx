
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LayoutApplyButtonProps {
  onApply: () => void;
  isApplied: boolean;
  isProcessing: boolean;
}

const LayoutApplyButton: React.FC<LayoutApplyButtonProps> = ({
  onApply,
  isApplied,
  isProcessing
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <Button 
          onClick={onApply} 
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
  );
};

export default LayoutApplyButton;
