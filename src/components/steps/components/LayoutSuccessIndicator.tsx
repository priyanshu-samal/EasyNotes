
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface LayoutSuccessIndicatorProps {
  isApplied: boolean;
  pagesPerSheet: number;
  pageOrientation: 'portrait' | 'landscape';
}

const LayoutSuccessIndicator: React.FC<LayoutSuccessIndicatorProps> = ({
  isApplied,
  pagesPerSheet,
  pageOrientation
}) => {
  if (!isApplied) return null;

  return (
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
  );
};

export default LayoutSuccessIndicator;
