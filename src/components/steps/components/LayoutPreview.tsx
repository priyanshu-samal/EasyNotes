
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor } from 'lucide-react';
import { LayoutPreviewProps } from '../types/layoutTypes';

const LayoutPreview: React.FC<LayoutPreviewProps> = ({
  pagesPerSheet,
  alignment,
  pageOrientation
}) => {
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
  );
};

export default LayoutPreview;
